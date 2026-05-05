import Image from "next/image";
import MobileSlider from "./MobileSlider";

const slides = [
  { id: 1, title: 'Runner', img: '/assets/kitty_runner.jpeg' },
  { id: 2, title: 'Futbolista', img: '/assets/kitty_futbolista.jpeg' },
  { id: 3, title: 'Triatleta', img: '/assets/kitty_triatleta.jpeg' },
]

const About = () => {
  return (
    <section id="sobre-mi" className="flex flex-col items-center justify-center px-8 md:px-16 py-12 md:py-24 w-full max-w-[1440px] mx-auto">
      <div className="max-w-4xl text-center flex flex-col gap-8 mb-12 md:mb-20">
        <h2 className="text-2xl md:text-4xl font-bold text-primary leading-[1]">
          Soy Elizabeth Medina<br />
          mejor conocida como Kitty
        </h2>

        <div className="text-primary text-md md:text-xl font-regular flex flex-col gap-6 px-4 leading-tight">
          <p>
            Entrenadora personal con más de +5 años de experiencia, certificada por la FVFC<br className="hidden md:block" />
            (Federación Venezolana de Fisicoculturismo y Fitness) especializada en<br className="hidden md:block" />
            entrenamientos de alta intensidad y desarrollo muscular.
          </p>
          <p>
            Como atleta de alto rendimiento, mi vida se basa en buscar nuevos retos cada<br className="hidden md:block" />
            día, y mi objetivo es transmitir esa misma energía para crear una comunidad<br className="hidden md:block" />
            activa que supere sus propios límites
          </p>
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl mx-auto">
        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden group shadow-xl">
          <Image
            src="/assets/kitty_futbolista.jpeg"
            alt="Kitty Futbolista"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/0 transition-colors duration-300"></div>
          <div className="absolute top-12 left-0 w-full text-center z-10">
            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-md">FUTBOLISTA</h3>
          </div>
        </div>

        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden group shadow-xl">
          <Image
            src="/assets/kitty_runner.jpeg"
            alt="Kitty Runner"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/0 transition-colors duration-300"></div>
          <div className="absolute bottom-12 left-0 w-full text-center z-10">
            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-md">RUNNER</h3>
          </div>
        </div>

        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden group shadow-xl">
          <Image
            src="/assets/kitty_triatleta.jpeg"
            alt="Kitty Triatleta"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/0 transition-colors duration-300"></div>
          <div className="absolute top-12 left-0 w-full text-center z-10">
            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-md">TRIATLETA</h3>
          </div>
        </div>
      </div>

      <div className="w-full lg:hidden">
        <MobileSlider interval={2000}>
          {slides.map((slide) => (
            <div key={slide.id} className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden group shadow-xl">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/0 transition-colors duration-300 flex items-center justify-center">
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-md uppercase">{slide.title}</h3>
              </div>
            </div>
          ))}
        </MobileSlider>
      </div>
    </section>
  );
}

export default About;
