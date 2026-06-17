import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Helper to get the server client
export async function getAdminSupabaseClient() {
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

export async function getDashboardStats() {
  const supabase = await getAdminSupabaseClient();
  
  const [
    { count: totalStudents },
    { count: totalTeachers },
    { count: totalGames },
    { count: totalStories },
    { data: xpData },
    { count: aiConversations },
    { count: activeLessons },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "teacher"),
    supabase.from("games").select("*", { count: "exact", head: true }),
    supabase.from("stories").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("total_xp"),
    supabase.from("tutor_conversations").select("*", { count: "exact", head: true }),
    supabase.from("lessons").select("*", { count: "exact", head: true }).eq("status", "published"),
  ]);

  const totalXp = xpData?.reduce((acc, profile) => acc + (profile.total_xp || 0), 0) || 0;

  // For Daily Active Students, we'd need a last_active column, assuming updated_at for now.
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count: dailyActiveStudents } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "student")
    .gte("updated_at", oneDayAgo);

  return {
    totalStudents: totalStudents || 0,
    totalTeachers: totalTeachers || 0,
    totalGames: totalGames || 0,
    totalStories: totalStories || 0,
    totalXp,
    aiConversations: aiConversations || 0,
    activeLessons: activeLessons || 0,
    dailyActiveStudents: dailyActiveStudents || 0,
  };
}

export async function getGames() {
  const supabase = await getAdminSupabaseClient();
  const { data, error } = await supabase.from("games").select("*").order("created_at", { ascending: false });
  if (error) console.error("Error fetching games:", error.message, error.details);
  return data || [];
}

export async function getStories() {
  const supabase = await getAdminSupabaseClient();
  const { data, error } = await supabase.from("stories").select("*").order("created_at", { ascending: false });
  if (error) console.error("Error fetching stories:", error.message, error.details);
  return data || [];
}

export async function getStudents(limit?: number) {
  const supabase = await getAdminSupabaseClient();
  let query = supabase.from("profiles").select("*").eq("role", "student").order("total_xp", { ascending: false });
  
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
  if (error) console.error("Error fetching students:", error.message, error.details);
  return data || [];
}

export async function getTeachers() {
  const supabase = await getAdminSupabaseClient();
  const { data, error } = await supabase.from("profiles").select("*").eq("role", "teacher").order("updated_at", { ascending: false });
  if (error) console.error("Error fetching teachers:", error.message, error.details);
  return data || [];
}

export async function getAIAnalytics() {
  const supabase = await getAdminSupabaseClient();
  const { count: totalConversations } = await supabase.from("tutor_conversations").select("*", { count: "exact", head: true });
  
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count: dailyConversations } = await supabase
    .from("tutor_conversations")
    .select("*", { count: "exact", head: true })
    .gte("created_at", oneDayAgo);

  return {
    totalConversations: totalConversations || 0,
    dailyConversations: dailyConversations || 0,
    averageSessionLength: "4m 20s", // Placeholder since we don't have start/end times in basic schema
    mostCommonTopics: ["Math", "Grammar", "Vocabulary"], // Placeholder
    satisfactionScore: 4.8 // Placeholder
  };
}
