import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  checkAdminPassword,
  randomTokenHex,
  signAdminToken,
  verifyAdminCookie,
} from "@/lib/admin-cookie";

export { ADMIN_COOKIE, checkAdminPassword, verifyAdminCookie };

const MAX_AGE = 60 * 60 * 12;

export async function createAdminSession() {
  const token = randomTokenHex(24);
  const value = `${token}.${await signAdminToken(token)}`;
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function isAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminCookie(jar.get(ADMIN_COOKIE)?.value);
}
