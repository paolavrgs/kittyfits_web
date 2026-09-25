import "server-only";
import { and, count, eq } from "drizzle-orm";
import { db } from ".";
import { events, registrations } from "./schema";

export const getEventAvailability = async (slug: string) => {
  const [event] = await db
    .select({
      id: events.id,
      capacity: events.capacity,
      confirmed: count(registrations.id),
    })
    .from(events)
    .leftJoin(
      registrations,
      and(
        eq(registrations.eventId, events.id),
        eq(registrations.status, "confirmed"),
      ),
    )
    .where(eq(events.slug, slug))
    .groupBy(events.id);

  if (!event) return null;

  return {
    ...event,
    isFull: event.capacity !== null && event.confirmed >= event.capacity,
  };
};
