import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { Header } from '../components/Header'
import type { QueryClient } from '@tanstack/react-query'
import { Footer } from '@/components/Footer'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster richColors closeButton />
    </>
  ),
})
