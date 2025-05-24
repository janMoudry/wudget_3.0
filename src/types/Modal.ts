import type { ClientSummary } from "../api/getClients";
import type { MODALS } from "./modals";

export type GeneralModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export type ModalContextType = {
	open: <T extends GeneralModalProps>(modal: MODALS, props: T) => void;
	close: () => void;
};

export type ModalPropsMap = {
	[MODALS.CLIENT_INFO]: GeneralModalProps & { client: ClientSummary };
};
