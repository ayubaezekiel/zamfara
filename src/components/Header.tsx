import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Link } from '@tanstack/react-router'
import { ChevronDown, Home, Menu, Newspaper, Phone, User } from 'lucide-react'
import { useState } from 'react'

const hospitals = [
  'AHMAD SANI YARIMAN BAKURA SPECIALIST HOSPITAL GUSAU',
  'ARIDA VVF HOSPITAL GUSAU',
  'EYE CENTRE GUSAU',
  'GENERAL HOSPITAL TALATA MAFARA',
  'GENERAL HOSPITAL GUMMI',
  'GENERAL HOSPITAL K/NAMODA',
  'GENERAL HOSPITAL ANKA',
  'GENERAL HOSPITAL TSAFE',
  'GENERAL HOSPITAL BAKURA',
  'GENERAL HOSPITAL BUKKUYUM',
  'GENERAL HOSPITAL MARADUN',
  'GENERAL HOSPITAL SHIKAFI',
  'GENERAL HOSPITAL DANSAUDAU',
  'GENERAL HOSPITAL ZURMI',
  'GENERAL HOSPITAL BUNGUDU',
  'GENERAL HOSPITAL MADA',
  'GENERAL HOSPITAL B/MAGAJI',
  'GENERAL HOSPITAL KAGARA',
  'GENERAL HOSPITAL MARU',
  'GENERAL HOSPITAL MAGAMI',
  'GENERAL HOSPITAL MORIKI',
  'GENERAL HOSPITAL K/DAJI',
]

const navLinks = [
  { title: 'News', href: '/news', icon: <Newspaper className="w-4 h-4" /> },
  { title: 'About Us', href: '/about', icon: <User className="w-4 h-4" /> },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-teal-700 border-border/40  backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src={'/zzlogo.png'} alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex flex-1 items-center justify-center overflow-x-auto px-4">
          <ul className="flex items-center gap-6 text-sm font-medium text-foreground whitespace-nowrap">
            <li>
              <Link
                to="/"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>

            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  {link.icon}
                  {link.title}
                </Link>
              </li>
            ))}

            {/* Hospitals Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1.5 text-foreground hover:text-primary hover:bg-accent/50"
                >
                  Hospitals
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto p-2">
                {hospitals.map((h, i) => (
                  <DropdownMenuItem
                    key={i}
                    className="text-xs text-muted-foreground cursor-pointer hover:bg-accent"
                  >
                    {h}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
        </nav>

        {/* RIGHT: Phone + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Phone */}
          <div className="hidden md:flex items-center gap-2 text-foreground">
            <Phone className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold">+2348034671960</span>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground hover:bg-accent/50"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-4 space-y-3">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                  >
                    {link.icon}
                    {link.title}
                  </Link>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent">
                      <span className="flex items-center gap-3">
                        <ChevronDown className="w-5 h-5" />
                        Hospitals
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full max-h-64 overflow-y-auto ml-4">
                    {hospitals.map((h, i) => (
                      <DropdownMenuItem key={i} className="text-xs">
                        {h}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground border-t pt-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+2348034671960</span>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
