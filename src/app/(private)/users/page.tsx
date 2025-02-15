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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePermissionRedirect } from "@/hooks/use-permission-redirect";
import { useSession } from "@/hooks/use-sessions";
import { useToast } from "@/hooks/use-toast";
import { Permission } from "@/lib/casl/ability";
import { Badge } from "@/modules/shared/components/badge";
import { Header } from "@/modules/shared/components/header";
import { userService } from "@/modules/users/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { debounce } from "lodash";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Eye,
  Pencil,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UsersPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string | null>(null);

  const handleChangeSearchDebounced = debounce((text: string) => {
    setSearch(text);
  }, 500);

  const [role, setRole] = useState<"ADMIN" | "MANAGER" | "STANDARD" | null>(
    null
  );

  const { toast } = useToast();
  const router = useRouter();
  const { accessToken } = useSession();
  const isMobile = useIsMobile();

  const hasPermission = usePermissionRedirect(Permission.READ_ANY);

  const { data: users, refetch: reloadUsers } = useQuery({
    queryKey: [
      "list-users",
      {
        page,
        limit,
        search,
        role,
      },
    ],
    queryFn: () =>
      userService.list({
        accessToken: accessToken as string,
        page,
        limit,
        ...(search && { search }),
        ...(role && { role }),
      }),
    enabled: hasPermission,
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: userService.delete,
    onSuccess: () => {
      toast({ title: "Usuário deletado com sucesso" });
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

  function handleIncrementPage() {
    if (
      (users?.[1] &&
        Number(page) >= Math.ceil(users[1] / (Number(limit) || 10))) ||
      users?.[0]?.length === users?.[1]
    )
      return;

    setPage((prev) => prev + 1);
  }

  function handleDecrementPage() {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  }

  if (!hasPermission) return null;

  return (
    <div className="min-h-screen w-full">
      <Header
        title="Usuários"
        subtitle="Visualize e gerencie os usuários cadastrados no sistema."
      />
      <div className="h-[calc(100vh-4rem)] overflow-auto p-8">
        <div className="flex items-center justify-between mb-4">
          <Input
            placeholder="Filtrar buscas"
            className="w-1/3 mb-4 m-1"
            onChange={(e) => handleChangeSearchDebounced(e.target.value)}
          />
          <Select
            onValueChange={(value) =>
              setRole(value as "ADMIN" | "MANAGER" | "STANDARD" | null)
            }
          >
            <SelectTrigger id="role" defaultValue={"10"} className="w-1/3">
              <SelectValue placeholder="Função" />
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
            {users?.[0]?.length === 0 && (
              <TableCaption className="pb-4">
                Nenhum usuário encontrado
              </TableCaption>
            )}
            <TableBody>
              {users?.[0]?.map((user) => (
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
                    {isMobile ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2 rounded cursor-pointer flex items-center justify-center gap-1">
                          <EllipsisVertical className="text-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleViewUser(user.id)}
                          >
                            <Eye />
                            <span className="text-sm">Visualizar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleEditUser(user.id)}
                          >
                            <Pencil />
                            <span className="text-sm">Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive"
                            onClick={() => handleOpenDeleteUserModal(user.id)}
                          >
                            <Trash />
                            <span className="text-sm">Deletar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <>
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
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Mostrando {users?.[0]?.length || 0} de {users?.[1] || 0} usuários
          </span>
          <div className="flex items-center gap-2">
            <div>
              <Select onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger defaultValue={"10"}>
                  <SelectValue placeholder="Itens por página" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="10">
                    10
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="20">
                    20
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="30">
                    30
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="mr-2"
              variant="secondary"
              onClick={handleDecrementPage}
            >
              <ChevronLeft />
            </Button>
            <Button variant="secondary" onClick={handleIncrementPage}>
              <ChevronRight />
            </Button>
          </div>
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
              <Button
                variant={"ghost"}
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setSelectedUserId(null);
                }}
              >
                Cancelar
              </Button>
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
