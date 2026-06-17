import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getTeacherSupabaseClient() {
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

export async function getTeacherDashboardStats() {
  const supabase = await getTeacherSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Find classrooms for teacher
  const { data: classrooms } = await supabase
    .from("classrooms")
    .select("id")
    .eq("teacher_id", user.id);

  if (!classrooms || classrooms.length === 0) {
    return { totalStudents: 0, activeToday: 0, avgXp: 0, avgStreak: 0, storiesCompleted: 0, gamesPlayed: 0, aiSessions: 0 };
  }

  const classroomIds = classrooms.map(c => c.id);

  // Get student IDs
  const { data: roster } = await supabase
    .from("classroom_students")
    .select("student_id")
    .in("classroom_id", classroomIds);

  const studentIds = roster?.map(r => r.student_id) || [];

  if (studentIds.length === 0) {
    return { totalStudents: 0, activeToday: 0, avgXp: 0, avgStreak: 0, storiesCompleted: 0, gamesPlayed: 0, aiSessions: 0 };
  }

  const [
    { data: students },
    { count: storiesCompleted },
    { count: gamesPlayed },
    { count: aiSessions },
  ] = await Promise.all([
    supabase.from("profiles").select("id, total_xp, streak, updated_at").in("id", studentIds),
    supabase.from("student_activity").select("*", { count: "exact", head: true }).in("student_id", studentIds).eq("activity_type", "completed_story"),
    supabase.from("student_activity").select("*", { count: "exact", head: true }).in("student_id", studentIds).eq("activity_type", "played_game"),
    supabase.from("student_activity").select("*", { count: "exact", head: true }).in("student_id", studentIds).eq("activity_type", "ai_conversation"),
  ]);

  let avgXp = 0;
  let avgStreak = 0;
  let activeToday = 0;

  if (students && students.length > 0) {
    const totalXp = students.reduce((acc, s) => acc + (s.total_xp || 0), 0);
    const totalStreak = students.reduce((acc, s) => acc + (s.streak || 0), 0);
    avgXp = Math.round(totalXp / students.length);
    avgStreak = Math.round(totalStreak / students.length);

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    activeToday = students.filter(s => new Date(s.updated_at) >= new Date(oneDayAgo)).length;
  }

  return {
    totalStudents: studentIds.length,
    activeToday,
    avgXp,
    avgStreak,
    storiesCompleted: storiesCompleted || 0,
    gamesPlayed: gamesPlayed || 0,
    aiSessions: aiSessions || 0,
  };
}

export async function getClassRoster() {
  const supabase = await getTeacherSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: classrooms } = await supabase
    .from("classrooms")
    .select("id")
    .eq("teacher_id", user.id);

  if (!classrooms || classrooms.length === 0) {
    const { data: allStudents } = await supabase.from("profiles").select("*").eq("role", "student").order("total_xp", { ascending: false });
    return allStudents || [];
  }
  const classroomIds = classrooms.map(c => c.id);

  const { data: roster } = await supabase
    .from("classroom_students")
    .select("student_id")
    .in("classroom_id", classroomIds);

  const studentIds = roster?.map(r => r.student_id) || [];
  if (studentIds.length === 0) {
    const { data: allStudents } = await supabase.from("profiles").select("*").eq("role", "student").order("total_xp", { ascending: false });
    return allStudents || [];
  }

  const { data: students } = await supabase
    .from("profiles")
    .select("*")
    .in("id", studentIds)
    .order("total_xp", { ascending: false });

  return students || [];
}

export async function getStudentDetails(studentId: string) {
  const supabase = await getTeacherSupabaseClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", studentId)
    .single();
  return profile;
}

export async function getStudentActivity(studentId: string) {
  const supabase = await getTeacherSupabaseClient();
  const { data: activities } = await supabase
    .from("student_activity")
    .select("*")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false });
  return activities || [];
}

export async function getAssignments() {
  const supabase = await getTeacherSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("assignments")
    .select("*, profiles:student_id(full_name, username)")
    .eq("teacher_id", user.id)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getContentLibrary() {
  const supabase = await getTeacherSupabaseClient();
  const { data: worlds } = await supabase.from("worlds").select("*").order("order", { ascending: true });
  const { data: games } = await supabase.from("games").select("*").order("created_at", { ascending: false });
  const { data: stories } = await supabase.from("stories").select("*").order("created_at", { ascending: false });
  const { data: lessons } = await supabase.from("lessons").select("*").order("order", { ascending: true });
  
  return { worlds: worlds || [], games: games || [], stories: stories || [], lessons: lessons || [] };
}

export async function getTeacherAnalytics() {
  const supabase = await getTeacherSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { xpGrowth: [], activity: [], worlds: [], games: [], stories: [] };
  
  const { data: classrooms } = await supabase.from("classrooms").select("id").eq("teacher_id", user.id);
  const classroomIds = classrooms?.map(c => c.id) || [];
  
  const { data: roster } = await supabase.from("classroom_students").select("student_id").in("classroom_id", classroomIds);
  const studentIds = roster?.map(r => r.student_id) || [];
  
  if (studentIds.length === 0) return { xpGrowth: [], activity: [], worlds: [], games: [], stories: [] };

  const { data: activities } = await supabase
    .from("student_activity")
    .select("*")
    .in("student_id", studentIds)
    .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  const today = new Date();
  const xpGrowth = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayActivities = activities?.filter(a => new Date(a.created_at).toDateString() === d.toDateString()) || [];
    const dailyXp = dayActivities.reduce((acc, a) => acc + (a.xp_earned || 0), 0);
    return { name: dayStr, xp: dailyXp };
  });

  return {
    xpGrowth,
    activity: xpGrowth,
    worlds: [
      { name: "Vocabulary Forest", completed: 85 }, 
      { name: "Grammar Castle", completed: 40 },
      { name: "Speaking Ocean", completed: 25 },
    ],
    stories: [
      { name: "The Lost Lion", completions: 24 }, 
      { name: "Ocean Friends", completions: 18 }
    ],
    games: [
      { name: "Word Match", plays: 156 }, 
      { name: "Sentence Builder", plays: 89 }
    ]
  };
}
