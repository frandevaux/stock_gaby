import { WoolColor } from "@/interfaces/wool_color_interface";
import { Wool } from "@/interfaces/wool_interface";
import { WoolThickness } from "@/interfaces/wool_thickness_interface";
import { WoolType } from "@/interfaces/wool_type_interface";
import {
  fetchStock,
  fetchWoolColor,
  fetchWoolThickness,
  fetchWoolType,
} from "@/services/fetch_data";
import { deleteWoolColor } from "@/services/wool_color_services";
import { deleteWoolThickness } from "@/services/wool_thickness_services";
import { deleteWoolType } from "@/services/wool_type_services";
import { ModalOptions } from "@/utils/modal_options_enum";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const DeleteWoolDetailModal = (props: {
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

  const [selectedTypeId, setSelectedTypeId] = useState<number>(0);
  const [selectedThicknessId, setSelectedThicknessId] = useState<number>(0);
  const [selectedColorId, setSelectedColorId] = useState<number>(0);

  const fetchDetails = () => {
    console.log("fetching details");
    if (modalOption === ModalOptions.WOOL_THICKNESS) {
      fetchWoolThickness(setWoolThickness);
    } else if (modalOption === ModalOptions.WOOL_TYPE) {
      fetchWoolType(setWoolType);
    } else if (modalOption === ModalOptions.WOOL_COLOR) {
      fetchWoolColor(setWoolColor);
    }
  };

  const handleDelete = async () => {
    return new Promise<number>((resolve) => {
      if (modalOption === ModalOptions.WOOL_THICKNESS) {
        deleteWoolThickness(selectedThicknessId).then((response) => {
          resolve(response || 0);
        });
      } else if (modalOption === ModalOptions.WOOL_TYPE) {
        deleteWoolType(selectedTypeId).then((response) => {
          resolve(response || 0);
        });
      } else if (modalOption === ModalOptions.WOOL_COLOR) {
        deleteWoolColor(selectedColorId).then((response) => {
          // Fijarse que retornar en caso de que no exista data
          resolve(response || 0);
        });
      } else {
        resolve(0);
      }
    });
  };

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
                  ? "Eliminar tipo de lana"
                  : modalOption === ModalOptions.WOOL_THICKNESS
                  ? "Eliminar grosor de lana"
                  : "Eliminar color de lana"}
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  label={
                    modalOption === ModalOptions.WOOL_TYPE
                      ? "Tipo de lana"
                      : modalOption === ModalOptions.WOOL_THICKNESS
                      ? "Grosor de lana"
                      : "Color de lana"
                  }
                  defaultItems={
                    modalOption === ModalOptions.WOOL_TYPE
                      ? woolType
                      : modalOption === ModalOptions.WOOL_THICKNESS
                      ? woolThickness
                      : woolColor
                  }
                  className="dark text-black"
                  onSelectionChange={(e) => {
                    if (modalOption === ModalOptions.WOOL_TYPE) {
                      setSelectedTypeId(Number(e));
                    } else if (modalOption === ModalOptions.WOOL_THICKNESS) {
                      setSelectedThicknessId(Number(e));
                    } else {
                      setSelectedColorId(Number(e));
                    }
                  }}
                >
                  {(item: WoolType | WoolThickness | WoolColor) => (
                    <AutocompleteItem
                      key={
                        modalOption === ModalOptions.WOOL_TYPE
                          ? (item as WoolType).wool_type_id
                          : modalOption === ModalOptions.WOOL_THICKNESS
                          ? (item as WoolThickness).wool_thickness_id
                          : (item as WoolColor).wool_color_id
                      }
                      className="dark text-black"
                    >
                      {modalOption === ModalOptions.WOOL_TYPE
                        ? (item as WoolType).wool_type_name
                        : modalOption === ModalOptions.WOOL_THICKNESS
                        ? (item as WoolThickness).wool_thickness_name
                        : (item as WoolColor).wool_color_name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-2">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleDelete().then((response) => {
                        if (response == 200) {
                          modalOption === ModalOptions.WOOL_TYPE
                            ? fetchWoolType(setWoolType)
                            : modalOption === ModalOptions.WOOL_THICKNESS
                            ? fetchWoolThickness(setWoolThickness)
                            : fetchWoolColor(setWoolColor);
                          toast.success("Eliminado con éxito");
                          fetchDetails();
                          onClose();
                        } else if (response == 409) {
                          toast.error(
                            "Error al eliminar. Hay lanas asociadas con esa característica"
                          );
                        } else {
                          toast.error("Error al eliminar");
                        }
                      });
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
