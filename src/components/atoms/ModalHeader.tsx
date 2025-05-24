import type { FC } from "react";
import { X } from "lucide-react";

interface ModalHeaderProps {
	title: string;
	onClose: () => void;
}

const ModalHeader: FC<ModalHeaderProps> = ({ title, onClose }) => (
	<div className="flex justify-between items-center border-b px-4 py-3">
		<h2 className="text-lg font-semibold">{title}</h2>
		<button onClick={onClose} className="text-gray-500 hover:text-black">
			<X size={18} />
		</button>
	</div>
);

export default ModalHeader;
