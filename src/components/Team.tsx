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
            rotateY: 8,
            rotateX: 8,
            scale: 1.03,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="h-full"
        >
          <Card className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 border-0 bg-white h-96 cursor-pointer">
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${getImagePath(member.imageKey)})`,
                }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-70" />

              {/* Animated Title Badge */}
              {member.title && (
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <Badge className="bg-red-600 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                    {member.title}
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Content */}
            <CardContent className="p-6 space-y-2 relative z-10">
              <motion.h3
                className="text-xl font-bold text-gray-800"
                whileHover={{ color: 'rgb(16, 185, 129)' }} // emerald-600
                transition={{ duration: 0.3 }}
              >
                {member.name}
              </motion.h3>
              <motion.p
                className="text-emerald-600 font-semibold text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {member.position}
              </motion.p>
              {member.description && (
                <motion.p
                  className="text-sm text-gray-600 line-clamp-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {member.description}
                </motion.p>
              )}
            </CardContent>

            {/* Animated linear Bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-600 to-emerald-500"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
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
      <Badge className="mb-4 bg-emerald-100 text-emerald-700 font-semibold text-sm px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-md">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
        Leadership Team
      </Badge>
    </motion.div>

    <motion.h1
      className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      Our Leadership
    </motion.h1>

    <motion.p
      className="text-xl text-gray-600 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Meet the dedicated leaders driving healthcare transformation in Zamfara
      State
    </motion.p>
  </motion.div>
))

export const Team = memo(() => {
  return (
    <section className="min-h-screen bg-linear-to-br from-gray-50 via-emerald-50 to-blue-50 py-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
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
          <Card className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white rounded-3xl p-10 border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <div className="relative z-10 text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Working Together for Healthier Communities
              </motion.h2>
              <motion.p
                className="text-emerald-100 text-lg max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Under the visionary leadership of{' '}
                <strong>His Excellency Dr. Dauda Lawal</strong> and this
                dedicated team, Zamfara State is transforming healthcare access
                through innovative medical outreach and sustainable health
                initiatives.
              </motion.p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
})
