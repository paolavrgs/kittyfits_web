import type { Metadata } from "next";
import { connection } from "next/server";
import PowerBeachNavbar from "../../components/power-beach/PowerBeachNavbar";
import RegistrationForm from "../../components/power-beach/RegistrationForm";
import SponsorsCarousel from "../../components/power-beach/SponsorsCarousel";
import Footer from "../../components/Footer";
import { getEventAvailability } from "../../db/queries";
import { getBcvRate, toBolivares } from "../../lib/bcv";
import { formatBolivares, formatRateDate } from "../../lib/format";
import { POWER_BEACH_SLUG, PRICE_USD } from "./constants";
import type { PaymentAmount } from "../../components/power-beach/PaymentInfo";

const description =
  "Power Beach 2.0: 8 estaciones funcionales y un desafío final por equipos en Playa Bahía Grande, 24 de octubre de 2026. $15 por persona. Cupos limitados.";

export const metadata: Metadata = {
  title: "Power Beach 2.0 | Kitty Fits",
  description,
  alternates: {
    canonical: "https://kittyfits.com/power-beach",
  },
  openGraph: {
    title: "Power Beach 2.0 | Kitty Fits",
    description,
    url: "https://kittyfits.com/power-beach",
    siteName: "Kitty Fits",
    locale: "es_VE",
    type: "website",
  },
};

const PowerBeach = async () => {
  // Los cupos cambian con cada inscripción: renderizar en cada visita
  await connection();
  const [availability, bcv] = await Promise.all([
    getEventAvailability(POWER_BEACH_SLUG),
    getBcvRate(),
  ]);
  const isFull = availability?.isFull ?? false;

  let paymentAmount: PaymentAmount | null = null;
  if (bcv) {
    const amount = toBolivares(PRICE_USD, bcv.rate);
    paymentAmount = {
      display: formatBolivares(amount),
      copyValue: amount.toFixed(2).replace(".", ","),
      rateDisplay: formatBolivares(bcv.rate),
      rateDate: formatRateDate(bcv.date),
    };
  }

  const details: { label: string; value: string; note?: string }[] = [
    { label: "Fecha", value: "24 oct 2026" },
    { label: "Lugar", value: "Playa Bahía Grande" },
    {
      label: "Precio",
      value: `$${PRICE_USD} por persona`,
      note: paymentAmount
        ? `≈ Bs. ${paymentAmount.display} · tasa BCV del ${paymentAmount.rateDate}`
        : "a tasa BCV",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-hidden">
      <PowerBeachNavbar />
      <main className="flex-1 flex flex-col w-full">
        <section className="w-full px-8 md:px-16 pt-8 pb-4 md:pb-6 mx-auto max-w-[1440px] flex flex-col items-center text-center gap-6">
          <span
            className={`font-bold uppercase tracking-[0.3em] text-sm ${
              isFull ? "text-red-700" : "text-primary"
            }`}
          >
            {isFull ? "Cupos agotados" : "Cupos limitados"}
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-foreground uppercase leading-[0.95]">
            Power Beach <span className="text-primary">2.0</span>
          </h1>
          <p className="text-primary text-lg md:text-xl leading-[1.3] max-w-2xl">
            Vuelve el reto más intenso frente al mar. Arena, sol y mucha
            energía: pon a prueba tu fuerza y resistencia en{" "}
            <strong>8 estaciones funcionales</strong> y cierra con un{" "}
            <strong>desafío final por equipos</strong>.
          </p>
          <p className="text-primary text-lg md:text-xl font-bold leading-[1.3]">
            Si no vienes por todo, ¿a qué vienes?
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mt-4">
            {details.map((detail) => (
              <li
                key={detail.label}
                className="bg-[#EAE5DB] rounded-2xl px-6 py-5 flex flex-col gap-1"
              >
                <span className="text-primary/70 text-xs font-bold uppercase tracking-widest">
                  {detail.label}
                </span>
                <span className="text-foreground font-bold text-lg">
                  {detail.value}
                </span>
                {detail.note && (
                  <span className="text-primary text-sm font-medium">
                    {detail.note}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <SponsorsCarousel />

        <section
          id="inscripcion"
          className="w-full px-4 md:px-16 pb-12 mx-auto max-w-[1440px] flex justify-center"
        >
          <RegistrationForm isFull={isFull} paymentAmount={paymentAmount} />
        </section>
      </main>
      <Footer compact />
    </div>
  );
};

export default PowerBeach;
