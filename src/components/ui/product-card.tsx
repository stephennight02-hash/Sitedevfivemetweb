import { motion } from "framer-motion";
import { ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  isNew?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  badge,
  isNew,
}: ProductCardProps) {
  const { addItem } = useCart();
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image, category });
    toast({
      title: "Ajouté au panier",
      description: `${name} a été ajouté à votre panier.`,
    });
  };

  return (
    <Link to={`/product/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group card-orizon overflow-hidden"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-gradient-primary text-primary-foreground">
                <Sparkles className="w-3 h-3 mr-1" />
                Nouveau
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-accent text-accent-foreground">
                -{discount}%
              </Badge>
            )}
            {badge && (
              <Badge variant="secondary">{badge}</Badge>
            )}
          </div>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button
              onClick={handleAddToCart}
              className="w-full btn-accent"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {category}
          </p>
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-gradient transition-all">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              {price.toFixed(2)}€
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.toFixed(2)}€
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
