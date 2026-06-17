import { getDashboardStats, getStudents } from "./services/admin-services";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const topStudents = await getStudents(10);

  return <AdminDashboardClient initialStats={stats} topStudents={topStudents} />;
}
