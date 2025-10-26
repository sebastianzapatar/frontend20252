"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/auth-store";
import  LogoutButton  from "@/app/components/login/LogoutButton";
export default function HomePage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;    
    if (!token) router.replace("/auth/login");
  }, [hasHydrated, token, router]);

  // Mientras hidrata, no muestres nada (evita parpadeo/redirect prematuro)
  if (!hasHydrated) return null;

  // Si no hay token y ya hidrató, en breve te redirige (render vacío)
  if (!token) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Bienvenido al panel de Chefs 🍽️</h1>
      <p className="text-muted-foreground max-w-md">
        Este es un prototipo de frontend en Next.js con shadcn/ui y zod. Aquí podrás crear y listar chefs.
      </p>
      <Link href="/chef">
        <Button>Ir a gestión de Chefs</Button>
      </Link>
       <LogoutButton />
    </main>
  );
}
