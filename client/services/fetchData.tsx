import { Dispatch, SetStateAction } from "react";
import { server_url } from "./url";
import { Wool } from "@/interfaces/wool_interface";

export const fetchWoolType = async (
  setWoolType: Dispatch<SetStateAction<never[]>>
) => {
  try {
    const res = await fetch(server_url + "/wool_type");
    const data = await res.json();
    setWoolType(data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchWoolThickness = async (
  setWoolThickness: Dispatch<SetStateAction<never[]>>
) => {
  try {
    const res = await fetch(server_url + "/wool_thickness");
    const data = await res.json();
    setWoolThickness(data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchWoolColor = async (
  setWoolColor: Dispatch<SetStateAction<never[]>>
) => {
  try {
    const res = await fetch(server_url + "/wool_color");
    const data = await res.json();
    setWoolColor(data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchStock = async (
  setStock: Dispatch<SetStateAction<Wool[]>>
) => {
  try {
    const res = await fetch(server_url + "/wool");
    const data = await res.json();
    setStock(data);
    // return true after fetching data
    return true;
  } catch (error) {
    console.error(error);
  }
};
