import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";
import { useTab } from "../../hooks/useTab";
import { Select } from "../atoms";
import { PERIOD_LABELS } from "../../types/period";

const ClientSidebar = () => {
  const { tab, setPeriod } = useTab();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-full">
      <div className="mb-6">
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
      </nav>
    </aside>
  );
};

export default ClientSidebar;