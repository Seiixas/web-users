"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon, Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/modules/users/services";
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
import { Permission } from "@/lib/casl/ability";
import { usePermissionRedirect } from "@/hooks/use-permission-redirect";
import { MediaPicker } from "@/modules/shared/components/media-picker";
import { useState } from "react";

const createUserSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }).min(1, {
    message: "Nome é obrigatório",
  }),
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .email({ message: "E-mail inválido." }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
    .max(24, { message: "Senha deve ter no máximo 24 caracteres" }),
  role: z.enum(["ADMIN", "MANAGER", "STANDARD"]),
});

type CreateUserForm = z.infer<typeof createUserSchema>;

export default function UserCreationPage() {
  const isMobile = useIsMobile();
  const { accessToken } = useSession();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const hasPermission = usePermissionRedirect(Permission.CREATE);

  const { mutate: createUser, isPending: isUpdating } = useMutation({
    mutationFn: userService.create,
    onMutate: () => {
      toast({ title: "Criando usuário..." });
    },
    onSuccess: () => {
      toast({ title: "Usuário criado com sucesso!" });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar usuário",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    createUser({
      accessToken: accessToken as string,
      ...data,
      ...(selectedFile && { avatar: selectedFile }),
    });
  });

  if (!hasPermission) return null;

  return (
    <div className="container mx-auto">
      <Header
        title="Crie um novo usuário"
        subtitle="Preencha os campos abaixo para criar um novo usuário."
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
                placeholder={"John Doe"}
                error={form.formState.errors.name?.message}
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
                error={form.formState.errors.email?.message}
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
                error={form.formState.errors.password?.message}
              />
              <span className="text-muted-foreground text-xs">
                Sua senha deve ter no mínimo 8 caracteres e no máximo 24.
              </span>
            </div>
            <div>
              <Label htmlFor="role">Função</Label>
              <Controller
                name="role"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} {...field}>
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
              Criar usuário
            </Button>
          </div>
          <div className="p-4 w-1/2 flex flex-col items-center justify-center">
            <label
              htmlFor="media"
              className="flex items-center gap-1.5 text-sm cursor-pointer"
            >
              <ImageIcon />
              Adicionar avatar
            </label>
            <MediaPicker setSelectedFile={setSelectedFile} />
          </div>
        </form>
      </div>
    </div>
  );
}
