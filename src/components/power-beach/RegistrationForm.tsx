"use client";

import { useState, useTransition } from "react";
import { flushSync } from "react-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiCheckCircle, FiChevronDown } from "react-icons/fi";
import PaymentInfo, { type PaymentAmount } from "./PaymentInfo";
import { trackEvent } from "../../lib/gtm";
import {
  registerParticipant,
  type RegistrationResult,
} from "../../app/power-beach/actions";
import {
  ALLOWED_CAPTURE_TYPES,
  MAX_CAPTURE_BYTES,
} from "../../app/power-beach/constants";

const inputClassName =
  "w-full bg-white rounded-xl px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-primary/40 font-medium";
const labelClassName = "text-primary font-bold text-[15px]";

const MAX_IMAGE_SIDE = 1800;

// Reduce las fotos del teléfono antes de subirlas. Si el navegador no puede
// procesar la imagen (p. ej. HEIC fuera de Safari) se envía el archivo original.
const compressImage = async (file: File): Promise<File> => {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(
      1,
      MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas
      .getContext("2d")!
      .drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.85),
    );
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
};

const SoldOutStamp = () => (
  <div
    aria-hidden
    className="absolute left-1/2 top-24 z-10 -translate-x-1/2 -rotate-12 pointer-events-none"
  >
    <div className="border-4 border-red-700 rounded-xl px-4 py-2 sm:px-6 sm:py-3 bg-background/90 shadow-lg">
      <span className="block text-red-700 font-extrabold text-xl sm:text-3xl uppercase tracking-wider sm:tracking-widest whitespace-nowrap">
        Cupos agotados
      </span>
    </div>
  </div>
);

interface RegistrationFormProps {
  isFull: boolean;
  paymentAmount: PaymentAmount | null;
}

