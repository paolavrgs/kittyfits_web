"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackEvent } from "../lib/gtm";

// Pequeña espera para que la página se pinte antes de abrir el modal
const OPEN_DELAY_MS = 300;
// Deja de mostrarse al terminar el día del evento
const EVENT_END = new Date("2026-10-25T00:00:00-04:00");

const PowerBeachPromo = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (Date.now() >= EVENT_END.getTime()) return;

    // Se muestra en cada carga del home, aunque se haya cerrado antes
    const timer = setTimeout(() => {
      setIsOpen(true);
      trackEvent("promo_view", { promo: "power_beach" });
    }, OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="power-beach-promo-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="relative bg-[#F4F3EE] w-full max-w-sm rounded-3xl p-8 flex flex-col items-center text-center gap-4 shadow-2xl z-10">
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar"
          className="absolute top-5 right-5 text-primary hover:opacity-70 transition-opacity cursor-pointer"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">
          Nuevo evento
        </span>
        <h2
          id="power-beach-promo-title"
          className="text-4xl font-extrabold text-foreground uppercase leading-[0.95]"
        >
          Power Beach <span className="text-primary">2.0</span>
        </h2>
        <p className="text-primary font-bold">
          24 de octubre · Playa Bahía Grande
        </p>
        <p className="text-primary leading-snug">
          8 estaciones funcionales y un desafío final por equipos.{" "}
          <strong>Cupos limitados.</strong>
        </p>

        <Link
          href="/power-beach"
          onClick={() => {
            trackEvent("promo_click", { promo: "power_beach" });
            setIsOpen(false);
          }}
          className="w-full mt-2 bg-primary text-background font-bold text-lg uppercase rounded-2xl py-4 shadow-md hover:bg-opacity-90 transition-all"
        >
          Quiero participar
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="text-primary/70 text-sm font-medium hover:text-primary cursor-pointer"
        >
          Ahora no
        </button>
      </div>
    </div>
  );
};

export default PowerBeachPromo;
