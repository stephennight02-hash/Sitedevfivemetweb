import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { Link } from "react-router-dom";

const bestSellers = [
  {
    id: "veh-bugatti-centuria",
    name: "Bugatti Centuria (Orizon Exclusive)",
    price: 1599,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    category: "Véhicules",
    badge: "Event -20%",
    isNew: false,
  },
  {
    id: "coins-10000",
    name: "Pack 10 000 Orizon Coins",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    category: "Coins",
    isNew: false,
  },
  {
    id: "map-luxury-mansion",
    name: "Luxury Mansion MLO",
    price: 299,
    originalPrice: 399,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    category: "Mapping",
    badge: "Event -25%",
    isNew: true,
  },
  {
    id: "veh-lamborghini-aventador",
    name: "Lamborghini Aventador SVJ",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80",
    category: "Véhicules",
    isNew: true,
  },
  {
    id: "script-garage-system",
    name: "Advanced Garage System",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Scripts",
    isNew: false,
  },
  {
    id: "pack-starter",
    name: "Starter Pack Deluxe",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    category: "Packs",
    badge: "Populaire",
    isNew: false,
  },
  {
    id: "veh-porsche-911",
    name: "Porsche 911 GT3 RS",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
    category: "Véhicules",
    isNew: false,
  },
  {
    id: "skin-police-pack",
    name: "Police Department Skin Pack",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1532188363366-3a1b2ac4a338?w=800&q=80",
    category: "Skins",
    isNew: true,
  },
];

export function BestSellers() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium">Meilleures ventes</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Les plus populaires
            </h2>
          </div>
          <Link to="/shop">
            <Button variant="outline" className="group">
              Voir toute la boutique
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
