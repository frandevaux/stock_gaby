import { server_url } from "./url";

export const existsWoolColor = async (wool_color_name: string) => {
  try {
    const res = await fetch(
      server_url + "/wool_color_verify?wool_color_name=" + wool_color_name,
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

export const createWoolColor = async (wool_color_name: string) => {
  try {
    const res = await fetch(server_url + "/wool_color", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wool_color_name: wool_color_name }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateWoolColor = async (
  wool_color_name: string,
  wool_color_id: number
) => {
  try {
    const res = await fetch(server_url + "/wool_color/" + wool_color_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wool_color_name: wool_color_name }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWoolColor = async (wool_color_id: number) => {
  try {
    const res = await fetch(server_url + "/wool_color/" + wool_color_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.status;
    return data;
  } catch (error) {
    console.error(error);
  }
};
