import { useEffect, useState, type FC } from "react";
import { useParams, useNavigate } from "react-router";
import { TabContext } from "../contexts/TabContext";
import { useMultiTab } from "../hooks/useMultiTab";
import { useClient } from "../api/getClient";
import { useStorage } from "../hooks/useStorage";
import { STORAGE_KEYS } from "../types/storage";
import type { Period } from "../types/period";
import { toast } from "react-toastify";
import { ROUTES } from "../navigation/ROUTES";
import { useStatementsCheck } from "../api/checkStatements";

interface TabProviderProps {
  children: React.ReactNode;
}

const TabProvider: FC<TabProviderProps> = ({ children }) => {
  const { clientId } = useParams<{ clientId: string }>();
  const { getTab, addTab } = useMultiTab();
  const { data: client, isLoading, isError } = useClient(clientId ?? "");
  const { getItem, setItem } = useStorage();
  const [period, setPeriod] = useState<Period>("month");
  const navigate = useNavigate();
  const { data: statementsCheck } = useStatementsCheck(clientId ?? "");

  const tab = getTab(clientId ?? "");

  useEffect(() => {
    if (client && !tab) {
      addTab({
        id: client.id,
        title: client.name,
        period: "month"
      });
    }
  }, [addTab, client, tab]);

  useEffect(() => {
    const periods = getItem(STORAGE_KEYS.PERIOD) || {};
    if (clientId && periods[clientId]) {
      setPeriod(periods[clientId]);
    }
  }, [clientId, getItem]);

  useEffect(() => {
    if (statementsCheck?.status === "incomplete" && client) {
      toast.warning(
        <div>
          <p className="mb-2">Klientovi chybí výpisy za {statementsCheck.missingPeriods.length} období</p>
          <button
            onClick={() => {
              navigate(ROUTES.CLIENT.STATEMENTS.replace(ROUTES.CLIENT_ROOT, `/${client.id}/`));
              toast.dismiss();
            }}
            className="px-4 py-2 bg-white text-amber-800 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors"
          >
            Zobrazit výpisy
          </button>
        </div>,
        {
          autoClose: 10000,
          position: "bottom-right"
        }
      );
    }
  }, [client, statementsCheck]);

  const handleSetPeriod = (newPeriod: Period) => {
    setPeriod(newPeriod);
    if (clientId) {
      const periods = getItem(STORAGE_KEYS.PERIOD) || {};
      setItem(STORAGE_KEYS.PERIOD, { ...periods, [clientId]: newPeriod });
    }
  };

  if (!tab) return null;

  return (
    <TabContext.Provider
      value={{ 
        tab: { ...tab, period }, 
        client: client || null, 
        isLoading, 
        isError,
        setPeriod: handleSetPeriod
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;