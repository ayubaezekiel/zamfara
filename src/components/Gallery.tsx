import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

// Consolidated gallery data with direct paths
const galleryData = [
  {
    image: "/outreach.png",
    title: "Presentation of proposal to the executive governor",
    alt: "Governor receiving proposal",
  },
  {
    image: "/medicals.png",
    title: "Eye surgery in progress",
    alt: "Eye surgery team",
  },
  {
    image: "/outreach3.png",
    title: "Presentation of report in progress",
    alt: "Report presentation",
  },
  {
    image: "/outreach2.png",
    title: "Governor with committee chairman",
    alt: "Governor and chairman",
  },
  {
    image: "/outreach4.png",
    title: "Inauguration of committee by SSG",
    alt: "SSG inaugurating committee",
  },
  {
    image: "/outreach6.jpg",
    title: "Surgery at Yarima Bakura Specialist Hospital",
    alt: "Surgery in progress",
  },
  {
    image: "/tele.png",
    title: "Tele-screening",
    alt: "Tele-screening session",
  },
  {
    image: "/o3.jpg",
    title: "Pre-outreach surgery",
    alt: "Pre-outreach surgical procedure",
  },
  {
    image: "/o4.jpg",
    title: "Removed stone (0.6kg)",
    alt: "Extracted 0.6kg stone",
  },
  {
    image: "/impact.png",
    title: "Post-surgery follow-up",
    alt: "Post-surgery assessment",
  },
  {
    image: "/g1.jpg",
    title: "Surgical team at Yariman Bakura Hospital",
    alt: "Team at Yariman Bakura",
  },
  {
    image: "/g2.jpg",
    title: "Surgical team at General Hospital, Gusau",
    alt: "Team at General Hospital",
  },
  {
    image: "/g3.png",
    title: "Drug & Medical Consumable Agency",
    alt: "Drug management agency",
  },
  {
    image: "/g4.png",
    title: "Virtual committee meeting",
    alt: "Virtual committee",
  },
  {
    image: "/g6.png",
    title: "Virtual outreach resource meeting",
    alt: "Virtual resource meeting",
  },
  {
    image: "/g7.png",
    title: "Groin surgery training by Dr. Peter Enesi",
    alt: "Dr. Enesi training",
  },
  {
    image: "/g8.png",
    title: "Groin surgery training",
    alt: "Groin surgery training",
  },
  {
    image: "/g9.png",
    title: "Cataract patients waiting",
    alt: "Patients awaiting assessment",
  },
  {
    image: "/g10.png",
    title: "Cataract patient assessment",
    alt: "Cataract assessment",
  },
  {
    image: "/g11.jpg",
    title: "Patients awaiting dressing change",
    alt: "Dressing change queue",
  },
  {
    image: "/o1.jpg",
    title: "Colo-vaginal reconstruction",
    alt: "Colo-vaginal surgery",
  },
  {
    image: "/o2.jpg",
    title: "Neovagina reconstruction (MRKH)",
    alt: "MRKH neovagina surgery",
  },
  {
    image: "/g12.png",
    title: "Post-surgery follow-up",
    alt: "Post-surgery follow-up",
  },
  {
    image: "/g15.jpg",
    title: "Previous surgery in progress",
    alt: "Surgery in progress",
  },
  { image: "/g16.jpg", title: "VVF surgery in progress", alt: "VVF surgery" },
  {
    image: "/g17.jpg",
    title: "Surgery at Yariman Bakura Hospital",
    alt: "Yariman Bakura surgery",
  },
  {
    image: "/g19.png",
    title: "Patients receiving transport money",
    alt: "Transport money distribution",
  },
  {
    image: "/g20.png",
    title: "Patient leaving hospital happily",
    alt: "Patient discharge with transport",
  },
];

const GalleryCard = ({
  image,
  title,
  alt,
  index,
}: {
  image: string;
  title: string;
  alt: string;
  index: number;
}) => {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.6 }}
        className="h-full"
      >
        <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white h-full">
          <div className="relative overflow-hidden">
            <motion.img
              src={image}
              alt={alt}
              loading="lazy"
              className="h-96 w-full object-cover rounded-t-2xl"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <CardContent className="p-5">
            <motion.h3
              className="text-lg font-semibold text-emerald-700 text-center line-clamp-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.3 }}
            >
              {title}
            </motion.h3>
          </CardContent>

          {/* Animated border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 to-teal-600"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 + 0.4, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </Card>
      </motion.div>
    </CarouselItem>
  );
};

export function Gallery() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 font-semibold text-sm px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-md">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z"
                clipRule="evenodd"
              />
            </svg>
            Medical Outreach Gallery
          </Badge>
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Moments of Impact
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            From surgeries to community outreach — see how we’re transforming
            healthcare in Zamfara State.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplay.current]}
          onMouseEnter={() => autoplay.current.stop()}
          onMouseLeave={() => autoplay.current.reset()}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {galleryData.map((item, index) => (
              <GalleryCard
                key={item.title + index}
                image={item.image}
                title={item.title}
                alt={item.alt}
                index={index}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white/90 hover:bg-white shadow-lg" />
          <CarouselNext className="hidden md:flex -right-12 bg-white/90 hover:bg-white shadow-lg" />
        </Carousel>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="text-3xl font-bold text-emerald-600">1,200+</h3>
            <p className="text-gray-600">Surgeries Performed</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="text-3xl font-bold text-emerald-600">14</h3>
            <p className="text-gray-600">LGAs Covered</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="text-3xl font-bold text-emerald-600">100%</h3>
            <p className="text-gray-600">Free Treatment</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
