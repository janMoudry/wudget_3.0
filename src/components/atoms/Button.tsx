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
        "inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          // Primary variant
          "bg-primary-600 text-white hover:bg-primary-500 active:bg-primary-700 focus:ring-primary-500":
            variant === "primary" && !disabled,
          
          // Secondary variant
          "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 focus:ring-neutral-500":
            variant === "secondary" && !disabled,
          
          // Tertiary variant
          "text-primary-600 hover:text-primary-500 hover:bg-primary-50 bg-transparent":
            variant === "tertiary" && !disabled,
          
          // Disabled state
          "opacity-50 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200": disabled,
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