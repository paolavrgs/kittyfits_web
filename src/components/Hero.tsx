import Image from "next/image";
import OpenModalButton from "./OpenModalButton";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 pt-12 pb-0 w-full max-w-[1440px] mx-auto min-h-[calc(100vh-100px)]">
      <div className="flex flex-col items-center md:items-start gap-5 md:gap-10 z-10">
        <h1 className="text-3xl md:text-5xl text-center md:text-left font-bold text-primary leading-[1.1] tracking-tight uppercase">
          Si no vienes por todo, <br /> ¿a qué vienes?
        </h1>
        <OpenModalButton
          ctaLocation="hero"
          className="cursor-pointer bg-primary text-background px-10 py-4 rounded-xl text-md md:text-xl font-bold uppercase hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Trabajemos juntos
        </OpenModalButton>
      </div>

      <div className="relative w-full h-[500px] md:h-[700px] flex justify-end items-end mt-10 md:mt-0">
        <div className="relative w-full h-full max-w-lg md:max-w-xl lg:max-w-2xl">
          <Image
            src="/assets/oficial_1.png"
            alt="Kitty Fits | Entrenadora Personal"
            fill
            className="object-contain object-bottom md:object-right-bottom"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
