```typescript
export const ROUTES = {
  LOGIN: "/login",

  // General
  DASHBOARD: "/",
  CLIENTS: "/clients",
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
  },
};
```