export const ROUTES = {
  LOGIN: "/login",

  // General
  DASHBOARD: "/",
  CLIENTS: "/clients",
  CLIENT_CREATE: "/clients/create",
  PROFILE: "/profile",
  SETTINGS: "/settings",

  // Client
  CLIENT_ROOT: "/:clientId/",
  CLIENT: {
    DASHBOARD: "/:clientId/dashboard",
    TRANSACTIONS: "/:clientId/transactions",
    UPLOAD: "/:clientId/upload",
    STATEMENTS: "/:clientId/statements",
    SETTINGS: "/:clientId/settings",
    ACCOUNTS: "/:clientId/accounts",
    ACCOUNT_EDIT: "/:clientId/accounts/:accountId/edit",
    ACCOUNT_CREATE: "/:clientId/accounts/create",
  },
};