import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getStudentSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient(
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
}

export async function getStudentDashboardData(userId: string) {
  const supabase = await getStudentSupabaseClient();

  // 1. Fetch Student Profile
  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("id", userId)
    .single();

  // 2. Fetch Badges
  const { data: badges } = await supabase
    .from("student_badges")
    .select("*")
    .eq("student_id", userId)
    .order("earned_at", { ascending: false });

  // 3. Fetch Words Learned count
  const { count: wordsCount } = await supabase
    .from("student_words")
    .select("*", { count: "exact", head: true })
    .eq("student_id", userId);

  // 4. Keep Learning (Latest Lesson)
  const { data: latestProgress } = await supabase
    .from("student_progress")
    .select(`
      progress_percentage,
      lessons ( id, title ),
      worlds ( id, title )
    `)
    .eq("student_id", userId)
    .order("last_accessed", { ascending: false })
    .limit(1)
    .single();

  // 5. Learning Worlds Progress
  const { data: worlds } = await supabase
    .from("worlds")
    .select("id, title, order")
    .order("order", { ascending: true });

  const { data: allProgress } = await supabase
    .from("student_progress")
    .select("world_id, completed")
    .eq("student_id", userId);

  const { data: allLessons } = await supabase
    .from("lessons")
    .select("id, world_id");

  const worldsProgress = worlds?.map(world => {
    const totalLessons = allLessons?.filter(l => l.world_id === world.id).length || 0;
    const completedLessons = allProgress?.filter(p => p.world_id === world.id && p.completed).length || 0;
    return {
      id: world.id,
      title: world.title,
      totalLessons,
      completedLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    };
  }) || [];

  // 6. Recent Activity
  const { data: recentActivity } = await supabase
    .from("student_activity")
    .select("*")
    .eq("student_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  // 7. AI Tutor Stats
  const { data: aiConversations } = await supabase
    .from("ai_conversations")
    .select("*")
    .eq("student_id", userId)
    .order("created_at", { ascending: false });

  const aiStats = {
    totalConversations: aiConversations?.length || 0,
    totalMinutes: aiConversations?.reduce((acc, c) => acc + (c.duration_minutes || 0), 0) || 0,
    lastSession: aiConversations?.[0]?.created_at || null
  };

  // 8. Progress Analytics (XP Growth) - Fake Daily data built from actual activity
  const today = new Date();
  const xpGrowth = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
    
    // Sum XP from activities on that day
    const dayActivities = recentActivity?.filter(a => new Date(a.created_at).toDateString() === d.toDateString()) || [];
    const dailyXp = dayActivities.reduce((acc, a) => acc + (a.xp_earned || 0), 0);
    
    return { name: dayStr, xp: dailyXp };
  });

  return {
    student: student || { full_name: "Student", total_xp: 0, streak: 0 },
    badges: badges || [],
    wordsCount: wordsCount || 0,
    latestProgress,
    worldsProgress,
    recentActivity: recentActivity || [],
    aiStats,
    xpGrowth
  };
}
