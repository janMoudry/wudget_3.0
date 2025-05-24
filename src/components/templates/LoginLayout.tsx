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
		<div className="flex flex-col justify-center items-center h-screen">
			<Suspense fallback={<div>Loading...</div>}>
				<Outlet />
			</Suspense>
		</div>
	);
};

export default LoginLayout;
