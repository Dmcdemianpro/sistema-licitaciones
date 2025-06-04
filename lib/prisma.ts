import { PrismaClient } from "@prisma/client";

/**
 * En desarrollo, Next.js reinicia el proceso (hot‑reload) y podría crear varios
 * clientes. Guardamos una instancia global para reutilizarla.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma; // 👈 Puedes usar `import prisma from "@/lib/prisma"` o `{ prisma }`