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
        "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900",
        {
          "bg-primary-500 text-neutral-900 hover:bg-primary-400 active:bg-primary-600 focus:ring-primary-500":
            variant === "primary" && !disabled,
          "bg-neutral-700 text-white hover:bg-neutral-600 active:bg-neutral-800 focus:ring-neutral-400":
            variant === "secondary" && !disabled,
          "text-primary-400 hover:text-primary-300 bg-transparent":
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