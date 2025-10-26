"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import type { Chef } from "@/app/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function ChefList({ reloadToken = 0 }: { reloadToken?: number }) {
  const [data, setData] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChefs = async () => {
    try {
      setLoading(true);
      // 👇 Asegúrate que coincide con tu backend (plural recomendado)
      const res = await api.get<Chef[]>("/chef");
      setData(res.data ?? []);
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "No se pudo cargar la lista";
      toast.error(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, [reloadToken]); // 👈 refetch cuando cambia

  if (loading) return <p className="text-sm text-muted-foreground">Cargando chefs...</p>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chefs</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay registros.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Habilidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.skill}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
