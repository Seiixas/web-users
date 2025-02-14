import { createContext } from "react";

type TSessionContext = {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  role: "ADMIN" | "MANAGER" | "STANDARD" | null;
  accessToken: string | null;

  setSession: (session: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    role: "ADMIN" | "MANAGER" | "STANDARD";
    accessToken: string;
  }) => void;
  clearSession: () => void;
};

export const SessionContext = createContext({} as TSessionContext);
