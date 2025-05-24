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
          // Primary variant - Spotify-like green
          "bg-primary-500 text-white hover:bg-primary-400 active:bg-primary-600 focus:ring-primary-500":
            variant === "primary" && !disabled,
          
          // Secondary variant - Light on dark
          "bg-white/10 text-white hover:bg-white/20 active:bg-white/5 focus:ring-white/30":
            variant === "secondary" && !disabled,
          
          // Tertiary variant - Minimal style
          "text-white hover:text-primary-400 bg-transparent hover:bg-white/5":
            variant === "tertiary" && !disabled,
          
          // Disabled state
          "opacity-50 cursor-not-allowed bg-neutral-700 text-neutral-400": disabled,
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