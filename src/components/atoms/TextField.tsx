import type { InputHTMLAttributes, FC } from "react";
import clsx from "classnames";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextField: FC<TextFieldProps> = ({ label, error, className, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-neutral-200">{label}</label>
      )}
      <input
        className={clsx(
          "px-4 py-3 rounded-lg text-sm",
          "bg-neutral-800 text-white border border-neutral-600",
          "transition-all duration-200",
          "placeholder:text-neutral-500",
          "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
          error
            ? "border-error-500 focus:border-error-500 focus:ring-error-500"
            : "hover:border-neutral-500",
          className
        )}
        {...rest}
      />
      {error && <span className="text-xs text-error-400">{error}</span>}
    </div>
  );
};

export default TextField;