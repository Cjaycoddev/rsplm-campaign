import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyAdminCookie } from "@/lib/admin-cookie";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAdminPage = path.startsWith("/admin") && path !== "/admin/login";
  const isAdminApi =
    path.startsWith("/api/admin") && path !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  if (!(await verifyAdminCookie(req.cookies.get(ADMIN_COOKIE)?.value))) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
