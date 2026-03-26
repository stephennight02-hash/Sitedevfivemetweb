import { motion } from "framer-motion";
import { Coins, Car, Map, Code, Palette, Package } from "lucide-react";
import { CategoryCard } from "@/components/ui/category-card";

const categories = [
  {
    name: "Coins",
    slug: "coins",
    icon: Coins,
    count: 8,
    gradient: "bg-gradient-to-br from-orizon-amber to-orizon-orange",
  },
  {
    name: "Véhicules",
    slug: "vehicles",
    icon: Car,
    count: 124,
    gradient: "bg-gradient-to-br from-orizon-blue to-orizon-purple",
  },
  {
    name: "Mapping",
    slug: "mapping",
    icon: Map,
    count: 56,
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  {
    name: "Scripts",
    slug: "scripts",
    icon: Code,
    count: 89,
    gradient: "bg-gradient-to-br from-orizon-purple to-orizon-violet",
  },
  {
    name: "Skins",
    slug: "skins",
    icon: Palette,
    count: 234,
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    name: "Packs",
    slug: "packs",
    icon: Package,
    count: 18,
    gradient: "bg-gradient-to-br from-orizon-cyan to-blue-500",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Explorez nos <span className="text-gradient">catégories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre large sélection de produits pour personnaliser votre
            expérience sur Orizon
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CategoryCard {...category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
