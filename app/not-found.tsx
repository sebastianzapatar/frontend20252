import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-lg rounded-2xl border bg-card/60 backdrop-blur shadow-sm">
        <CardHeader className="flex items-start gap-3">
          <TriangleAlert className="h-6 w-6 text-yellow-500 mt-1" />
          <div>
            <CardTitle className="text-2xl">Página no encontrada</CardTitle>
            <p className="text-sm text-muted-foreground">
              La ruta que intentas abrir no existe o fue movida (404).
            </p>
          </div>
        </CardHeader>
        <Separator className="opacity-60" />
        <CardContent className="pt-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Revisa la URL o vuelve al inicio para seguir navegando.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/">
              <Button className="w-full sm:w-auto">Ir al inicio</Button>
            </Link>
            <Link href="/chef">
              <Button variant="outline" className="w-full sm:w-auto">Ir a Chefs</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
