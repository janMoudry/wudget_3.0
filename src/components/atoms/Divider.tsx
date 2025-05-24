import type { FC } from "react";
import clsx from "classnames";

interface DividerProps {
	orientation?: "horizontal" | "vertical";
	className?: string;
}

const Divider: FC<DividerProps> = ({
	orientation = "horizontal",
	className,
}) => {
	return (
		<div
			className={clsx(
				"bg-gray-500/30",
				orientation === "horizontal" ? "h-px w-full my-2" : "w-px h-6", // ← výška odpovídá AppBaru
				className
			)}
		/>
	);
};

export default Divider;
