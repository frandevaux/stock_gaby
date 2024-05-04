"use client";

import { Key, useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { WoolModal } from "@/components/create_edit_wool_modal";
import { Wool } from "@/interfaces/wool_interface";
import {
  fetchStock,
  fetchWoolColor,
  fetchWoolThickness,
  fetchWoolType,
} from "@/services/fetch_data";
import {
  handleColorOrder,
  handlePriceOrder,
  handleThicknessOrder,
  handleTypeOrder,
  orderStockByColorName,
  orderStockByThicknessName,
  orderStockByTypeName,
} from "@/utils/order_stock";
import { WoolDetailsModal } from "@/components/create_wool_details";
import { ModalOptions } from "@/utils/modal_options_enum";
import { toast, ToastContainer } from "react-toastify";
import { WoolThickness } from "@/interfaces/wool_thickness_interface";
import { WoolType } from "@/interfaces/wool_type_interface";
import { WoolColor } from "@/interfaces/wool_color_interface";
import { filterStock } from "@/utils/filter_stock";
import { FaTrashCan } from "react-icons/fa6";
import { DeleteWoolDetailModal } from "@/components/delete_wool_detail_modal";
import { on } from "events";
import { DeleteWoolModal } from "@/components/delete_wool_modal";
import { TestStock } from "@/utils/test_stock";

export default function Home() {
  const [stock, setStock] = useState<Wool[]>([]);
  const [filteredStock, setFilteredStock] = useState<Wool[]>([]);
  const woolModal = useDisclosure();
  const woolDetailsModal = useDisclosure();
  const deleteDetailsModal = useDisclosure();
  const deleteWoolModal = useDisclosure();
  const [editingWool, setEditingWool] = useState<Wool | null>(null);

  useEffect(() => {
    fetchStock(setStock);
  }, []);
  useEffect(() => {
    setFilteredStock(stock);
  }, [stock]);

  const handleEditWool = (wool: Wool) => {
    setEditingWool(wool);
    woolModal.onOpen();
  };

  const [detailModalOption, setDetailModalOption] = useState(
    ModalOptions.WOOL_COLOR
  );

  const [deleteDetailModalOption, setDeleteDetailModalOption] = useState(
    ModalOptions.WOOL_COLOR
  );

  const [woolTypeOrderAsc, setWoolTypeOrderAsc] = useState(true);

  const [woolThicknessOrderAsc, setWoolThicknessOrderAsc] = useState(true);

  const [woolColorOrderAsc, setWoolColorOrderAsc] = useState(true);

  const [woolPriceOrderAsc, setWoolPriceOrderAsc] = useState(true);

  const [woolType, setWoolType] = useState([]);

  const [woolThickness, setWoolThickness] = useState([]);

  const [woolColor, setWoolColor] = useState([]);

  const [isCreatePopoverOpen, setIsCreatePopoverOpen] = useState(false);

  const [isDeletePopoverOpen, setIsDeletePopoverOpen] = useState(false);

  useEffect(() => {
    fetchWoolType(setWoolType);
    fetchWoolThickness(setWoolThickness);
    fetchWoolColor(setWoolColor);
  }, []);

  const [woolFilters, setWoolFilters] = useState<{
    type: number | null;
    thickness: number | null;
    color: number | null;
  }>({
    type: null,
    thickness: null,
    color: null,
  });

  const resetWoolFilters = () => {
    setWoolFilters({
      type: null,
      thickness: null,
      color: null,
    });
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24">
      <div className="w-11/12  flex flex-col gap-6 items-end">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 w-2/3  ">
            <Autocomplete
              label="Tipo de lana"
              defaultItems={woolType}
              className="dark text-black"
              onSelectionChange={(e: Key) => {
                const filterId = e ? Number(e) : null;
                const newFilters = {
                  ...woolFilters,
                  type: filterId,
                };
                setWoolFilters({
                  ...woolFilters,
                  type: filterId,
                });
                console.log(newFilters);

                setFilteredStock(filterStock(stock, newFilters));
              }}
              defaultSelectedKey={
                woolFilters.type ? woolFilters.type : undefined
              }
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
              defaultItems={woolThickness}
              className="dark text-black"
              onSelectionChange={(e: Key) => {
                const filterId = e ? Number(e) : null;
                const newFilters = {
                  ...woolFilters,
                  thickness: filterId,
                };
                setWoolFilters({
                  ...woolFilters,
                  thickness: filterId,
                });
                console.log(newFilters);

                setFilteredStock(filterStock(stock, newFilters));
              }}
              defaultSelectedKey={
                woolFilters.thickness
                  ? woolFilters.thickness.toString()
                  : undefined
              }
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
              defaultItems={woolColor}
              className="dark text-black"
              onSelectionChange={(e: Key) => {
                const filterId = e ? Number(e) : null;
                const newFilters = {
                  ...woolFilters,
                  color: filterId,
                };
                setWoolFilters({
                  ...woolFilters,
                  color: filterId,
                });
                console.log(newFilters);

                setFilteredStock(filterStock(stock, newFilters));
              }}
              defaultSelectedKey={
                woolFilters.color ? woolFilters.color.toString() : undefined
              }
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
          </div>
          <div className="flex gap-2 ">
            <Button color="primary" onPress={woolModal.onOpen}>
              Agregar lana
            </Button>

            <Popover
              placement="right"
              isOpen={isCreatePopoverOpen}
              onOpenChange={(open) => setIsCreatePopoverOpen(open)}
            >
              <PopoverTrigger>
                <Button color="primary">Crear</Button>
              </PopoverTrigger>
              <PopoverContent className="dark flex gap-2">
                <Button
                  className="w-full"
                  onPress={() => {
                    setDetailModalOption(ModalOptions.WOOL_TYPE);
                    woolDetailsModal.onOpen();
                    setIsCreatePopoverOpen(false);
                  }}
                >
                  Crear tipo de lana
                </Button>
                <Button
                  className="w-full"
                  onPress={() => {
                    setDetailModalOption(ModalOptions.WOOL_THICKNESS);
                    woolDetailsModal.onOpen();
                    setIsCreatePopoverOpen(false);
                  }}
                >
                  Crear grosor de lana
                </Button>
                <Button
                  className="w-full"
                  onPress={() => {
                    setDetailModalOption(ModalOptions.WOOL_COLOR);
                    woolDetailsModal.onOpen();
                    setIsCreatePopoverOpen(false);
                  }}
                >
                  Crear color de lana
                </Button>
              </PopoverContent>
            </Popover>
            <Popover
              placement="right"
              isOpen={isDeletePopoverOpen}
              onOpenChange={(open) => setIsDeletePopoverOpen(open)}
            >
              <PopoverTrigger>
                <Button className="bg-red-600" isIconOnly>
                  <FaTrashCan />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="dark flex gap-2">
                <Button
                  className="w-full"
                  onPress={() => {
                    deleteWoolModal.onOpen();
                    setIsDeletePopoverOpen(false);
                  }}
                >
                  Eliminar lana
                </Button>
                <Button
                  className="w-full"
                  onPress={() => {
                    setDeleteDetailModalOption(ModalOptions.WOOL_TYPE);
                    deleteDetailsModal.onOpen();
                    setIsDeletePopoverOpen(false);
                  }}
                >
                  Eliminar tipo de lana
                </Button>
                <Button
                  className="w-full"
                  onPress={() => {
                    setDeleteDetailModalOption(ModalOptions.WOOL_THICKNESS);
                    deleteDetailsModal.onOpen();
                    setIsDeletePopoverOpen(false);
                  }}
                >
                  Eliminar grosor de lana
                </Button>
                <Button
                  className="w-full"
                  onPress={() => {
                    setDeleteDetailModalOption(ModalOptions.WOOL_COLOR);
                    deleteDetailsModal.onOpen();
                    setIsDeletePopoverOpen(false);
                  }}
                >
                  Eliminar color de lana
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Table aria-label="Tabla de lanas">
          <TableHeader>
            <TableColumn className="p-0">
              <Button
                onPress={() => {
                  handleTypeOrder({
                    woolTypeOrderAsc,
                    setWoolTypeOrderAsc,
                    stock: filteredStock,
                    setStock: setFilteredStock,
                  });
                }}
                variant="light"
                className="text-xs text-gray-400 font-bold w-full justify-start pl-3"
              >
                TIPO
              </Button>
            </TableColumn>
            <TableColumn className="p-0">
              <Button
                onPress={() => {
                  handleThicknessOrder({
                    woolThicknessOrderAsc,
                    setWoolThicknessOrderAsc,
                    stock: filteredStock,
                    setStock: setFilteredStock,
                  });
                }}
                variant="light"
                className="text-xs text-gray-400 font-bold w-full justify-start pl-3"
              >
                GROSOR
              </Button>
            </TableColumn>
            <TableColumn className="p-0">
              <Button
                onPress={() => {
                  handleColorOrder({
                    woolColorOrderAsc,
                    setWoolColorOrderAsc,
                    stock: filteredStock,
                    setStock: setFilteredStock,
                  });
                }}
                variant="light"
                className="text-xs text-gray-400 font-bold w-full justify-start pl-3"
              >
                COLOR
              </Button>
            </TableColumn>
            <TableColumn className="p-0">
              <Button
                onPress={() => {
                  handlePriceOrder({
                    woolPriceOrderAsc,
                    setWoolPriceOrderAsc,
                    stock: filteredStock,
                    setStock: setFilteredStock,
                  });
                }}
                variant="light"
                className="text-xs text-gray-400 font-bold w-full justify-start pl-3"
              >
                PRECIO
              </Button>
            </TableColumn>
            <TableColumn>STOCK</TableColumn>
            <TableColumn width="10%">EDITAR</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No hay filas para mostrar"}>
            {filteredStock.map((wool: Wool) => (
              <TableRow
                key={wool.wool_id}
                className={
                  wool.wool_stock <= wool.wool_ideal_stock / 4
                    ? "text-red-400       "
                    : ""
                }
              >
                <TableCell>{wool.wool_type_name}</TableCell>
                <TableCell>{wool.wool_thickness_name}</TableCell>
                <TableCell>{wool.wool_color_name}</TableCell>
                <TableCell className="flex gap-1">
                  <span
                    className={
                      wool.wool_stock <= wool.wool_ideal_stock / 4
                        ? "text-red-500  text-small "
                        : "text-default-400 text-small"
                    }
                  >
                    $
                  </span>
                  {wool.wool_price}
                </TableCell>
                <TableCell>
                  {wool.wool_stock + "/" + wool.wool_ideal_stock}
                </TableCell>
                <TableCell className="gap-3 flex">
                  <Button
                    className={
                      wool.wool_stock <= wool.wool_ideal_stock / 4
                        ? "bg-red-600   "
                        : ""
                    }
                    color="default"
                    onPress={() => handleEditWool(wool)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <WoolModal
        isOpen={woolModal.isOpen}
        onOpenChange={woolModal.onOpenChange}
        wool={editingWool}
        setEditingWool={setEditingWool}
        setStock={setStock}
        setWoolColor={setWoolColor}
        setWoolType={setWoolType}
        setWoolThickness={setWoolThickness}
        woolColor={woolColor}
        woolType={woolType}
        woolThickness={woolThickness}
      />
      <WoolDetailsModal
        isOpen={woolDetailsModal.isOpen}
        onOpenChange={woolDetailsModal.onOpenChange}
        modalOption={detailModalOption}
        setWoolColor={setWoolColor}
        setWoolType={setWoolType}
        setWoolThickness={setWoolThickness}
        woolColor={woolColor}
        woolType={woolType}
        woolThickness={woolThickness}
      />
      <DeleteWoolDetailModal
        isOpen={deleteDetailsModal.isOpen}
        onOpenChange={deleteDetailsModal.onOpenChange}
        modalOption={deleteDetailModalOption}
        setWoolColor={setWoolColor}
        setWoolType={setWoolType}
        setWoolThickness={setWoolThickness}
        woolColor={woolColor}
        woolType={woolType}
        woolThickness={woolThickness}
      />
      <DeleteWoolModal
        isOpen={deleteWoolModal.isOpen}
        onOpenChange={deleteWoolModal.onOpenChange}
        setStock={setStock}
        woolColor={woolColor}
        woolType={woolType}
        woolThickness={woolThickness}
      />
    </main>
  );
}
