"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AbilityProvider } from "@/contexts/ability.provider";
import { useSession } from "@/hooks/use-sessions";
import { AppSidebar } from "@/modules/shared/components/app-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return null;
  }

  return (
    <SidebarProvider>
      <AbilityProvider>
        <AppSidebar />
        {children}
      </AbilityProvider>
    </SidebarProvider>
  );
}
