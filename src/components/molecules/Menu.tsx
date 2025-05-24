import type { FC, ReactNode } from "react";

interface MenuProps {
	children: ReactNode;
}

const Menu: FC<MenuProps> = ({ children }) => {
	return (
		<div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
			{children}
		</div>
	);
};

export default Menu;
