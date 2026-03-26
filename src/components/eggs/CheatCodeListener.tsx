import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHEAT_CODE = "HESOYAM";

export const CheatCodeListener = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [isWasted, setIsWasted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isWasted) return;

      const key = e.key.toUpperCase();
      setKeys((prev) => {
        const newKeys = [...prev, key].slice(-CHEAT_CODE.length);
        if (newKeys.join("") === CHEAT_CODE) {
          setIsWasted(true);
          // Auto remove after 4 seconds
          setTimeout(() => setIsWasted(false), 4000);
          return [];
        }
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWasted]);

  return (
    <AnimatePresence>
      {isWasted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-transparent"
        >
          {/* Backdrop with CSS blur and grayscale */}
          <motion.div 
            initial={{ backdropFilter: "blur(0px) grayscale(0%)" }}
            animate={{ backdropFilter: "blur(4px) grayscale(100%)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-black/40"
          />
          
          <motion.div
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.5 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-red-600 font-bold text-7xl md:text-9xl tracking-widest uppercase drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" style={{ fontFamily: "Impact, sans-serif" }}>
              Wasted
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
