import { SessionContext } from "@/contexts/sessions.context";
import { useContext } from "react";

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}
