import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/database.types'

type EventData = Database['public']['Tables']['events']['Insert']

export async function logEvent(eventName: string, eventData: any = null, userId?: string) {
  const supabase = await createClient()
  
  let currentUserId = userId
  if (!currentUserId) {
    const { data: { user } } = await supabase.auth.getUser()
    currentUserId = user?.id
  }

  const { error } = await supabase
    .from('events')
    .insert({
      event_name: eventName,
      event_data: eventData,
      user_id: currentUserId,
    })

  if (error) {
    console.error('Failed to log event:', error)
  }
}
