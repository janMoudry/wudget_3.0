import { useState, type JSX } from "react";
import { ModalContext } from "../contexts/ModalContext";
import type { ModalContextType, ModalPropsMap } from "../types/Modal";
import { modals } from "../types/modals";

interface ModalProviderProps {
	children: React.ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [modal, setModal] = useState<JSX.Element | null>(null);

	const handleOpen: ModalContextType["open"] = (modal, props) => {
		const selectedModal = modals[modal];

		if (!selectedModal) {
			throw new Error(`Modal ${modal} not found`);
		}

		selectedModal().then((module) => {
			const ModalComponent = module.default;
			if (ModalComponent) {
				setModal(
					<ModalComponent
						{...(props as unknown as ModalPropsMap[typeof modal])}
					/>
				);
			} else {
				throw new Error(`Modal ${modal} not found`);
			}
		});
	};

	const handleClose: ModalContextType["close"] = () => {
		console.log("Close modal");
	};

	return (
		<ModalContext.Provider
			value={{
				open: handleOpen,
				close: handleClose,
			}}
		>
			{modal}
			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
