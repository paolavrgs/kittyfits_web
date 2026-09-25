import { asc, eq } from "drizzle-orm";
import { db } from "../../../../../../db";
import { events, registrations } from "../../../../../../db/schema";
import { isAdmin } from "../../../../../../lib/admin-auth";
import { formatDateTime } from "../../../../../../lib/format";

const csvCell = (value: string | number) => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  if (!(await isAdmin())) {
    return new Response("No autorizado", { status: 401 });
  }
  const { slug } = await params;

  const [event] = await db.select().from(events).where(eq(events.slug, slug));
  if (!event) return new Response("Evento no encontrado", { status: 404 });

  const participants = await db
    .select()
    .from(registrations)
    .where(eq(registrations.eventId, event.id))
    .orderBy(asc(registrations.status), asc(registrations.createdAt));

  const header = [
    "Estado",
    "Nombre",
    "Apellido",
    "Teléfono",
    "Edad",
    "Lesión",
    "Detalle lesión",
    "Referencia de pago",
    "Fecha de registro",
  ];
  const rows = participants.map((p) => [
    p.status === "confirmed" ? "Confirmado" : "Pagó sin cupo",
    p.firstName,
    p.lastName,
    p.phone,
    p.age,
    p.hasInjury ? "Sí" : "No",
    p.injuryDetails ?? "",
    p.paymentReference,
    formatDateTime(p.createdAt),
  ]);

  // BOM para que Excel reconozca los acentos
  const csv =
    "﻿" + [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}-participantes.csv"`,
    },
  });
};
