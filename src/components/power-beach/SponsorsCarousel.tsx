"use client";

import Image from "next/image";
import { trackEvent } from "../../lib/gtm";

interface Sponsor {
  name: string;
  file: string;
  // Tamaño real del archivo (ya recortado, sin márgenes transparentes)
  width: number;
  height: number;
  // Fondo negro para logos con texto claro (p. ej. Juanjo)
  darkBackground?: boolean;
  // Usuario de Instagram sin "@"; sin usuario la tarjeta no es enlace
  instagram?: string;
}

// Para agregar un patrocinante: guardar el logo en public/assets/sponsors/
// (PNG transparente, recortado al contenido) y añadirlo a esta lista.
const sponsors: Sponsor[] = [
  {
    name: "All Blue",
    file: "all_blue.png",
    instagram: "allbluenatacionpf",
    width: 600,
    height: 149,
  },
  {
    name: "Antártida Agua Purificada",
    file: "artartida.png",
    width: 600,
    height: 541,
  },
  {
    name: "Aurora",
    file: "aurora.png",
    instagram: "aurorabeautycenter_",
    width: 600,
    height: 205,
  },
  {
    name: "Chloe",
    file: "chloe.png",
    instagram: "chloe.ve_",
    width: 600,
    height: 275,
  },
  {
    name: "Chunks Cookies",
    file: "chunks.png",
    instagram: "chunks.pf",
    width: 600,
    height: 183,
  },
  {
    name: "Corpus Sanus Gym",
    file: "corpus_gym.png",
    instagram: "corpussanusgym",
    width: 505,
    height: 540,
  },
  {
    name: "Creative Studio",
    file: "creative_studio.png",
    instagram: "byalexandrastudio",
    width: 600,
    height: 600,
  },
  {
    name: "4to Muelle",
    file: "cuarto_muelle.png",
    instagram: "4tomuelle",
    width: 550,
    height: 320,
  },
  {
    name: "Eseence",
    file: "eseence.png",
    instagram: "essenceby.ale",
    width: 600,
    height: 123,
  },
  {
    name: "Eva Vargas Fotógrafa",
    file: "evavargas_ph.png",
    instagram: "soyevaph",
    width: 600,
    height: 203,
    darkBackground: true,
  },
  {
    name: "Exion",
    file: "exion.png",
    instagram: "exionimport",
    width: 600,
    height: 139,
    darkBackground: true,
  },
  {
    name: "Tini Pastelería & Repostería",
    file: "frambuesa.png",
    instagram: "thetiny_house",
    width: 600,
    height: 361,
  },
  {
    name: "Harmony Dental",
    file: "harmony.png",
    instagram: "harmonydentalpf",
    width: 600,
    height: 158,
  },
  {
    name: "Novedades Juanjo C.A.",
    file: "juanjo.png",
    instagram: "novedadesjuanjo",
    width: 600,
    height: 517,
    darkBackground: true,
  },
  {
    name: "Luxe Mis 3 Hermanas",
    file: "luxe.png",
    instagram: "luxemis3hermanas",
    width: 600,
    height: 311,
  },
  {
    name: "Nail Art by Anais",
    file: "nailart_anais.png",
    instagram: "nailartbyanais",
    width: 600,
    height: 190,
  },
  {
    name: "Odontocenter",
    file: "odontocenter.png",
    instagram: "odontocenter.pf",
    width: 600,
    height: 126,
  },
  {
    name: "Oriana Guanipa",
    file: "oriana_guanipa.png",
    instagram: "orianaguanipaa",
    width: 600,
    height: 591,
  },
  {
    name: "Paolab Creative Lab",
    file: "paolab.png",
    instagram: "paolab.agency",
    width: 600,
    height: 198,
  },
  {
    name: "Quiropedia Dilia",
    file: "quiropedia.png",
    instagram: "quiropediadilia.r",
    width: 600,
    height: 530,
  },
  {
    name: "Sabor Hogareño",
    file: "sabor_hogareno.png",
    instagram: "saborhogareno.pf",
    width: 600,
    height: 600,
  },
  {
    name: "Samantha Hernandez Odontología",
    file: "od_samantha.png",
    instagram: "od.samanthaahernandez",
    width: 600,
    height: 198,
    darkBackground: true,
  },
  {
    name: "Sweet Love",
    file: "sweet_love.png",
    instagram: "sweetlovepf",
    width: 600,
    height: 477,
  },
  {
    name: "Ultra Care",
    file: "ultracare.png",
    instagram: "ultracare.pf",
    width: 513,
    height: 600,
  },
  {
    name: "Veronica Paez Médico Cirujano y Estético",
    file: "veronica_paez.png",
    instagram: "bydraveronicapaez",
    width: 600,
    height: 350,
  },
  {
    name: "Waby's Place",
    file: "wabys.png",
    instagram: "wabysplace",
    width: 600,
    height: 600,
  },
  {
    name: "Xtreme Evolution Fitness",
    file: "xtreme_gym.jpg",
    instagram: "xtremeevolutionfitness",
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

const SponsorCard = ({
  sponsor,
  isDuplicate,
}: {
  sponsor: Sponsor;
  isDuplicate: boolean;
}) => {
  const className = `flex-shrink-0 w-40 h-24 md:w-52 md:h-28 mx-3 rounded-2xl flex items-center justify-center p-4 ${
    sponsor.darkBackground ? "bg-black" : "bg-white"
  }`;
  const logo = (
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
  );

  if (!sponsor.instagram) return <div className={className}>{logo}</div>;

  return (
    <a
      href={`https://www.instagram.com/${sponsor.instagram}/`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${sponsor.name} en Instagram (@${sponsor.instagram})`}
      title={`@${sponsor.instagram}`}
      // La copia del bucle no debe recibir foco con el teclado
      tabIndex={isDuplicate ? -1 : undefined}
      onClick={() => {
        trackEvent("sponsor_click", {
          sponsor: sponsor.name,
          instagram: sponsor.instagram,
        });
      }}
      className={`${className} transition-transform hover:scale-105`}
    >
      {logo}
    </a>
  );
};

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
              <SponsorCard
                sponsor={sponsor}
                isDuplicate={i >= sponsors.length}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsCarousel;
