import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "kf_admin_session";
const SESSION_DAYS = 7;

const sign = (value: string) =>
  createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(value)
    .digest("base64url");

const safeEqual = (a: string, b: string) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
};

export const checkPassword = (password: string) =>
  safeEqual(password, process.env.ADMIN_PASSWORD!);

export const createSession = async () => {
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = String(expiresAt);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    expires: new Date(expiresAt),
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete({ name: COOKIE_NAME, path: "/admin" });
};

export const isAdmin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) {
    return false;
  }
  return Number(payload) > Date.now();
};

// Llamar al inicio de cada página, acción o ruta protegida de /admin
export const requireAdmin = async () => {
  if (!(await isAdmin())) redirect("/admin/login");
};
