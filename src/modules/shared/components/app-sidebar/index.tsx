import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { List, PlusCircle, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { Permission } from "@/lib/casl/ability";
import { Can } from "../can";

const sidebarActions = [
  {
    group: "me",
    title: "Meu perfil",
    actions: [
      {
        title: "Meu perfil",
        icon: User,
        href: "/users/me",
        permission: undefined,
      },
    ],
  },
  {
    group: "users",
    title: "Usuários",
    actions: [
      {
        title: "Novo",
        icon: PlusCircle,
        href: "/users/create",
        permission: Permission.CREATE,
      },
      {
        title: "Listagem",
        icon: List,
        href: "/users",
        permission: Permission.READ_ANY,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex flex-col h-full">
        <SidebarHeader className="flex items-center justify-center mt-6">
          <Image src="/logo.svg" width={140} height={60} alt="Logo" />
        </SidebarHeader>
        <SidebarContent className="block mt-4">
          {sidebarActions.map((group) => (
            <SidebarGroup key={group.group}>
              <SidebarGroupLabel className="font-semibold">
                {group.title.toUpperCase()}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {group.actions.map((item) =>
                  !item.permission ? (
                    <SidebarMenuItem className="p-1" key={item.href}>
                      <SidebarMenuButton
                        className="py-6 px-4 rounded-xl font-bold"
                        asChild
                      >
                        <Link href={item.href}>
                          <item.icon className="text-black" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    <Can I={item.permission} a="User" key={item.href}>
                      <SidebarMenuItem className="p-1">
                        <SidebarMenuButton
                          className="py-6 px-4 rounded-xl font-bold"
                          asChild
                        >
                          <Link href={item.href}>
                            <item.icon className="text-black" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Can>
                  )
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <AppSidebarFooter />
      </div>
    </Sidebar>
  );
}
