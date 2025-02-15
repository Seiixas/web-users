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
      className={cn(
        role === "MANAGER" && "bg-green-600",
        role === "ADMIN" && "bg-black",
        role === "STANDARD" && "bg-blue-600"
      )}
      variant={"outline"}
    >
      <span>{UserRole[role]}</span>
    </CNBadge>
  );
}
