"use server";

import { revalidatePath } from "next/cache";
import { getStudentSupabaseClient } from "../../services/student-services";

export async function completeStory(storyId: string, xpReward: number, title: string) {
  const supabase = await getStudentSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Check if already completed to prevent duplicate XP
  const { data: existingActivity } = await supabase
    .from("student_activity")
    .select("id")
    .eq("student_id", user.id)
    .eq("story_id", storyId)
    .eq("activity_type", "completed_story")
    .single();

  if (existingActivity) {
    return { success: true, message: "Already completed" };
  }

  // Insert the activity
  const { error: insertError } = await supabase
    .from("student_activity")
    .insert({
      student_id: user.id,
      activity_type: "completed_story",
      story_id: storyId,
      title: title,
      xp_earned: xpReward,
    });

  if (insertError) {
    console.error("Error inserting student activity:", insertError);
    return { success: false, error: insertError.message };
  }

  // Add XP to profile
  // Because RPC might not exist or we might need to handle concurrency,
  // we first get current profile and then update.
  // In a robust system this should be a DB trigger or RPC.
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

  // Revalidate library paths
  revalidatePath("/student/dashboard/stories");
  revalidatePath("/student/dashboard");

  return { success: true };
}
