import { Button, Paper, TextField, Typography } from "@components";
import { useCallback } from "react";
import { useAuth } from "@hooks";
import { useForm } from "react-hook-form";
import { LockKeyhole, Mail } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Heading */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-white">
            Wudget
          </h1>
          <p className="text-primary-100">
            Správa financí pro profesionály
          </p>
        </div>

        {/* Login Form */}
        <Paper className="p-8 rounded-2xl shadow-2xl space-y-6 backdrop-blur-sm bg-white/95">
          <div className="space-y-2">
            <Typography variant="h2" className="text-2xl">
              Přihlášení
            </Typography>
            <Typography variant="small">
              Vítejte zpět! Přihlaste se do svého účtu.
            </Typography>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="relative">
                <TextField
                  label="E-mailová adresa"
                  type="email"
                  placeholder="jan@example.com"
                  autoComplete="email"
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
                  autoComplete="current-password"
                  className="pl-10"
                  {...register("password", { 
                    required: "Heslo je povinné",
                    minLength: {
                      value: 8,
                      message: "Heslo musí mít alespoň 8 znaků"
                    }
                  })}
                  error={errors.password?.message}
                />
                <LockKeyhole className="absolute left-3 top-[34px] h-5 w-5 text-neutral-400" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-neutral-600">Zapamatovat si mě</span>
              </label>
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                Zapomenuté heslo?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full py-2.5 text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Přihlašování..." : "Přihlásit se"}
            </Button>
          </form>
        </Paper>

        {/* Footer */}
        <p className="text-center text-sm text-primary-100">
          Nemáte účet?{" "}
          <a href="#" className="font-medium text-white hover:text-primary-200 transition-colors">
            Kontaktujte nás
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;