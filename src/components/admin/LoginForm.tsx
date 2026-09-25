"use client";

import { useActionState } from "react";
import { login } from "../../app/admin/actions";

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-primary font-bold text-[15px]"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full bg-white rounded-xl px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-primary/20 font-medium"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-red-700 text-sm font-medium">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-background font-bold text-lg rounded-2xl py-4 hover:bg-opacity-90 transition-all shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-wait"
      >
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};

export default LoginForm;
