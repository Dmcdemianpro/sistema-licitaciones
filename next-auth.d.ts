// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { id: number; role: "ADMIN" | "USER" };
  }
  interface User extends DefaultUser {
    id: number;
    role: "ADMIN" | "USER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    role: "ADMIN" | "USER";
  }
}
