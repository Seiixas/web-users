import { decode } from "jsonwebtoken";
import { useSession } from "./use-sessions";

type Payload = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
};

export function useSecureRole() {
  const { accessToken, clearSession } = useSession();

  if (!accessToken) {
    return null;
  }

  const payload = decode(accessToken) as Payload | null;

  if (!payload) {
    clearSession();
    return null;
  }

  if (payload.exp * 1000 < Date.now()) {
    clearSession();
    return null;
  }

  return payload.role;
}
