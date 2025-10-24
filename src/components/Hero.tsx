import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { useSchedulesQuery } from '@/hooks/queries'
import Autoplay from 'embla-carousel-autoplay'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { useRef, useState } from 'react'

// === IMAGE PATHS ===
const getImagePath = (key: string): string => {
  const paths: Record<string, string> = {
    outreach: '/outreach.png',
    medicals: '/medicals.png',
    g1: '/g1.jpg',
    g17: '/g17.jpg',
    outreach4: '/outreach4.png',
    zhouse: '/zhouse.jpg',
  }
  return paths[key] || ''
}

// === CAROUSEL DATA ===
const carouselData = [
  { imageKey: 'outreach', title: 'Proposal presentation to the Governor' },
  { imageKey: 'medicals', title: 'Eye surgery in progress' },
  { imageKey: 'g1', title: 'Report presentation' },
  { imageKey: 'g17', title: 'Surgery at Yarima Bakura Specialist Hospital' },
  { imageKey: 'outreach4', title: 'Committee inauguration by SSG' },
  { imageKey: 'zhouse', title: 'Outreach at Yarima Bakura Hospital' },
]

// === LAZY IMAGE WITH BLUR-UP ===
const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl">
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 transition-opacity duration-700 blur-sm"
        style={{
          backgroundImage: `url(${src})`,
          opacity: loaded ? 0 : 0.8,
        }}
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-700 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

// === CAROUSEL SLIDE ===
const CarouselSlide = ({
  imageKey,
  title,
}: {
  imageKey: string
  title: string
}) => {
  const imageSrc = getImagePath(imageKey)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="relative h-[30rem] md:h-[40rem] lg:h-[50rem] rounded-3xl overflow-hidden shadow-2xl group"
    >
      <LazyImage src={imageSrc} alt={title} />

      {/* Dynamic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-800/50 to-transparent" />

      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/0 via-emerald-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Content */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full" />
          <Sparkles className="w-5 h-5 text-teal-400" />
        </motion.div>

        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl leading-tight">
          Zamfara State Special Modified <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">
            Medical Outreach
          </span>
        </h3>

        <p className="text-lg md:text-2xl text-teal-100 mb-3 font-medium drop-shadow-lg">
          Improving quality of life through accessible healthcare
        </p>

        <p className="text-sm md:text-base text-white/90 max-w-3xl mb-8 drop-shadow-md leading-relaxed">
          {title}
        </p>

        <Button
          size="lg"
          className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white border-0 shadow-2xl hover:shadow-teal-500/50 hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-6 rounded-full"
          onClick={() => (window.location.href = '/about')}
        >
          Discover Our Mission
          <TrendingUp className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-400/20 to-transparent rounded-bl-full" />
    </motion.div>
  )
}

// === ANNOUNCEMENT BOARD ===
const AnnouncementBoard = () => {
  const { data: announcements, isPending } = useSchedulesQuery()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const isUpcoming = (startDate: string) => {
    return new Date(startDate) > new Date()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
      case 'scheduled':
        return 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 shadow-blue-500/50'
      case 'ongoing':
      case 'active':
        return 'bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 shadow-green-500/50'
      case 'completed':
        return 'bg-gradient-to-r from-gray-500 via-gray-600 to-slate-600 shadow-gray-500/50'
      default:
        return 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-amber-500/50'
    }
  }

  const getCardBackground = (
    status: string,
    startDate: string,
    isHovered: boolean,
  ) => {
    const hoverScale = isHovered ? 'scale-[1.02]' : 'scale-100'
    const hoverShadow = isHovered ? 'shadow-2xl' : 'shadow-lg'

    if (status.toLowerCase() === 'completed') {
      return `bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 border-gray-300 ${hoverScale} ${hoverShadow}`
    }
    return isUpcoming(startDate)
      ? `bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-blue-300 ${hoverScale} ${hoverShadow}`
      : `bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-amber-300 ${hoverScale} ${hoverShadow}`
  }

  return (
    <Card className="w-full lg:w-[30rem] xl:w-[32rem] flex-shrink-0 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 h-fit border-2 border-emerald-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-400/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-teal-400/20 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6 pb-5 border-b-2 border-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/50 animate-pulse">
            <AlertCircle className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-teal-700">
              Announcements
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              Latest updates & schedules
            </p>
          </div>
        </motion.div>

        <div className="space-y-5 max-h-[650px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-emerald-50">
          {isPending ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mx-auto mb-4 animate-spin">
                <div className="w-full h-full rounded-full border-4 border-white border-t-transparent" />
              </div>
              <p className="text-gray-600 font-medium">
                Loading announcements...
              </p>
            </motion.div>
          ) : announcements?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-gray-500 font-medium">
                No announcements at the moment
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {announcements?.map((ann, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className={`rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${getCardBackground(
                    `${ann.status}`,
                    ann.startDate,
                    hoveredIndex === i,
                  )}`}
                >
                  {/* Shine effect on hover */}
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`${getStatusColor(
                          `${ann.status}`,
                        )} text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-wider`}
                      >
                        {ann.status}
                      </motion.span>
                      <span className="text-xs text-gray-700 flex items-center gap-2 font-semibold bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(ann.startDate)}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 mb-3 text-lg leading-tight">
                      {ann.eventName}
                    </h4>

                    <div className="space-y-2.5 mb-4">
                      <p className="text-sm text-gray-800 flex items-center gap-2.5 bg-white/60 px-3 py-2 rounded-lg">
                        <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium">{ann.location}</span>
                      </p>
                      <p className="text-xs text-gray-700 flex items-center gap-2.5 bg-white/60 px-3 py-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium">
                          {formatDate(ann.startDate)} -{' '}
                          {formatDate(ann.endDate)}
                        </span>
                      </p>
                    </div>

                    <div className="pt-4 border-t-2 border-white/50">
                      <p className="text-sm text-gray-800 leading-relaxed font-medium">
                        {ann.notice}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </Card>
  )
}

// === MAIN HERO ===
export function Hero() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-16 md:py-20 mt-10">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-auto lg:flex-1 max-w-5xl"
          >
            <Carousel
              opts={{ loop: true }}
              plugins={[autoplay.current]}
              onMouseEnter={() => autoplay.current.stop()}
              onMouseLeave={() => autoplay.current.reset()}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <CarouselContent>
                {carouselData.map((slide, i) => (
                  <CarouselItem key={i}>
                    <CarouselSlide
                      imageKey={slide.imageKey}
                      title={slide.title}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-6 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white border-white/40 shadow-xl hover:scale-110 transition-all" />
              <CarouselNext className="right-6 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white border-white/40 shadow-xl hover:scale-110 transition-all" />
            </Carousel>
          </motion.div>

          {/* Announcement Board */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnnouncementBoard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
