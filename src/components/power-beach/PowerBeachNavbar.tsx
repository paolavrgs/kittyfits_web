import Image from "next/image";
import Link from "next/link";

const PowerBeachNavbar = () => {
  return (
    <nav className="flex items-center justify-center px-8 md:px-16 py-6 w-full max-w-[1440px] mx-auto">
      <Link href="/" aria-label="Ir al inicio">
        <Image
          src="/assets/logo_2.png"
          alt="Kittyfits Logo"
          width={180}
          height={60}
          className="w-auto h-12 object-contain"
          priority
        />
      </Link>
    </nav>
  );
};

export default PowerBeachNavbar;
