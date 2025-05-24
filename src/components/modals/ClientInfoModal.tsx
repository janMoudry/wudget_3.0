import type { FC } from "react";
import type { ClientSummary } from "../../api/getClients";

import { Button, ModalContent, ModalFooter, ModalHeader } from "../atoms";
import { Modal } from "../molecules";
import type { GeneralModalProps } from "../../types/Modal";

interface ClientInfoModalProps extends GeneralModalProps {
	client: ClientSummary;
}

const ClientInfoModal: FC<ClientInfoModalProps> = ({
	isOpen,
	onClose,
	client,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalHeader title={client.name} onClose={onClose} />
			<ModalContent>
				<p className="text-sm text-gray-700">
					Stav:{" "}
					<span className="font-medium">
						{client.status === "ok"
							? "V pořádku"
							: client.status === "missing-data"
							? "Chybí data"
							: "Neaktivní"}
					</span>
				</p>
				<p className="text-sm text-gray-500 mt-1">
					Naposledy upraveno:{" "}
					{new Date(client.lastUpdatedAt).toLocaleDateString("cs-CZ")}
				</p>
			</ModalContent>
			<ModalFooter>
				<Button onClick={onClose}>Zavřít</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ClientInfoModal;
