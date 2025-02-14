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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(24, "Senha deve ter no máximo 24 caracteres"),
  role: z.enum(["ADMIN", "MANAGER", "STANDARD"]),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

type CreateUserFormProps = {
  onSubmit: (data: CreateUserSchema) => void;
  isUpdating: boolean;
};

export function UserCreationForm({
  onSubmit,
  isUpdating,
}: CreateUserFormProps) {
  const isMobile = useIsMobile();
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`flex w-full rounded-lg p-6 gap-6 ${
        isMobile ? "flex-col" : "flex-row"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-full md:w-1/4 bg-gray-100 p-4 rounded-lg">
        <Avatar className="w-24 h-24 border-2 border-gray-300">
          <AvatarImage src={"https://github.com/Seiixas.png"} alt="Avatar" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <Button variant="ghost" className="mt-3 w-28 text-sm" type="button">
          <ImageIcon size={16} />
          Alterar avatar
        </Button>
      </div>

      <div className="flex flex-col w-full md:w-3/4 space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            {...form.register("name")}
            disabled={isUpdating}
            id="name"
            placeholder="John Doe"
            error={form.formState.errors.name?.message}
          />
          <span className="text-muted-foreground text-xs">
            Seu nome será exibido publicamente.
          </span>
        </div>

        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            {...form.register("email")}
            disabled={isUpdating}
            id="email"
            placeholder="john@doe.com"
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
            placeholder="********"
            error={form.formState.errors.password?.message}
          />
          <span className="text-muted-foreground text-xs">
            Deve ter entre 8 e 24 caracteres.
          </span>
        </div>

        <div>
          <Label htmlFor="role">Função</Label>
          <Controller
            name="role"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} {...field}>
                <SelectTrigger id="role" className="w-full md:w-1/2">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                  <SelectItem value="MANAGER">Gerente</SelectItem>
                  <SelectItem value="STANDARD">Padrão</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <span className="text-muted-foreground text-xs">
            Define as permissões do usuário.
          </span>
        </div>

        <Button
          type="submit"
          variant="ghost"
          className="w-full md:w-1/3 mt-4"
          disabled={isUpdating}
        >
          <Save size={16} />
          Criar usuário
        </Button>
      </div>
    </form>
  );
}
