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
    navigate(ROUTES.CLIENT.DASHBOARD.replace(ROUTES.CLIENT_ROOT, `/${id}/`));
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
        "flex items-center gap-2 px-4 py-2 text-sm rounded-lg cursor-pointer",
        "transition-all duration-200 ease-in-out",
        "border",
        active
          ? "bg-white text-gray-900 border-gray-200 shadow-sm"
          : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100"
      )}
      onClick={handleClick}
    >
      <span className="truncate max-w-[120px] font-medium">{name}</span>
      <button
        className={clsx(
          "p-0.5 rounded-full transition-colors duration-200",
          "hover:bg-gray-100 active:bg-gray-200",
          active ? "text-gray-400 hover:text-red-500" : "text-gray-400 hover:text-gray-600"
        )}
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