"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { trackEvent } from "../lib/gtm";

interface FooterProps {
  // Versión de una fila (logo a la izquierda, redes a la derecha) sin frase
  compact?: boolean;
}

const Footer = ({ compact = false }: FooterProps) => {
  return (
    <footer
      className={`w-full px-8 md:px-16 mx-auto max-w-[1440px] ${
        compact ? "py-8 pb-12" : "py-12 pb-24"
      }`}
    >
      <div
        className={`w-full bg-[#EAE5DB] rounded-3xl flex items-center ${
          compact
            ? "flex-row justify-between py-6 px-6 md:px-10 gap-4"
            : "flex-col justify-center py-16 px-8 gap-8"
        }`}
      >
        <div
          className={`relative ${
            compact
              ? "w-12 h-12 md:w-14 md:h-14"
              : "w-20 h-20 lg:w-28 lg:h-28 mb-2"
          }`}
        >
          <Image
            src="/assets/logo_3.png"
            alt="KF Logo"
            fill
            className="object-contain"
          />
        </div>

        {!compact && (
          <h2 className="text-lg lg:text-3xl font-bold text-foreground uppercase text-center max-w-3xl leading-[1]">
            Sígueme para motivación,
            <br />
            disciplina y chismecitos reales
          </h2>
        )}

        <div
          className={`flex items-center text-foreground ${
            compact ? "gap-5 md:gap-6" : "gap-8 mt-4"
          }`}
        >
          <a
            href="https://www.instagram.com/kittyy_fits/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors transform hover:scale-110"
            aria-label="Instagram"
            onClick={() => {
              trackEvent("social_click", {
                platform: "instagram",
                location: "footer",
              });
            }}
          >
            <FaInstagram size={compact ? 24 : 30} />
          </a>
          <a
            href="https://www.tiktok.com/@kittyfits_22"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors transform hover:scale-110"
            aria-label="TikTok"
            onClick={() => {
              trackEvent("social_click", {
                platform: "tiktok",
                location: "footer",
              });
            }}
          >
            <FaTiktok size={compact ? 24 : 30} />
          </a>
          <a
            href="https://wa.link/gdn8fs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors transform hover:scale-110"
            aria-label="WhatsApp"
            onClick={() => {
              trackEvent("social_click", {
                platform: "whatsapp",
                location: "footer",
              });
            }}
          >
            <FaWhatsapp size={compact ? 24 : 30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
