import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";
import { useTab } from "../../hooks/useTab";
import { Select, Divider } from "../atoms";
import { PERIOD_LABELS } from "../../types/period";
import { Accordion } from "../molecules";
import { LayoutDashboard, FileText, Upload, Settings, Wallet, Package } from "lucide-react";

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
            value={tab.accountId || "all"}
            onChange={(e) => setAccountId(e.target.value)}
          >
            <option value="all">Všechny účty</option>
            {client.accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </Select>
        )}
      </div>

      <nav className="flex flex-col gap-4">
        {/* Overview */}
        <Accordion title="Přehled">
          <NavLink
            to={ROUTES.CLIENT.DASHBOARD.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
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
            to={ROUTES.CLIENT.TRANSACTIONS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <FileText size={18} />
            Transakce
          </NavLink>
        </Accordion>

        {/* Products */}
        <Accordion title="Produkty">
          <NavLink
            to={ROUTES.CLIENT.PRODUCTS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Package size={18} />
            Produkty
          </NavLink>
        </Accordion>

        {/* Bank Statements */}
        <Accordion title="Bankovní výpisy">
          <NavLink
            to={ROUTES.CLIENT.STATEMENTS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <FileText size={18} />
            Výpisy
          </NavLink>
          <NavLink
            to={ROUTES.CLIENT.UPLOAD.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Upload size={18} />
            Nahrát Výpis
          </NavLink>
        </Accordion>

        {/* Settings */}
        <Accordion title="Nastavení">
          <NavLink
            to={ROUTES.CLIENT.ACCOUNTS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? "bg-gray-100 text-gray-900 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Wallet size={18} />
            Správa účtů
          </NavLink>
          <NavLink
            to={ROUTES.CLIENT.SETTINGS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)}
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

export default ClientSidebar;