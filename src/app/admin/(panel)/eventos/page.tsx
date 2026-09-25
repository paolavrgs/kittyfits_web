import Link from "next/link";
import { and, count, desc, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { events, registrations } from "../../../../db/schema";
import { requireAdmin } from "../../../../lib/admin-auth";
import { formatEventDate } from "../../../../lib/format";

const AdminEvents = async () => {
  await requireAdmin();

  const rows = await db
    .select({
      slug: events.slug,
      name: events.name,
      date: events.date,
      location: events.location,
      capacity: events.capacity,
      participants: count(registrations.id),
    })
    .from(events)
    .leftJoin(
      registrations,
      and(
        eq(registrations.eventId, events.id),
        eq(registrations.status, "confirmed"),
      ),
    )
    .groupBy(events.id)
    .orderBy(desc(events.date));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary uppercase">
        Eventos
      </h1>

      {rows.length === 0 ? (
        <p className="text-primary">Todavía no hay eventos.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((event) => (
            <li key={event.slug}>
              <Link
                href={`/admin/eventos/${event.slug}`}
                className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg font-bold text-foreground">
                  {event.name}
                </h2>
                <p className="text-primary text-sm mt-1">
                  {formatEventDate(event.date)} · {event.location}
                </p>
                <p className="mt-4 text-3xl font-extrabold text-primary">
                  {event.participants}
                  <span className="text-sm font-bold ml-2">
                    {event.participants === 1
                      ? "participante"
                      : "participantes"}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminEvents;
