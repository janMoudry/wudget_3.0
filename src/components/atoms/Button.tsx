import type { ButtonHTMLAttributes, FC } from "react";
import clsx from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "bg-primary-500 text-black hover:bg-primary-400 hover:scale-105 focus:ring-primary-500":
            variant === "primary" && !disabled,
          "bg-white/10 text-white hover:bg-white/20 hover:scale-105 focus:ring-white":
            variant === "secondary" && !disabled,
          "text-white hover:text-primary-400 bg-transparent hover:scale-105":
            variant === "tertiary" && !disabled,
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;