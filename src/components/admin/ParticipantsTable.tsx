import type { Registration } from "../../db/schema";
import {
  formatAmountBs,
  formatBolivares,
  formatDateTime,
  toWhatsAppNumber,
} from "../../lib/format";

const ParticipantsTable = ({
  participants,
}: {
  participants: Registration[];
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase tracking-wider text-primary/70 border-b border-primary/10">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Teléfono</th>
            <th className="px-4 py-3">Edad</th>
            <th className="px-4 py-3">Lesión</th>
            <th className="px-4 py-3">Monto</th>
            <th className="px-4 py-3">Referencia</th>
            <th className="px-4 py-3">Capture</th>
            <th className="px-4 py-3">Registro</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p, i) => (
            <tr
              key={p.id}
              className="border-b border-primary/5 last:border-0 align-top"
            >
              <td className="px-4 py-3 text-primary/60">
                {participants.length - i}
              </td>
              <td className="px-4 py-3 font-bold whitespace-nowrap">
                {p.firstName} {p.lastName}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <a
                  href={`https://wa.me/${toWhatsAppNumber(p.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  {p.phone}
                </a>
              </td>
              <td className="px-4 py-3">{p.age}</td>
              <td className="px-4 py-3 min-w-48">
                {p.hasInjury ? (
                  <span className="text-red-700">Sí: {p.injuryDetails}</span>
                ) : (
                  "No"
                )}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-bold">{formatAmountBs(p.amountBs)}</span>
                {p.bcvRate && (
                  <span className="block text-xs text-primary/60">
                    Tasa {formatBolivares(Number(p.bcvRate))}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 font-mono">{p.paymentReference}</td>
              <td className="px-4 py-3">
                <a
                  href={`/admin/capturas/${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold underline underline-offset-2 whitespace-nowrap"
                >
                  Ver capture
                </a>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-primary/70">
                {formatDateTime(p.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsTable;
