const TIME_ZONE = "America/Caracas";

export const formatEventDate = (isoDate: string) =>
  new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("es-VE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  });

export const formatDateTime = (date: Date) =>
  date.toLocaleString("es-VE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  });

// 0414 123 4567 -> 584141234567 para enlaces de WhatsApp
export const toWhatsAppNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `58${digits.slice(1)}` : digits;
};

// 12834.94 -> "12.834,94"
export const formatBolivares = (amount: number) =>
  amount.toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// "2026-09-26" -> "sábado, 26/09"
export const formatRateDate = (isoDate: string) =>
  new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("es-VE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC",
  });

// Columnas numeric de Postgres llegan como texto: "12855.09" -> "Bs. 12.855,09"
export const formatAmountBs = (amountBs: string | null) =>
  amountBs === null ? "—" : `Bs. ${formatBolivares(Number(amountBs))}`;
