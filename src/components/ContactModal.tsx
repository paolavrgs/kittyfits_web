"use client";
import { useContactModal } from "../context/ContactModalContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import { trackEvent } from "../lib/gtm";

export default function ContactModal() {
  const { isOpen, closeModal, initialSubject } = useContactModal();
  const [name, setName] = useState("");
  const [source, setSource] = useState("Instagram");
  const [location, setLocation] = useState("");
  const [subject, setSubject] = useState("Entrenamiento personalizado");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubject(initialSubject);
    } else {
      document.body.style.overflow = "auto";
      setSubmitted(false);
      setName("");
      setSource("Instagram");
      setLocation("");
      setSubject("Entrenamiento personalizado");
    }
  }, [isOpen, initialSubject]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    trackEvent("form_submit", {
      user_name: name,
      user_location: location,
      user_source: source,
      service: subject,
    });

    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const message = `¡Hola Kitty!♡ Mi nombre es ${name}.\nEstoy interesada en ${subject}.\nVivo en ${location}\n y te conocí por ${source}`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      <div className="relative bg-[#F4F3EE] w-full max-w-md rounded-3xl p-8 flex flex-col items-center shadow-2xl z-10">
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 text-primary hover:opacity-70 transition-opacity"
        >
          <svg
            width="24"
            height="24"
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

        {submitted ? (
          <div className="text-center py-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#A38A76]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-primary font-medium text-lg leading-relaxed">
              Espero tu mensaje por WhatsApp para que chismeemos y trabajemos
              juntos en esa mejor versión.
            </p>
          </div>
        ) : (
          <>
            <div className="relative w-35 h-20 mb-4">
              <Image
                src="/assets/logo_3.png"
                alt="Kittyfits"
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-2xl font-bold text-primary text-center leading-tight mb-8">
              Cuéntame el chisme,
              <br />
              ¿en qué te puedo ayudar?
            </h3>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className="text-primary font-bold text-[15px]">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  placeholder="Maria Perez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded-xl px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-primary/40 font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary font-bold text-[15px]">
                  De qué país o ciudad me escribes?
                </label>
                <input
                  type="text"
                  required
                  placeholder="Punto Fijo, Venezuela"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white rounded-xl px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-primary/40 font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary font-bold text-[15px]">
                  En qué estás interesado?
                </label>
                <div className="relative w-full">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white rounded-xl px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer pr-10 font-medium"
                  >
                    <option value="Entrenamiento personalizado">
                      Entrenamiento personalizado
                    </option>
                    <option value="Asesorias online">Asesorias online</option>
                    <option value="Asesorias 1:1">Asesorias 1:1</option>
                    <option value="Colaboraciones">Colaboraciones</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary font-bold text-[15px]">
                  Cómo me conociste?
                </label>
                <div className="relative w-full">
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full bg-white rounded-xl px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer pr-10 font-medium"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Recomendación">Recomendación</option>
                    <option value="Otro">Otro</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#A38A76] text-[#F4F3EE] font-bold text-lg rounded-2xl py-4 mt-2 hover:bg-opacity-90 transition-all shadow-md"
              >
                Continuar por WhatsApp
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
