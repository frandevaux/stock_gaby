import { Dispatch, SetStateAction } from "react";
import { server_url } from "./url";
import { Wool } from "@/interfaces/wool_interface";

export const fetchWoolType = async (
  setWoolType: Dispatch<SetStateAction<never[]>>
) => {
  try {
    const res = await fetch(server_url + "/wool_type");
    await res.json().then((data) => {
      setWoolType(data);
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchWoolThickness = async (
  setWoolThickness: Dispatch<SetStateAction<never[]>>
) => {
  try {
    const res = await fetch(server_url + "/wool_thickness");
    await res.json().then((data) => {
      setWoolThickness(data);
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchWoolColor = async (
  setWoolColor: Dispatch<SetStateAction<never[]>>
) => {
  try {
    const res = await fetch(server_url + "/wool_color");
    await res.json().then((data) => {
      setWoolColor(data);
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchStock = async (
  setStock: Dispatch<SetStateAction<Wool[]>>
) => {
  try {
    const res = await fetch(server_url + "/wool");
    await res.json().then((data) => {
      console.log(data);
      setStock(data);
    });
  } catch (error) {
    console.error(error);
  }
};
