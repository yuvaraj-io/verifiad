import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  const path = req.nextUrl.pathname;

  // Public routes
  if (
    path === "/" ||
    path.startsWith("/api") ||
    path.startsWith("/auth")
  ) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const { role } = JSON.parse(session.value);

  // Creator trying to access business
  if (role === "creator" && path.startsWith("/business")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Business trying to access creator
  if (role === "business" && path.startsWith("/dashboard")) {
    return NextResponse.redirect(
      new URL("/business/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/business/:path*"],
};
