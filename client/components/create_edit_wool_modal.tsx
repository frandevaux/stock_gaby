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
} from "@/services/fetch_data";
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

import { useState, useEffect, Key, Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export const WoolModal = (props: {
  isOpen: boolean;
  onOpenChange: () => void;
  wool: Wool | null;
  setEditingWool: Dispatch<SetStateAction<Wool | null>>;
  setStock: Dispatch<SetStateAction<Wool[]>>;
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
    wool,
    setEditingWool,
    setStock,
    setWoolType,
    setWoolThickness,
    setWoolColor,
    woolType,
    woolThickness,
    woolColor,
  } = props;

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

    handleSelected();
  }, [wool]);

  useEffect(() => {
    fetchWoolType(setWoolType);
    fetchWoolThickness(setWoolThickness);
    fetchWoolColor(setWoolColor);
  }, [setWoolColor, setWoolThickness, setWoolType]);

  const [woolForm, setWoolForm] = useState<WoolForm>({
    wool_type_id: null,
    wool_thickness_id: null,
    wool_color_id: null,
    wool_price: null,
    wool_stock: null,
    wool_ideal_stock: null,
  });

  const resetForm = () => {
    setWoolForm({
      wool_type_id: null,
      wool_thickness_id: null,
      wool_color_id: null,
      wool_price: null,
      wool_stock: null,
      wool_ideal_stock: null,
    });
  };

  const handleCreate = async () => {
    return new Promise<boolean>(async (resolve) => {
      const data = await existsWool(
        woolForm.wool_color_id !== null ? woolForm.wool_color_id : 0,
        woolForm.wool_thickness_id !== null ? woolForm.wool_thickness_id : 0,
        woolForm.wool_type_id !== null ? woolForm.wool_type_id : 0
      );
      if (data.rows.length > 0) {
        resolve(false);
      } else {
        createWool(woolForm).then(() => {
          resetForm();
        });
        resolve(true);
      }
    });
  };

  const handleEdit = async () => {
    return new Promise<boolean>(async (resolve) => {
      if (
        wool?.wool_color_id != woolForm.wool_color_id ||
        wool?.wool_thickness_id != woolForm.wool_thickness_id ||
        wool?.wool_type_id != woolForm.wool_type_id
      ) {
        const data = await existsWool(
          woolForm.wool_color_id !== null ? woolForm.wool_color_id : 0,
          woolForm.wool_thickness_id !== null ? woolForm.wool_thickness_id : 0,
          woolForm.wool_type_id !== null ? woolForm.wool_type_id : 0
        );
        if (data.rows.length > 0) {
          resolve(false);
        } else {
          if (wool) {
            resetForm();
            updateWool(woolForm, wool.wool_id).then(() => {
              resolve(true);
            });
          }
        }
      } else if (wool) {
        resetForm();
        updateWool(woolForm, wool.wool_id).then(() => {
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  };

  const handleDelete = async () => {
    return new Promise<boolean>((resolve) => {
      if (wool)
        deleteWool(wool.wool_id).then(() => {
          resolve(true);
        });
      else {
        resolve(false);
      }
    });
  };

  const resetInvalids = () => {
    setIsTypeInvalid(false);
    setIsColorInvalid(false);
    setIsThicknessInvalid(false);
    setIsPriceInvalid(false);
    setIsStockInvalid(false);
    setIsIdealStockInvalid(false);
  };

  const isFormComplete = () => {
    return (
      woolForm.wool_type_id !== null &&
      woolForm.wool_thickness_id !== null &&
      woolForm.wool_color_id !== null &&
      woolForm.wool_price !== null &&
      woolForm.wool_stock !== null &&
      woolForm.wool_ideal_stock !== null
    );
  };

  const [isTypeInvalid, setIsTypeInvalid] = useState(false);
  const [isColorInvalid, setIsColorInvalid] = useState(false);
  const [isThicknessInvalid, setIsThicknessInvalid] = useState(false);
  const [isPriceInvalid, setIsPriceInvalid] = useState(false);
  const [isStockInvalid, setIsStockInvalid] = useState(false);
  const [isIdealStockInvalid, setIsIdealStockInvalid] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        hideCloseButton
        className="py-3"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-stone-800">
                {wool ? "Editar" : "Agregar"} lana
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  label="Tipo de lana"
                  defaultItems={woolType}
                  onSelectionChange={(e: Key) => {
                    setWoolForm({
                      ...woolForm,
                      wool_type_id: Number(e),
                    });
                  }}
                  className="text-black"
                  isInvalid={isTypeInvalid}
                  variant={isTypeInvalid ? "bordered" : undefined}
                  defaultSelectedKey={wool?.wool_type_id.toString()}
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
                    setWoolForm({
                      ...woolForm,
                      wool_thickness_id: Number(e),
                    });
                  }}
                  className="text-black"
                  isInvalid={isThicknessInvalid}
                  variant={isThicknessInvalid ? "bordered" : undefined}
                  defaultSelectedKey={wool?.wool_thickness_id.toString()}
                >
                  {(item: WoolThickness) => (
                    <AutocompleteItem
                      key={item.wool_thickness_id}
                      className="text-black"
                    >
                      {item.wool_thickness_name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  label="Color de lana"
                  defaultItems={woolColor}
                  onSelectionChange={(e: Key) => {
                    setWoolForm({
                      ...woolForm,
                      wool_color_id: Number(e),
                    });
                  }}
                  className="text-black"
                  isInvalid={isColorInvalid}
                  variant={isColorInvalid ? "bordered" : undefined}
                  defaultSelectedKey={wool?.wool_color_id.toString()}
                >
                  {(item: WoolColor) => (
                    <AutocompleteItem
                      key={item.wool_color_id}
                      className=" text-black"
                    >
                      {item.wool_color_name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <div className="flex gap-3 text-stone-800  ">
                  <Input
                    type="number"
                    label="Precio"
                    placeholder="0.00"
                    value={woolForm.wool_price?.toString()}
                    isInvalid={isPriceInvalid}
                    variant={isPriceInvalid ? "bordered" : undefined}
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
                    value={woolForm.wool_stock?.toString()}
                    isInvalid={isStockInvalid}
                    variant={isStockInvalid ? "bordered" : undefined}
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
                    value={woolForm.wool_ideal_stock?.toString()}
                    isInvalid={isIdealStockInvalid}
                    variant={isIdealStockInvalid ? "bordered" : undefined}
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
                      handleDelete().then((data) => {
                        if (data) {
                          fetchStock(setStock).then(() => {
                            toast.success("Lana eliminada con éxito");
                            resetInvalids();
                            resetForm();
                            onClose();
                          });
                        } else {
                          toast.error("No se puede eliminar la lana");
                        }
                      });
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
                      resetInvalids();
                      setEditingWool(null);
                      onClose();
                    }}
                  >
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (woolForm.wool_stock === null) {
                        setIsStockInvalid(true);
                        toast.error("El stock no puede estar vacío");
                      } else {
                        setIsStockInvalid(false);
                      }

                      if (woolForm.wool_ideal_stock === null) {
                        setIsIdealStockInvalid(true);
                        toast.error("El stock ideal no puede estar vacío");
                      } else {
                        setIsIdealStockInvalid(false);
                      }

                      if (woolForm.wool_price === null) {
                        setIsPriceInvalid(true);
                        toast.error("El precio no puede estar vacío");
                      } else {
                        setIsPriceInvalid(false);
                      }

                      if (woolForm.wool_color_id === null) {
                        setIsColorInvalid(true);
                        toast.error("El color no puede estar vacío");
                      } else {
                        setIsColorInvalid(false);
                      }

                      if (woolForm.wool_thickness_id === null) {
                        setIsThicknessInvalid(true);
                        toast.error("El grosor no puede estar vacío");
                      } else {
                        setIsThicknessInvalid(false);
                      }

                      if (woolForm.wool_type_id === null) {
                        setIsTypeInvalid(true);
                        toast.error("El tipo no puede estar vacío");
                      } else {
                        setIsTypeInvalid(false);
                      }
                      if (isFormComplete()) {
                        if (wool) {
                          handleEdit().then((data) => {
                            if (data) {
                              fetchStock(setStock).then(() => {
                                toast.success("Lana editada con éxito");
                                resetForm();
                                setEditingWool(null);
                                resetInvalids();
                                onClose();
                              });
                            } else {
                              setIsTypeInvalid(true);
                              setIsColorInvalid(true);
                              setIsThicknessInvalid(true);
                              toast.error(
                                "La lana ya existe, no se pueden actualizar los datos"
                              );
                            }
                          });
                        } else {
                          handleCreate().then((data) => {
                            if (data) {
                              fetchStock(setStock).then(() => {
                                toast.success("Lana creada con éxito");
                                setEditingWool(null);
                                resetInvalids();
                                resetForm();
                                onClose();
                              });
                            } else {
                              setIsTypeInvalid(true);
                              setIsColorInvalid(true);
                              setIsThicknessInvalid(true);
                              toast.error("La lana ya existe");
                            }
                          });
                        }
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
