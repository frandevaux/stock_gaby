import { WoolColor } from "@/interfaces/wool_color_interface";
import { WoolForm } from "@/interfaces/wool_form_interface";
import { Wool } from "@/interfaces/wool_interface";
import { WoolThickness } from "@/interfaces/wool_thickness_interface";
import { WoolType } from "@/interfaces/wool_type_interface";
import {
  fetchWoolType,
  fetchWoolThickness,
  fetchWoolColor,
  fetchStock,
} from "@/services/fetchData";
import {
  existsWool,
  createWool,
  updateWool,
  deleteWool,
} from "@/services/wool_services";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  useDisclosure,
} from "@nextui-org/react";
import { on } from "events";
import { useState, useEffect, Key, Dispatch, SetStateAction } from "react";
import { ConfirmationModal } from "./confirmation_modal";

export const WoolModal = (props: {
  isOpen: boolean;
  onOpenChange: () => void;
  wool: Wool | null;
  setStock: Dispatch<SetStateAction<Wool[]>>;
}) => {
  const { isOpen, onOpenChange, wool, setStock } = props;
  const confirmationModal = useDisclosure();
  const [woolType, setWoolType] = useState([]);
  const [woolThickness, setWoolThickness] = useState([]);
  const [woolColor, setWoolColor] = useState([]);

  useEffect(() => {
    const handleSelected = () => {
      wool &&
        setWoolForm({
          wool_type_id: wool.wool_type_id,
          wool_thickness_id: wool.wool_thickness_id,
          wool_color_id: wool.wool_color_id,
          wool_price: wool.wool_price,
          wool_stock: wool.wool_stock,
          wool_ideal_stock: wool.wool_ideal_stock,
        });
    };

    fetchWoolType(setWoolType);
    fetchWoolThickness(setWoolThickness);
    fetchWoolColor(setWoolColor);
    handleSelected();
  }, [wool]);

  useEffect(() => {
    fetchWoolType(setWoolType);
    fetchWoolThickness(setWoolThickness);
    fetchWoolColor(setWoolColor);
  }, []);
  const [woolForm, setWoolForm] = useState<WoolForm>({
    wool_type_id: 0,
    wool_thickness_id: 0,
    wool_color_id: 0,
    wool_price: 0,
    wool_stock: 0,
    wool_ideal_stock: 0,
  });

  const resetForm = () => {
    setWoolForm({
      wool_type_id: 0,
      wool_thickness_id: 0,
      wool_color_id: 0,
      wool_price: 0,
      wool_stock: 0,
      wool_ideal_stock: 0,
    });
  };

  const handleCreate = async () => {
    const data = await existsWool(
      woolForm.wool_color_id,
      woolForm.wool_thickness_id,
      woolForm.wool_type_id
    );
    if (data.rows.length > 0) {
      console.log("Ya existe");
    } else {
      createWool(woolForm);
      resetForm();
    }
  };

  const handleEdit = async () => {
    // Check if the wool has changed
    if (
      wool?.wool_color_id != woolForm.wool_color_id ||
      wool?.wool_thickness_id != woolForm.wool_thickness_id ||
      wool?.wool_type_id != woolForm.wool_type_id
    ) {
      const data = await existsWool(
        woolForm.wool_color_id,
        woolForm.wool_thickness_id,
        woolForm.wool_type_id
      );
      if (data.rows.length > 0) {
        console.log("Ya existe");
      } else {
        if (wool) {
          updateWool(woolForm, wool.wool_id);
        }
        resetForm();
      }
    } else if (wool) {
      console.log(woolForm);
      updateWool(woolForm, wool.wool_id);
      resetForm();
    }
  };

  const handleDelete = async () => {
    if (wool) deleteWool(wool.wool_id);
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
                {wool ? "Editar" : "Agregar"} lana
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  label="Tipo de lana"
                  items={woolType}
                  onSelectionChange={(e: Key) => {
                    setWoolForm({
                      ...woolForm,
                      wool_type_id: Number(e),
                    });
                  }}
                  className="dark text-black"
                  defaultSelectedKey={wool?.wool_type_id.toString()}
                >
                  {(item: WoolType) => (
                    <AutocompleteItem
                      key={item.wool_type_id}
                      className="dark text-black"
                    >
                      {item.wool_type_name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Autocomplete
                  label="Grosor de lana"
                  items={woolThickness}
                  onSelectionChange={(e: Key) => {
                    setWoolForm({
                      ...woolForm,
                      wool_thickness_id: Number(e),
                    });
                  }}
                  className="dark text-black"
                  defaultSelectedKey={wool?.wool_thickness_id.toString()}
                >
                  {(item: WoolThickness) => (
                    <AutocompleteItem
                      key={item.wool_thickness_id}
                      className="dark text-black"
                    >
                      {item.wool_thickness_name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  label="Color de lana"
                  items={woolColor}
                  onSelectionChange={(e: Key) => {
                    setWoolForm({
                      ...woolForm,
                      wool_color_id: Number(e),
                    });
                  }}
                  className="dark text-black"
                  defaultSelectedKey={wool?.wool_color_id.toString()}
                >
                  {(item: WoolColor) => (
                    <AutocompleteItem
                      key={item.wool_color_id}
                      className="dark text-black"
                    >
                      {item.wool_color_name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    label="Precio"
                    placeholder="0.00"
                    value={woolForm.wool_price.toString()}
                    onValueChange={(e) => {
                      setWoolForm({
                        ...woolForm,
                        wool_price: Number(e),
                      });
                    }}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />
                  <Input
                    label="Stock"
                    type="number"
                    value={woolForm.wool_stock.toString()}
                    onValueChange={(e) => {
                      setWoolForm({
                        ...woolForm,
                        wool_stock: Number(e),
                      });
                    }}
                  />
                  <Input
                    label="Stock ideal"
                    type="number"
                    value={woolForm.wool_ideal_stock.toString()}
                    onValueChange={(e) => {
                      setWoolForm({
                        ...woolForm,
                        wool_ideal_stock: Number(e),
                      });
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className={wool ? "justify-between" : "justify-end"}>
                {wool && (
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      confirmationModal.onOpen();
                      /* handleDelete().then(() => {
                        fetchStock(setStock);
                        resetForm();
                        onClose();
                      }); */
                    }}
                  >
                    Eliminar lana
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      resetForm();
                      onClose();
                    }}
                  >
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (wool) {
                        handleEdit().then(() => {
                          fetchStock(setStock);
                          resetForm();
                          onClose();
                        });
                      } else {
                        handleCreate().then(() => {
                          fetchStock(setStock);
                          resetForm();
                          onClose();
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
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onOpenChange={confirmationModal.onOpenChange}
      />
    </>
  );
};
