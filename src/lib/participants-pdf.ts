import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import type { Event, Registration } from "../db/schema";
import {
  formatAmountBs,
  formatBolivares,
  formatDateTime,
  formatEventDate,
} from "./format";

const PRIMARY: [number, number, number] = [158, 128, 107];
const MARGIN = 14;

const participantRows = (participants: Registration[]) =>
  participants.map((p, i) => [
    i + 1,
    `${p.firstName} ${p.lastName}`,
    p.phone,
    p.age,
    p.hasInjury ? `Sí: ${p.injuryDetails}` : "No",
    formatAmountBs(p.amountBs),
    p.bcvRate ? formatBolivares(Number(p.bcvRate)) : "—",
    p.paymentReference,
    formatDateTime(p.createdAt),
  ]);

const HEAD = [
  [
    "#",
    "Nombre",
    "Teléfono",
    "Edad",
    "Lesión",
    "Monto",
    "Tasa BCV",
    "Referencia",
    "Registro",
  ],
];

const addTable = (doc: jsPDF, participants: Registration[], startY: number) => {
  autoTable(doc, {
    head: HEAD,
    body: participantRows(participants),
    startY,
    margin: { left: MARGIN, right: MARGIN },
    styles: { fontSize: 9, cellPadding: 2.5, textColor: [15, 17, 26] },
    headStyles: { fillColor: PRIMARY, textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [244, 243, 238] },
    // Anchos fijos para que ambas tablas queden alineadas; Lesión toma el resto
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 42 },
      2: { cellWidth: 28 },
      3: { cellWidth: 15 },
      4: { cellWidth: "auto" },
      5: { cellWidth: 28, halign: "right", fontStyle: "bold" },
      6: { cellWidth: 20, halign: "right" },
      7: { cellWidth: 26 },
      8: { cellWidth: 38 },
    },
    didParseCell: ({ section, column, cell }) => {
      if (section === "head" && (column.index === 5 || column.index === 6)) {
        cell.styles.halign = "right";
      }
    },
  });
  // Posición final de la última tabla dibujada
  return (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable
    .finalY;
};

// Lista de participantes de un evento (sin captures) en PDF horizontal
export const buildParticipantsPdf = (
  event: Event,
  participants: Registration[],
): ArrayBuffer => {
  const confirmed = participants.filter((p) => p.status === "confirmed");
  const waitlist = participants.filter((p) => p.status === "waitlist");

  const totalBs = confirmed.reduce(
    (sum, p) => sum + Number(p.amountBs ?? 0),
    0,
  );
  const withoutAmount = confirmed.filter((p) => p.amountBs === null).length;

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...PRIMARY);
  doc.text(`${event.name} · Participantes`, MARGIN, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(15, 17, 26);
  doc.text(`${formatEventDate(event.date)} · ${event.location}`, MARGIN, 25);

  const capacity = event.capacity !== null ? ` / ${event.capacity}` : "";
  const summary = [
    `Confirmados: ${confirmed.length}${capacity}`,
    `Con lesión: ${confirmed.filter((p) => p.hasInjury).length}`,
    `Total: Bs. ${formatBolivares(totalBs)}${
      withoutAmount ? ` (${withoutAmount} sin monto)` : ""
    }`,
  ];
  if (waitlist.length) summary.push(`Pagó sin cupo: ${waitlist.length}`);
  doc.text(summary.join("   ·   "), MARGIN, 31);

  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(`Generado: ${formatDateTime(new Date())}`, MARGIN, 36);

  let y = 42;
  if (confirmed.length === 0) {
    doc.setFontSize(11);
    doc.setTextColor(15, 17, 26);
    doc.text("Todavía no hay participantes confirmados.", MARGIN, y + 4);
    y += 10;
  } else {
    y = addTable(doc, confirmed, y);
  }

  if (waitlist.length) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(185, 28, 28);
    doc.text("Pagó sin cupo", MARGIN, y + 10);
    addTable(doc, waitlist, y + 14);
  }

  // Número de página en cada hoja
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120);
    const { width, height } = doc.internal.pageSize;
    doc.text(`Página ${page} de ${pages}`, width - MARGIN, height - 8, {
      align: "right",
    });
  }

  return doc.output("arraybuffer");
};
