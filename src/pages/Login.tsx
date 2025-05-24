import { Button, TextField, Typography } from "@components";
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
    <div className="min-h-screen flex">
      {/* Left side - Promo */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-800 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Wudget</h1>
          <p className="text-2xl font-medium mb-4 text-primary-400">
            Správce osobních financí pro všechny
          </p>
          <div className="space-y-4 text-neutral-400">
            <p>
              Wudget je moderní nástroj pro správu osobních i firemních financí, který vám pomůže mít přehled o všech vašich příjmech a výdajích.
            </p>
            <p>
              Ať už jste finanční poradce nebo běžný uživatel, Wudget vám nabízí:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Automatické kategorizace transakcí</li>
              <li>Přehledné reporty a analýzy</li>
              <li>Napojení na všechny české banky</li>
              <li>Bezpečné šifrování dat</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Přihlášení</h2>
            <p className="mt-2 text-neutral-600">
              Zadejte své přihlašovací údaje pro pokračování
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div className="relative">
                <TextField
                  label="Email"
                  type="email"
                  placeholder="vas@email.cz"
                  className="pl-10 bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-500"
                  {...register("email", { 
                    required: "Email je povinný",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Neplatný formát emailu"
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
                  className="pl-10 bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-500"
                  {...register("password", { 
                    required: "Heslo je povinné"
                  })}
                  error={errors.password?.message}
                />
                <LockKeyhole className="absolute left-3 top-[34px] h-5 w-5 text-neutral-400" />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
              />
              <label className="ml-2 text-sm text-neutral-600">
                Zapamatovat si mě
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Přihlašování..." : "Přihlásit se"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;