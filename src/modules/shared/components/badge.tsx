"use client";

import { cn } from "@/lib/utils";
import { Badge as CNBadge } from "@/components/ui/badge";

type TBadgeProps = {
  role: "ADMIN" | "MANAGER" | "STANDARD" | undefined;
};

enum UserRole {
  STANDARD = "Padrão",
  ADMIN = "Administrador",
  MANAGER = "Gerente",
}

export function Badge({ role }: TBadgeProps) {
  if (!role) return null;

  return (
    <CNBadge
      className={cn({
        "bg-black": role === "ADMIN",
        "bg-green-600": role === "MANAGER",
        "bg-blue-600": role === "STANDARD",
      })}
    >
      {UserRole[role]}
    </CNBadge>
  );
}
