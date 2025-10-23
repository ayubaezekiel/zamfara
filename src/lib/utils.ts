import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { account } from './appwrite'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function logout() {
  try {
    await account.deleteSession({
      sessionId: 'current',
    })
  } catch (err: any) {
    toast.error(err.message || 'Logout failed')
  }
}
