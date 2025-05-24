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
      {/* Left side - Image/Welcome */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-800 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
          <p className="text-neutral-400 text-lg">
            Sign in to Born Digital application and access our features.
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Sign in</h2>
            <p className="mt-2 text-neutral-600">
              Please enter your credentials to continue
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div className="relative">
                <TextField
                  label="Email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10 bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-500"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email format"
                    }
                  })}
                  error={errors.email?.message}
                />
                <Mail className="absolute left-3 top-[34px] h-5 w-5 text-neutral-400" />
              </div>

              <div className="relative">
                <TextField
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-500"
                  {...register("password", { 
                    required: "Password is required"
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
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-primary-600 hover:text-primary-500">
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary-600 hover:bg-primary-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;