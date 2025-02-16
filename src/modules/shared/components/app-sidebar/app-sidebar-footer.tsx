"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { useSession } from "@/hooks/use-sessions";
import { PowerOff } from "lucide-react";

export function AppSidebarFooter() {
  const { user, clearSession } = useSession();

  const avatarFallback =
    user && user.name ? user.name.charAt(0).toUpperCase() : "";

  return (
    <SidebarFooter className="p-4 border-t flex flex-row items-center justify-between">
      <div>
        <Avatar>
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col ml-4">
        <strong className="text-sm">
          {user?.name || "Usuário não autenticado"}
        </strong>
        <span className="text-xs truncate overflow-ellipsis ">
          {user?.email.split("@")[0]}
        </span>
      </div>
      <Button
        variant={"ghost"}
        className="text-destructive hover:text-destructive"
        onClick={clearSession}
      >
        <PowerOff size={16} />
      </Button>
    </SidebarFooter>
  );
}
