// src/components/atoms/MenuItem.tsx
import type { FC, HTMLAttributes } from "react";
import clsx from "classnames";

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={clsx(
        "px-4 py-2.5 text-sm text-gray-700 cursor-pointer select-none",
        "hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150",
        "first:rounded-t-lg last:rounded-b-lg",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default MenuItem;
