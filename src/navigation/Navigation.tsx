import { Route, Routes } from "react-router";
import { ROUTES } from "./ROUTES";
import { PAGES } from "./PAGES";
import { BaseLayout, ClientLayout, LoginLayout } from "@components";

const Navigation = () => (
	<Routes>
		<Route element={<LoginLayout />}>
			<Route path={ROUTES.LOGIN} element={<PAGES.LOGIN />} />
		</Route>
		<Route element={<BaseLayout />}>
			{/* General */}
			<Route path={ROUTES.DASHBOARD} element={<PAGES.DASHBOARD />} />
			<Route path={ROUTES.CLIENTS} element={<PAGES.CLIENTS />} />
			<Route path={ROUTES.PROFILE} element={<PAGES.PROFILE />} />
			<Route path={ROUTES.SETTINGS} element={<PAGES.SETTINGS />} />
		</Route>
		{/* Client */}
		<Route path={ROUTES.CLIENT_ROOT} element={<ClientLayout />}>
			<Route
				path={ROUTES.CLIENT.DASHBOARD}
				element={<PAGES.CLIENT_DASHBOARD />}
			/>
			<Route
				path={ROUTES.CLIENT.TRANSACTIONS}
				element={<PAGES.TRANSACTIONS />}
			/>
			<Route path={ROUTES.CLIENT.UPLOAD} element={<PAGES.UPLOAD />} />
			<Route path={ROUTES.CLIENT.STATEMENTS} element={<PAGES.STATEMENTS />} />
			<Route path={ROUTES.CLIENT.SETTINGS} element={<PAGES.CLIENT_SETTINGS />} />
		</Route>
	</Routes>
);

export default Navigation;