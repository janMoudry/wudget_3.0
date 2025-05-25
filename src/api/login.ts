import { useMutation } from "@tanstack/react-query";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  name: string;
  email: string;
  token: string;
};

const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const res = await fetch(`http://localhost:3001/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }

  return res.json();
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
    onError: (error) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });