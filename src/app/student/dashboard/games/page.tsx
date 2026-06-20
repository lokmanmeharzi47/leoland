import { getStudentGamesData } from "../../services/student-services";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import GamesClient from "./GamesClient";
import { redirect } from "next/navigation";

export default async function GameCenterPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
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

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  const { games, sessions } = await getStudentGamesData(user.id);

  return <GamesClient games={games} sessions={sessions} />;
}
