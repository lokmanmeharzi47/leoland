"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getAdminServerClient() {
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

export async function adminCreateClassroom(teacherId: string, name: string) {
  const supabase = await getAdminServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  // Ensure caller is admin (checked via RLS and optionally here)
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return { success: false, error: "Forbidden" };

  const { error } = await supabase
    .from("classrooms")
    .insert({ teacher_id: teacherId, name });

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/students");
  revalidatePath("/admin/teachers");
  return { success: true };
}

export async function adminAssignStudentToClassroom(classroomId: string, studentId: string) {
  const supabase = await getAdminServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("classroom_students")
    .insert({ classroom_id: classroomId, student_id: studentId });

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/students");
  return { success: true };
}

export async function adminRemoveStudentFromClassroom(classroomId: string, studentId: string) {
  const supabase = await getAdminServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("classroom_students")
    .delete()
    .eq("classroom_id", classroomId)
    .eq("student_id", studentId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/students");
  return { success: true };
}
