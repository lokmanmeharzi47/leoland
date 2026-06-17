import { getTeacherAnalytics } from "../services/teacher-services";
import TeacherAnalyticsClient from "./TeacherAnalyticsClient";

export default async function TeacherAnalyticsPage() {
  const analytics = await getTeacherAnalytics();

  return <TeacherAnalyticsClient analytics={analytics} />;
}
