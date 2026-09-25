"use server";

import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { db, sql } from "../../db";
import { events } from "../../db/schema";
import {
  ALLOWED_CAPTURE_TYPES,
  MAX_CAPTURE_BYTES,
  POWER_BEACH_SLUG,
} from "./constants";

export type RegistrationResult = {
  error: string | null;
  // "waitlist" = el pago se guardó pero ya no quedaban cupos
  status?: "confirmed" | "waitlist";
};

const text = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

export const registerParticipant = async (
  formData: FormData,
): Promise<RegistrationResult> => {
  const firstName = text(formData, "firstName");
  const lastName = text(formData, "lastName");
  const phone = text(formData, "phone");
  const age = Number(text(formData, "age"));
  const hasInjury = text(formData, "hasInjury") === "Sí";
  const injuryDetails = text(formData, "injuryDetails");
  const paymentReference = text(formData, "paymentReference");
  const capture = formData.get("paymentCapture");

  if (!firstName || !lastName || !phone) {
    return { error: "Completa tu nombre, apellido y teléfono." };
  }
  if (!Number.isInteger(age) || age < 1 || age > 100) {
    return { error: "Ingresa una edad válida." };
  }
  if (hasInjury && !injuryDetails) {
    return { error: "Cuéntanos cuál es tu lesión." };
  }
  if (!/^\d+$/.test(paymentReference)) {
    return { error: "La referencia del pago debe tener solo números." };
  }
  if (!(capture instanceof File) || capture.size === 0) {
    return { error: "Adjunta el capture del pago." };
  }
  if (!ALLOWED_CAPTURE_TYPES.includes(capture.type)) {
    return { error: "El capture debe ser una imagen o un PDF." };
  }
  if (capture.size > MAX_CAPTURE_BYTES) {
    return { error: "El capture es muy pesado (máximo 4 MB)." };
  }

  const [event] = await db
    .select({ id: events.id, capacity: events.capacity })
    .from(events)
    .where(eq(events.slug, POWER_BEACH_SLUG));
  if (!event) {
    return { error: "El evento no está disponible." };
  }

  let status: RegistrationResult["status"];
  try {
    const extension = capture.name.split(".").pop()?.toLowerCase() || "bin";
    const blob = await put(
      `eventos/${POWER_BEACH_SLUG}/${randomUUID()}.${extension}`,
      capture,
      { access: "private", contentType: capture.type },
    );

    // El bloqueo por evento serializa las inscripciones simultáneas, así el
    // conteo de cupos no se puede pasar del límite. Si ya está lleno, se guarda
    // igual como "waitlist" porque la persona ya pagó.
    const [, [inserted]] = await sql.transaction([
      sql`SELECT pg_advisory_xact_lock(${event.id})`,
      sql`
        INSERT INTO registrations (
          event_id, first_name, last_name, phone, age, has_injury,
          injury_details, payment_reference, payment_capture_pathname, status
        )
        SELECT
          ${event.id}, ${firstName}, ${lastName}, ${phone}, ${age}, ${hasInjury},
          ${hasInjury ? injuryDetails : null}, ${paymentReference}, ${blob.pathname},
          CASE
            WHEN ${event.capacity}::int IS NULL OR (
              SELECT count(*) FROM registrations
              WHERE event_id = ${event.id} AND status = 'confirmed'
            ) < ${event.capacity}::int
            THEN 'confirmed'
            ELSE 'waitlist'
          END
        RETURNING status
      `,
    ]);
    status = inserted.status;
  } catch (error) {
    console.error("Error registrando participante", error);
    return {
      error:
        "No pudimos guardar tu inscripción. Intenta de nuevo en unos minutos.",
    };
  }

  return { error: null, status };
};
