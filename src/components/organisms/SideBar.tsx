import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";

const SideBar = () => {
  return (
    <aside className="w-64 bg-neutral-800 border-r border-neutral-700 p-4 h-full">
      <nav className="flex flex-col gap-2 text-sm">
        <NavLink
          to={ROUTES.DASHBOARD}
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
          to={ROUTES.CLIENTS}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? "bg-neutral-700 text-white font-medium" 
                : "text-neutral-300 hover:bg-neutral-700/50 hover:text-white"
            }`
          }
        >
          Klienti
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideBar;