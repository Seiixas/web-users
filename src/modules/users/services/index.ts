import { TUserService } from "./types";

const AUTH_ENDPOINT = `http://localhost:3000/users`;

export const userService: TUserService = {
  create: async (data) => {
    const response = await fetch(`${AUTH_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw await response.json();
  },
  list: async (data) => {
    const response = await fetch(`${AUTH_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    if (!response.ok) throw await response.json();

    return await response.json();
  },
  delete: async (data) => {
    const response = await fetch(`${AUTH_ENDPOINT}/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    if (!response.ok) throw await response.json();
  },
  profile: async (data) => {
    const response = await fetch(`${AUTH_ENDPOINT}/${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    if (!response.ok) throw await response.json();

    return await response.json();
  },
  update: async (data) => {
    const response = await fetch(`${AUTH_ENDPOINT}/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw await response.json();
  },
};
