import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingCart as CartIcon,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Shield,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";

export default function Cart() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center py-16"
            >
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <CartIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-4">
                Votre panier est vide
              </h1>
              <p className="text-muted-foreground mb-8">
                Découvrez nos produits et commencez votre shopping sur Orizon !
              </p>
              <Link to="/shop">
                <Button className="btn-accent">
                  Explorer la boutique
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Continuer mes achats
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Mon <span className="text-gradient">Panier</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-4"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    <p className="text-lg font-bold text-gradient">
                      {item.price.toFixed(2)}€
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-muted-foreground">Sous-total</p>
                    <p className="font-bold">
                      {(item.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>

                  {/* Remove */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}

              {/* Clear Cart */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Vider le panier
                </Button>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold mb-6">
                  Récapitulatif
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground block mb-2">
                    Code promo
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Entrez votre code"
                      className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm"
                    />
                    <Button variant="outline" size="sm">
                      Appliquer
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Réduction</span>
                    <span className="text-green-500">-0.00€</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-gradient">{total.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full btn-accent mb-4">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Passer au paiement
                </Button>

                {/* Security Info */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Paiement sécurisé SSL</span>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    Moyens de paiement acceptés
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center text-xs font-bold">
                      VISA
                    </div>
                    <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center text-xs font-bold">
                      MC
                    </div>
                    <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center text-xs font-bold">
                      PayPal
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
