"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "@/hooks/use-sessions";
import { useToast } from "@/hooks/use-toast";
import { extractIdFromToken } from "@/lib/decode-token";
import { Badge } from "@/modules/shared/components/badge";
import { userService } from "@/modules/users/services";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Eye, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { accessToken } = useSession();
  const queryClient = new QueryClient();

  useEffect(() => {
    const t = extractIdFromToken(accessToken!);
    console.log(t);
  }, [accessToken]);

  const { data: users, refetch: reloadUsers } = useQuery({
    queryKey: ["list-users"],
    queryFn: () => userService.list({ accessToken: accessToken as string }),
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: userService.delete,
    onSuccess: () => {
      toast({ title: "Usuário deletado com sucesso" });
      queryClient.invalidateQueries({ queryKey: ["list-users"] });
      reloadUsers();
    },
    onError: (error) => {
      toast({
        title: "Erro ao deletar usuário",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleOpenDeleteUserModal = (id: string) => {
    setSelectedUserId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEditUser = (id: string) => {
    router.push(`/users/${id}/update`);
  };

  const handleViewUser = (id: string) => {
    router.push(`/users/${id}`);
  };

  const handleDeleteUser = () => {
    if (!selectedUserId) return;
    deleteUser({ id: selectedUserId, accessToken: accessToken as string });
    setIsDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="min-h-screen w-full">
      <header className="border-b px-8 py-4">
        <h1 className="text-xl font-bold">Usuários</h1>
        <p className="text-muted-foreground text-sm">
          Visualize e gerencie os usuários cadastrados no sistema.
        </p>
      </header>
      <div className="h-[calc(100vh-4rem)] overflow-auto p-8">
        <div className="flex items-center justify-between mb-4">
          <Input
            id="searchProduct"
            placeholder="Filtrar buscas"
            className="w-1/3 mb-4 m-1"
          />
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-4">Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Registrado em</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="p-6">
                    <span className="mr-2">{user.name}</span>
                    <Badge role={user.role} />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {format(new Date(user.created_at), "dd/MM/yyyy 'às' HH:mm")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="link"
                      className="text-sm"
                      onClick={() => handleViewUser(user.id)}
                    >
                      <Eye className="text-foreground" />
                    </Button>
                    <Button
                      variant="link"
                      className="text-sm"
                      onClick={() => handleEditUser(user.id)}
                    >
                      <Pencil className="text-foreground" />
                    </Button>
                    <Button
                      variant="link"
                      className="text-sm"
                      onClick={() => {
                        handleOpenDeleteUserModal(user.id);
                      }}
                    >
                      <Trash className="text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <div className="mt-4 flex justify-end">
          <Button className="mr-2" variant="secondary" onClick={() => {}}>
            <ChevronLeft />
          </Button>
          <Button variant="secondary" onClick={() => {}}>
            <ChevronRight />
          </Button>
        </div>
      </div>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tem certeza que deseja deletar esta conta?
            </DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita e o usuário será removido
              permanentemente.
            </DialogDescription>
            <DialogFooter>
              <Button variant={"ghost"}>Cancelar</Button>
              <Button variant={"destructive"} onClick={handleDeleteUser}>
                Deletar
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
