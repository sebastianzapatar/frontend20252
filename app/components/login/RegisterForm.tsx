"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/app/lib/auth-schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { api } from "@/app/lib/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setSubmitting(true);
      await api.post("/auth", data);
      toast.success("Cuenta creada. Ahora inicia sesión.");
      form.reset();
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? "No se pudo crear la cuenta";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto rounded-2xl border bg-card/60 backdrop-blur shadow-sm">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl">Crear cuenta</CardTitle>
      </CardHeader>
      <Separator className="opacity-60" />
      <CardContent className="p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="tucorreo@dominio.com" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPwd ? "text" : "password"}
                placeholder="Min 8, 1 minúscula, 1 mayúscula, 1 número, 2 símbolos"
                {...form.register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPwd ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
            )}
            <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5">
              <li>8+ caracteres</li>
              <li>≥1 minúscula y ≥1 mayúscula</li>
              <li>≥1 número</li>
              <li>≥2 símbolos</li>
            </ul>
          </div>

          <Button type="submit" disabled={submitting || !form.formState.isValid} className="w-full">
            {submitting ? "Creando..." : "Crear cuenta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
