import { getStudentLessonsData, getStudentDashboardData } from "../../services/student-services";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import LessonsClient from "./LessonsClient";
import { redirect } from "next/navigation";

export default async function LessonsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  const { assignments, worlds } = await getStudentLessonsData(user.id);
  const { student } = await getStudentDashboardData(user.id);

  // Calculate level based on xp (every 500 xp = 1 level)
  const studentLevel = student ? Math.floor(student.total_xp / 500) + 1 : 1;

  return <LessonsClient assignments={assignments} worlds={worlds} studentLevel={studentLevel} />;
}
