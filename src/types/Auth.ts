import type { LoginResponse } from "../api/login";

export type UserRole = "client" | "advisor" | "admin";

export type AuthContextType = {
  token: string | null;
  user: LoginResponse | null;
  role: UserRole;
  login: (args: { email: string; password: string }) => void;
  logout: () => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};