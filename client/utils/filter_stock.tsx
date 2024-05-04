import { Wool } from "@/interfaces/wool_interface";

export const filterStock = (
  stock: Wool[],
  filters: {
    color: number | null;
    type: number | null;
    thickness: number | null;
  }
) => {
  return stock.filter((wool) => {
    if (filters.color && wool.wool_color_id !== filters.color) {
      return false;
    }
    if (filters.type && wool.wool_type_id !== filters.type) {
      return false;
    }
    if (filters.thickness && wool.wool_thickness_id !== filters.thickness) {
      return false;
    }
    return true;
  });
};
