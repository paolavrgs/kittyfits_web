import Image from "next/image";
import Link from "next/link";
import { logout } from "../actions";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="border-b border-primary/15 bg-[#EAE5DB]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/admin/eventos" aria-label="Inicio del panel">
              <Image
                src="/assets/logo_2.png"
                alt="Kittyfits Logo"
                width={120}
                height={40}
                className="w-auto h-8 object-contain"
              />
            </Link>
            <nav className="flex gap-6 text-sm font-bold text-primary">
              <Link href="/admin/eventos" className="hover:opacity-70">
                Eventos
              </Link>
            </nav>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-bold text-primary hover:opacity-70 cursor-pointer"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        {children}
      </main>
    </>
  );
};

export default PanelLayout;
