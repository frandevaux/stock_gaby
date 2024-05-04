import { server_url } from "./url";

export const existsWoolType = async (wool_type_name: string) => {
  try {
    const res = await fetch(
      server_url + "/wool_type_verify?wool_type_name=" + wool_type_name,
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

export const createWoolType = async (wool_type_name: string) => {
  try {
    const res = await fetch(server_url + "/wool_type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wool_type_name: wool_type_name }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateWoolType = async (
  wool_type_name: string,
  wool_type_id: number
) => {
  try {
    const res = await fetch(server_url + "/wool_type/" + wool_type_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wool_type_name: wool_type_name }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWoolType = async (wool_type_id: number) => {
  try {
    const res = await fetch(server_url + "/wool_type/" + wool_type_id, {
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
