import type { InputHTMLAttributes, FC } from "react";
import clsx from "classnames";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextField: FC<TextFieldProps> = ({ label, error, className, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <input
        className={clsx(
          "w-full px-4 py-2.5 rounded-lg text-sm",
          "border border-neutral-300",
          "transition-all duration-200",
          "placeholder:text-neutral-500",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
          error
            ? "border-error-500 focus:border-error-500 focus:ring-error-500"
            : "hover:border-neutral-400",
          className
        )}
        {...rest}
      />
      {error && <span className="text-xs text-error-600">{error}</span>}
    </div>
  );
};

export default TextField;