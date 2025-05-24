import type { FC } from "react";
import clsx from "classnames";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../navigation/ROUTES";
import { useMultiTab } from "../../hooks/useMultiTab";

interface TabProps {
	id: string;
	name: string;
}

const Tab: FC<TabProps> = ({ id, name }) => {
	const navigate = useNavigate();
	const { activeTab, removeTab } = useMultiTab();

	const handleClick = () => {
		navigate(
			ROUTES.CLIENT.DASHBOARD.replace(ROUTES.CLIENT_ROOT, `/${id}/`)
		);
	};

	const handleClose = () => {
		if (activeTab === id) {
			navigate(ROUTES.DASHBOARD);
		}
		removeTab(id);
	};

	const active = activeTab === id;
	return (
		<div
			className={clsx(
				"flex items-center gap-2 px-4 py-1.5 text-sm rounded-md cursor-pointer transition-colors duration-150",
				active
					? "bg-white text-gray-900 shadow"
					: "bg-gray-700 text-gray-200 hover:bg-gray-600"
			)}
			onClick={handleClick}
		>
			<span className="truncate max-w-[100px]">{name}</span>
			<button
				className="hover:text-red-500 text-gray-400 transition-colors duration-150"
				onClick={(e) => {
					e.stopPropagation();
					handleClose();
				}}
			>
				<X size={14} />
			</button>
		</div>
	);
};

export default Tab;
