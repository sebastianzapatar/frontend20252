"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/auth-store";
import { toast } from "sonner";
import { LogOutIcon } from "lucide-react";

export default function LogoutButton() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();                // limpia token y email del store + localStorage
    toast.success("Sesión cerrada correctamente 👋");
    router.replace("/auth/login"); // redirige al login
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="flex items-center gap-2"
    >
      <LogOutIcon className="h-4 w-4" />
      Cerrar sesión
    </Button>
  );
}
