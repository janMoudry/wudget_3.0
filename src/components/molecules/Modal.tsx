import type { FC, ReactNode, MouseEvent } from "react";
import clsx from "classnames";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
		// zavřeme pouze při kliknutí na backdrop (ne na obsah)
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
			onClick={handleBackdropClick}
		>
			<div
				className={clsx(
					"bg-white rounded-lg shadow-lg w-full max-w-lg",
					"animate-fade-in"
				)}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
