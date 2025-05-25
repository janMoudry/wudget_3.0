import { lazy } from "react";

export const PAGES = {
	LOGIN: lazy(() => import("../pages/Login")),
	DASHBOARD: lazy(() => import("../pages/Dashboard")),
	CLIENTS: lazy(() => import("../pages/Clients")),
	CLIENT_DASHBOARD: lazy(() => import("../pages/ClientDashboard")),
	TRANSACTIONS: lazy(() => import("../pages/Transactions")),
	UPLOAD: lazy(() => import("../pages/Upload")),
	PROFILE: lazy(() => import("../pages/Profile")),
	STATEMENTS: lazy(() => import("../pages/Statements.tsx")),
};