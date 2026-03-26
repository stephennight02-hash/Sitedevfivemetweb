import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from "framer-motion";
import { Terminal, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleBackground from "./ParticleBackground";
import { TypewriterEffect } from "./TypewriterEffect";
import { useCursorVariant } from "@/context/CursorContext";
import { useUISound } from "@/hooks/useUISound";

export function HeroSection() {
  const { setCursorVariant } = useCursorVariant();
  const { playHoverSound, playClickSound } = useUISound();

  // 3D Tilt Effect
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Parallax on scroll
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background interactif avec effet parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <ParticleBackground />
      </motion.div>

      {/* Glow Orbs pour l'effet futuriste */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orizon-purple/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orizon-blue/20 rounded-full blur-[100px] animate-pulse-glow hover:bg-orizon-blue/30 transition-colors duration-1000" style={{ animationDelay: "1s" }} />

      <motion.div 
        style={{ opacity: opacityText }}
        className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center pt-20"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative perspective-1000"
        >
          {/* Glassmorphism Container avec Effet de Tilt 3D */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 backdrop-blur-2xl bg-black/40 border border-white/10 rounded-3xl p-8 md:p-14 shadow-[0_0_80px_rgba(139,92,246,0.15)] flex flex-col items-center max-w-5xl w-full text-center glow-border transition-shadow duration-500 hover:shadow-[0_0_120px_rgba(139,92,246,0.3)]"
          >
            {/* Inner Glow detail */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Badge holographique */}
            <motion.div
              variants={badgeVariants}
              style={{ transform: "translateZ(30px)" }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/50 border border-orizon-purple/30 mb-8 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-md hover:bg-white/5 transition-colors cursor-default"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_rgba(16,185,129,1)]"></span>
              </span>
              <span className="text-sm text-gray-200 font-mono font-medium tracking-wide">
                SYSTEM.STATUS <span className="text-green-400">"ONLINE"</span>
              </span>
              <Sparkles className="w-4 h-4 text-orizon-amber animate-pulse" />
            </motion.div>

            {/* Typewriter Title */}
            <motion.div 
              variants={itemVariants}
              style={{ transform: "translateZ(50px)" }}
              className="mb-8 w-full flex justify-center text-4xl md:text-6xl font-display font-bold leading-tight"
            >
              <TypewriterEffect />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              style={{ transform: "translateZ(40px)" }}
              className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Création d'expériences web immersives et développement d'architectures 
              complexes pour <span className="text-white font-semibold glow-text">FiveM</span>. 
              Le pont parfait entre le jeu et le web moderne.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              variants={itemVariants}
              style={{ transform: "translateZ(60px)" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
            >
              <Button 
                onClick={() => {
                  playClickSound();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => {
                  setCursorVariant("hovered");
                  playHoverSound();
                }}
                onMouseLeave={() => setCursorVariant("default")}
                className="group relative overflow-hidden bg-gradient-to-r from-orizon-blue via-orizon-purple to-orizon-violet text-white px-10 py-7 h-auto text-lg rounded-xl font-bold transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.7)] hover:scale-105"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Code2 className="w-6 h-6 mr-3 relative z-10" />
                <span className="relative z-10">Explorer l'Univers</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  playClickSound();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => {
                  setCursorVariant("hovered");
                  playHoverSound();
                }}
                onMouseLeave={() => setCursorVariant("default")}
                className="group relative overflow-hidden bg-black/40 border-gray-600 text-gray-300 hover:text-white hover:border-white px-10 py-7 h-auto text-lg rounded-xl font-mono transition-all duration-300 hover:bg-white/5 backdrop-blur-md hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105"
              >
                <Terminal className="w-6 h-6 mr-3 group-hover:text-orizon-cyan transition-colors" />
                <span className="relative z-10">Init_Contact()</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Down Arrow / Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-gray-300 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        />
      </motion.div>
    </section>
  );
}
