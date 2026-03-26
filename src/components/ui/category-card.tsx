import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  slug: string;
  icon: LucideIcon;
  count: number;
  gradient: string;
}

export function CategoryCard({ name, slug, icon: Icon, count, gradient }: CategoryCardProps) {
  return (
    <Link to={`/shop?category=${slug}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative overflow-hidden rounded-2xl p-6 bg-card border border-border hover:border-primary/50 transition-all duration-300"
      >
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient}`}
        />

        {/* Icon */}
        <div className="relative z-10 mb-4">
          <div
            className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center`}
          >
            <Icon className="w-7 h-7 text-foreground" />
          </div>
        </div>

        {/* Content */}
        <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-gradient transition-all">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {count} produits
        </p>

        {/* Hover Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute top-6 right-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          →
        </motion.div>
      </motion.div>
    </Link>
  );
}
