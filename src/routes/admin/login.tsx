import { AuthForm } from '@/components/forms/auth-form'
import { requireGuest } from '@/lib/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/login')({
  beforeLoad: async () => {
    await requireGuest()
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <AuthForm />
    </div>
  )
}
