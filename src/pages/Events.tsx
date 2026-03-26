import { motion } from "framer-motion";
import { Calendar, Sparkles, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventCard } from "@/components/ui/event-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const allEvents = [
  {
    id: "winter-sale-2025",
    title: "Ventes d'Hiver",
    description: "Profitez de réductions exceptionnelles sur tous les véhicules premium pendant les fêtes ! Ne manquez pas cette opportunité unique.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    startDate: "2025-12-20",
    endDate: "2025-12-27",
    discount: 25,
    status: "active" as const,
    featured: true,
  },
  {
    id: "new-year-pack",
    title: "Pack Nouvel An",
    description: "Des items exclusifs pour célébrer la nouvelle année sur Orizon ! Véhicules dorés, skins spéciaux et plus encore.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    startDate: "2025-12-31",
    endDate: "2026-01-07",
    discount: 15,
    status: "upcoming" as const,
    featured: false,
  },
  {
    id: "mapping-contest",
    title: "Concours Mapping",
    description: "Participez au concours de création de maps et gagnez des récompenses exclusives. Les meilleurs créateurs seront mis en avant !",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    startDate: "2026-01-15",
    endDate: "2026-02-15",
    status: "upcoming" as const,
    featured: false,
  },
  {
    id: "black-friday-2025",
    title: "Black Friday 2025",
    description: "Les plus grosses réductions de l'année ! Jusqu'à -50% sur une sélection de produits premium.",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80",
    startDate: "2025-11-28",
    endDate: "2025-12-01",
    discount: 50,
    status: "ended" as const,
    featured: false,
  },
  {
    id: "halloween-2025",
    title: "Halloween Special",
    description: "Des véhicules et skins horrifiques pour Halloween ! Édition limitée disponible uniquement pendant l'événement.",
    image: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80",
    startDate: "2025-10-25",
    endDate: "2025-11-01",
    discount: 20,
    status: "ended" as const,
    featured: false,
  },
];

export default function Events() {
  const activeEvents = allEvents.filter((e) => e.status === "active");
  const upcomingEvents = allEvents.filter((e) => e.status === "upcoming");
  const endedEvents = allEvents.filter((e) => e.status === "ended");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="text-accent font-medium">Événements & Promotions</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Nos <span className="text-gradient">Événements</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos promotions en cours, les événements à venir et ne manquez 
              aucune offre exclusive sur Orizon.
            </p>
          </motion.div>

          {/* Featured Event Banner */}
          {activeEvents.find((e) => e.featured) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl mb-12"
            >
              <div className="absolute inset-0">
                <img
                  src={activeEvents[0].image}
                  alt={activeEvents[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
              </div>
              <div className="relative z-10 p-8 md:p-12 max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                    En cours maintenant
                  </span>
                  {activeEvents[0].discount && (
                    <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-bold">
                      -{activeEvents[0].discount}%
                    </span>
                  )}
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {activeEvents[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {activeEvents[0].description}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Du {new Date(activeEvents[0].startDate).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      Au {new Date(activeEvents[0].endDate).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Events Tabs */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="active" className="gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                En cours ({activeEvents.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                À venir ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="ended">
                Terminés ({endedEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {activeEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <EventCard {...event} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState message="Aucun événement en cours pour le moment." />
              )}
            </TabsContent>

            <TabsContent value="upcoming">
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <EventCard {...event} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState message="Aucun événement à venir pour le moment." />
              )}
            </TabsContent>

            <TabsContent value="ended">
              {endedEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {endedEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <EventCard {...event} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState message="Aucun événement terminé." />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
        <Calendar className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">{message}</p>
    </motion.div>
  );
}
