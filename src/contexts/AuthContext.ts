import { createContext } from "react";
import type { AuthContextType } from "@Types/Auth";

const defaultValue: AuthContextType = {
	user: null,
	token: null,
	login: () => {},
	logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);
