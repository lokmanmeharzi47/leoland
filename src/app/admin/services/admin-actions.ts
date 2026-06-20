"use server";

import { revalidatePath } from "next/cache";
import { getAdminSupabaseClient } from "./admin-services";

export async function createGame(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const difficulty = formData.get("difficulty") as string;
  const xp_reward = parseInt(formData.get("xp_reward") as string || "10", 10);
  const status = formData.get("status") as string;

  const { data, error } = await supabase
    .from("games")
    .insert({
      title,
      description,
      category,
      difficulty,
      xp_reward,
      status
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating game:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/games");
  return data;
}

export async function createStory(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const level = formData.get("level") as string;
  const language = formData.get("language") as string;
  const published = formData.get("published") === "true";

  const { data, error } = await supabase
    .from("stories")
    .insert({
      title,
      content,
      level,
      language,
      published
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating story:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/stories");
  return data;
}

export async function createWorld(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;
  const order_index = parseInt(formData.get("order_index") as string || "10", 10);

  const { data, error } = await supabase
    .from("worlds")
    .insert({
      title,
      description,
      icon,
      order_index,
      "order": order_index // Also keep 'order' synced if both exist
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating world:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/learning-worlds");
  return data;
}

export async function createAssignment(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  
  const title = formData.get("title") as string;
  const content_type = formData.get("content_type") as string;
  const content_id = formData.get("content_id") as string;
  const status = formData.get("status") as string;
  const teacher_id = formData.get("teacher_id") as string;
  const student_id = formData.get("student_id") as string;
  const due_date = formData.get("due_date") as string;

  const { data, error } = await supabase
    .from("assignments")
    .insert({
      title,
      content_type,
      content_id,
      status,
      teacher_id: teacher_id || null,
      student_id: student_id || null,
      due_date: due_date ? new Date(due_date).toISOString() : null
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating assignment:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/assignments");
  return data;
}
