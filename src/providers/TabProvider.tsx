import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router";
import { TabContext } from "../contexts/TabContext";
import { useMultiTab } from "../hooks/useMultiTab";
import { useClient } from "../api/getClient";
import { useStorage } from "../hooks/useStorage";
import { STORAGE_KEYS } from "../types/storage";
import type { Period } from "../types/period";

interface TabProviderProps {
  children: React.ReactNode;
}

const TabProvider: FC<TabProviderProps> = ({ children }) => {
  const { clientId } = useParams<{ clientId: string }>();
  const { getTab, addTab } = useMultiTab();
  const { data: client, isLoading, isError } = useClient(clientId ?? "");
  const { getItem, setItem } = useStorage();
  const [period, setPeriod] = useState<Period>("month");

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