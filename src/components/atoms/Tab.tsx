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
        "flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-pointer",
        "transition-all duration-200 ease-in-out",
        active
          ? [
              "bg-white text-gray-900",
              "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]",
              "border-b-2 border-primary-500",
              "font-medium",
            ]
          : [
              "bg-gray-50 text-gray-500",
              "hover:bg-gray-100 hover:text-gray-700",
              "border-b-2 border-transparent",
            ]
      )}
      onClick={handleClick}
    >
      <span className="truncate max-w-[120px]">{name}</span>
      <button
        className={clsx(
          "p-1 rounded-full transition-colors duration-200",
          "hover:bg-gray-100 active:bg-gray-200",
          active 
            ? "text-gray-400 hover:text-red-500 hover:bg-red-50" 
            : "text-gray-400 hover:text-gray-600"
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
