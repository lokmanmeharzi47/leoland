import { getStudentAchievementsData, getStudentDashboardData } from "../../services/student-services";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import AchievementsClient from "./AchievementsClient";
import { redirect } from "next/navigation";

export default async function RewardsPage() {
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

  const { allBadges, studentBadges } = await getStudentAchievementsData(user.id);
  const { student } = await getStudentDashboardData(user.id);

  return (
    <AchievementsClient 
      allBadges={allBadges} 
      studentBadges={studentBadges} 
      totalXp={student?.total_xp || 0} 
    />
  );
}
