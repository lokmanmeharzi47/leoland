'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/database.types'

type XPSource = Database['public']['Enums']['xp_source']

export async function awardXP(studentId: string, amount: number, source: XPSource, sourceId?: string) {
  const supabase = await createClient()
  
  // Create XP transaction
  const { error: txError } = await supabase
    .from('xp_transactions')
    .insert({
      student_id: studentId,
      xp_amount: amount,
      source_type: source,
      source_id: sourceId
    })

  if (txError) {
    console.error('Failed to log XP transaction:', txError)
    return { success: false, error: txError.message }
  }

  // Update total XP on student record (RPC is better, but doing two calls for now)
  // In a real prod scenario, we should use a Postgres function (RPC) or trigger to handle this atomically
  const { data: student } = await supabase
    .from('students')
    .select('total_xp')
    .eq('id', studentId)
    .single()

  if (student) {
    await supabase
      .from('students')
      .update({ total_xp: (student.total_xp || 0) + amount })
      .eq('id', studentId)
  }

  return { success: true }
}

export async function purchaseAvatarItem(studentId: string, itemId: string, price: number) {
  const supabase = await createClient()

  // Verify balance
  const { data: student } = await supabase
    .from('students')
    .select('leo_coins')
    .eq('id', studentId)
    .single()

  if (!student || (student.leo_coins || 0) < price) {
    return { success: false, error: 'Insufficient coins' }
  }

  // Deduct coins and add to inventory
  // Note: Should use RPC for atomicity in production
  await supabase
    .from('students')
    .update({ leo_coins: (student.leo_coins || 0) - price })
    .eq('id', studentId)

  const { error } = await supabase
    .from('student_inventory')
    .insert({
      student_id: studentId,
      item_id: itemId
    })

  if (error) {
    // refund logic would go here if insert fails
    return { success: false, error: error.message }
  }

  return { success: true }
}
