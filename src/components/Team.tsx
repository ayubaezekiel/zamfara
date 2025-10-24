import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { memo } from 'react'

// Image paths
const getImagePath = (key: string): string => {
  const paths: Record<string, string> = {
    governor: '/governor.png',
    deputy: '/deputy.png',
    ssg: '/ssg.png',
    commissioner: '/com.jpg',
    firstLady: '/first_lady.png',
  }
  return paths[key] || ''
}

interface TeamMember {
  name: string
  position: string
  imageKey: string
  title?: 'His Excellency' | 'Her Excellency'
  description?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Dauda Lawal',
    position: 'Governor of Zamfara State',
    imageKey: 'governor',
    title: 'His Excellency',
    description:
      'Leading Zamfara State with vision and dedication to healthcare excellence',
  },
  {
    name: 'Malam Mani Mummuni',
    position: 'Deputy Governor of Zamfara State',
    imageKey: 'deputy',
    title: 'His Excellency',
    description: 'Supporting healthcare initiatives and community development',
  },
  {
    name: 'Malam Abubakar M Nakwada',
    position: 'Secretary to the State Government',
    imageKey: 'ssg',
    description: 'Coordinating government operations and policy implementation',
  },
  {
    name: 'Hajiya Huriyya Dauda-Lawal',
    position: 'First Lady of Zamfara State',
    imageKey: 'firstLady',
    title: 'Her Excellency',
    description: "Champion of VVF repairs and women's health initiatives",
  },
  {
    name: 'Dr. Nafisa Muhammad Maradun',
    position: 'Honourable Commissioner, Ministry of Health',
    imageKey: 'commissioner',
    description: 'Overseeing healthcare delivery and medical outreach programs',
  },
]

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { y: 60, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

const TeamCard = memo(
  ({ member, index }: { member: TeamMember; index: number }) => {
    return (
      <motion.div
        variants={item}
        whileHover={{
          y: -12,
          transition: { duration: 0.3 },
        }}
        style={{
          perspective: 1000,
        }}
      >
        <motion.div
          whileHover={{
            rotateY: 5,
            rotateX: 5,
            scale: 1.02,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="h-full"
        >
          <Card className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-emerald-100 bg-white h-[480px] cursor-pointer">
            {/* Image Container - Fixed height and proper object-fit */}
            <div className="relative h-80 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
              <img
                src={getImagePath(member.imageKey)}
                alt={member.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-400/30 to-transparent rounded-bl-full transition-all duration-500 group-hover:w-40 group-hover:h-40" />

              {/* Title Badge */}
              {member.title && (
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="absolute top-5 left-5 z-10"
                >
                  <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs px-5 py-2 rounded-full shadow-xl backdrop-blur-sm border-2 border-white/20">
                    {member.title}
                  </Badge>
                </motion.div>
              )}

              {/* Floating decorative element */}
              <motion.div
                className="absolute bottom-5 right-5 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 backdrop-blur-sm border border-white/30"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>

            {/* Content Section */}
            <CardContent className="p-6 space-y-3 relative z-10 bg-gradient-to-br from-white to-emerald-50/30">
              <motion.h3
                className="text-xl font-bold text-gray-900 leading-tight"
                whileHover={{ color: 'rgb(16, 185, 129)' }}
                transition={{ duration: 0.3 }}
              >
                {member.name}
              </motion.h3>

              <motion.p
                className="text-emerald-600 font-semibold text-sm leading-snug"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {member.position}
              </motion.p>

              {member.description && (
                <motion.p
                  className="text-sm text-gray-600 leading-relaxed line-clamp-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {member.description}
                </motion.p>
              )}
            </CardContent>

            {/* Animated Bottom Bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8 }}
            />
          </Card>
        </motion.div>
      </motion.div>
    )
  },
)

const SectionHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className="text-center mb-16"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Badge className="mb-6 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 font-semibold text-sm px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg border-2 border-emerald-200">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
        Leadership Team
      </Badge>
    </motion.div>

    <motion.h1
      className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      Our Leadership
    </motion.h1>

    <motion.p
      className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Meet the dedicated leaders driving healthcare transformation in Zamfara
      State
    </motion.p>

    {/* Decorative line */}
    <motion.div
      className="w-24 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mt-6 rounded-full"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.7, duration: 0.8 }}
    />
  </motion.div>
))

export const Team = memo(() => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/50 to-blue-50 py-24 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <SectionHeader />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </motion.div>

        {/* Final Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white rounded-3xl p-12 border-0 shadow-2xl overflow-hidden relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '50px 50px'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                className="w-20 h-1 bg-white/50 mx-auto mb-8 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.7 }}
              />

              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Working Together for Healthier Communities
              </motion.h2>

              <motion.p
                className="text-emerald-50 text-lg max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Under the visionary leadership of{' '}
                <strong className="text-white font-bold">
                  His Excellency Dr. Dauda Lawal
                </strong>{' '}
                and this dedicated team, Zamfara State is transforming
                healthcare access through innovative medical outreach and
                sustainable health initiatives.
              </motion.p>

              <motion.div
                className="w-20 h-1 bg-white/50 mx-auto mt-8 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.9 }}
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
})
