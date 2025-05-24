import type { LoginResponse } from "../api/login";

export type AuthContextType = {
	token: string | null;
	user: LoginResponse | null;

	login: (args: { email: string; password: string }) => void;
	logout: () => void;
};

export type AuthProviderProps = {
	children: React.ReactNode;
};
