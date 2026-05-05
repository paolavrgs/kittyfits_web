import { RiDoubleQuotesR } from "react-icons/ri";
import MobileSlider from "./MobileSlider";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Sé que de tu mano lograré desbloquear el potencial que ves en mi porque siempre me has impulsado y apoyado a ser esa versión mejorada.",
      subquote: "Gracias por formar parte de mi año 🐱\nGracias!!! Te quiero muchísimo ❤️",
      featured: true
    },
    {
      quote: "Eres la mejor entrenadora, todo este logro es gracias a ti. Te quiero mucho Kitty ❤️",
      featured: false
    },
    {
      quote: "ERES UNA PARTE MUY IMPORTANTE DE MI PROCESO 💪\n\nNo sería posible sin tu apoyo, empatía y comprensión 💖",
      featured: false
    },
    {
      quote: "Siempre que te veo en el gym de lejitos es una motivación, tienes bonita energía. Tu disciplina contagia y tus resultados inspiran ❤️❤️",
      featured: false
    },
    {
      quote: "GRACIAS A TI TENGO CUELLO\nNo sería posible sin tu acompañamiento y sobre todo tu enfoque empático respetando mis tiempos y capacidades",
      featured: false
    },
    {
      quote: "Sé que me puedo quedar durmiendo y evitarme el sufrimiento, pero iré porque de verdad que me recargo en el gym 🫶\n\nUna de mis mejores decisiones fue persistir en un cupo contigo 🥺",
      featured: false
    },
    {
      quote: "Hola, escribo para decirte que me siento mucho mejor con mi cuerpo 🥺\n\nHe visto full cambios y en las piernas increíble, te lo juro Kitty, también he estado comiendo super bien",
      featured: false
    },
    {
      quote: "Gracias por tenerme paciencia, TE AMO JAJAJ. Eres la mejor coach, te prometo portarme mejor",
      featured: false
    },
    {
      quote: "Quería agradecerte hoy por siempre motivarme, hoy no tenía nada de ganas y gracias a ti terminó siendo un super entrenamiento",
      featured: false
    }
  ];

  return (
    <section className="relative w-full py-12 md:py-24 bg-[#DED1BA]/37">
      <div className="w-full max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="mb-16 flex flex-col text-center md:text-left">
          <h2 className="text-xl md:text-3xl font-extrabold text-primary uppercase leading-[1.2] mb-4 w-full md:w-2/3">
            La verdadera transformación empieza en la confianza
          </h2>
          <p className="text-primary/80 font-regular text-lg md:text-xl">
            +50 mujeres han decidido confiar en mi y confiar en ellas mismas
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-sm border border-primary/5 flex flex-col justify-center ${item.featured ? "md:col-span-2 lg:row-span-2" : "col-span-1"}`}
            >
              <div className="mb-4">
                <RiDoubleQuotesR className="text-primary opacity-40" size={24} />
              </div>
              {item.featured ? (
                <>
                  <p className="text-primary font-serif font-semibold text-[22px] md:text-[26px] leading-relaxed mb-8">
                    {item.quote}
                  </p>
                  {item.subquote && (
                    <p className="text-primary/70 text-sm md:text-base whitespace-pre-wrap">
                      {item.subquote}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-primary text-[14px] md:text-[15px] leading-relaxed whitespace-pre-wrap font-medium flex-1">
                  {item.quote}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="w-full md:hidden">
          <MobileSlider interval={5000} showDots={true}>
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm border border-primary/5 flex flex-col justify-center min-h-[300px]"
              >
                <div className="mb-4">
                  <RiDoubleQuotesR className="text-primary opacity-40" size={24} />
                </div>
                <p className="text-primary text-[14px] leading-relaxed whitespace-pre-wrap font-medium flex-1">
                  {item.quote}
                </p>
                {item.subquote && (
                  <p className="text-primary/70 text-sm whitespace-pre-wrap">
                    {item.subquote}
                  </p>
                )}
              </div>
            ))}
          </MobileSlider>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
