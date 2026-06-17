'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/database.types'

type ContentStatus = Database['public']['Enums']['content_status']

export async function publishLesson(lessonId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('lessons')
    .update({ 
      status: 'published' as ContentStatus, 
      published_at: new Date().toISOString() 
    })
    .eq('id', lessonId)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function createLessonBlock(lessonId: string, type: Database['public']['Enums']['block_type'], position: number, config: any) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lesson_blocks')
    .insert({
      lesson_id: lessonId,
      block_type: type,
      position,
      configuration_json: config
    })
    .select()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
