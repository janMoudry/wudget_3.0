import { Button, Paper, TextField, Typography } from "@components";
import { useCallback } from "react";
import { useAuth } from "@hooks";
import { useForm } from "react-hook-form";
import { Mail, LockKeyhole } from "lucide-react";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = useCallback(
    (data: LoginForm) => {
      login(data);
    },
    [login]
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Wudget</h1>
          <p className="text-primary-100">Správa financí pro profesionály</p>
        </div>

        <Paper className="p-8 rounded-xl shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="relative">
                <TextField
                  label="E-mail"
                  type="email"
                  placeholder="jan@example.com"
                  className="pl-10"
                  {...register("email", { 
                    required: "E-mail je povinný",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Neplatný formát e-mailu"
                    }
                  })}
                  error={errors.email?.message}
                />
                <Mail className="absolute left-3 top-[34px] h-5 w-5 text-neutral-400" />
              </div>

              <div className="relative">
                <TextField
                  label="Heslo"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  {...register("password", { 
                    required: "Heslo je povinné"
                  })}
                  error={errors.password?.message}
                />
                <LockKeyhole className="absolute left-3 top-[34px] h-5 w-5 text-neutral-400" />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-2.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Přihlašování..." : "Přihlásit se"}
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default Login;