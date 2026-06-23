import { notFound } from "next/navigation";
import { getStudentSupabaseClient } from "../../../services/student-services";
import GamePlayerClient from "./GamePlayerClient";

export default async function GamePlayerPage({ params }: { params: { id: string } }) {
  const supabase = await getStudentSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const { id } = await params;

  // Fetch the game
  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-black p-4 md:p-8">
      <GamePlayerClient game={game} />
    </div>
  );
}
