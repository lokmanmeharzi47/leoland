import { createClient } from '@/lib/supabase/server'

export async function getWorlds() {
  const supabase = await createClient()
  const { data: worlds, error } = await supabase
    .from('worlds')
    .select('*')
    .order('order_index')

  if (error) {
    console.error('Error fetching worlds:', error)
    return []
  }
  return worlds
}

export async function getUnits(worldId: string) {
  const supabase = await createClient()
  const { data: units, error } = await supabase
    .from('units')
    .select('*')
    .eq('world_id', worldId)
    .order('order_index')

  if (error) {
    console.error('Error fetching units:', error)
    return []
  }
  return units
}

export async function getQuests(unitId: string) {
  const supabase = await createClient()
  const { data: quests, error } = await supabase
    .from('quests')
    .select('*')
    .eq('unit_id', unitId)
    .order('order_index')

  if (error) {
    console.error('Error fetching quests:', error)
    return []
  }
  return quests
}

export async function getLessons(questId: string) {
  const supabase = await createClient()
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('quest_id', questId)
    .eq('status', 'published')
    .order('created_at')

  if (error) {
    console.error('Error fetching lessons:', error)
    return []
  }
  return lessons
}

export async function getLessonBlocks(lessonId: string) {
  const supabase = await createClient()
  const { data: blocks, error } = await supabase
    .from('lesson_blocks')
    .select('*, quizzes(*)')
    .eq('lesson_id', lessonId)
    .order('position')

  if (error) {
    console.error('Error fetching lesson blocks:', error)
    return []
  }
  return blocks
}
