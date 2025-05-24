import { useNavigate } from "react-router";
import { Divider } from "../atoms";
import { Avatar, Tabs } from "../molecules";
import { ROUTES } from "../../navigation/ROUTES";
import { useMultiTab } from "../../hooks/useMultiTab";

const AppBar = () => {
  const navigate = useNavigate();
  const { activeTab, lastVisitedGeneralPage } = useMultiTab();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center">
      <div className="w-64 flex items-center justify-between gap-2 pl-4">
        <div
          className={`text-lg font-semibold cursor-pointer text-gray-900 hover:text-gray-600 transition-colors duration-200`}
          onClick={() => navigate(lastVisitedGeneralPage || ROUTES.DASHBOARD)}
        >
          Wudget
        </div>
        <Divider orientation="vertical" />
      </div>

      <div className="flex-1 flex items-center overflow-x-auto px-5">
        <Tabs />
      </div>

      <div className="w-64 flex justify-end items-center gap-2 pr-4">
        <Divider orientation="vertical" />
        <Avatar />
      </div>
    </header>
  );
};

export default AppBar;