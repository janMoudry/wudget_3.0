import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";

const SideBar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-full">
      <nav className="flex flex-col gap-2 text-sm">
        <NavLink
          to={ROUTES.DASHBOARD}
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
          to={ROUTES.CLIENTS}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive 
                ? "bg-gray-100 text-gray-900 font-medium" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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