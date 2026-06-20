import { getStudentDashboardData } from "../services/student-services";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import StudentLayoutClient from "./StudentLayoutClient";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  const { student } = await getStudentDashboardData(user.id);

  return (
    <StudentLayoutClient totalXp={student?.total_xp || 0}>
      {children}
    </StudentLayoutClient>
  );
}
