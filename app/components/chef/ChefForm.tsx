"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChefSchema, type CreateChefSchema } from "@/app/lib/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/app/lib/api";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 Importamos el router

type Props = {
  onCreated?: () => void; // callback opcional
};

export default function ChefForm({ onCreated }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter(); // 👈 Inicializamos router

  const form = useForm<CreateChefSchema>({
    resolver: zodResolver(createChefSchema),
    defaultValues: { name: "", skill: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: CreateChefSchema) => {
    try {
      setSubmitting(true);
      await api.post("/chef", data);
      toast.success("Chef creado con éxito");
      form.reset();
      onCreated?.();

      // 👇 Redirigir después de crear
      router.push("/chef");
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "No se pudo crear el chef";
      toast.error(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto rounded-2xl border bg-card/60 backdrop-blur shadow-sm">
      <CardHeader className="space-y-1 p-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Nuevo Chef
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Crea un registro con nombre y habilidad culinaria.
        </p>
      </CardHeader>

      <Separator className="opacity-60" />

      <CardContent className="p-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2"
        >
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Ej: Gordon"
              className="placeholder:text-muted-foreground/70"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Habilidad */}
          <div className="space-y-2">
            <Label htmlFor="skill" className="text-sm font-medium">
              Habilidad
            </Label>
            <Input
              id="skill"
              placeholder="Ej: Pastelería"
              className="placeholder:text-muted-foreground/70"
              {...form.register("skill")}
            />
            {form.formState.errors.skill && (
              <p className="text-xs text-red-500">
                {form.formState.errors.skill.message}
              </p>
            )}
          </div>

          {/* Acción */}
          <div className="md:col-span-2 flex items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={submitting || !form.formState.isValid}
              className="w-full md:w-auto"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Guardando...
                </span>
              ) : (
                "Guardar"
              )}
            </Button>

            <p className="text-xs text-muted-foreground">
              Consejo: usa <kbd className="rounded border px-1">Enter</kbd> para enviar.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
