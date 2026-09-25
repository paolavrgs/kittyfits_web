import Image from "next/image";
import { redirect } from "next/navigation";
import { isAdmin } from "../../../lib/admin-auth";
import LoginForm from "../../../components/admin/LoginForm";

const AdminLogin = async () => {
  if (await isAdmin()) redirect("/admin/eventos");

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#EAE5DB] rounded-3xl p-8 flex flex-col items-center gap-6">
        <Image
          src="/assets/logo_2.png"
          alt="Kittyfits Logo"
          width={180}
          height={60}
          className="w-auto h-12 object-contain"
          priority
        />
        <h1 className="text-xl font-bold text-primary">
          Panel de administración
        </h1>
        <LoginForm />
      </div>
    </main>
  );
};

export default AdminLogin;
