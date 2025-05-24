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
	clients: {
		id: string;
		name: string;
		status: string;
	}[];
};

const login = async ({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	email: _email,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	password: _password,
}: LoginRequest): Promise<LoginResponse> => {
	const res = await fetch(`/MOCK/user.json`, {});
	const user = (await res.json()) as LoginResponse;

	const { ...safeUser } = user;

	return {
		...safeUser,
		token: "mock-jwt-token-123",
	};
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
