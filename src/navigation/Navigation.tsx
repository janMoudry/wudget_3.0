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
      <Route path={ROUTES.CLIENT_CREATE} element={<PAGES.CLIENT_CREATE />} />
      <Route path={ROUTES.PROFILE} element={<PAGES.PROFILE />} />
      <Route path={ROUTES.SETTINGS} element={<PAGES.SETTINGS />} />
      <Route path={ROUTES.CALCULATOR} element={<PAGES.CALCULATOR />} />
      <Route path={ROUTES.REPORTS} element={<PAGES.REPORTS />} />
      <Route path={ROUTES.PRODUCTS} element={<PAGES.PRODUCTS />} />
      <Route path={ROUTES.PRODUCT_CREATE} element={<PAGES.PRODUCT_CREATE />} />
      <Route path={ROUTES.PRODUCT_EDIT} element={<PAGES.PRODUCT_EDIT />} />
      <Route path={ROUTES.PLANS} element={<PAGES.PLANS />} />
      <Route path={ROUTES.ADVISOR} element={<PAGES.ADVISOR />} />
      <Route path={ROUTES.ADVISOR_COMMUNICATIONS} element={<PAGES.ADVISOR_COMMUNICATIONS />} />
    </Route>
    {/* Client */}
    <Route path={ROUTES.CLIENT_ROOT} element={<ClientLayout />}>
      <Route path={ROUTES.CLIENT.DASHBOARD} element={<PAGES.CLIENT_DASHBOARD />} />
      <Route path={ROUTES.CLIENT.TRANSACTIONS} element={<PAGES.TRANSACTIONS />} />
      <Route path={ROUTES.CLIENT.UPLOAD} element={<PAGES.UPLOAD />} />
      <Route path={ROUTES.CLIENT.STATEMENTS} element={<PAGES.STATEMENTS />} />
      <Route path={ROUTES.CLIENT.SETTINGS} element={<PAGES.CLIENT_SETTINGS />} />
      <Route path={ROUTES.CLIENT.ACCOUNTS} element={<PAGES.ACCOUNTS />} />
      <Route path={ROUTES.CLIENT.ACCOUNT_EDIT} element={<PAGES.ACCOUNT_EDIT />} />
      <Route path={ROUTES.CLIENT.ACCOUNT_CREATE} element={<PAGES.ACCOUNT_CREATE />} />
      <Route path={ROUTES.CLIENT.PRODUCTS} element={<PAGES.CLIENT_PRODUCTS />} />
      <Route path={ROUTES.CLIENT.COUNTERPARTIES} element={<PAGES.COUNTERPARTIES />} />
      <Route path={ROUTES.CLIENT.SUBSCRIPTIONS} element={<PAGES.SUBSCRIPTIONS />} />
      <Route path={ROUTES.CLIENT.PLANS} element={<PAGES.CLIENT_PLANS />} />
      <Route path={ROUTES.CLIENT.PROGRESS} element={<PAGES.CLIENT_PROGRESS />} />
    </Route>
  </Routes>
);

export default Navigation;