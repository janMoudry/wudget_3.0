import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";
import { useTab } from "../../hooks/useTab";
import { Select, Divider } from "../atoms";
import { PERIOD_LABELS } from "../../types/period";

const ClientSidebar = () => {
  const { tab, client, setPeriod, setAccountId } = useTab();

  const getAccountLabel = (account: typeof client.accounts[0]) => {
    return (
      <div className="flex items-center gap-2">
        <span>{account.name}</span>
        <div className="flex gap-1 ml-2">
          {account.flags.map((flag) => (
            <span
              key={flag}
              className="px-1.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700"
            >
              {flag}
            </span>
          ))}
        </div>
      </div>
    );
  };

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
              </option>
            ))}
          </Select>
        )}

        {client && client.accounts.length > 1 && (
          <div className="text-sm text-gray-600">
            {client.accounts.find((acc) => acc.id === tab.accountId)?.flags.map((flag) => (
              <span
                key={flag}
                className="inline-block px-2 py-1 mr-1 mb-1 rounded-full bg-gray-100 text-gray-700"
              >
                {flag}
              </span>
            ))}
          </div>
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
          to={ROUTES.CLIENT.ACCOUNTS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? "bg-gray-100 text-gray-900 font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          Správa účtů
        </NavLink>

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