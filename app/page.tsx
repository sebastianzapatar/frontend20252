import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
return ( 
<main className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4"> 
  <h1 className="text-3xl font-bold tracking-tight">Bienvenido al panel de Chefs 🍽️</h1> 
  <p className="text-muted-foreground max-w-md">
Este es un prototipo de frontend en Next.js con shadcn/ui y zod. Aquí podrás crear y listar chefs. </p>
 <Link href="/chef">
  <Button>Ir a gestión de Chefs</Button> 
  </Link> 
  </main>
);
}
