import { redirect } from "next/navigation";

const AdminHome = () => {
  redirect("/admin/eventos");
};

export default AdminHome;
