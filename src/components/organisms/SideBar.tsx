import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";
import { Divider } from "../atoms";
import { LayoutDashboard, Users, Settings, Calculator, ChartBar, Wallet } from "lucide-react";
import { Accordion } from "../molecules";

const SideBar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-full">
      <nav className="flex flex-col gap-4">
        {/* Client Management */}
        <Accordion title="Správa klientů">
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
        </Accordion>

        {/* Analytical Tools */}
        <Accordion title="Analytické nástroje">
          <NavLink
            to={ROUTES.CALCULATOR}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Calculator size={18} />
            Kalkulačka
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <ChartBar size={18} />
            Reporty
          </NavLink>
        </Accordion>

        {/* System Settings */}
        <Accordion title="Nastavení systému">
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
        </Accordion>
      </nav>
    </aside>
  );
};

export default SideBar;