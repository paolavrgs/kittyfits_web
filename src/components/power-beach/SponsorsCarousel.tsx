import Image from "next/image";

interface Sponsor {
  name: string;
  file: string;
  // Tamaño real del archivo (ya recortado, sin márgenes transparentes)
  width: number;
  height: number;
  // Fondo negro para logos con texto claro (p. ej. Juanjo)
  darkBackground?: boolean;
}

// Para agregar un patrocinante: guardar el logo en public/assets/sponsors/
// (PNG transparente, recortado al contenido) y añadirlo a esta lista.
const sponsors: Sponsor[] = [
  {
    name: "Antártida Agua Purificada",
    file: "artartida.png",
    width: 600,
    height: 541,
  },
  { name: "Aurora", file: "aurora.png", width: 600, height: 205 },
  { name: "Chloe", file: "chloe.png", width: 600, height: 275 },
  { name: "Chunks Cookies", file: "chunks.png", width: 600, height: 183 },
  { name: "Corpus Sanus Gym", file: "corpus_gym.png", width: 505, height: 540 },
  {
    name: "Creative Studio",
    file: "creative_studio.png",
    width: 600,
    height: 600,
  },
  { name: "4to Muelle", file: "cuarto_muelle.png", width: 550, height: 320 },
  { name: "Eseence", file: "eseence.png", width: 600, height: 123 },
  {
    name: "Tini Pastelería & Repostería",
    file: "frambuesa.png",
    width: 600,
    height: 361,
  },
  {
    name: "Novedades Juanjo C.A.",
    file: "juanjo.png",
    width: 600,
    height: 517,
    darkBackground: true,
  },
  { name: "Larry's Burgers", file: "larrys.png", width: 600, height: 585 },
  { name: "Luxe Mis 3 Hermanas", file: "luxe.png", width: 600, height: 311 },
  {
    name: "Nail Art by Anais",
    file: "nailart_anais.png",
    width: 600,
    height: 190,
  },
  { name: "Odontocenter", file: "odontocenter.png", width: 600, height: 126 },
  { name: "Paolab Creative Lab", file: "paolab.png", width: 600, height: 198 },
  { name: "Quiropedia Dilia", file: "quiropedia.png", width: 600, height: 530 },
  {
    name: "Sabor Hogareño",
    file: "sabor_hogareno.png",
    width: 600,
    height: 600,
  },
  { name: "Sweet Love", file: "sweet_love.png", width: 600, height: 477 },
  { name: "Ultra Care", file: "ultracare.png", width: 513, height: 600 },
  { name: "Waby's Place", file: "wabys.png", width: 600, height: 600 },
  {
    name: "Xtreme Evolution Fitness",
    file: "xtreme_gym.jpg",
    width: 600,
    height: 224,
    darkBackground: true,
  },
];

// Proporción ancho/alto del área útil de la tarjeta
const BOX_RATIO = 2.2;
// Fracción del área útil que ocupa cada logo
const TARGET_AREA = 0.45;

// Da a todos los logos un peso visual parecido: los anchos se achican y los
// cuadrados crecen, en vez de forzar a todos a la misma altura.
const logoSize = ({ width, height }: Sponsor) => {
  const ratio = width / height;
  const h = Math.min(
    1,
    BOX_RATIO / ratio,
    Math.sqrt((TARGET_AREA * BOX_RATIO) / ratio),
  );
  const w = (ratio * h) / BOX_RATIO;
  return { width: `${w * 100}%`, height: `${h * 100}%` };
};

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => (
  <div
    className={`flex-shrink-0 w-40 h-24 md:w-52 md:h-28 mx-3 rounded-2xl flex items-center justify-center p-4 ${
      sponsor.darkBackground ? "bg-black" : "bg-white"
    }`}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative" style={logoSize(sponsor)}>
        <Image
          src={`/assets/sponsors/${sponsor.file}`}
          alt={sponsor.name}
          fill
          className="object-contain"
          sizes="176px"
          // El carrusel se mueve solo: con carga diferida las tarjetas
          // aparecían vacías un momento al entrar en pantalla
          loading="eager"
        />
      </div>
    </div>
  </div>
);

const SponsorsCarousel = () => {
  return (
    <section className="w-full py-8 md:py-10 flex flex-col items-center gap-6 md:gap-8">
      <h2 className="text-xl md:text-3xl font-extrabold text-primary uppercase tracking-wide text-center px-8">
        Nuestros patrocinantes
      </h2>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee">
          {/* La lista se duplica para que el desplazamiento sea continuo */}
          {[...sponsors, ...sponsors].map((sponsor, i) => (
            <div key={i} aria-hidden={i >= sponsors.length}>
              <SponsorCard sponsor={sponsor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsCarousel;
