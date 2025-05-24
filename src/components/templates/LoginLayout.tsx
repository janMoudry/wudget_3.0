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
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">Načítání...</div>
        </div>
      }>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default LoginLayout;