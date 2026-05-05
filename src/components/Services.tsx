import Image from "next/image";
import { LuHandHeart } from "react-icons/lu";
import { TbWorldHeart } from "react-icons/tb";
import { LuCalendarHeart } from "react-icons/lu";
import OpenModalButton from "./OpenModalButton";

const Services = () => {
  return (
    <section
      id="mis-servicios"
      className="relative w-full overflow-hidden px-8 md:px-16 py-12 md:py-24 mx-auto max-w-[1440px]"
    >
      <div className="absolute right-0 top-0 bottom-0 w-[50%] h-full z-0 pointer-events-none hidden md:block">
        <Image
          src="/assets/logo_4.png"
          alt="Kittyfits Background Logo"
          fill
          className="object-contain object-right"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8 md:gap-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary font-medium uppercase max-w-4xl tracking-wide">
          Quiero que descubras todo lo que eres capaz de lograr
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <OpenModalButton
            ctaLocation="servicios_entrenamiento"
            subject="Entrenamiento personalizado"
            className="group cursor-pointer col-span-1 lg:col-span-5 border border-primary/30 rounded-3xl p-10 flex flex-col justify-center gap-8 bg-background/40 backdrop-blur-sm lg:min-h-[450px] text-left hover:bg-primary/80 transition-colors w-full"
          >
            <div className="flex items-center justify-start">
              <LuCalendarHeart
                size={60}
                className="text-primary group-hover:text-white transition-colors"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-primary group-hover:text-white transition-colors uppercase leading-[1]">
                <span className="font-normal text-[22px] tracking-wide">
                  ENTRENAMIENTO
                </span>
                <br />
                <span className="font-bold text-[26px]">PERSONALIZADO</span>
              </h3>
              <p className="text-primary/90 group-hover:text-white/90 transition-colors font-regular text-lg leading-tight">
                Esta hora será tu espacio para desconectar, superarte y alcanzar
                tu máximo potencial.
              </p>
            </div>
          </OpenModalButton>

          <div className="col-span-1 lg:col-span-7 flex flex-col gap-8">
            <OpenModalButton
              ctaLocation="servicios_online"
              subject="Asesorias online"
              className="group cursor-pointer flex-1 border border-primary/30 rounded-3xl p-10 flex flex-col justify-center items-start gap-6 bg-background/40 backdrop-blur-sm text-left hover:bg-primary/80 transition-colors w-full"
            >
              <div className="flex items-center gap-6 w-full">
                <TbWorldHeart
                  size={60}
                  className="text-primary group-hover:text-white transition-colors"
                />
                <h3 className="text-2xl font-bold text-primary group-hover:text-white transition-colors uppercase leading-[1]">
                  <span className="font-normal text-[22px] tracking-wide">
                    ASESORIAS
                  </span>
                  <br />
                  <span className="font-bold text-[26px]">ONLINE</span>
                </h3>
              </div>
              <p className="text-primary/90 group-hover:text-white/90 transition-colors font-regular text-lg leading-tight">
                Más que una rutina online, quiero ayudarte a convertir el
                entrenamiento en un hábito que disfrutes y que te haga sentir
                más fuerte física y mentalmente.
              </p>
            </OpenModalButton>

            <OpenModalButton
              ctaLocation="servicios_1:1"
              subject="Asesorias 1:1"
              className="group cursor-pointer flex-1 border border-primary/30 rounded-3xl p-10 flex flex-col justify-center items-start gap-6 bg-background/40 backdrop-blur-sm text-left hover:bg-primary/80 transition-colors w-full"
            >
              <div className="flex items-center gap-6 w-full">
                <LuHandHeart
                  size={60}
                  className="text-primary group-hover:text-white transition-colors"
                />
                <h3 className="text-2xl font-bold text-primary group-hover:text-white transition-colors uppercase leading-[1]">
                  <span className="font-normal text-[22px] tracking-wide">
                    ASESORIAS
                  </span>
                  <br />
                  <span className="font-bold text-[26px]">1:1</span>
                </h3>
              </div>
              <p className="text-primary/90 group-hover:text-white/90 transition-colors font-regular text-lg leading-tight">
                Una sesión diseñada para ayudarte a romper límites, corregir
                detalles y demostrarte todo lo que puedes lograr cuando das tu
                100%.
              </p>
            </OpenModalButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
