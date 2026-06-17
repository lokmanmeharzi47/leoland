import { getStudentDashboardData, getStudentSupabaseClient } from "../services/student-services";
import { redirect } from "next/navigation";
import StudentDashboardClient from "./StudentDashboardClient";

export default async function StudentDashboardPage() {
  const supabase = await getStudentSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const data = await getStudentDashboardData(user.id);

  return <StudentDashboardClient initialData={data} />;
}
