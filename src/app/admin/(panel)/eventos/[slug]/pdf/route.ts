import { asc, eq } from "drizzle-orm";
import { db } from "../../../../../../db";
import { events, registrations } from "../../../../../../db/schema";
import { isAdmin } from "../../../../../../lib/admin-auth";
import { buildParticipantsPdf } from "../../../../../../lib/participants-pdf";

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
    .orderBy(asc(registrations.createdAt));

  return new Response(buildParticipantsPdf(event, participants), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${event.slug}-participantes.pdf"`,
    },
  });
};