const RegistrationForm = ({ isFull, paymentAmount }: RegistrationFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [hasInjury, setHasInjury] = useState("No");
  const [injuryDetails, setInjuryDetails] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentCapture, setPaymentCapture] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const paymentComplete = Boolean(paymentReference && paymentCapture);
  const [status, setStatus] = useState<"confirmed" | "waitlist" | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missingField = [
      firstName,
      lastName,
      phone,
      age,
      hasInjury === "Sí" ? injuryDetails : "ok",
      paymentReference,
    ].some((value) => !value.trim());
    if (missingField || !paymentCapture) {
      setError("Completa todos los campos antes de enviar.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const capture = await compressImage(paymentCapture);
      if (capture.size > MAX_CAPTURE_BYTES) {
        setError("El capture es muy pesado (máximo 4 MB).");
        return;
      }

      const formData = new FormData();
      formData.set("firstName", firstName);
      formData.set("lastName", lastName);
      formData.set("phone", phone);
      formData.set("age", age);
      formData.set("hasInjury", hasInjury);
      formData.set("injuryDetails", injuryDetails);
      formData.set("paymentReference", paymentReference);
      formData.set("paymentCapture", capture);

      const result: RegistrationResult = await registerParticipant(
        formData,
      ).catch(() => ({
        error:
          "No pudimos enviar tu inscripción. Revisa tu conexión e intenta de nuevo.",
      }));

      if (result.error) {
        setError(result.error);
        return;
      }

      trackEvent("power_beach_registration", {
        user_age: age,
        has_injury: hasInjury,
        registration_status: result.status,
      });
      setStatus(result.status ?? "confirmed");
    });
  };

  if (status === "waitlist") {
    const message = `¡Hola Kitty!♡ Pagué mi inscripción a Power Beach 2.0 pero no pude inscribirme porque se agotaron los cupos.\nNombre: ${firstName} ${lastName}\nTeléfono: ${phone}\nReferencia de pago: ${paymentReference}`;
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return (
      <div
        role="alert"
        className="w-full max-w-md bg-[#EAE5DB] rounded-3xl p-8 text-center flex flex-col items-center gap-5"
      >
        <div className="border-4 border-red-700 rounded-xl px-5 py-2 -rotate-6">
          <span className="text-red-700 font-extrabold text-2xl uppercase tracking-widest">
            Cupos agotados
          </span>
        </div>
        <p className="text-primary font-medium text-lg leading-relaxed">
          Los cupos se agotaron justo antes de tu inscripción. Guardamos tus
          datos y tu comprobante de pago: escríbele a Kitty por WhatsApp para
          resolverlo.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent("social_click", {
              platform: "whatsapp",
              location: "power_beach_sold_out",
            });
          }}
          className="w-full flex items-center justify-center gap-3 bg-[#A38A76] text-[#F4F3EE] font-bold text-lg rounded-2xl py-4 hover:bg-opacity-90 transition-all shadow-md"
        >
          <FaWhatsapp size={24} />
          Contactar a Kitty
        </a>
      </div>
    );
  }

  if (status === "confirmed") {
    return (
      <div className="w-full max-w-md bg-[#EAE5DB] rounded-3xl p-8 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-[#A38A76]/20 rounded-full flex items-center justify-center mb-6">
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
          ¡Inscripción recibida! Revisaremos tu pago y te contactaremos para
          confirmar tu cupo en Power Beach 2.0.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md bg-[#EAE5DB] rounded-3xl p-8 flex flex-col gap-5"
    >
      {isFull && <SoldOutStamp />}

      <h2 className="text-2xl font-bold text-primary text-center leading-tight mb-2">
        Reserva tu cupo
      </h2>

      <fieldset
        disabled={isFull}
        className="flex flex-col gap-5 min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="pb-first-name" className={labelClassName}>
              Nombre
            </label>
            <input
              id="pb-first-name"
              type="text"
              required
              autoComplete="given-name"
              placeholder="María"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClassName}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pb-last-name" className={labelClassName}>
              Apellido
            </label>
            <input
              id="pb-last-name"
              type="text"
              required
              autoComplete="family-name"
              placeholder="Pérez"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="pb-phone" className={labelClassName}>
            Número de teléfono
          </label>
          <input
            id="pb-phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="0414 1234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="pb-age" className={labelClassName}>
            Edad
          </label>
          <input
            id="pb-age"
            type="number"
            required
            min={1}
            max={100}
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={inputClassName}
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className={`${labelClassName} mb-2`}>
            ¿Sufres de alguna lesión?
          </legend>
          <div className="flex gap-3">
            {["No", "Sí"].map((option) => (
              <label
                key={option}
                className={`flex-1 text-center rounded-xl px-4 py-3 font-bold cursor-pointer transition-colors ${
                  hasInjury === option
                    ? "bg-primary text-background"
                    : "bg-white text-primary"
                }`}
              >
                <input
                  type="radio"
                  name="pb-injury"
                  value={option}
                  checked={hasInjury === option}
                  onChange={(e) => setHasInjury(e.target.value)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
          {hasInjury === "Sí" && (
            <textarea
              required
              rows={3}
              aria-label="Describe tu lesión"
              placeholder="Cuéntanos cuál lesión y desde cuándo"
              value={injuryDetails}
              onChange={(e) => setInjuryDetails(e.target.value)}
              className={`${inputClassName} mt-2 resize-none`}
            />
          )}
        </fieldset>

        <div className="bg-white/60 rounded-2xl">
          <button
            type="button"
            onClick={() => setPaymentOpen((open) => !open)}
            aria-expanded={paymentOpen}
            aria-controls="pb-payment-section"
            className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left cursor-pointer"
          >
            <span className="flex flex-col">
              <span className={labelClassName}>Pago y comprobante</span>
              {paymentAmount && !isFull && (
                <span className="text-primary/70 text-xs font-medium">
                  Bs. {paymentAmount.display} por pago móvil
                </span>
              )}
            </span>
            <span className="flex items-center gap-2 text-primary">
              {paymentComplete && (
                <FiCheckCircle size={18} aria-label="Completo" />
              )}
              <FiChevronDown
                size={20}
                className={`transition-transform ${paymentOpen ? "rotate-180" : ""}`}
              />
            </span>
          </button>

          {/* Se oculta sin desmontar para no perder el archivo seleccionado */}
          <div
            id="pb-payment-section"
            hidden={!paymentOpen}
            className="px-4 pb-4"
          >
            <div className="flex flex-col gap-5">
              {/* Sin cupos no se muestran los datos de pago para que nadie pague */}
              {!isFull && <PaymentInfo amount={paymentAmount} />}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="pb-payment-reference"
                  className={labelClassName}
                >
                  Referencia del pago
                </label>
                <input
                  id="pb-payment-reference"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  title="Solo números"
                  required
                  placeholder="Últimos dígitos de la referencia"
                  value={paymentReference}
                  onChange={(e) =>
                    setPaymentReference(e.target.value.replace(/\D/g, ""))
                  }
                  className={inputClassName}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pb-payment-capture" className={labelClassName}>
                  Capture del pago
                </label>
                <input
                  id="pb-payment-capture"
                  type="file"
                  required
                  accept={ALLOWED_CAPTURE_TYPES.join(",")}
                  onChange={(e) =>
                    setPaymentCapture(e.target.files?.[0] ?? null)
                  }
                  className="w-full bg-white rounded-xl px-4 py-3 text-primary/70 font-medium text-sm cursor-pointer file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:text-background file:font-bold file:px-4 file:py-2 file:cursor-pointer"
                />
                {paymentCapture && (
                  <span className="text-primary/70 text-xs font-medium truncate">
                    {paymentCapture.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-primary/80 text-sm leading-snug bg-white/60 rounded-xl p-4">
          <strong className="text-primary">Importante:</strong> Power Beach es
          un circuito de alto impacto. Cada participante asume bajo su propia
          responsabilidad los riesgos de participar, considerando sus lesiones y
          su condición física.
        </p>

        {error && (
          <p
            role="alert"
            className="text-red-700 text-sm font-medium bg-red-50 rounded-xl p-4"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          // Abre el desplegable antes de la validación del navegador para que
          // pueda señalar la referencia o el capture si faltan
          onClick={() => {
            if (!paymentComplete) flushSync(() => setPaymentOpen(true));
          }}
          disabled={isPending || isFull}
          className={`w-full bg-[#A38A76] text-[#F4F3EE] font-bold text-lg rounded-2xl py-4 hover:bg-opacity-90 transition-all shadow-md cursor-pointer disabled:opacity-60 ${
            isPending ? "disabled:cursor-wait" : "disabled:cursor-not-allowed"
          }`}
        >
          {isPending ? "Enviando..." : "Inscribirme"}
        </button>
      </fieldset>
    </form>
  );
};

export default RegistrationForm;
