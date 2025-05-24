import { NavLink } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";

const SideBar = () => {
	return (
		<aside className="w-64 bg-gray-50 border-r p-4 h-full">
			<nav className="flex flex-col gap-2 text-sm">
				<NavLink
					to={ROUTES.DASHBOARD}
					className={({ isActive }) =>
						`px-3 py-2 rounded hover:bg-gray-100 ${
							isActive ? "bg-gray-100 font-semibold" : ""
						}`
					}
				>
					Dashboard
				</NavLink>
				<NavLink
					to={ROUTES.CLIENTS}
					className={({ isActive }) =>
						`px-3 py-2 rounded hover:bg-gray-100 ${
							isActive ? "bg-gray-100 font-semibold" : ""
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
