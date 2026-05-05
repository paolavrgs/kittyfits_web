import Image from "next/image";
import OpenModalButton from "./OpenModalButton";

const Colab = () => {
  return (
    <section className="relative w-full px-8 md:px-16 py-12 md:py-24 mx-auto max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="md:w-1/3 relative w-full flex justify-center md:justify-start">
        <div className="relative w-full max-w-[550px] aspect-[4/5]">
          <Image
            src="/assets/oficial_2.png"
            alt="Kitty Colaboraciones"
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      <div className="md:w-2/3 w-full flex flex-col items-center text-center gap-8">
        <h2 className="text-xl md:text-4xl font-extrabold text-primary uppercase leading-[1] tracking-wide">
          Las mejores colaboraciones<br />nacen desde la autenticidad
        </h2>

        <p className="text-primary font-regular text-lg md:text-xl leading-[1.2] px-4">
          Me encanta trabajar con marcas que compartan mi estilo<br className="hidden xl:block" />
          de vida y valores: disciplina, calidad y resultados reales.<br className="hidden xl:block" />
          Busco colaborar con empresas alineadas al fitness, el<br className="hidden xl:block" />
          deporte y el alto rendimiento.
        </p>

        <OpenModalButton ctaLocation="colaboraciones" subject="Colaboraciones" className="mt-4 bg-primary text-background px-12 py-4 rounded-xl text-lg font-bold uppercase hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer">
          Hablemos
        </OpenModalButton>
      </div>
    </section>
  );
}

export default Colab;