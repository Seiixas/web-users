import { Env } from "@/lib/env";
import { TUserService } from "./types";

const USERS_ENDPOINT = `${Env.NEXT_PUBLIC_API_URL}/users`;

export const userService: TUserService = {
  create: async (data) => {
    const response = await fetch(`${USERS_ENDPOINT}`, {
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
    const params = new URLSearchParams({
      page: data.page.toString(),
      limit: data.limit.toString(),
      ...(data.search && { name: data.search }),
      ...(data.role && { role: data.role }),
    });

    const response = await fetch(`${USERS_ENDPOINT}?${params}`, {
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
    const response = await fetch(`${USERS_ENDPOINT}/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    if (!response.ok) throw await response.json();
  },
  profile: async (data) => {
    const response = await fetch(`${USERS_ENDPOINT}/${data.id}`, {
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
    const response = await fetch(`${USERS_ENDPOINT}/${data.id}`, {
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
