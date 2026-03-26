import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Send,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";

const faqs = [
  {
    question: "Comment fonctionne la livraison des produits ?",
    answer:
      "Tous nos produits sont livrés instantanément après le paiement. Pour les coins et items, ils sont automatiquement crédités sur votre compte serveur. Pour les véhicules et maps, vous recevrez un lien de téléchargement ou une clé d'activation.",
  },
  {
    question: "Puis-je obtenir un remboursement ?",
    answer:
      "Les remboursements sont possibles dans les 24h suivant l'achat si le produit n'a pas été utilisé. Contactez notre support avec votre numéro de commande pour toute demande.",
  },
  {
    question: "Comment utiliser mes achats sur le serveur ?",
    answer:
      "Une fois connecté au serveur Orizon avec le même compte, vos achats seront automatiquement disponibles. Pour les véhicules, rendez-vous au concessionnaire. Pour les coins, consultez votre inventaire.",
  },
  {
    question: "Les paiements sont-ils sécurisés ?",
    answer:
      "Oui, tous nos paiements sont traités par Stripe et PayPal, leaders mondiaux du paiement en ligne. Nous ne stockons jamais vos informations bancaires.",
  },
  {
    question: "Comment devenir créateur sur Orizon ?",
    answer:
      "Si vous êtes créateur de contenu (véhicules, maps, scripts), contactez-nous via le formulaire ci-dessous ou sur Discord. Nous étudions toutes les candidatures.",
  },
  {
    question: "Y a-t-il des événements réguliers ?",
    answer:
      "Oui ! Nous organisons régulièrement des événements avec des promotions exclusives, des concours et des items en édition limitée. Suivez-nous sur Discord pour ne rien manquer.",
  },
];

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
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
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="w-6 h-6 text-accent" />
              <span className="text-accent font-medium">Centre d'aide</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Comment pouvons-nous{" "}
              <span className="text-gradient">vous aider</span> ?
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Consultez notre FAQ ou contactez-nous directement. Notre équipe est
              disponible 24/7.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <a
              href="https://discord.gg/orizon"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-orizon p-6 text-center hover:bg-secondary/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-[#5865F2]/20 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-[#5865F2]" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-gradient">
                Discord
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Rejoignez notre communauté pour une aide instantanée
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary">
                Rejoindre
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>

            <a
              href="mailto:support@orizon.fr"
              className="group card-orizon p-6 text-center hover:bg-secondary/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-gradient">
                Email
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Envoyez-nous un email pour les demandes complexes
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary">
                support@orizon.fr
              </span>
            </a>

            <div className="group card-orizon p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                FAQ
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Consultez les questions fréquemment posées ci-dessous
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                Voir ci-dessous
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              id="faq"
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Questions fréquentes
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-secondary/50">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              id="contact"
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Contactez-nous
              </h2>
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-xl p-6 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom</label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Votre nom"
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="votre@email.com"
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sujet</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Sujet de votre message"
                    className="bg-secondary border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Décrivez votre demande en détail..."
                    className="bg-secondary border-border min-h-[150px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full btn-accent"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Envoi...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Envoyer le message
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
