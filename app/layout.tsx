import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Trazabilidad y Gestión de Licitaciones",
  description: "Sistema integral para gestión de tickets, licitaciones y procesos operativos",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="es">
      <body className={`${inter.className} flex min-h-screen`}>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <header className="flex h-14 items-center justify-between px-6 shadow">
              <span className="font-semibold">Sistema de Licitaciones</span>
              {session ? (
                <span>
                  Hola, {session.user?.name ?? session.user?.email}
                </span>
              ) : (
                <a href="/login" className="rounded px-3 py-1 text-sm underline hover:bg-gray-100">
                  Iniciar sesión
                </a>
              )}
            </header>
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}