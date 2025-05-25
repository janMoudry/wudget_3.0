export const ROUTES = {
	LOGIN: "/login",

	// General
	DASHBOARD: "/",
	CLIENTS: "/clients",
	PROFILE: "/profile",

	// Client
	CLIENT_ROOT: "/:clientId/",
	CLIENT: {
		DASHBOARD: "/:clientId/dashboard",
		TRANSACTIONS: "/:clientId/transactions",
		UPLOAD: "/:clientId/upload",
		STATEMENTS: "/:clientId/statements",
	},
};