import {
  boolean,
  date,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  date: date("date").notNull(),
  location: text("location").notNull(),
  // Máximo de participantes confirmados; null = sin límite
  capacity: integer("capacity"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const registrations = pgTable("registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  age: integer("age").notNull(),
  hasInjury: boolean("has_injury").notNull(),
  injuryDetails: text("injury_details"),
  // Monto a pagar calculado con la tasa BCV vigente al inscribirse
  // (null si no se pudo obtener la tasa). No está verificado contra el banco.
  amountBs: numeric("amount_bs", { precision: 14, scale: 2 }),
  bcvRate: numeric("bcv_rate", { precision: 14, scale: 4 }),
  bcvRateDate: date("bcv_rate_date"),
  paymentReference: text("payment_reference").notNull(),
  // Ruta del archivo en el Blob store privado; se sirve solo vía /admin
  paymentCapturePathname: text("payment_capture_pathname").notNull(),
  // "waitlist" = pagó pero ya no había cupo al momento de inscribirse
  status: text("status", { enum: ["confirmed", "waitlist"] })
    .notNull()
    .default("confirmed"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type Registration = typeof registrations.$inferSelect;
