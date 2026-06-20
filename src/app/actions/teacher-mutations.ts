"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored when called from Server Component
          }
        },
      },
    }
  );
}

export async function createClassroom(name: string) {
  const supabase = await getServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("classrooms")
    .insert({ teacher_id: user.id, name });

  if (error) return { success: false, error: error.message };

  revalidatePath("/teacher/students");
  return { success: true };
}

export async function addStudentToClassroom(classroomId: string, studentId: string) {
  const supabase = await getServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  // Validate classroom ownership
  const { data: classroom } = await supabase
    .from("classrooms")
    .select("id")
    .eq("id", classroomId)
    .eq("teacher_id", user.id)
    .single();

  if (!classroom) return { success: false, error: "Classroom not found or not owned by you" };

  const { error } = await supabase
    .from("classroom_students")
    .insert({ classroom_id: classroomId, student_id: studentId });

  if (error) return { success: false, error: error.message };

  revalidatePath("/teacher/students");
  return { success: true };
}

export async function removeStudentFromClassroom(classroomId: string, studentId: string) {
  const supabase = await getServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  // Validate classroom ownership
  const { data: classroom } = await supabase
    .from("classrooms")
    .select("id")
    .eq("id", classroomId)
    .eq("teacher_id", user.id)
    .single();

  if (!classroom) return { success: false, error: "Classroom not found or not owned by you" };

  const { error } = await supabase
    .from("classroom_students")
    .delete()
    .eq("classroom_id", classroomId)
    .eq("student_id", studentId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/teacher/students");
  return { success: true };
}
