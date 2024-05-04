import { WoolColor } from "@/interfaces/wool_color_interface";
import { WoolThickness } from "@/interfaces/wool_thickness_interface";
import { WoolType } from "@/interfaces/wool_type_interface";
import {
  fetchWoolColor,
  fetchWoolThickness,
  fetchWoolType,
} from "@/services/fetch_data";
import {
  createWoolColor,
  existsWoolColor,
} from "@/services/wool_color_services";
import {
  existsWool,
  createWool,
  updateWool,
  deleteWool,
} from "@/services/wool_services";
import {
  createWoolThickness,
  existsWoolThickness,
} from "@/services/wool_thickness_services";
import { createWoolType, existsWoolType } from "@/services/wool_type_services";
import { ModalOptions } from "@/utils/modal_options_enum";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  modal,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

export const WoolDetailsModal = (props: {
  isOpen: boolean;
  onOpenChange: () => void;
  modalOption: ModalOptions;
  setWoolType: Dispatch<SetStateAction<never[]>>;
  setWoolThickness: Dispatch<SetStateAction<never[]>>;
  setWoolColor: Dispatch<SetStateAction<never[]>>;
  woolType: WoolType[];
  woolThickness: WoolThickness[];
  woolColor: WoolColor[];
}) => {
  const {
    isOpen,
    onOpenChange,
    modalOption,
    setWoolType,
    setWoolThickness,
    setWoolColor,
    woolType,
    woolThickness,
    woolColor,
  } = props;

  const existsWoolDetail = async () => {
    if (modalOption == ModalOptions.WOOL_COLOR) {
      return new Promise<boolean>((resolve) => {
        existsWoolColor(woolInput).then((data) => {
          if (data.rowCount === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    } else if (modalOption == ModalOptions.WOOL_THICKNESS) {
      return new Promise<boolean>((resolve) => {
        existsWoolThickness(woolInput).then((data) => {
          if (data.rowCount === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    } else if (modalOption == ModalOptions.WOOL_TYPE) {
      return new Promise<boolean>((resolve) => {
        existsWoolType(woolInput).then((data) => {
          if (data.rowCount === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    }
  };
  const handleCreate = async () => {
    return new Promise<boolean>(async (resolve) => {
      if (modalOption == ModalOptions.WOOL_COLOR) {
        await existsWoolDetail().then((data) => {
          console.log(data);
          if (!data) {
            createWoolColor(woolInput).then(() => {
              resolve(true);
            });
          } else {
            resolve(false);
          }
        });
      } else if (modalOption == ModalOptions.WOOL_THICKNESS) {
        await existsWoolDetail().then((data) => {
          if (!data) {
            createWoolThickness(woolInput).then((data) => {
              resolve(true);
            });
          } else {
            resolve(false);
          }
        });
      } else if (modalOption == ModalOptions.WOOL_TYPE) {
        console.log("Creating wool type");
        await existsWoolDetail().then((data) => {
          console.log(data);
          if (!data) {
            createWoolType(woolInput).then((data) => {
              resolve(true);
            });
          } else {
            resolve(false);
          }
        });
      }
    });
  };

  const [isInvalid, setIsInvalid] = useState(false);

  const [woolInput, setWoolInput] = useState("");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className=" dark "
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalOption === ModalOptions.WOOL_TYPE
                  ? "Crear tipo de lana"
                  : modalOption === ModalOptions.WOOL_THICKNESS
                  ? "Crear grosor de lana"
                  : "Crear color de lana"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label={
                    modalOption === ModalOptions.WOOL_TYPE
                      ? "Nombre de tipo de lana"
                      : modalOption === ModalOptions.WOOL_THICKNESS
                      ? "Nombre de grosor de lana"
                      : "Nombre de color de lana"
                  }
                  value={woolInput}
                  onValueChange={(value) => {
                    setWoolInput(value);
                  }}
                  variant={isInvalid ? "bordered" : "flat"}
                  isInvalid={isInvalid}
                />
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-2">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      setWoolInput("");
                      setIsInvalid(false);
                      onClose();
                    }}
                  >
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (woolInput.trim() === "") {
                        setIsInvalid(true);
                        toast.error("El campo no puede estar vacío");
                      } else {
                        handleCreate().then((data) => {
                          const successMessage =
                            modalOption === ModalOptions.WOOL_TYPE
                              ? "Tipo de lana creado con éxito"
                              : modalOption === ModalOptions.WOOL_THICKNESS
                              ? "Grosor de lana creado con éxito"
                              : "Color de lana creado con éxito";
                          const errorMessage =
                            modalOption === ModalOptions.WOOL_TYPE
                              ? "Ya existe un tipo de lana con ese nombre"
                              : modalOption === ModalOptions.WOOL_THICKNESS
                              ? "Ya existe un grosor de lana con ese nombre"
                              : "Ya existe un color de lana con ese nombre";
                          if (data) {
                            toast.success(successMessage);
                            setIsInvalid(false);
                            setWoolInput("");
                            modalOption === ModalOptions.WOOL_TYPE
                              ? fetchWoolType(setWoolType)
                              : modalOption === ModalOptions.WOOL_THICKNESS
                              ? fetchWoolThickness(setWoolThickness)
                              : fetchWoolColor(setWoolColor);
                            onClose();
                          } else {
                            toast.error(errorMessage);
                            setIsInvalid(true);
                          }
                        });
                      }
                    }}
                  >
                    Confirmar
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
