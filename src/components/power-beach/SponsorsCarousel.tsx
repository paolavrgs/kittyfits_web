import Image from "next/image";

interface Sponsor {
  name: string;
  logo?: string;
}

// Agregar aquí los patrocinantes: { name: "Marca", logo: "/assets/sponsors/marca.png" }
// Los que no tengan logo se muestran como espacio reservado.
const SPONSOR_SLOTS = 24;
const sponsors: Sponsor[] = [];

const slots: Sponsor[] = Array.from(
  { length: Math.max(SPONSOR_SLOTS, sponsors.length) },
  (_, i) => sponsors[i] ?? { name: `Patrocinante ${i + 1}` },
);

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => (
  <div className="flex-shrink-0 w-36 h-20 md:w-44 md:h-24 mx-3 bg-white rounded-2xl flex items-center justify-center p-4">
    {sponsor.logo ? (
      <div className="relative w-full h-full">
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          fill
          className="object-contain"
          sizes="176px"
        />
      </div>
    ) : (
      <span className="text-primary/40 text-xs font-bold uppercase tracking-wide text-center">
        Tu logo aquí
      </span>
    )}
  </div>
);

const SponsorsCarousel = () => {
  return (
    <section className="w-full py-12 md:py-20 flex flex-col items-center gap-10">
      <h2 className="text-xl md:text-3xl font-extrabold text-primary uppercase tracking-wide text-center px-8">
        Nuestros patrocinantes
      </h2>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee">
          {/* La lista se duplica para que el desplazamiento sea continuo */}
          {[...slots, ...slots].map((sponsor, i) => (
            <div key={i} aria-hidden={i >= slots.length}>
              <SponsorCard sponsor={sponsor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsCarousel;
