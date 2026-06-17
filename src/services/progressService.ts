import { createClient } from '@/lib/supabase/server'

export async function getStudentProgress(studentId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*, lesson:lessons(title, quest_id)')
    .eq('student_id', studentId)

  if (error) {
    console.error('Error fetching student progress:', error)
    return null
  }
  return data
}

export async function markLessonComplete(studentId: string, lessonId: string, score: number) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lesson_progress')
    .upsert({
      student_id: studentId,
      lesson_id: lessonId,
      completion_percent: 100,
      score,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'student_id, lesson_id' })
    .select()

  if (error) {
    console.error('Error marking lesson complete:', error)
    return null
  }
  return data
}
