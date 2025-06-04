// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Ajusta la lógica según tu app
  const token = await getToken({ req });
  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (!isAuth && !isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Opcional: define rutas protegidas
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
