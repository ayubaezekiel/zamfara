import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useSchedulesQuery } from "@/hooks/queries";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { AlertCircle, Calendar, Clock, MapPin } from "lucide-react";
import { useRef, useState } from "react";

// === IMAGE PATHS ===
const getImagePath = (key: string): string => {
  const paths: Record<string, string> = {
    outreach: "/outreach.png",
    medicals: "/medicals.png",
    g1: "/g1.jpg",
    g17: "/g17.jpg",
    outreach4: "/outreach4.png",
    zhouse: "/zhouse.jpg",
  };
  return paths[key] || "";
};

// === CAROUSEL DATA ===
const carouselData = [
  { imageKey: "outreach", title: "Proposal presentation to the Governor" },
  { imageKey: "medicals", title: "Eye surgery in progress" },
  { imageKey: "g1", title: "Report presentation" },
  { imageKey: "g17", title: "Surgery at Yarima Bakura Specialist Hospital" },
  { imageKey: "outreach4", title: "Committee inauguration by SSG" },
  { imageKey: "zhouse", title: "Outreach at Yarima Bakura Hospital" },
];

// === LAZY IMAGE WITH BLUR-UP ===
const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Skeleton */}
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}

      {/* Blur-up background */}
      <div
        className="absolute inset-0 bg-cover bg-center  scale-110 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${src})`,
          opacity: loaded ? 0 : 0.8,
        }}
      />

      {/* Real image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

// === CAROUSEL SLIDE ===
const CarouselSlide = ({
  imageKey,
  title,
}: {
  imageKey: string;
  title: string;
}) => {
  const imageSrc = getImagePath(imageKey);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-[25rem] md:h-[35rem] lg:h-[45rem] rounded-2xl overflow-hidden shadow-2xl"
    >
      <LazyImage src={imageSrc} alt={title} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-center text-white"
      >
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-2xl">
          Zamfara State Special Modified Medical Outreach
        </h3>
        <p className="text-lg md:text-xl text-white/90 mb-2 font-medium drop-shadow-lg">
          Improving quality of life through accessible healthcare
        </p>
        <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto mb-6 drop-shadow-md">
          {title}
        </p>
        <Button
          size="lg"
          className="bg-white text-emerald-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl font-semibold"
          onClick={() => (window.location.href = "/about")}
        >
          Learn More About Our Mission
        </Button>
      </motion.div>
    </motion.div>
  );
};

// === ANNOUNCEMENT BOARD ===
const AnnouncementBoard = () => {
  const { data: announcements, isPending } = useSchedulesQuery();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isUpcoming = (startDate: string) => {
    return new Date(startDate) > new Date();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
      case "scheduled":
        return "bg-gradient-to-r from-blue-500 to-blue-600";
      case "ongoing":
      case "active":
        return "bg-gradient-to-r from-green-500 to-green-600";
      case "completed":
        return "bg-gradient-to-r from-gray-500 to-gray-600";
      default:
        return "bg-gradient-to-r from-amber-500 to-orange-500";
    }
  };

  const getCardBackground = (status: string, startDate: string) => {
    if (status.toLowerCase() === "completed") {
      return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300";
    }
    return isUpcoming(startDate)
      ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
      : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200";
  };

  return (
    <Card className="w-full lg:w-96 xl:w-[28rem] flex-shrink-0 lg:ml-8 mt-8 lg:mt-0 bg-white rounded-2xl shadow-2xl p-6 h-fit lg:sticky lg:top-24">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Announcements</h3>
          <p className="text-xs text-gray-500">Latest updates & schedules</p>
        </div>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {isPending ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Loading announcements...</p>
          </div>
        ) : announcements?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No announcements at the moment</p>
          </div>
        ) : (
          announcements?.map((ann, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl p-5 border-2 shadow-md hover:shadow-lg transition-all duration-300 ${getCardBackground(
                `${ann.status}`,
                ann.startDate
              )}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`${getStatusColor(
                    `${ann.status}`
                  )} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}
                >
                  {ann.status}
                </span>
                <span className="text-xs text-gray-600 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  {formatDate(ann.startDate)}
                </span>
              </div>

              <h4 className="font-bold text-gray-800 mb-2 text-base leading-tight">
                {ann.eventName}
              </h4>

              <div className="space-y-2 mb-3">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span>{ann.location}</span>
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span>
                    {formatDate(ann.startDate)} - {formatDate(ann.endDate)}
                  </span>
                </p>
              </div>

              <div className="pt-3 border-t border-gray-300">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {ann.notice}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
};
// === MAIN HERO ===
export function Hero() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 to-teal-50 py-24 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <Badge variant="secondary" className="mb-4">
              Special Modified Medical Outreach
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6">
              Transforming Lives Through Accessible Healthcare
            </h1>
            <p className="text-lg text-emerald-700 mb-8">
              Launched by His Excellency Dr. Dauda Lawal on{" "}
              <strong>July 6, 2023</strong>, we bring specialized medical care
              to every corner of Zamfara State.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Learn More
              </Button>
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* Right: Carousel + Notice Board */}
          <div className="lg:col-span-2 flex flex-col lg:flex-row gap-8 items-start">
            {/* Carousel */}
            <div className="flex-1 w-full">
              <Carousel
                opts={{ loop: true }}
                plugins={[autoplay.current]}
                onMouseEnter={() => autoplay.current.stop()}
                onMouseLeave={() => autoplay.current.reset()}
                className="rounded-2xl overflow-hidden shadow-2xl"
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
                <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 text-white border-white/30" />
                <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 text-white border-white/30" />
              </Carousel>
            </div>

            {/* Notice Board */}
            <AnnouncementBoard />
          </div>
        </div>
      </div>
    </section>
  );
}
