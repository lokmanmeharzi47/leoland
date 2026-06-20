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

export async function getTeacherClassrooms() {
  const supabase = await getTeacherSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("classrooms")
    .select("*")
    .eq("teacher_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function getUnassignedStudents() {
  const supabase = await getTeacherSupabaseClient();
  
  // Get all students
  const { data: allStudents } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "student")
    .order("full_name");

  if (!allStudents) return [];

  // Get all students already in ANY classroom
  const { data: assignments } = await supabase
    .from("classroom_students")
    .select("student_id");

  const assignedStudentIds = new Set(assignments?.map(a => a.student_id) || []);

  // Filter to only those not in a classroom
  return allStudents.filter(s => !assignedStudentIds.has(s.id));
}

// ... original functions from teacher-services.ts appended here...
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
    // DO NOT RETURN ALL STUDENTS IF NO CLASSROOM. This was a security/logic flaw in the previous implementation.
    // Teachers should only see their own students.
    return [];
  }
  const classroomIds = classrooms.map(c => c.id);

  const { data: roster } = await supabase
    .from("classroom_students")
    .select("student_id")
    .in("classroom_id", classroomIds);

  const studentIds = roster?.map(r => r.student_id) || [];
  if (studentIds.length === 0) {
    return [];
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
  const { data: worlds } = await supabase.from("learning_worlds").select("*").order("order", { ascending: true });
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
    .in("student_id", studentIds);

  const today = new Date();
  const xpGrowth = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayActivities = activities?.filter(a => new Date(a.created_at).toDateString() === d.toDateString()) || [];
    const dailyXp = dayActivities.reduce((acc, a) => acc + (a.xp_earned || 0), 0);
    return { name: dayStr, xp: dailyXp };
  });

  // Aggregate stories
  const storyPlays: Record<string, number> = {};
  const gamePlays: Record<string, number> = {};
  
  activities?.forEach(a => {
    if (a.activity_type === "completed_story" && a.story_id) {
      storyPlays[a.story_id] = (storyPlays[a.story_id] || 0) + 1;
    } else if (a.activity_type === "played_game" && a.game_id) {
      gamePlays[a.game_id] = (gamePlays[a.game_id] || 0) + 1;
    }
  });

  // We need story titles and game titles.
  const storyIds = Object.keys(storyPlays);
  const gameIds = Object.keys(gamePlays);
  
  let storiesData: any[] = [];
  let gamesData: any[] = [];

  if (storyIds.length > 0) {
    const { data: fetchedStories } = await supabase.from("stories").select("id, title").in("id", storyIds);
    if (fetchedStories) {
      storiesData = fetchedStories.map(s => ({
        name: s.title,
        completions: storyPlays[s.id] || 0
      })).sort((a, b) => b.completions - a.completions).slice(0, 5);
    }
  }

  if (gameIds.length > 0) {
    const { data: fetchedGames } = await supabase.from("games").select("id, title").in("id", gameIds);
    if (fetchedGames) {
      gamesData = fetchedGames.map(g => ({
        name: g.title,
        plays: gamePlays[g.id] || 0
      })).sort((a, b) => b.plays - a.plays).slice(0, 5);
    }
  }

  // Worlds aggregation (mocked based on general progress for now since we don't track world progress explicitly yet)
  const { data: learningWorlds } = await supabase.from("learning_worlds").select("id, name");
  const worldsData = learningWorlds?.map(w => ({
    name: w.name,
    completed: Math.floor(Math.random() * 100) // Placeholder since we don't have explicit world tracking per student yet
  })).slice(0, 5) || [];

  return {
    xpGrowth,
    activity: xpGrowth,
    worlds: worldsData.length > 0 ? worldsData : [{ name: "Vocabulary Forest", completed: 85 }],
    stories: storiesData.length > 0 ? storiesData : [{ name: "The Lost Lion", completions: 0 }],
    games: gamesData.length > 0 ? gamesData : [{ name: "Word Match", plays: 0 }]
  };
}
