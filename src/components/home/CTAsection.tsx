import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Zap,
    title: "Livraison instantanée",
    description: "Vos achats sont crédités immédiatement sur votre compte",
  },
  {
    icon: Shield,
    title: "Paiement sécurisé",
    description: "Transactions cryptées via Stripe & PayPal",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Notre équipe est disponible pour vous aider",
  },
];

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orizon-blue/10 via-orizon-purple/10 to-orizon-violet/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orizon-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orizon-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-card border border-border"
          >
            {/* Glow Effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-primary opacity-20 blur-3xl rounded-full" />

            <div className="relative z-10 text-center mb-12">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Prêt à rejoindre{" "}
                <span className="text-gradient">l'aventure</span> ?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Rejoignez plus de 10 000 joueurs sur Orizon et découvrez une
                expérience FiveM unique avec nos contenus exclusifs.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop">
                <Button className="btn-accent text-lg px-8 py-6 h-auto group">
                  Explorer la boutique
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" className="text-lg px-8 py-6 h-auto">
                  Créer un compte
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
