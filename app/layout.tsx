
import { Toaster } from "sonner";
import type { ReactNode } from "react";


export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="es">
<body className="min-h-dvh bg-background text-foreground antialiased">
{children}
<Toaster richColors position="top-right" />
</body>
</html>
);
}