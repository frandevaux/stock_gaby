import { Wool } from "@/interfaces/wool_interface";
import { TableRow, TableCell, Button, TableBody } from "@nextui-org/react";

export const TableRows = (props: {
  stock: Wool[];
  handleEditWool: (wool: Wool) => void;
}) => {
  const { stock, handleEditWool } = props;
  return stock.map((wool) => (
    <TableRow
      key={wool.wool_id}
      className={
        wool.wool_stock <= wool.wool_ideal_stock / 4
          ? "text-red-400       "
          : "text-black"
      }
    >
      <TableCell className="text-black ">{wool.wool_type_name}</TableCell>
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
      <TableCell>{wool.wool_stock + "/" + wool.wool_ideal_stock}</TableCell>
      <TableCell className="gap-3 flex">
        <Button
          className={
            wool.wool_stock <= wool.wool_ideal_stock / 4 ? "bg-red-600   " : ""
          }
          color="default"
          onPress={() => handleEditWool(wool)}
        >
          Editar
        </Button>
      </TableCell>
    </TableRow>
  ));
};
