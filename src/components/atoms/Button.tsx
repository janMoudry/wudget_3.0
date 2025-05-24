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
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center px-4 py-2 cursor-pointer text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm":
            variant === "primary",
          "bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 focus:ring-primary-500 shadow-sm":
            variant === "secondary",
          "text-primary-600 hover:text-primary-700 hover:bg-primary-50 bg-transparent":
            variant === "tertiary",
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;