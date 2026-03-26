import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/80 border-t border-white/5 py-8 mt-auto z-10 relative layout-footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          
          {/* Left: Copyright */}
          <div className="flex-1 flex justify-center md:justify-start text-center md:text-left">
            <p>
              © {currentYear}{" "}
              <motion.span 
                className="text-gray-300 font-bold cursor-pointer transition-colors hover:text-purple-400"
                whileHover={{ textShadow: "0px 0px 10px rgba(139,92,246,0.8)" }}
              >
                Maxxx_
              </motion.span>
               {" "}- Tous droits réservés.
            </p>
          </div>

          {/* Center: Status */}
          <div className="flex-1 flex justify-center items-center gap-2 font-mono text-gray-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span>Open to work - Développeur LUA / Web</span>
          </div>

          {/* Right: Socials */}
          <div className="flex-1 flex justify-center md:justify-end gap-5">
            <motion.a
              href="https://discord.com/users/max_fvt2000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, filter: "drop-shadow(0px 0px 8px rgba(34,211,238,0.8))" }}
              aria-label="Discord"
            >
              <MessageSquare className="w-5 h-5" />
            </motion.a>
          </div>

        </div>
      </div>
    </footer>
  );
}
