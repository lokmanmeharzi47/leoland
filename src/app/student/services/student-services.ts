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
      learning_worlds ( id, name )
    `)
    .eq("student_id", userId)
    .order("last_accessed", { ascending: false })
    .limit(1)
    .single();

  // 5. Learning Worlds Progress
  const { data: worlds } = await supabase
    .from("learning_worlds")
    .select("id, name, order")
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
      title: world.name,
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

  // 8. Progress Analytics (XP Growth)
  const today = new Date();
  const xpGrowth = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
    
    const dayActivities = recentActivity?.filter(a => new Date(a.created_at).toDateString() === d.toDateString()) || [];
    const dailyXp = dayActivities.reduce((acc, a) => acc + (a.xp_earned || 0), 0);
    
    return { name: dayStr, xp: dailyXp };
  });

  return {
    student: student || { full_name: "Student", total_xp: 0, streak_days: 0 },
    badges: badges || [],
    wordsCount: wordsCount || 0,
    latestProgress,
    worldsProgress,
    recentActivity: recentActivity || [],
    aiStats,
    xpGrowth
  };
}

export async function getStudentAchievementsData(userId: string) {
  const supabase = await getStudentSupabaseClient();
  const { data: allBadges } = await supabase.from("badges").select("*").order("title");
  const { data: studentBadges } = await supabase.from("student_badges").select("*").eq("student_id", userId);
  return { allBadges: allBadges || [], studentBadges: studentBadges || [] };
}

export async function getStudentGamesData(userId: string) {
  const supabase = await getStudentSupabaseClient();
  const { data: games } = await supabase.from("games").select("*").eq("status", "published").order("title");
  const { data: sessions } = await supabase.from("game_sessions").select("*").eq("student_id", userId).order("completed_at", { ascending: false });
  return { games: games || [], sessions: sessions || [] };
}

export async function getStudentStoriesData(userId: string) {
  const supabase = await getStudentSupabaseClient();
  const { data: stories } = await supabase.from("stories").select("*").eq("published", true).order("created_at", { ascending: false });
  const { data: activity } = await supabase.from("student_activity").select("*").eq("student_id", userId).not("story_id", "is", null);
  return { stories: stories || [], activity: activity || [] };
}

export async function getStudentLessonsData(userId: string) {
  const supabase = await getStudentSupabaseClient();
  // worlds is learning_worlds in DB
  const { data: worlds } = await supabase.from("learning_worlds").select("*").order("order");
  const { data: lessons } = await supabase.from("lessons").select("*").eq("status", "published").order("order");
  const { data: progress } = await supabase.from("student_progress").select("*").eq("student_id", userId);
  
  // Get assignments for student
  const { data: assignments } = await supabase
    .from("assignments")
    .select("*")
    .or(`student_id.eq.${userId},student_id.is.null`)
    .order("created_at", { ascending: false });

  return { 
    worlds: worlds || [], 
    lessons: lessons || [], 
    progress: progress || [],
    assignments: assignments || []
  };
}

export async function getStudentWordsData(userId: string) {
  const supabase = await getStudentSupabaseClient();
  const { data: words } = await supabase.from("student_words").select("*").eq("student_id", userId).order("learned_at", { ascending: false });
  return { words: words || [] };
}

export async function getStudentTutorData(userId: string) {
  const supabase = await getStudentSupabaseClient();
  const { data: convos } = await supabase.from("ai_conversations").select("*").eq("student_id", userId).order("created_at", { ascending: false }).limit(1);
  return { latestConversation: convos?.[0] || null };
}

export async function getStudentReportData(userId: string) {
  return getStudentDashboardData(userId); // Reusing dashboard analytics logic for now
}
