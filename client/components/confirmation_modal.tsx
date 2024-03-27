import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export const ConfirmationModal = (props: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const { isOpen, onOpenChange } = props;
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      hideCloseButton
      isKeyboardDismissDisabled={true}
      className="dark"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Confirmación</ModalHeader>
            <ModalBody>
              <p>¿Estás seguro de que quieres borrar la lana?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={onClose}>
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
