import Image from "next/image";
import OpenModalButton from "./OpenModalButton";

const Team = () => {
  return (
    <section
      id="team-kitty"
      className="relative w-full px-8 md:px-16 py-12 pb-24 md:py-24 mx-auto max-w-[1440px] flex flex-col items-center"
    >
      <div className="text-center max-w-4xl mb-12 flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-primary uppercase tracking-wide">
          No entrenas sola.
          <br />
          Entrenas con el Team Kitty
        </h2>
        <p className="text-primary font-regular text-lg md:text-xl leading-tight max-w-3xl mx-auto">
          Más que un entrenamiento, una comunidad.
          <br />
          No solo transformas tu físico con asesoría online o personalizada,
          aquí entrenamos, evolucionamos y compartimos el proceso real, con el
          toque de confianza que nos une.
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto mt-8">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/assets/team_kitty.jpeg"
            alt="Team Kitty"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-primary opacity-30"></div>
        </div>

        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-10">
          <OpenModalButton
            ctaLocation="team"
            className="cursor-pointer bg-primary text-background px-12 py-5 rounded-2xl text-lg font-bold uppercase hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
          >
            Quiero unirme
          </OpenModalButton>
        </div>
      </div>
    </section>
  );
};

export default Team;
