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
import { existsWool, createWool, deleteWool } from "@/services/wool_services";
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
import { Dispatch, Key, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const DeleteWoolModal = (props: {
  isOpen: boolean;
  onOpenChange: () => void;
  setStock: Dispatch<SetStateAction<Wool[]>>;
  woolType: WoolType[];
  woolThickness: WoolThickness[];
  woolColor: WoolColor[];
}) => {
  const { isOpen, onOpenChange, setStock, woolType, woolThickness, woolColor } =
    props;

  const [selectedTypeId, setSelectedTypeId] = useState<number>(0);
  const [selectedThicknessId, setSelectedThicknessId] = useState<number>(0);
  const [selectedColorId, setSelectedColorId] = useState<number>(0);

  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleDelete = async () => {
    return new Promise<number>(async (resolve) => {
      const data = await existsWool(
        selectedColorId,
        selectedThicknessId,
        selectedTypeId
      );
      if (data.rows.length > 0) {
        const woolId = data.rows[0].wool_id;
        await deleteWool(woolId).then((response) => {
          resolve(response || 0);
        });
      } else {
        resolve(404);
      }
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-stone-800">
                Eliminar lana
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  label="Tipo de lana"
                  defaultItems={woolType}
                  onSelectionChange={(e: Key) => {
                    setSelectedTypeId(Number(e));
                  }}
                  className="text-black"
                  isInvalid={isInvalid}
                  variant={isInvalid ? "bordered" : undefined}
                >
                  {(item: WoolType) => (
                    <AutocompleteItem
                      key={item.wool_type_id}
                      className="text-black"
                    >
                      {item.wool_type_name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Autocomplete
                  label="Grosor de lana"
                  defaultItems={woolThickness}
                  onSelectionChange={(e: Key) => {
                    setSelectedThicknessId(Number(e));
                  }}
                  className=" text-black"
                  isInvalid={isInvalid}
                  variant={isInvalid ? "bordered" : undefined}
                >
                  {(item: WoolThickness) => (
                    <AutocompleteItem
                      key={item.wool_thickness_id}
                      className=" text-black"
                    >
                      {item.wool_thickness_name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  label="Color de lana"
                  defaultItems={woolColor}
                  onSelectionChange={(e: Key) => {
                    setSelectedColorId(Number(e));
                  }}
                  className="text-black"
                  isInvalid={isInvalid}
                  variant={isInvalid ? "bordered" : undefined}
                >
                  {(item: WoolColor) => (
                    <AutocompleteItem
                      key={item.wool_color_id}
                      className="text-black"
                    >
                      {item.wool_color_name}
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
                        if (response === 200) {
                          toast.success("Eliminado con éxito");
                          fetchStock(setStock);
                          onClose();
                        } else if (response === 404) {
                          setIsInvalid(true);
                          toast.error("No existe la lana");
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
