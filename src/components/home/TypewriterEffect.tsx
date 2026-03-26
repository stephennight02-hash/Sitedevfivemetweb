import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TypewriterEffect = () => {
  const [text, setText] = useState("");
  // On conserve text fixe à la fin pour éviter clignotements si besoin.
  
  const phase1 = 'local dev = "Maxxx_"';
  const phase2 = "Maxxx_ - Développeur FiveM & Web";

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let i = 0;
    let phase = 1; // 1: typing phase1, 2: pause, 3: deleting phase1, 4: typing phase2

    const typeWriter = () => {
      if (phase === 1) {
        if (i < phase1.length) {
          setText(phase1.substring(0, i + 1));
          i++;
          timeoutId = setTimeout(typeWriter, 100);
        } else {
          phase = 2;
          timeoutId = setTimeout(typeWriter, 1000); // Pause 1s
        }
      } else if (phase === 2) {
        phase = 3;
        timeoutId = setTimeout(typeWriter, 50);
      } else if (phase === 3) {
        if (i > 0) {
          setText(phase1.substring(0, i - 1));
          i--;
          timeoutId = setTimeout(typeWriter, 50);
        } else {
          phase = 4;
          timeoutId = setTimeout(typeWriter, 500); // Pause avant phase 2
        }
      } else if (phase === 4) {
        if (i < phase2.length) {
          setText(phase2.substring(0, i + 1));
          i++;
          timeoutId = setTimeout(typeWriter, 100);
        }
      }
    };

    timeoutId = setTimeout(typeWriter, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="font-mono text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 min-h-[4rem] md:min-h-[5rem] flex items-center justify-center">
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[1em] bg-green-500 ml-1 align-middle"
      />
    </div>
  );
};
