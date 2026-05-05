import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full px-8 md:px-16 py-12 pb-24 mx-auto max-w-[1440px]">
      <div className="w-full bg-[#EAE5DB] rounded-3xl py-16 px-8 flex flex-col items-center justify-center gap-8">

        <div className="relative w-20 h-20 lg:w-28 lg:h-28 mb-2">
          <Image
            src="/assets/logo_3.png"
            alt="KF Logo"
            fill
            className="object-contain"
          />
        </div>

        <h2 className="text-lg lg:text-3xl font-bold text-foreground uppercase text-center max-w-3xl leading-[1]">
          Sígueme para motivación,<br />
          disciplina y chismecitos reales
        </h2>

        <div className="flex items-center gap-8 mt-4 text-foreground">
          <a href="https://www.instagram.com/kittyy_fits/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors transform hover:scale-110" aria-label="Instagram">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.tiktok.com/@kittyfits_22" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors transform hover:scale-110" aria-label="TikTok">
            <FaTiktok size={30} />
          </a>
          <a href="https://wa.link/gdn8fs" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors transform hover:scale-110" aria-label="WhatsApp">
            <FaWhatsapp size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
