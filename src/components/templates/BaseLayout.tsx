import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { AppBar, SideBar } from "../organisms";
import { useMultiTab } from "../../hooks/useMultiTab";

const BaseLayout = () => {
  const { pathname } = useLocation();
  const { changeLastVisitedGeneralPage } = useMultiTab();

  useEffect(() => {
    changeLastVisitedGeneralPage(pathname);
  }, [changeLastVisitedGeneralPage, pathname]);

  return (
    <div className="flex flex-col h-screen bg-neutral-900">
      <AppBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-y-auto p-6 bg-neutral-900">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="text-neutral-200 text-lg">Načítání...</div>
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;