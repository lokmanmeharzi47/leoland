'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'

type XPTransaction = Database['public']['Tables']['xp_transactions']['Row']

export function useXP(studentId: string) {
  const [transactions, setTransactions] = useState<XPTransaction[]>([])
  const [totalXP, setTotalXP] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    if (!studentId) return

    // Fetch initial XP
    supabase
      .from('students')
      .select('total_xp')
      .eq('id', studentId)
      .single()
      .then(({ data }) => {
        if (data) setTotalXP(data.total_xp || 0)
      })

    // Subscribe to new XP transactions for realtime toast updates
    const channel = supabase.channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'xp_transactions',
          filter: `student_id=eq.${studentId}`
        },
        (payload) => {
          const newTx = payload.new as XPTransaction
          setTransactions(prev => [...prev, newTx])
          setTotalXP(prev => prev + newTx.xp_amount)
          
          // Here you could also trigger a global toast notification event
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [studentId, supabase])

  return { totalXP, recentTransactions: transactions }
}
