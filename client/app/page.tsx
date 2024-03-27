"use client";

import { useEffect, useState } from "react";
import {
  Button,
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
import { fetchStock } from "@/services/fetchData";
import {
  handleColorOrder,
  handlePriceOrder,
  handleThicknessOrder,
  handleTypeOrder,
  orderStockByColorName,
  orderStockByThicknessName,
  orderStockByTypeName,
} from "@/utils/orderStock";

export default function Home() {
  const [stock, setStock] = useState<Wool[]>([]);
  const woolModal = useDisclosure();
  const [editingWool, setEditingWool] = useState<Wool | null>(null);

  useEffect(() => {
    fetchStock(setStock);
  }, []);

  const handleEditWool = (wool: Wool) => {
    fetchStock(setStock).then(() => {
      setEditingWool(wool);
      woolModal.onOpen();
    });
  };

  const handleModalClose = () => {
    fetchStock(setStock).then(() => {
      setEditingWool(null);
      woolModal.onOpenChange();
    });
  };

  const [woolTypeOrderAsc, setWoolTypeOrderAsc] = useState(true);

  const [woolThicknessOrderAsc, setWoolThicknessOrderAsc] = useState(true);

  const [woolColorOrderAsc, setWoolColorOrderAsc] = useState(true);

  const [woolPriceOrderAsc, setWoolPriceOrderAsc] = useState(true);

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24">
      <div className="w-3/4 flex flex-col gap-6 items-end">
        <Button color="primary" className="w-1/4" onPress={woolModal.onOpen}>
          Agregar lana
        </Button>
        <Table aria-label="Tabla de lanas">
          <TableHeader>
            <TableColumn className="p-0">
              <Button
                onPress={() => {
                  handleTypeOrder({
                    woolTypeOrderAsc,
                    setWoolTypeOrderAsc,
                    stock,
                    setStock,
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
                    stock,
                    setStock,
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
                    stock,
                    setStock,
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
                    stock,
                    setStock,
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
          <TableBody emptyContent={"No rows to display."}>
            {stock.map((wool: Wool) => (
              <TableRow key={wool.wool_id}>
                <TableCell>{wool.wool_type_name}</TableCell>
                <TableCell>{wool.wool_thickness_name}</TableCell>
                <TableCell>{wool.wool_color_name}</TableCell>
                <TableCell className="flex gap-1">
                  <span className="text-default-400 text-small">$</span>
                  {wool.wool_price}
                </TableCell>
                <TableCell>
                  {wool.wool_stock + "/" + wool.wool_ideal_stock}
                </TableCell>
                <TableCell className="gap-3 flex">
                  <Button color="default" onPress={() => handleEditWool(wool)}>
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
        onOpenChange={handleModalClose}
        wool={editingWool}
        setStock={setStock}
      />
    </main>
  );
}
