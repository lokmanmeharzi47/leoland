'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/database.types'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = formData.get('role') as Database['public']['Enums']['user_role']

  if (!email || !password || !fullName || !role) {
    return { error: 'Missing required fields' }
  }

  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      }
    }
  })

  if (authError) {
    return { error: authError.message }
  }

  // The database trigger 'handle_new_user' will automatically create the profile 
  // and student records securely, bypassing RLS and avoiding race conditions.

  return { success: true }
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Missing email or password' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
