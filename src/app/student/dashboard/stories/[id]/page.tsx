import { notFound } from "next/navigation";
import { getStudentSupabaseClient } from "../../../services/student-services";
import StoryReaderClient from "./StoryReaderClient";

export default async function StoryReaderPage({ params }: { params: { id: string } }) {
  const supabase = await getStudentSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const { id } = await params;

  // Fetch the story
  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("id", id)
    .single();

  if (!story) {
    notFound();
  }

  // Check if student has already read it
  const { data: activity } = await supabase
    .from("student_activity")
    .select("id")
    .eq("student_id", user.id)
    .eq("story_id", id)
    .eq("activity_type", "completed_story")
    .single();

  const hasRead = !!activity;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black p-4 md:p-8 pb-24">
      <StoryReaderClient story={story} hasRead={hasRead} />
    </div>
  );
}
