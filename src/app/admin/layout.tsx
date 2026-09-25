import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Kitty Fits",
  robots: { index: false, follow: false },
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {children}
    </div>
  );
};

export default AdminLayout;
