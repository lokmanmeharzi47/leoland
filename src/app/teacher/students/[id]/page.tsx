import { getStudentDetails, getStudentActivity } from "../../services/teacher-services";
import StudentDetailClient from "./StudentDetailClient";

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = await getStudentDetails(params.id);
  const activity = await getStudentActivity(params.id);

  if (!student) {
    return <div className="p-8 text-center text-red-500">Student not found or access denied.</div>;
  }

  return <StudentDetailClient student={student} activity={activity} />;
}
