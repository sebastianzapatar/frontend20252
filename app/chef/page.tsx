"use client";

import { useState } from "react";
import ChefForm from "@/app/components/chef/ChefForm";
import ChefList from "@/app/components/chef/ChefList";

export const dynamic = "force-dynamic";

export default function ChefsPage() {
  const [reloadToken, setReloadToken] = useState(0);

  return (
    <main className="container mx-auto max-w-5xl p-6 space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Gestión de Chefs</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <ChefForm
          onCreated={() => setReloadToken((t) => t + 1)} // 👈 fuerza refetch
        />
        <div>
          <ChefList reloadToken={reloadToken} />
        </div>
      </div>
    </main>
  );
}
