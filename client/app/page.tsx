"use client";

import { WoolModal } from "@/components/create_edit_wool_modal";
import { Wool } from "@/interfaces/wool_interface";
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
import { useEffect, useState } from "react";

export default function Home() {
  const [stock, setStock] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingWool, setEditingWool] = useState<Wool | null>(null);

  const fetchStock = async () => {
    try {
      const res = await fetch("http://localhost:3000/wool");
      const data = await res.json();
      setStock(data);

      console.log("fetching stock");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <main className="flex h-screen flex-col items-center justify-center p-24">
      <div className=" w-3/4 flex flex-col gap-6 items-end">
        <Button color="primary" className="w-1/4" onPress={onOpen}>
          Agregar lana
        </Button>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>TIPO</TableColumn>
            <TableColumn>GROSOR</TableColumn>
            <TableColumn>COLOR</TableColumn>
            <TableColumn>PRECIO</TableColumn>
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
                  <Button
                    color="default"
                    onPress={() => {
                      fetchStock();
                      setEditingWool(wool);
                      onOpen();
                    }}
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
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={() => {
          setEditingWool(null);
          onOpenChange();
          fetchStock();
        }}
        wool={editingWool}
      />
    </main>
  );
}
