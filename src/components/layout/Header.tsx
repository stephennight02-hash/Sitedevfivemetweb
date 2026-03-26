import { useState, MouseEvent, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Compétences", href: "/#skills" },
  { name: "Projets", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

/**
 * Composant pour l'effet magnétique au survol (Magnetic Hover Effect)
 */
function MagneticLink({ children, onClick, href, isActive }: { children: React.ReactNode, onClick: (e: MouseEvent<HTMLAnchorElement>) => void, href: string, isActive: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouse = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      className={`relative px-4 py-2 font-medium text-sm transition-colors duration-200 rounded-full flex items-center justify-center ${
        isActive
          ? "text-white"
          : "text-gray-400 hover:text-white"
      }`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute inset-0 rounded-full bg-white/10 blur-[2px] border border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.a>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { scrollY } = useScroll();

  // Smart Scroll behavior: cache la navbar en descendant, l'affiche en remontant
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Détecte si on a scrollé au-delà du hero
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > previous && latest > 150) {
      setIsHidden(true); // Scroll down
    } else {
      setIsHidden(false); // Scroll up
    }
  });

  // Smooth Scroll personnalisé
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href === "/") {
      if (location.pathname === "/") {
         window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
         navigate("/");
         setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      }
      return;
    }

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      navigate(href);
    }
  };

  // Variants pour l'animation au chargement (On Load)
  const navContainerVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const navItemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.header 
      // Floating Navigation Bar 
      variants={navContainerVariants}
      initial="hidden"
      animate={isHidden ? { y: -100, opacity: 0 } : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        isScrolled ? "top-4 px-4" : "top-0 px-4 py-4 w-full"
      }`}
    >
      {/* Navbar Container : devient une pilule flottante au scroll */}
      <div className={`
        flex items-center justify-between transition-all duration-500
        ${isScrolled 
          ? "w-full max-w-5xl h-16 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-6" 
          : "w-full container mx-auto h-20 bg-transparent border-transparent px-2"
        }
      `}>
        
        {/* Logo */}
        <motion.div variants={navItemVariants}>
          <Link 
            to="/" 
            className="flex items-center group"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
                setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
              }
            }}
          >
            <img
              src="/favicon.png"
              alt="Logo Maxxx_"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-display text-2xl font-bold text-gradient ml-2">
              Maxxx_
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav variants={navItemVariants} className="hidden md:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5 shadow-inner">
          {navLinks.map((link) => {
            const isActive = (link.href === "/" && location.pathname === "/" && !location.hash) || 
                             (location.pathname + location.hash === link.href);
            
            return (
              <MagneticLink
                key={link.name}
                href={link.href}
                isActive={isActive}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </MagneticLink>
            );
          })}
        </motion.nav>

        {/* Actions (Cart & Login) */}
        <motion.div variants={navItemVariants} className="flex items-center gap-2 md:gap-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative group rounded-full hover:bg-white/10 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-orizon-amber to-orizon-orange text-accent-foreground text-xs font-bold flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                >
                  {itemCount}
                </motion.span>
              )}
            </Button>
          </Link>

          <Link to="/auth" className="hidden md:block">
            <Button className="btn-accent rounded-full text-sm h-10 px-6">
              <User className="w-4 h-4 mr-2" />
              Connexion
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-4 right-4 md:hidden rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden ${
               isScrolled ? "top-24" : "top-24"
            }`}
          >
            <nav className="flex flex-col p-4">
              {navLinks.map((link, i) => {
                const isActive = (link.href === "/" && location.pathname === "/" && !location.hash) || 
                                 (location.pathname + location.hash === link.href);
                                 
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`py-4 px-4 font-medium transition-colors border-b border-white/5 last:border-none flex items-center justify-between ${
                      isActive
                        ? "text-white text-gradient bg-white/5 rounded-lg border-none mb-1"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 pt-4 border-t border-white/5"
              >
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="btn-accent w-full rounded-xl">
                    <User className="w-4 h-4 mr-2" />
                    Connexion
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
