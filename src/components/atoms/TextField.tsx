import type { InputHTMLAttributes, FC } from "react";
import clsx from "classnames";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const TextField: FC<TextFieldProps> = ({
	label,
	error,
	className,
	...rest
}) => {
	return (
		<div className="flex flex-col space-y-1">
			{label && (
				<label className="text-sm font-medium text-gray-700">
					{label}
				</label>
			)}
			<input
				className={clsx(
					"px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
					error ? "border-red-500" : "border-gray-300",
					className
				)}
				{...rest}
			/>
			{error && <span className="text-xs text-red-500">{error}</span>}
		</div>
	);
};

export default TextField;
