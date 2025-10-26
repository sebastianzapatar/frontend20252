"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/app/lib/auth-schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { api } from "@/app/lib/api";
import { useAuthStore } from "@/app/lib/auth-store";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setSubmitting(true);
      const res = await api.post("/auth/login", data);
      const token = res.data?.access_token ?? res.data?.token;
      if (!token) throw new Error("Token no recibido");

      setAuth(token, data.email);
      toast.success("¡Bienvenido!");
      router.push("/chef");
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? e?.message ?? "No se pudo iniciar sesión";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto rounded-2xl border bg-card/60 backdrop-blur shadow-sm">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
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
                placeholder="Tu contraseña"
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
          </div>

          <Button type="submit" disabled={submitting || !form.formState.isValid} className="w-full">
            {submitting ? "Ingresando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
