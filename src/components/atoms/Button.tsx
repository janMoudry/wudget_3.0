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
				"inline-flex items-center justify-center px-4 py-2 cursor-pointer text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
				{
					"bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
						variant === "primary",
					"bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300":
						variant === "secondary",
					"text-blue-600 hover:underline bg-transparent":
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
