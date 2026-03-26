import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, CheckCircle2, Zap, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Tablette Pompier Rescue OS",
    description: "Système embarqué complet pour les services de secours. Interface NUI ultra-fluide simulant un OS de tablette avec gestion des interventions en temps réel.",
    image: "/placeholder.svg",
    tags: ["Vue.js", "Tailwind", "LUA", "NUI"],
    gradient: "from-blue-600 to-cyan-400",
    resmon: "0.00ms",
    features: [
      "Application de gestion complète des effectifs",
      "Cartographie en temps réel avec positions GPS",
      "Système de rapport d'intervention détaillé",
      "Interface optimisée pour écran tactile in-game"
    ]
  },
  {
    id: 2,
    title: "Système de Garage Avancé",
    description: "Gestion complète des véhicules avec interface moderne. Sauvegarde base de données optimisée, prévisualisation 3D et système de fourrière intégré.",
    image: "/placeholder.svg",
    tags: ["LUA", "SQL", "UI/UX"],
    gradient: "from-purple-600 to-pink-500",
    resmon: "0.00ms",
    features: [
      "Prévisualisation 3D fluide des véhicules",
      "Système de fourrière automatisé",
      "Sauvegarde MongoDB / MySQL optimisée",
      "Transfert de clés et contrats de vente"
    ]
  },
  {
    id: 3,
    title: "Script d'Incendies et Soins",
    description: "Script dynamique de propagation de feu synchronisé entre tous les joueurs. Inclut un système médical poussé avec gestion des blessures et des traitements.",
    image: "/placeholder.svg",
    tags: ["LUA", "Sync", "Optimisation"],
    gradient: "from-orange-500 to-red-500",
    resmon: "0.00ms",
    features: [
      "Génération procédurale de flammes dynamiques",
      "Synchronisation OneSync impeccable",
      "Diagnostic médical complet (pouls, tension, plaies)",
      "Impact temps réel sur la physique du personnage"
    ]
  }
];

const ProjectCard = ({ project, onSelect }: { project: typeof projects[0]; onSelect: (p: typeof projects[0]) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Limits the rotation to ±20 degrees max
    const rY = ((mouseX / width) - 0.5) * 20;
    const rX = ((mouseY / height) - 0.5) * -20;
    
    setRotateX(rX);
    setRotateY(rY);
    setGlareX((mouseX / width) * 100);
    setGlareY((mouseY / height) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      className="relative w-full h-[400px] rounded-2xl bg-black/40 border border-white/10 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-shadow"
    >
      {/* Glare effect */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
        }}
      />

      <div className={`absolute inset-0 opacity-40 bg-gradient-to-br transition-opacity duration-500 ${isHovered ? 'opacity-70' : 'opacity-40'} ${project.gradient}`} />
      
      {/* 3D Content wrapper */}
      <div 
        className="absolute inset-0 p-6 flex flex-col justify-end z-10"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs font-mono rounded-md bg-white/10 text-gray-200 border border-white/5">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <Button size="sm" onClick={() => onSelect(project)} className="bg-white/10 hover:bg-white/20 text-white border-none flex-1 transition-colors">
              Plus de détails
            </Button>
            <Button size="icon" variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 shrink-0 transition-colors">
              <Github className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) => {
  // Close on esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-5xl bg-black/80 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.1)] overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Media */}
        <div className="w-full md:w-1/2 bg-gray-950 flex flex-col items-center justify-center min-h-[250px] md:min-h-full border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden group">
          <div className={`absolute inset-0 opacity-20 bg-gradient-to-br transition-opacity duration-500 group-hover:opacity-40 ${project.gradient}`} />
          <div className="relative z-10 text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 border border-white/20 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <Code2 className="w-8 h-8 text-white/50" />
            </div>
            <p className="text-gray-400 font-mono tracking-widest text-sm uppercase">Espace Vidéo / Démo In-Game</p>
          </div>
        </div>

        {/* Technical Info */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto">
          <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white">{project.title}</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-sm whitespace-nowrap mt-1">
              <Zap className="w-4 h-4" />
              Resmon : {project.resmon}
            </div>
          </div>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-8 flex-1">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Features clés</h4>
            <ul className="space-y-3">
              {project.features.map((feature, i) => (
                <li key={i} className="flex gap-3 text-gray-300 items-start">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 text-xs font-mono rounded-md bg-white/5 text-gray-200 border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectsGallery = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Stop body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; }
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Showcase <span className="text-cyan-400">3D</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Une sélection de systèmes sur mesure, pensés pour la performance pure et l'immersion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
