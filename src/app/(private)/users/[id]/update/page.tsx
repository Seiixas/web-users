"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Image as ImageIcon, Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "@/modules/users/services";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "@/hooks/use-sessions";
import { Header } from "@/modules/shared/components/header";

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: z.enum(["ADMIN", "MANAGER", "STANDARD"]).optional(),
});

type UpdateUserForm = z.infer<typeof updateUserSchema>;

export default function UserSettingsPage() {
  const isMobile = useIsMobile();
  const { id } = useParams();
  const { accessToken } = useSession();
  const { toast } = useToast();

  const { data: user, refetch: reloadUser } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      userService.profile({
        id: id as string,
        accessToken: accessToken as string,
      }),
    retry: false,
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: userService.update,
    onMutate: () => {
      toast({ title: "Atualizando perfil..." });
    },
    onSuccess: () => {
      toast({ title: "Perfil atualizado com sucesso!" });
      reloadUser();
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
      form.setValue("role", user.role);
    }
  }, [user, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!data.email && !data.name && !data.password) {
      return;
    }
    updateUser({
      id: id as string,
      password: !!data.password ? data.password : undefined,
      name: !!data.name ? data.name : undefined,
      email: !!data.email ? data.email : undefined,
      role: user?.role === data.role ? undefined : data.role,
      accessToken: accessToken as string,
    });
  });

  return (
    <div className="container mx-auto">
      <Header
        title="Seu perfil"
        subtitle="Visualize e atualize suas informações de perfil."
      />
      <div className="p-8">
        <form
          onSubmit={handleSubmit}
          className={`flex ${
            isMobile ? "items-center flex-col-reverse" : "flex-row"
          } ${isMobile ? "space-y-4" : "space-x-4"}`}
        >
          <div className={isMobile ? "w-full" : "w-1/2"}>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                {...form.register("name")}
                disabled={isUpdating}
                id="name"
                type="text"
                className="mt-1"
                placeholder={'"John Doe"'}
              />
              <span className="text-muted-foreground text-xs">
                Seu nome será exibido publicamente em sua conta.
              </span>
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                {...form.register("email")}
                disabled={isUpdating}
                id="email"
                type="text"
                className="mt-1"
                placeholder={"john@doe.com"}
              />
              <span className="text-muted-foreground text-xs">
                Seu e-mail é utilizado para acessar sua conta.
              </span>
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                {...form.register("password")}
                disabled={isUpdating}
                id="password"
                type="password"
                className="mt-1"
                placeholder={"********"}
              />
              <span className="text-muted-foreground text-xs">
                Sua senha deve ter no mínimo 6 caracteres e no máximo 24.
              </span>
            </div>
            <div>
              <Label htmlFor="role">Função</Label>
              <Controller
                name="role"
                control={form.control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    {...field}
                    defaultValue={user?.role}
                  >
                    <SelectTrigger id="role" className="w-[180px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="cursor-pointer" value="ADMIN">
                        Administrador
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="MANAGER">
                        Gerente
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="STANDARD">
                        Padrão
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <span className="text-muted-foreground text-xs">
                A função do usuário define suas permissões.
              </span>
            </div>
            <Button
              type="submit"
              variant={"ghost"}
              className={`mt-6 ${isMobile ? "w-full" : "w-1/3"}`}
              disabled={isUpdating}
            >
              <Save />
              Atualizar perfil
            </Button>
          </div>
          <div className="p-4 w-1/2 flex flex-col items-center justify-center">
            <Avatar className="w-52 h-52">
              <AvatarImage
                src={"https://github.com/Seiixas.png"}
                alt="Avatar"
              />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <Button variant="ghost" className="mt-4 w-32" type="button">
              <ImageIcon />
              Alterar avatar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
