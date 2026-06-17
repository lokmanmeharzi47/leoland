'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'

type Student = Database['public']['Tables']['students']['Row'] & {
  profiles: {
    full_name: string
    avatar_url: string | null
  }
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<Student[]>([])
  const supabase = createClient()

  useEffect(() => {
    // Initial fetch
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from('students')
        .select(`
          *,
          profiles(full_name, avatar_url)
        `)
        .order('total_xp', { ascending: false })
        .limit(10)
      
      if (data) setLeaderboard(data as any)
    }
    fetchLeaderboard()

    // Subscribe to changes in students table for realtime rank changes
    const channel = supabase.channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'students'
        },
        () => {
          fetchLeaderboard()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return { leaderboard }
}
