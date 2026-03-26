import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorVariant } from "@/context/CursorContext";

export const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { cursorVariant } = useCursorVariant();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for trail effect
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  const variants = {
    default: {
      height: 24,
      width: 24,
      x: "-50%",
      y: "-50%",
      backgroundColor: "transparent",
      border: "2px solid rgba(139, 92, 246, 0.7)", 
      mixBlendMode: "difference" as const,
    },
    hovered: {
      height: 48,
      width: 48,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(34, 211, 238, 0.2)",
      border: "2px solid rgba(34, 211, 238, 0.8)", 
      mixBlendMode: "difference" as const,
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100]"
        variants={variants}
        animate={cursorVariant}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Central dot that strictly follows without spring for absolute precision */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-[100]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};
