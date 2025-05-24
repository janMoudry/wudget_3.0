import type { ButtonHTMLAttributes, FC } from "react";
import clsx from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-semibold rounded-lg",
        "transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "cursor-pointer",
        
        // Size variants
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-3 text-base": size === "md",
          "px-6 py-4 text-lg": size === "lg",
        },
        
        // Style variants
        {
          // Primary
          "bg-primary-500 text-neutral-900 hover:bg-primary-400 active:bg-primary-600 focus:ring-primary-500":
            variant === "primary" && !disabled,
          
          // Secondary
          "bg-neutral-100 text-neutral-900 border border-neutral-300 hover:bg-neutral-200 active:bg-neutral-300 focus:ring-neutral-500":
            variant === "secondary" && !disabled,
          
          // Tertiary
          "text-primary-500 hover:text-primary-400 hover:bg-primary-50 bg-transparent":
            variant === "tertiary" && !disabled,
          
          // Disabled state
          "opacity-50 cursor-not-allowed bg-neutral-200 text-neutral-500 border-neutral-300": 
            disabled,
          
          // Full width
          "w-full": fullWidth,
        },
        
        // Enhanced shadow and scale effect for primary variant
        {
          "shadow-lg hover:shadow-xl active:shadow transform hover:-translate-y-0.5 active:translate-y-0": 
            variant === "primary" && !disabled,
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