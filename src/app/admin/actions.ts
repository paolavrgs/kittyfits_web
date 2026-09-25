"use server";

import { redirect } from "next/navigation";
import {
  checkPassword,
  createSession,
  deleteSession,
} from "../../lib/admin-auth";

export type LoginState = { error: string } | undefined;

export const login = async (
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    // Frena un poco los intentos de adivinar la contraseña
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: "Contraseña incorrecta." };
  }

  await createSession();
  redirect("/admin/eventos");
};

export const logout = async () => {
  await deleteSession();
  redirect("/admin/login");
};
