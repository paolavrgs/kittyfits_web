import Link from "next/link";
import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "../../../../../db";
import { events, registrations } from "../../../../../db/schema";
import { requireAdmin } from "../../../../../lib/admin-auth";
import { formatEventDate } from "../../../../../lib/format";
import ParticipantsTable from "../../../../../components/admin/ParticipantsTable";

const AdminEventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  await requireAdmin();
  const { slug } = await params;

  const [event] = await db.select().from(events).where(eq(events.slug, slug));
  if (!event) notFound();

  const participants = await db
    .select()
    .from(registrations)
    .where(eq(registrations.eventId, event.id))
    .orderBy(desc(registrations.createdAt));

  const confirmed = participants.filter((p) => p.status === "confirmed");
  const waitlist = participants.filter((p) => p.status === "waitlist");
  const withInjury = confirmed.filter((p) => p.hasInjury).length;

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/eventos"
        className="text-sm font-bold text-primary hover:opacity-70 w-fit"
      >
        ← Eventos
      </Link>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary uppercase">
            {event.name}
          </h1>
          <p className="text-primary mt-1">
            {formatEventDate(event.date)} · {event.location}
          </p>
        </div>
        {participants.length > 0 && (
          <a
            href={`/admin/eventos/${event.slug}/csv`}
            className="bg-primary text-background font-bold text-sm rounded-xl px-5 py-3 w-fit hover:bg-opacity-90"
          >
            Descargar CSV
          </a>
        )}
      </div>

      <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
        <div className="bg-white rounded-2xl p-4">
          <dt className="text-xs font-bold uppercase tracking-widest text-primary/70">
            Participantes
          </dt>
          <dd className="text-3xl font-extrabold text-primary">
            {confirmed.length}
            {event.capacity !== null && (
              <span className="text-lg text-primary/60">
                {" "}
                / {event.capacity}
              </span>
            )}
          </dd>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <dt className="text-xs font-bold uppercase tracking-widest text-primary/70">
            Con lesión
          </dt>
          <dd className="text-3xl font-extrabold text-primary">{withInjury}</dd>
        </div>
        {waitlist.length > 0 && (
          <div className="bg-red-50 rounded-2xl p-4">
            <dt className="text-xs font-bold uppercase tracking-widest text-red-700/80">
              Pagó sin cupo
            </dt>
            <dd className="text-3xl font-extrabold text-red-700">
              {waitlist.length}
            </dd>
          </div>
        )}
      </dl>

      {confirmed.length === 0 ? (
        <p className="text-primary bg-white rounded-2xl p-6">
          Todavía no hay participantes registrados.
        </p>
      ) : (
        <ParticipantsTable participants={confirmed} />
      )}

      {waitlist.length > 0 && (
        <section className="flex flex-col gap-3 mt-4">
          <h2 className="text-xl font-extrabold text-red-700 uppercase">
            Pagó sin cupo
          </h2>
          <p className="text-primary text-sm max-w-2xl">
            Estas personas enviaron su pago cuando los cupos ya estaban
            agotados. Contáctalas para reembolsar o para darles un cupo si
            alguien cancela.
          </p>
          <ParticipantsTable participants={waitlist} />
        </section>
      )}
    </div>
  );
};

export default AdminEventDetail;
