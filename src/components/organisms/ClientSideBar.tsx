import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";
import { useTab } from "../../hooks/useTab";

const ClientSidebar = () => {
  const { tab } = useTab();

  return (
    <aside className="w-64 bg-neutral-800 border-r border-neutral-700 p-4 h-full">
      <nav className="flex flex-col gap-2 text-sm">
        <NavLink
          to={ROUTES.CLIENT.DASHBOARD.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? "bg-neutral-700 text-white font-medium" 
                : "text-neutral-300 hover:bg-neutral-700/50 hover:text-white"
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
                ? "bg-neutral-700 text-white font-medium" 
                : "text-neutral-300 hover:bg-neutral-700/50 hover:text-white"
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
                ? "bg-neutral-700 text-white font-medium" 
                : "text-neutral-300 hover:bg-neutral-700/50 hover:text-white"
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