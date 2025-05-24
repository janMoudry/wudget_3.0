import type { FC, ReactNode } from "react";

const ModalContent: FC<{ children: ReactNode }> = ({ children }) => (
	<div className="px-4 py-3">{children}</div>
);

export default ModalContent;
