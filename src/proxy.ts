import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyAdminCookie } from "@/lib/admin-cookie";

const PAYMENT_COOKIE = "rsplm_payment";
const PAYMENT_PAGE = "/payment-required";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow payment page, API routes, static assets
  if (path === PAYMENT_PAGE || path.startsWith("/api/") || path.startsWith("/_next/") || path.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  // Admin route protection
  const isAdminPage = path.startsWith("/admin") && path !== "/admin/login";
  const isAdminApi = path.startsWith("/api/admin") && path !== "/api/admin/login";

  if (isAdminPage || isAdminApi) {
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

  // Payment required for all other routes
  const hasPayment = req.cookies.has(PAYMENT_COOKIE);
  if (!hasPayment) {
    const url = req.nextUrl.clone();
    url.pathname = PAYMENT_PAGE;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|payment-required|admin).*)"],
};
