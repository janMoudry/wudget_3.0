import { useCallback, useEffect, useState, type FC } from "react";
import type { AuthContextType, AuthProviderProps, UserRole } from "../types/Auth";
import { AuthContext } from "@contexts";
import { useLogin, type LoginResponse } from "@api/login";
import { useStorage } from "../hooks/useStorage";
import { STORAGE_KEYS } from "../types/storage";
import { useNavigate } from "react-router";
import { ROUTES } from "../navigation/ROUTES";

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [role, setRole] = useState<UserRole>("client");

  const { getItem, setItem, clearItem } = useStorage();
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleLogin: AuthContextType["login"] = useCallback(
    async ({ email, password }) => {
      const response = await loginMutation.mutateAsync({
        email,
        password,
      });

      if (response) {
        // In a real app, role would come from the backend
        const userRole: UserRole = email.includes("advisor") ? "advisor" : "client";
        setRole(userRole);
        setItem(STORAGE_KEYS.USER, { ...response, role: userRole });
        setUser(response);
        navigate(ROUTES.DASHBOARD);
      }
    },
    [loginMutation, navigate, setItem]
  );

  const handleLogout: AuthContextType["logout"] = useCallback(() => {
    setUser(null);
    setRole("client");
    clearItem(STORAGE_KEYS.USER);
    navigate(ROUTES.LOGIN);
  }, [clearItem, navigate]);

  useEffect(() => {
    if (user) return;

    const storedUser = getItem(STORAGE_KEYS.USER);

    if (storedUser) {
      setUser(storedUser);
      setRole(storedUser.role || "client");
    } else {
      setUser(null);
      setRole("client");
      clearItem(STORAGE_KEYS.USER);
      navigate(ROUTES.LOGIN);
    }
  }, [clearItem, getItem, navigate, user]);

  return (
    <AuthContext.Provider
      value={{
        token: null,
        user,
        role,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;