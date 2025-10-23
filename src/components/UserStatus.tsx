import { useUser } from '@/hooks/queries'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { logout } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'

export const UserStatus = () => {
  const { data: user } = useUser()
  const navigate = useNavigate()
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-1.5 text-foreground hover:text-primary hover:bg-accent/50"
          >
            Welcome {user?.name}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto p-2">
          <DropdownMenuItem className="text-xs text-muted-foreground cursor-pointer hover:bg-accent">
            {user ? `${user.email}` : 'Not Logged In'}
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={async () => {
              await logout()
              navigate({ to: '/', replace: true })
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
