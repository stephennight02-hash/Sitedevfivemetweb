import { motion } from "framer-motion";
import { Calendar, Clock, Percent, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  discount?: number;
  status: "active" | "upcoming" | "ended";
  featured?: boolean;
}

const statusConfig = {
  active: {
    label: "En cours",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  upcoming: {
    label: "À venir",
    className: "bg-orizon-amber/20 text-orizon-amber border-orizon-amber/30",
  },
  ended: {
    label: "Terminé",
    className: "bg-muted text-muted-foreground border-muted",
  },
};

export function EventCard({
  id,
  title,
  description,
  image,
  startDate,
  endDate,
  discount,
  status,
  featured,
}: EventCardProps) {
  const config = statusConfig[status];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`group card-orizon overflow-hidden ${featured ? "animate-glow-pulse" : ""}`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Status & Discount */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge className={config.className}>{config.label}</Badge>
          {discount && status === "active" && (
            <Badge className="bg-accent text-accent-foreground">
              <Percent className="w-3 h-3 mr-1" />
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-primary text-primary-foreground">
              En vedette
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-gradient transition-all">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Dates */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(startDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>→ {formatDate(endDate)}</span>
          </div>
        </div>

        <Link to={`/events/${id}`}>
          <Button
            variant="ghost"
            className="w-full group/btn justify-between hover:bg-secondary"
          >
            Voir les détails
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
