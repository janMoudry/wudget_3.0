import type { FC, ReactNode } from "react";

const ModalFooter: FC<{ children: ReactNode }> = ({ children }) => (
	<div className="flex justify-end items-center gap-2 border-t px-4 py-3">
		{children}
	</div>
);

export default ModalFooter;
