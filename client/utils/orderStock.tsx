import { Wool } from "@/interfaces/wool_interface";
import { Dispatch, SetStateAction } from "react";

export const orderStockByThicknessName = (stock: Wool[]) => {
  return stock.sort((a, b) => {
    if (a.wool_thickness_name < b.wool_thickness_name) return -1;
    if (a.wool_thickness_name > b.wool_thickness_name) return 1;
    return 0;
  });
};

export const orderStockByTypeName = (stock: Wool[]) => {
  return stock.sort((a, b) => {
    if (a.wool_type_name < b.wool_type_name) return -1;
    if (a.wool_type_name > b.wool_type_name) return 1;
    return 0;
  });
};

export const orderStockByColorName = (stock: Wool[]) => {
  return stock.sort((a, b) => {
    if (a.wool_color_name < b.wool_color_name) return -1;
    if (a.wool_color_name > b.wool_color_name) return 1;
    return 0;
  });
};

export const orderStockByPrice = (stock: Wool[]) => {
  return stock.sort((a, b) => {
    return a.wool_price - b.wool_price;
  });
};

export const handleColorOrder = (props: {
  woolColorOrderAsc: boolean;
  setWoolColorOrderAsc: Dispatch<SetStateAction<boolean>>;
  stock: Wool[];
  setStock: Dispatch<SetStateAction<Wool[]>>;
}) => {
  const { woolColorOrderAsc, setWoolColorOrderAsc, stock, setStock } = props;
  if (woolColorOrderAsc) {
    setStock(orderStockByColorName(stock).slice());
  } else {
    setStock(orderStockByColorName(stock).reverse());
  }
  setWoolColorOrderAsc(!woolColorOrderAsc);
};

export const handleThicknessOrder = (props: {
  woolThicknessOrderAsc: boolean;
  setWoolThicknessOrderAsc: Dispatch<SetStateAction<boolean>>;
  stock: Wool[];
  setStock: Dispatch<SetStateAction<Wool[]>>;
}) => {
  const { woolThicknessOrderAsc, setWoolThicknessOrderAsc, stock, setStock } =
    props;
  if (woolThicknessOrderAsc) {
    setStock(orderStockByThicknessName(stock).slice());
  } else {
    setStock(orderStockByThicknessName(stock).reverse());
  }
  setWoolThicknessOrderAsc(!woolThicknessOrderAsc);
};

export const handleTypeOrder = (props: {
  woolTypeOrderAsc: boolean;
  setWoolTypeOrderAsc: Dispatch<SetStateAction<boolean>>;
  stock: Wool[];
  setStock: Dispatch<SetStateAction<Wool[]>>;
}) => {
  const { woolTypeOrderAsc, setWoolTypeOrderAsc, stock, setStock } = props;
  if (woolTypeOrderAsc) {
    setStock(orderStockByTypeName(stock).slice());
  } else {
    setStock(orderStockByTypeName(stock).reverse());
  }
  setWoolTypeOrderAsc(!woolTypeOrderAsc);
};

export const handlePriceOrder = (props: {
  woolPriceOrderAsc: boolean;
  setWoolPriceOrderAsc: Dispatch<SetStateAction<boolean>>;
  stock: Wool[];
  setStock: Dispatch<SetStateAction<Wool[]>>;
}) => {
  const { woolPriceOrderAsc, setWoolPriceOrderAsc, stock, setStock } = props;
  if (woolPriceOrderAsc) {
    setStock(orderStockByPrice(stock).slice());
  } else {
    setStock(orderStockByPrice(stock).reverse());
  }
  setWoolPriceOrderAsc(!woolPriceOrderAsc);
};
