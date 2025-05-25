import type { FC, SelectHTMLAttributes } from "react";
import clsx from "classnames";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const Select: FC<SelectProps> = ({ label, error, className, children, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      )}
      <select
        className={clsx(
          "w-full px-4 py-2.5 rounded-lg text-sm",
          "border border-neutral-300",
          "transition-all duration-200",
          "bg-white",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
          error
            ? "border-error-500 focus:border-error-500 focus:ring-error-500"
            : "hover:border-neutral-400",
          className
        )}
        {...rest}
      >
        {children}
      </select>
      {error && <span className="text-xs text-error-600">{error}</span>}
    </div>
  );
};

export default Select;