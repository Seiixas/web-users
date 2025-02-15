import { PropsWithChildren, useEffect, useState } from "react";
import { SessionContext } from "./sessions.context";

const SESSION_STORAGE_KEY = "userSession";

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
  } | null>(null);
  const [role, setRole] = useState<"ADMIN" | "MANAGER" | "STANDARD" | null>(
    null
  );
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // TODO: Por motivos de segurança, definir token via HTTP Only no back-end
  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      setUser(parsedSession.user);
      setRole(parsedSession.role);
      setAccessToken(parsedSession.accessToken);
    }
  }, []);

  const setSession = (session: {
    user: { id: string; email: string; name: string };
    role: "ADMIN" | "MANAGER" | "STANDARD";
    accessToken: string;
  }) => {
    setUser(session.user);
    setRole(session.role);
    setAccessToken(session.accessToken);

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  };

  const clearSession = () => {
    setUser(null);
    setRole(null);
    setAccessToken(null);

    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  return (
    <SessionContext.Provider
      value={{ user, accessToken, clearSession, role, setSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}
