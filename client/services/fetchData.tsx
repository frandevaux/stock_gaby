import { WoolForm } from "@/interfaces/wool_form_interface";
import { Dispatch, SetStateAction } from "react";

export const fetchWoolType = async (
  setWoolType: Dispatch<SetStateAction<never[]>>
) => {
  try {
    const res = await fetch("http://localhost:3000/wool_type");
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
    const res = await fetch("http://localhost:3000/wool_thickness");
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
    const res = await fetch("http://localhost:3000/wool_color");
    const data = await res.json();
    setWoolColor(data);
  } catch (error) {
    console.error(error);
  }
};
