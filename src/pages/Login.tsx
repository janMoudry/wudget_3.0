import { Button, Paper, TextField, Typography } from "@components";
import { useCallback } from "react";
import { useAuth } from "@hooks";
import { useForm } from "react-hook-form";

type LoginForm = {
	email: string;
	password: string;
};

const Login = () => {
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();

	const onSubmit = useCallback(
		(data: LoginForm) => {
			login(data);
		},
		[login]
	);

	return (
		<Paper className="w-full max-w-md p-8 rounded-xl shadow-lg space-y-6">
			<div className="text-center space-y-1">
				<Typography variant="h1" className="text-3xl font-bold">
					Přihlášení
				</Typography>
				<Typography variant="small" className="text-gray-500">
					Vítej zpět ve Wudgetu
				</Typography>
			</div>

			<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label="E-mail"
					type="email"
					{...register("email", { required: "Zadej e-mail" })}
					error={errors.email?.message}
				/>

				<TextField
					label="Heslo"
					type="password"
					{...register("password", { required: "Zadej heslo" })}
					error={errors.password?.message}
				/>

				<Button type="submit" className="w-full">
					Přihlásit se
				</Button>
			</form>
		</Paper>
	);
};

export default Login;
