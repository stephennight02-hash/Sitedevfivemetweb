import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useUISound } from "@/hooks/useUISound";
import { useCursorVariant } from "@/context/CursorContext";

export const SoundToggle = () => {
  const { isMuted, toggleMute, playHoverSound, playClickSound } = useUISound();
  const { setCursorVariant } = useCursorVariant();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black/50 border border-gray-800 text-gray-300 hover:text-white backdrop-blur-md transition-colors"
      onClick={() => {
        playClickSound();
        toggleMute();
      }}
      onMouseEnter={() => {
        setCursorVariant("hovered");
        playHoverSound();
      }}
      onMouseLeave={() => setCursorVariant("default")}
      aria-label="Toggle Sound"
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </motion.button>
  );
};
