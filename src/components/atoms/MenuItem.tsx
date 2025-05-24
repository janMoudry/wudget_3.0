import type { FC, HTMLAttributes } from "react";
import clsx from "classnames";

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={clsx(
        "px-4 py-2 text-sm text-neutral-700 cursor-pointer select-none",
        "hover:bg-neutral-50 transition-colors duration-150 ease-in-out",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default MenuItem;