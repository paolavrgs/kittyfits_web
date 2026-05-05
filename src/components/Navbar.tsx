import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 md:px-16 py-6 w-full max-w-[1440px] mx-auto">
      <div className="flex-shrink-0">
        <Image
          src="/assets/logo_2.png"
          alt="Kittyfits Logo"
          width={180}
          height={60}
          className="w-auto h-12 object-contain"
          priority
        />
      </div>

      <div className="hidden md:flex gap-10 text-foreground font-medium text-base">
        <Link href="#sobre-mi" className="hover:text-primary transition-colors">Sobre mi</Link>
        <Link href="#mis-servicios" className="hover:text-primary transition-colors">Mis servicios</Link>
        <Link href="#team-kitty" className="hover:text-primary transition-colors">Team Kitty</Link>
      </div>

      <div className="flex gap-5 items-center text-foreground">
        <a href="https://wa.link/gdn8fs" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="WhatsApp">
          <FaWhatsapp size={22} />
        </a>
        <a href="https://www.instagram.com/kittyy_fits/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
          <FaInstagram size={22} />
        </a>
        <a href="https://www.tiktok.com/@kittyfits_22" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="TikTok">
          <FaTiktok size={22} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;