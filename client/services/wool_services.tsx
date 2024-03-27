import { WoolForm } from "@/interfaces/wool_form_interface";
import { Wool } from "@/interfaces/wool_interface";

export const existsWool = async (
  wool_color_id: number,
  wool_thickness_id: number,
  wool_type_id: number
) => {
  try {
    const res = await fetch(
      "http://localhost:3000/wool_verify?wool_color_id=" +
        wool_color_id +
        "&wool_thickness_id=" +
        wool_thickness_id +
        "&wool_type_id=" +
        wool_type_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createWool = async (woolForm: any) => {
  try {
    const res = await fetch("http://localhost:3000/wool", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(woolForm),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateWool = async (wool: WoolForm, wool_id: number) => {
  const url = "http://localhost:3000/wool/" + wool_id;

  console.log(url);
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wool_type_id: wool.wool_type_id,
        wool_color_id: wool.wool_color_id,
        wool_thickness_id: wool.wool_thickness_id,
        wool_stock: wool.wool_stock,
        wool_ideal_stock: wool.wool_ideal_stock,
        wool_price: wool.wool_price,
      }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWool = async (wool_id: number) => {
  const url = "http://localhost:3000/wool/" + wool_id;

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
