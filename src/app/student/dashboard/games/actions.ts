"use server";

import { revalidatePath } from "next/cache";
import { getStudentSupabaseClient } from "../../services/student-services";

export async function completeGame(gameId: string, xpReward: number, title: string, score: number) {
  const supabase = await getStudentSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  // 1. Insert into game_sessions
  const { error: sessionError } = await supabase
    .from("game_sessions")
    .insert({
      student_id: user.id,
      game_id: gameId,
      score: score,
    });

  if (sessionError) {
    console.error("Error inserting game session:", sessionError);
    return { success: false, error: sessionError.message };
  }

  // 2. Insert into student_activity
  const { error: activityError } = await supabase
    .from("student_activity")
    .insert({
      student_id: user.id,
      activity_type: "played_game",
      game_id: gameId,
      title: title,
      xp_earned: xpReward,
      score: score,
    });

  if (activityError) {
    console.error("Error inserting student activity:", activityError);
    return { success: false, error: activityError.message };
  }

  // 3. Update Profile XP
  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp")
    .eq("id", user.id)
    .single();

  if (profile) {
    const newXp = (profile.total_xp || 0) + xpReward;
    await supabase
      .from("profiles")
      .update({ total_xp: newXp })
      .eq("id", user.id);
      
    await supabase
      .from("students")
      .update({ total_xp: newXp })
      .eq("id", user.id);
  }

  // Revalidate game paths
  revalidatePath("/student/dashboard/games");
  revalidatePath("/student/dashboard");

  return { success: true };
}
