"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit2, RefreshCcw, Trash2, User } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/modules/shared/components/badge";

interface UserProps {
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserCard({
  name,
  email,
  role,
  createdAt,
  updatedAt,
}: UserProps) {
  return (
    <Card className="w-full max-w-sm bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center h-12 w-1 rounded-full mr-2">
              <User className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
                <Badge role={role as "ADMIN" | "MANAGER" | "STANDARD"} />
              </div>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 flex items-center mb-2 gap-1">
            <Calendar className="h-4 w-4" />
            <span className="font-semibold">Criado em:</span>{" "}
            {format(new Date(createdAt), "dd/MM/yyyy")}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1 mt-2">
            <RefreshCcw className="h-4 w-4" />
            <span className="font-semibold">Atualizado em:</span>{" "}
            {format(new Date(updatedAt), "dd/MM/yyyy")}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm">
          <Edit2 className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Apagar
        </Button>
      </CardFooter>
    </Card>
  );
}
