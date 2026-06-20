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

export async function completeGameSession(gameId: string, xpEarned: number) {
  const supabase = await getServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: "Unauthorized" };

  // 1. Validate game exists and is published
  const { data: game } = await supabase.from("games").select("id").eq("id", gameId).eq("status", "published").single();
  if (!game) return { success: false, error: "Game not available" };

  // 2. Insert game session
  const { error: sessionError } = await supabase.from("game_sessions").insert({
    student_id: user.id,
    game_id: gameId,
    score: xpEarned,
  });

  if (sessionError) return { success: false, error: sessionError.message };

  // 3. Update XP (requires secure RPC, assuming `add_student_xp` exists or we use a transaction)
  // For now, we simulate XP transaction insertion. Note: direct update on profiles is forbidden per rules.
  const { error: xpError } = await supabase.from("xp_transactions").insert({
    student_id: user.id,
    amount: xpEarned,
    reason: "Completed game",
  });

  if (xpError) return { success: false, error: xpError.message };

  revalidatePath("/student/dashboard");
  revalidatePath("/student/dashboard/games");
  return { success: true };
}

export async function recordTutorMessage(conversationId: string | null, message: string, durationMinutes: number = 0) {
  const supabase = await getServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  let convId = conversationId;

  // Create new conversation if needed
  if (!convId) {
    const { data: newConv, error: convError } = await supabase.from("ai_conversations").insert({
      student_id: user.id,
      topic: "Tutor Chat",
      duration_minutes: durationMinutes,
      message_count: 1
    }).select("id").single();
    if (convError) return { success: false, error: convError.message };
    convId = newConv.id;
  }

  // Insert user message
  const { error: msgError } = await supabase.from("tutor_messages").insert({
    conversation_id: convId,
    content: message,
    sender: "student"
  });

  if (msgError) return { success: false, error: msgError.message };

  // Call AI Edge Function
  try {
    const { data: aiData, error: aiError } = await supabase.functions.invoke("ai-chat", {
      body: { message }
    });

    if (aiError) throw new Error(aiError.message);

    const reply = aiData?.reply || "I am thinking...";

    // Save AI reply
    await supabase.from("tutor_messages").insert({
      conversation_id: convId,
      content: reply,
      sender: "tutor"
    });

    // Update conversation stats
    await supabase.rpc('increment_ai_conversation_messages', { convo_id: convId });

    revalidatePath("/student/dashboard/tutor");
    return { success: true, reply, conversationId: convId };

  } catch (err: any) {
    return { success: false, error: err.message || "Failed to contact AI" };
  }
}
