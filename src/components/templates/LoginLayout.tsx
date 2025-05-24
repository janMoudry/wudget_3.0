import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../hooks";
import { ROUTES } from "../../navigation/ROUTES";

const LoginLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl transform rotate-12" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-neutral-200 text-lg">Načítání...</div>
        </div>
      }>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default LoginLayout;