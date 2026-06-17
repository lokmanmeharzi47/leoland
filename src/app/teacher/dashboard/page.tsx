import { getTeacherDashboardStats, getClassRoster } from "../services/teacher-services";
import TeacherDashboardClient from "./TeacherDashboardClient";

export default async function TeacherDashboardPage() {
  const stats = await getTeacherDashboardStats();
  const roster = await getClassRoster();

  return <TeacherDashboardClient initialStats={stats} roster={roster} />;
}
