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
        "inline-flex items-center justify-center font-medium rounded-lg",
        "transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        
        // Size variants
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2.5 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
        },
        
        // Style variants
        {
          // Primary
          "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500":
            variant === "primary" && !disabled,
          
          // Secondary
          "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100 focus:ring-neutral-500":
            variant === "secondary" && !disabled,
          
          // Tertiary
          "text-primary-600 hover:text-primary-700 hover:bg-primary-50 bg-transparent":
            variant === "tertiary" && !disabled,
          
          // Disabled state
          "opacity-50 cursor-not-allowed bg-neutral-100 text-neutral-400 border-neutral-200": 
            disabled,
          
          // Full width
          "w-full": fullWidth,
        },
        
        // Shadow effect for primary variant
        {
          "shadow-sm hover:shadow": variant === "primary" && !disabled,
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