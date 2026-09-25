"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { PAGO_MOVIL, PRICE_USD } from "../../app/power-beach/constants";

export interface PaymentAmount {
  // Monto en bolívares ya formateado ("12.834,94") y su valor para copiar
  display: string;
  copyValue: string;
  rateDisplay: string;
  rateDate: string;
}

const useCopy = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Algunos navegadores internos (p. ej. el de Instagram) bloquean la
      // Clipboard API; se usa el método antiguo como respaldo
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      if (!ok) return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return { copied, copy };
};

const CopyRow = ({
  label,
  value,
  copyValue,
}: {
  label: string;
  value: string;
  copyValue: string;
}) => {
  const { copied, copy } = useCopy();

  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-primary/10 last:border-0">
      <div className="flex flex-col min-w-0">
        <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">
          {label}
        </span>
        <span className="text-foreground font-bold truncate">{value}</span>
      </div>
      <button
        type="button"
        onClick={() => copy(copyValue)}
        aria-label={copied ? "Copiado" : `Copiar ${label.toLowerCase()}`}
        title={copied ? "Copiado" : "Copiar"}
        className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-primary hover:bg-[#EAE5DB] transition-colors cursor-pointer"
      >
        {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
      </button>
    </div>
  );
};

const PaymentInfo = ({ amount }: { amount: PaymentAmount | null }) => {
  const { copied, copy } = useCopy();

  const amountText = amount
    ? `Bs. ${amount.display}`
    : `$${PRICE_USD} a tasa BCV del día`;
  const allData = [
    "Pago móvil",
    `Banco: ${PAGO_MOVIL.bank}`,
    `Teléfono: ${PAGO_MOVIL.phone}`,
    `Cédula: ${PAGO_MOVIL.idNumber}`,
    `Monto: ${amountText}`,
  ].join("\n");

  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-1">
        <h3 className="text-primary font-bold text-[15px]">
          Datos de pago móvil
        </h3>
        <button
          type="button"
          onClick={() => copy(allData)}
          className="flex items-center gap-1.5 text-xs font-bold text-primary bg-[#EAE5DB] rounded-lg px-3 py-2 hover:opacity-80 cursor-pointer"
        >
          {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
          {copied ? "¡Copiado!" : "Copiar todos"}
        </button>
      </div>

      {amount ? (
        <CopyRow
          label="Monto"
          value={amountText}
          copyValue={amount.copyValue}
        />
      ) : (
        <div className="py-2 border-b border-primary/10">
          <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">
            Monto
          </span>
          <p className="text-foreground font-bold">{amountText}</p>
        </div>
      )}
      <CopyRow label="Banco" value={PAGO_MOVIL.bank} copyValue="0134" />
      <CopyRow
        label="Teléfono"
        value={PAGO_MOVIL.phone}
        copyValue={PAGO_MOVIL.phone}
      />
      <CopyRow
        label="Cédula"
        value={PAGO_MOVIL.idNumber}
        copyValue={PAGO_MOVIL.idNumber}
      />
      {amount && (
        <p className="text-primary/70 text-xs font-medium mt-2">
          ${PRICE_USD} × Bs. {amount.rateDisplay} (tasa BCV del{" "}
          {amount.rateDate})
        </p>
      )}
    </div>
  );
};

export default PaymentInfo;
