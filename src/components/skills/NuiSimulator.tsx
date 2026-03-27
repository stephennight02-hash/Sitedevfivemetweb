import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Monitor, Database, Terminal, ChevronRight } from "lucide-react";
import { useCursorVariant } from "@/context/CursorContext";
import { useUISound } from "@/hooks/useUISound";

type Category = "Languages" | "Frameworks" | "FiveM" | "Tools";

const skillsData: Record<Category, { name: string; level: number }[]> = {
  Languages: [
    { name: "JavaScript / TypeScript", level: 90 },
    { name: "Lua", level: 95 },
    { name: "HTML / CSS", level: 85 },
  ],
  Frameworks: [
    { name: "React / Next.js", level: 85 },
    { name: "Vue.js", level: 80 },
    { name: "Tailwind CSS", level: 95 },
  ],
  FiveM: [
    { name: "FiveM Native API", level: 90 },
    { name: "ESX / QB-Core", level: 85 },
    { name: "NUI (React/Vue)", level: 95 },
  ],
  Tools: [
    { name: "Git / GitHub", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Figma", level: 70 },
  ],
};

const categories = [
  { id: "Languages" as Category, icon: Code2, label: "Langages" },
  { id: "Frameworks" as Category, icon: Monitor, label: "Frameworks" },
  { id: "FiveM" as Category, icon: Terminal, label: "FiveM API" },
  { id: "Tools" as Category, icon: Database, label: "Outils" },
];

export const NuiSimulator = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Languages");
  const { setCursorVariant } = useCursorVariant();
  const { playHoverSound, playClickSound } = useUISound();

  return (
    <section id="skills" className="relative py-24 min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10 block">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Compétences <span className="text-purple-500">NUI</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interface simulée rappelant un menu en jeu.
          </p>
        </div>

        {/* NUI Container */}
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative flex flex-col md:flex-row min-h-[500px] rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
            
            {/* Sidebar Overlay (Menu Radial Simulator) */}
            <div className="w-full md:w-64 bg-black/50 border-r border-white/5 p-6 flex flex-col gap-2">
              <div className="mb-8 px-2">
                <span className="text-xs font-mono text-purple-400 tracking-wider">ROOT_MENU</span>
                <h3 className="text-xl font-bold text-white mt-1">Skills.exe</h3>
              </div>
              
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      playClickSound();
                    }}
                    onMouseEnter={() => {
                      setCursorVariant("hovered");
                      playHoverSound();
                    }}
                    onMouseLeave={() => setCursorVariant("default")}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-300 font-medium ${
                      isActive 
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-[inset_0_0_15px_rgba(139,92,246,0.1)]" 
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <cat.icon className={`w-5 h-5 ${isActive ? "text-purple-400" : "text-gray-500"}`} />
                    {cat.label}
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 md:p-12 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-gray-600">
                [ESC] Quitter
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8"
                >
                  <div className="mb-2">
                    <h4 className="text-2xl font-bold text-white mb-2">{activeCategory}</h4>
                    <div className="w-12 h-1 bg-purple-500 rounded-full"></div>
                  </div>

                  <div className="grid gap-6">
                    {skillsData[activeCategory].map((skill, idx) => (
                      <div key={skill.name} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-purple-400 font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
