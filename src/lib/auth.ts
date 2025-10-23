import { account } from '@/lib/appwrite'
import { redirect } from '@tanstack/react-router'

export async function getSession() {
  try {
    const session = await account.get()
    return session
  } catch (error) {
    return null
  }
}

export async function requireAuth() {
  const user = await getSession()

  if (!user) {
    throw redirect({
      to: '/admin/login',
    })
  }

  return user
}

export async function requireGuest() {
  const user = await getSession()

  if (user) {
    throw redirect({
      to: '/admin',
    })
  }

  return null
}
