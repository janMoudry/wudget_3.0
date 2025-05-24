import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";
import { useTab } from "../../hooks/useTab";

const ClientSidebar = () => {
	const { tab } = useTab();

	return (
		<aside className="w-64 bg-gray-50 border-r p-4 h-full">
			<nav className="flex flex-col gap-2 text-sm">
				<NavLink
					to={ROUTES.CLIENT.DASHBOARD.replace(
						ROUTES.CLIENT_ROOT,
						`/${tab.id}/`
					)}
					className={({ isActive }) =>
						`px-3 py-2 rounded hover:bg-gray-100 ${
							isActive ? "bg-gray-100 font-semibold" : ""
						}`
					}
				>
					Dashboard
				</NavLink>
				<NavLink
					to={ROUTES.CLIENT.TRANSACTIONS.replace(
						ROUTES.CLIENT_ROOT,
						`/${tab.id}/`
					)}
					className={({ isActive }) =>
						`px-3 py-2 rounded hover:bg-gray-100 ${
							isActive ? "bg-gray-100 font-semibold" : ""
						}`
					}
				>
					Transakce
				</NavLink>
				<NavLink
					to={ROUTES.CLIENT.UPLOAD.replace(
						ROUTES.CLIENT_ROOT,
						`/${tab.id}/`
					)}
					className={({ isActive }) =>
						`px-3 py-2 rounded hover:bg-gray-100 ${
							isActive ? "bg-gray-100 font-semibold" : ""
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
