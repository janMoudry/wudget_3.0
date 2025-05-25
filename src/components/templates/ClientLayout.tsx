import { Suspense, useMemo } from "react";
import { Outlet } from "react-router";
import { AppBar, ClientSideBar } from "../organisms";
import { TabProvider } from "../../providers";
import { useTab } from "../../hooks/useTab";

const BaseLayout = () => {
	return (
		<TabProvider>
			<BaseLayoutComponent />
		</TabProvider>
	);
};

const BaseLayoutComponent = () => {
	const { isLoading, isError } = useTab();

	const Content = useMemo(() => {
		if (isLoading) return <div>Načítání...</div>;
		if (isError) return <div>Chyba</div>;
		return <Outlet />;
	}, [isLoading, isError]);

	return (
		<div className="flex flex-col h-screen">
			<AppBar />
			<div className="flex flex-1 overflow-hidden">
				<ClientSideBar />
				<main className="flex-1 overflow-y-auto p-6 bg-white">
					<Suspense fallback={<div>Načítání...</div>}>
						{Content}
					</Suspense>
				</main>
			</div>
		</div>
	);
};

export default BaseLayout;