import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/ui/event-card";
import { Link } from "react-router-dom";

const featuredEvents = [
  {
    id: "winter-sale-2025",
    title: "Ventes d'Hiver",
    description:
      "Profitez de réductions exceptionnelles sur tous les véhicules premium pendant les fêtes !",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    startDate: "2025-12-20",
    endDate: "2025-12-27",
    discount: 25,
    status: "active" as const,
    featured: true,
  },
  {
    id: "new-year-pack",
    title: "Pack Nouvel An",
    description:
      "Des items exclusifs pour célébrer la nouvelle année sur Orizon !",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    startDate: "2025-12-31",
    endDate: "2026-01-07",
    discount: 15,
    status: "upcoming" as const,
    featured: false,
  },
  {
    id: "mapping-contest",
    title: "Concours Mapping",
    description:
      "Participez au concours de création de maps et gagnez des récompenses exclusives.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    startDate: "2026-01-15",
    endDate: "2026-02-15",
    status: "upcoming" as const,
    featured: false,
  },
];

export function FeaturedEvents() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium">Événements</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Promos & Événements
            </h2>
          </div>
          <Link to="/events">
            <Button variant="outline" className="group">
              Voir tous les événements
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
