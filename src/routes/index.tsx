import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { TypographyH2, TypographyP } from '@/components/ui/typography'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { Hero } from '@/components/Hero'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'
import { Eye, GraduationCap, HeartHandshake, Scissors } from 'lucide-react'

// Lazy load heavy sections
const Team = lazy(() =>
  import('../components/Team').then((m) => ({ default: m.Team })),
)
const Gallery = lazy(() =>
  import('../components/Gallery').then((m) => ({ default: m.Gallery })),
)

export const Route = createFileRoute('/')({
  component: Landing,
})

const services = [
  {
    title: 'Cataract Extraction',
    description:
      'Advanced cataract surgery with artificial lens replacement for restored vision clarity.',
    icon: Eye,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Groin Swellings (Hernia, hydroceles)',
    description:
      'Expert treatment for groin abnormalities including hernias and hydroceles.',
    icon: Scissors,
    color: 'from-teal-500 to-cyan-600',
  },
  {
    title: 'Vesicovaginal Fistula (VVF) Repairs',
    description:
      'Specialized surgical repair to restore normal urinary function and improve quality of life.',
    icon: HeartHandshake,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Health Education',
    description:
      'Comprehensive health awareness programs promoting preventive care and healthy living.',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-600',
  },
]

// Testimonials
const testimonials = [
  {
    name: 'Aisha Musa',
    role: 'Patient',
    content: 'The VVF repair changed my life. I can now live with dignity.',
  },
  {
    name: 'Dr. Yusuf Bello',
    role: 'Surgeon',
    content: 'This outreach brings world-class care to rural communities.',
  },
  {
    name: 'Fatima Ahmed',
    role: 'Mother',
    content: 'My son’s cataract surgery was free and successful. Thank you!',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100 },
  },
}
const LoadingSkeleton = () => (
  <div className="space-y-8 p-8">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-64 w-full rounded-xl" />
  </div>
)

function Landing() {
  return (
    <>
      {/* HERO */}
      <Hero />

      {/* ABOUT US + SERVICES */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-emerald-900">
                  About Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TypographyP className="text-muted-foreground leading-relaxed">
                  The <strong>Special Modified Medical Outreach</strong> is a
                  transformative healthcare initiative established by His
                  Excellency, <strong>Dr. Dauda Lawal</strong>, Executive
                  Governor of Zamfara State. Inaugurated on{' '}
                  <strong>July 6th, 2023</strong>, this program is dedicated to
                  alleviating citizen suffering and enhancing quality of life
                  through accessible, high-quality medical care.
                </TypographyP>
              </CardContent>
            </Card>

            {/* Services */}
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-center mb-16"
                >
                  <Badge className="mb-4 bg-emerald-100 text-emerald-700 font-semibold text-sm px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-md">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Our Core Services
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
                    Life-Changing Medical Care
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We provide specialized, free-of-charge treatments to restore
                    health and dignity across Zamfara State.
                  </p>
                </motion.div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-100px' }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {services.map((service, index) => {
                    const Icon = service.icon
                    return (
                      <motion.div
                        key={service.title}
                        variants={item}
                        whileHover={{
                          y: -8,
                          scale: 1.03,
                          transition: { duration: 0.3 },
                        }}
                        className="h-full"
                      >
                        <Card className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white h-full flex flex-col">
                          {/* linear Border Top */}
                          <div
                            className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${service.color}`}
                          />

                          <CardHeader className="pb-4">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className="w-14 h-14 rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow"
                            >
                              <Icon className="w-7 h-7 text-emerald-600" />
                            </motion.div>
                            <CardTitle className="text-xl font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                              {service.title}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="flex-1">
                            <CardDescription className="text-gray-600 leading-relaxed">
                              {service.description}
                            </CardDescription>
                          </CardContent>

                          {/* Animated Bottom linear */}
                          <motion.div
                            className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${service.color}`}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: index * 0.1 + 0.4,
                              duration: 0.8,
                            }}
                            style={{ transformOrigin: 'left' }}
                          />
                        </Card>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <Suspense fallback={<LoadingSkeleton />}>
        <section id="team" className="py-16 md:py-24 bg-emerald-50">
          <div className="container mx-auto px-4">
            <Team />
          </div>
        </section>
      </Suspense>

      {/* GALLERY CAROUSEL */}
      <Gallery />

      {/* TESTIMONIALS CAROUSEL */}
      <Suspense fallback={<LoadingSkeleton />}>
        <section className="py-16 md:py-24 bg-emerald-50">
          <div className="container mx-auto px-4">
            <TypographyH2 className="mb-12 text-center text-3xl font-bold text-emerald-900">
              What People Say
            </TypographyH2>
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((t, i) => (
                  <CarouselItem key={i}>
                    <Card className="border-0 shadow-lg">
                      <CardContent className="pt-8 text-center">
                        <TypographyP className="italic text-lg mb-6">
                          "{t.content}"
                        </TypographyP>
                        <div>
                          <p className="font-semibold text-emerald-900">
                            {t.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t.role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </Suspense>

      {/* FAQ */}
      <Suspense fallback={<LoadingSkeleton />}>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <TypographyH2 className="mb-12 text-center text-3xl font-bold text-emerald-900">
              Frequently Asked Questions
            </TypographyH2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Who is eligible for the medical outreach?
                </AccordionTrigger>
                <AccordionContent>
                  All residents of Zamfara State are eligible, with priority
                  given to vulnerable groups including women, children, and the
                  elderly.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Are the services free?</AccordionTrigger>
                <AccordionContent>
                  Yes, all surgical procedures, consultations, and medications
                  provided under this program are completely free.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I register?</AccordionTrigger>
                <AccordionContent>
                  Visit any designated outreach center or contact your local
                  government health office for registration.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </Suspense>
    </>
  )
}
