import { getStudentStoriesData } from "../../services/student-services";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import StoriesClient from "./StoriesClient";
import { redirect } from "next/navigation";

export default async function LibraryPage() {
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

  const { stories, activity } = await getStudentStoriesData(user.id);

  return <StoriesClient stories={stories} activity={activity} />;
}
