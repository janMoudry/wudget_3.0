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
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <Paper className="w-full max-w-md p-8 rounded-2xl shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <Typography variant="h1" className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
            Wudget
          </Typography>
          <Typography variant="small" className="text-neutral-600">
            Přihlaste se do svého účtu
          </Typography>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="E-mailová adresa"
            type="email"
            placeholder="jan@example.com"
            autoComplete="email"
            {...register("email", { 
              required: "E-mail je povinný",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Neplatný formát e-mailu"
              }
            })}
            error={errors.email?.message}
          />

          <TextField
            label="Heslo"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password", { 
              required: "Heslo je povinné",
              minLength: {
                value: 8,
                message: "Heslo musí mít alespoň 8 znaků"
              }
            })}
            error={errors.password?.message}
          />

          <Button 
            type="submit" 
            className="w-full py-2.5 text-base font-medium shadow-sm hover:shadow-md"
          >
            Přihlásit se
          </Button>
        </form>

        <div className="text-center">
          <Typography variant="small" className="text-neutral-500">
            Nemáte účet?{" "}
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
              Kontaktujte nás
            </a>
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default Login;