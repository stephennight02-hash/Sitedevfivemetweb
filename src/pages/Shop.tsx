import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";

const allProducts = [
  {
    id: "veh-bugatti-centuria",
    name: "Bugatti Centuria (Orizon Exclusive)",
    price: 1599,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    category: "vehicles",
    categoryDisplay: "Véhicules",
    badge: "Event -20%",
    isNew: false,
  },
  {
    id: "coins-10000",
    name: "Pack 10 000 Orizon Coins",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    category: "coins",
    categoryDisplay: "Coins",
    isNew: false,
  },
  {
    id: "map-luxury-mansion",
    name: "Luxury Mansion MLO",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    category: "mapping",
    categoryDisplay: "Mapping",
    badge: "Event -25%",
    isNew: true,
  },
  {
    id: "veh-lamborghini-aventador",
    name: "Lamborghini Aventador SVJ",
    price: 1299,
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80",
    category: "vehicles",
    categoryDisplay: "Véhicules",
    isNew: true,
  },
  {
    id: "script-garage-system",
    name: "Advanced Garage System",
    price: 199,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "scripts",
    categoryDisplay: "Scripts",
    isNew: false,
  },
  {
    id: "pack-starter",
    name: "Starter Pack Deluxe",
    price: 79.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    category: "packs",
    categoryDisplay: "Packs",
    badge: "Populaire",
    isNew: false,
  },
  {
    id: "veh-porsche-911",
    name: "Porsche 911 GT3 RS",
    price: 899,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
    category: "vehicles",
    categoryDisplay: "Véhicules",
    isNew: false,
  },
  {
    id: "skin-police-pack",
    name: "Police Department Skin Pack",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1532188363366-3a1b2ac4a338?w=800&q=80",
    category: "skins",
    categoryDisplay: "Skins",
    isNew: true,
  },
  {
    id: "coins-5000",
    name: "Pack 5 000 Orizon Coins",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    category: "coins",
    categoryDisplay: "Coins",
    isNew: false,
  },
  {
    id: "map-police-station",
    name: "Police Station Interior MLO",
    price: 149,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "mapping",
    categoryDisplay: "Mapping",
    isNew: false,
  },
  {
    id: "veh-mercedes-amg",
    name: "Mercedes AMG GT Black Series",
    price: 1099,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    category: "vehicles",
    categoryDisplay: "Véhicules",
    isNew: true,
  },
  {
    id: "script-inventory",
    name: "Modern Inventory System",
    price: 249,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "scripts",
    categoryDisplay: "Scripts",
    isNew: false,
  },
];

const categories = [
  { value: "all", label: "Toutes catégories" },
  { value: "coins", label: "Coins" },
  { value: "vehicles", label: "Véhicules" },
  { value: "mapping", label: "Mapping" },
  { value: "scripts", label: "Scripts" },
  { value: "skins", label: "Skins" },
  { value: "packs", label: "Packs" },
];

const sortOptions = [
  { value: "popular", label: "Plus populaires" },
  { value: "newest", label: "Plus récents" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-asc":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

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
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Notre <span className="text-gradient">Boutique</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection de véhicules, maps, scripts et bien plus 
              pour enrichir votre expérience sur Orizon.
            </p>
          </motion.div>

          {/* Filters Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8 p-4 bg-card rounded-xl border border-border"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>

            {/* Category Select */}
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full lg:w-[200px] bg-secondary border-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Select */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-[200px] bg-secondary border-border">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Active Filters */}
          {(selectedCategory !== "all" || searchQuery) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-sm text-muted-foreground">Filtres actifs :</span>
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {categories.find((c) => c.value === selectedCategory)?.label}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleCategoryChange("all")}
                  />
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  "{searchQuery}"
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
            </motion.div>
          )}

          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-6"
          >
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
          </motion.p>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard {...product} category={product.categoryDisplay} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-muted-foreground mb-4">
                Essayez de modifier vos filtres ou votre recherche.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
