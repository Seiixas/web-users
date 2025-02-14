"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { authService } from "@/modules/auth/services/auth";
import { useSession } from "@/hooks/use-sessions";

const signInSchema = z.object({
  email: z.string({ required_error: "O e-mail é obrigatório" }).email({
    message: "O e-mail é inválido.",
  }),
  password: z
    .string({
      required_error: "A senha é obrigatória",
    })
    .min(8, {
      message: "A senha deve ter no mínimo 8 caracteres",
    }),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const { setSession } = useSession();

  const handleSubmit = form.handleSubmit(async (data) => {
    signIn(data);
  });

  const { mutate: signIn, isPending: isLoading } = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      toast({
        title: "Login efetuado com sucesso!",
      });
      setSession({
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        },
        role: data.user.role,
        accessToken: data.accessToken,
      });
      router.push("/users");
    },
    onError: (error) => {
      toast({
        title: "Erro ao efetuar login",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen flex h-screen w-screen">
      <div className="h-full w-full p-8 flex items-center justify-center bg-purple-500 text-white [@media(max-width:900px)]:hidden">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo de volta!</h1>
          <p className="text-xl">
            Faça log-in para continuar a usar a aplicação.
          </p>
        </div>
      </div>

      <div className="p-8 h-full w-full flex items-center justify-center md:w-1/2 [@media(max-width:900px)]:w-full">
        <div className="w-full max-w-sm">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="mx-auto h-12 w-auto"
            width={200}
            height={100}
          />
          <h2 className="text-center my-6">Faça log-in para continuar</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...form.register("email")}
                error={form.formState.errors.email?.message}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                {...form.register("password")}
                error={form.formState.errors.password?.message}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
