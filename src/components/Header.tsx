import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from '@tanstack/react-router'
import {
  ChevronDown,
  Home,
  Menu,
  Newspaper,
  Phone,
  User,
  Building2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 border-teal-700/50 backdrop-blur-md shadow-lg">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link to="/" className="flex items-center group">
          <motion.img
            src="/zzlogo.png"
            alt="Logo"
            className="h-12 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex flex-1 items-center justify-center">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/20 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>

            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/20 transition-all duration-200"
                >
                  {link.icon}
                  {link.title}
                </Link>
              </li>
            ))}

            {/* Hospitals Dropdown */}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-white hover:bg-white/20 hover:text-white font-semibold"
                  >
                    <Building2 className="w-4 h-4" />
                    Hospitals
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-96 max-h-96 overflow-y-auto p-2 bg-white shadow-xl border-2 border-emerald-100">
                  <div className="px-3 py-2 text-xs font-semibold text-emerald-700 border-b border-emerald-100 mb-1">
                    {hospitals.length} Healthcare Facilities
                  </div>
                  {hospitals.map((h, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="text-sm text-gray-700 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors py-2.5 px-3"
                    >
                      <Building2 className="w-4 h-4 mr-2 text-emerald-600" />
                      {h}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>

        {/* RIGHT: Phone + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Phone */}
          <a
            href="tel:+2348034671960"
            className="hidden md:flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-semibold">+234 803 467 1960</span>
          </a>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-2xl border-t-2 border-emerald-200 overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Home className="w-4 h-4 text-emerald-600" />
                </div>
                Home
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    {link.icon}
                  </div>
                  {link.title}
                </Link>
              ))}

              {/* Mobile Hospitals Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="flex-1 text-left">Hospitals</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)] max-h-72 overflow-y-auto ml-4 bg-white shadow-xl border-2 border-emerald-100">
                  <div className="px-3 py-2 text-xs font-semibold text-emerald-700 border-b border-emerald-100 mb-1 sticky top-0 bg-white">
                    {hospitals.length} Healthcare Facilities
                  </div>
                  {hospitals.map((h, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors py-2.5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Building2 className="w-3 h-3 mr-2 text-emerald-600 flex-shrink-0" />
                      <span className="line-clamp-2">{h}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Phone */}
              <a
                href="tel:+2348034671960"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg mt-2"
              >
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+234 803 467 1960</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
