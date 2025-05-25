```typescript
import type { FC } from "react";
import { Button, ModalContent, ModalFooter, ModalHeader } from "../atoms";
import { Modal } from "../molecules";
import type { GeneralModalProps } from "../../types/Modal";
import type { Account } from "../../api/getClient";

interface DeleteAccountModalProps extends GeneralModalProps {
  account: Account;
  onConfirm: () => void;
}

const DeleteAccountModal: FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  account,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="Smazat účet" onClose={onClose} />
      <ModalContent>
        <p className="text-gray-700 mb-4">
          Opravdu chcete smazat účet <strong>{account.name}</strong>?
        </p>
        <p className="text-sm text-gray-500">
          Tato akce je nevratná a všechna data spojená s tímto účtem budou ztracena.
        </p>
      </ModalContent>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Zrušit
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Smazat účet
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteAccountModal;
```