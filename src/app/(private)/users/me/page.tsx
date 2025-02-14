"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/use-sessions";
import { Badge } from "@/modules/shared/components/badge";
import { Header } from "@/modules/shared/components/header";
import { userService } from "@/modules/users/services";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Mail, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, accessToken } = useSession();

  const { data: fetchUser } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () =>
      userService.profile({
        id: user?.id as string,
        accessToken: accessToken as string,
      }),
    retry: false,
  });

  return (
    <div className="container mx-auto">
      <Header
        title="Seu perfil"
        subtitle="Visualize e atualize suas informações de perfil."
      />
      <div className="m-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src="https://github.com/Seiixas.png"
                alt="User avatar"
              />
              <AvatarFallback>
                {fetchUser?.name?.toUpperCase() ||
                  fetchUser?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-3xl flex flex-col">
                <p>{fetchUser?.name}</p>
                <span className="mt-0 text-muted-foreground text-sm">
                  #{fetchUser?.id}
                </span>
              </CardTitle>
              <CardDescription>
                <Badge role={fetchUser?.role} />
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Mail className="text-muted-foreground" />
                <span>
                  <a href={`mailto:${fetchUser?.email}`}>{fetchUser?.email}</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground" />
                <span>
                  {fetchUser?.created_at && (
                    <>
                      Cadastrado desde{" "}
                      {new Date(fetchUser.created_at).toLocaleDateString(
                        "pt-BR"
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCcw className="text-muted-foreground" />
                <span>
                  {fetchUser?.updated_at && (
                    <>
                      Atualizado em{" "}
                      {new Date(fetchUser.updated_at).toLocaleDateString(
                        "pt-BR"
                      )}
                    </>
                  )}
                </span>
              </div>
            </div>
            <Separator className="my-4" />
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Link
              className="w-full sm:w-auto"
              href={`/users/${user?.id}/update`}
            >
              <Button>Atualizar perfil</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
