"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarFooter } from "@/components/ui/sidebar";
import { useSession } from "@/hooks/use-sessions";

export function AppSidebarFooter() {
  const { user } = useSession();

  const avatarFallback =
    user && user.name ? user.name.charAt(0).toUpperCase() : "";

  return (
    <SidebarFooter className="p-4 border-t flex flex-row">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/Seiixas.png" />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col ml-4">
        <strong className="text-sm">
          {user?.name || "Usuário não autenticado"}
        </strong>
        <span className="text-xs overflow-ellipsis">{user?.email || ""}</span>
      </div>
    </SidebarFooter>
  );
}
