import { Button, TextField, Typography } from "@components";
import { useCallback } from "react";
import { useAuth } from "@hooks";
import { useForm } from "react-hook-form";
import { Mail, LockKeyhole, ArrowRight } from "lucide-react";

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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(100,100,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(100,255,100,0.05),transparent_70%)]" />
        <div className="relative max-w-md">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Wudget
            </h1>
            <p className="text-2xl font-medium mb-4 text-primary-400">
              Správce osobních financí pro všechny
            </p>
          </div>
          <div className="space-y-8">
            <div className="space-y-6 text-neutral-400">
              <p className="leading-relaxed">
                Wudget je moderní nástroj pro správu osobních i firemních financí, který vám pomůže mít přehled o všech vašich příjmech a výdajích.
              </p>
              <p className="leading-relaxed">
                Ať už jste finanční poradce nebo běžný uživatel, Wudget vám nabízí:
              </p>
            </div>
            <ul className="space-y-4">
              {[
                "Automatické kategorizace transakcí",
                "Přehledné reporty a analýzy",
                "Napojení na všechny české banky",
                "Bezpečné šifrování dat",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-neutral-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              Vítejte zpět
            </h2>
            <p className="text-neutral-600">
              Zadejte své přihlašovací údaje pro pokračování
            </p>
          </div>

          <form 
            className="space-y-6" 
            onSubmit={handleSubmit(onSubmit)}
          >
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                />
                <label className="ml-2 text-sm text-neutral-600">
                  Zapamatovat si mě
                </label>
              </div>
              <button 
                type="button"
                className="text-sm text-primary-600 hover:text-primary-500 font-medium"
              >
                Zapomenuté heslo?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full group"
              size="lg"
              disabled={isSubmitting}
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? "Přihlašování..." : "Přihlásit se"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>

            <p className="text-center text-sm text-neutral-600">
              Nemáte ještě účet?{" "}
              <button className="font-medium text-primary-600 hover:text-primary-500">
                Zaregistrujte se
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;