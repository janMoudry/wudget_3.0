// src/components/molecules/Menu.tsx
import type { FC, ReactNode } from "react";

interface MenuProps {
  children: ReactNode;
}

const Menu: FC<MenuProps> = ({ children }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 animate-fade-in">
      {children}
    </div>
  );
};

export default Menu;
