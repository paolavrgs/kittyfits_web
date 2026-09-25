import { get } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { registrations } from "../../../../db/schema";
import { isAdmin } from "../../../../lib/admin-auth";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Sirve el capture del pago desde el Blob privado, solo a una sesión de admin
export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  if (!(await isAdmin())) {
    return new Response("No autorizado", { status: 401 });
  }
  const { id } = await params;
  if (!UUID_PATTERN.test(id)) {
    return new Response("No encontrado", { status: 404 });
  }

  const [registration] = await db
    .select({ pathname: registrations.paymentCapturePathname })
    .from(registrations)
    .where(eq(registrations.id, id));
  if (!registration) return new Response("No encontrado", { status: 404 });

  const result = await get(registration.pathname, { access: "private" });
  if (!result || result.statusCode !== 200) {
    return new Response("Archivo no encontrado", { status: 404 });
  }

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
