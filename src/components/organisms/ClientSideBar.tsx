import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";
import { useTab } from "../../hooks/useTab";
import { Select, Divider } from "../atoms";
import { PERIOD_LABELS } from "../../types/period";

const ClientSidebar = () => {
  const { tab, client, setPeriod, setAccountId } = useTab();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-full">
      <div className="space-y-4 mb-6">
        <Select
          value={tab.period}
          onChange={(e) => setPeriod(e.target.value as any)}
        >
          {Object.entries(PERIOD_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        {client && client.accounts.length > 1 && (
          <Select
            value={tab.accountId}
            onChange={(e) => setAccountId(e.target.value)}
          >
            {client.accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
                {account.flags.length > 0 && ` (${account.flags.join(", ")})`}
              </option>
            ))}
          </Select>
        )}
      </div>

      <nav className="flex flex-col gap-2 text-sm">
        <NavLink
          to={ROUTES.CLIENT.DASHBOARD.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? "bg-gray-100 text-gray-900 font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to={ROUTES.CLIENT.TRANSACTIONS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? "bg-gray-100 text-gray-900 font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          Transakce
        </NavLink>

        <div className="my-2">
          <Divider />
        </div>

        <NavLink
          to={ROUTES.CLIENT.STATEMENTS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? "bg-gray-100 text-gray-900 font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          Výpisy
        </NavLink>
        <NavLink
          to={ROUTES.CLIENT.UPLOAD.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? "bg-gray-100 text-gray-900 font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          Nahrát Výpis
        </NavLink>

        <div className="my-2">
          <Divider />
        </div>

        <NavLink
          to={ROUTES.CLIENT.SETTINGS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? "bg-gray-100 text-gray-900 font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          Nastavení
        </NavLink>
      </nav>
    </aside>
  );
};

export default ClientSidebar;