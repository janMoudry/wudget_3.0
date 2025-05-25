import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";
import { Divider } from "../atoms";
import { LayoutDashboard, Users, Settings } from "lucide-react";

const SideBar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-full">
      <nav className="flex flex-col gap-2 text-sm">
        {/* Main Section */}
        <div className="space-y-2">
          <NavLink
            to={ROUTES.DASHBOARD}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink
            to={ROUTES.CLIENTS}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Users size={18} />
            Klienti
          </NavLink>
        </div>

        <div className="my-2">
          <Divider />
        </div>

        {/* Settings Section */}
        <div className="space-y-2">
          <NavLink
            to={ROUTES.SETTINGS}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Settings size={18} />
            Nastavení
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;