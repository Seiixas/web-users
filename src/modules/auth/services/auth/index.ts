import { TAuthService } from "./types";

const AUTH_ENDPOINT = `http://localhost:3000/auth`;

export const authService: TAuthService = {
  signIn: async (payload) => {
    const response = await fetch(`${AUTH_ENDPOINT}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw await response.json();

    return await response.json();
  },
};
