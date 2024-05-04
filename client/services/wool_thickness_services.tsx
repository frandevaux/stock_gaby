import { server_url } from "./url";

export const existsWoolThickness = async (wool_thickness_name: string) => {
  try {
    const res = await fetch(
      server_url +
        "/wool_thickness_verify?wool_thickness_name=" +
        wool_thickness_name,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createWoolThickness = async (wool_thickness_name: string) => {
  try {
    const res = await fetch(server_url + "/wool_thickness", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wool_thickness_name: wool_thickness_name }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateWoolThickness = async (
  wool_thickness_name: string,
  wool_thickness_id: number
) => {
  try {
    const res = await fetch(
      server_url + "/wool_thickness/" + wool_thickness_id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wool_thickness_name: wool_thickness_name }),
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWoolThickness = async (wool_thickness_id: number) => {
  try {
    const res = await fetch(
      server_url + "/wool_thickness/" + wool_thickness_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.status;
    return data;
  } catch (error) {
    console.error(error);
  }
};
