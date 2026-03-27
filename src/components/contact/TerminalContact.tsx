import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Terminal as TerminalIcon, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TerminalContact = () => {
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1486363907600814141/A2qmN48cgC_BkpRaqtNc7p3SekSkhN1SOVjZ2UCN5WGB2pm9UYwG_aIsK07a7Hk-E8M0';

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Cette méthode de scroll agit UNIQUEMENT sur l'intérieur de la console
  // et ne déplace plus toute la page.
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs, showForm, isSubmitting]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!inputVal.trim()) return;
      
      const cmd = inputVal.trim();
      setLogs((prev) => [...prev, `root@portfolio:~# ${cmd}`]);
      setInputVal("");

      if (cmd.toLowerCase() === "/contact") {
        setIsAnimating(true);
        const sequence = [
          "Initialisation de la connexion sécurisée...",
          "Résolution du nom d'hôte localhost...",
          "Connexion au serveur SMTP...",
          "Connexion établie avec succès.",
          "Chargement du module de contact UI_v2.0...",
          "Module chargé avec succès."
        ];
        
        sequence.forEach((text, i) => {
          setTimeout(() => {
            setLogs((prev) => [...prev, `[${new Date().toISOString().split('T')[1].substring(0,8)}] ${text}`]);
            if (i === sequence.length - 1) {
              setTimeout(() => {
                setShowForm(true);
                setIsAnimating(false);
              }, 500);
            }
          }, (i + 1) * 300);
        });
      } else {
        setLogs((prev) => [...prev, `bash: ${cmd} : commande introuvable. Essayez '/contact'.`]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowForm(false);
    
    setLogs((prev) => [...prev, "root@portfolio:~# execute_send_payload"]);
    setLogs((prev) => [...prev, "Traitement des paquets de données..."]);
    setLogs((prev) => [...prev, "Chiffrement des données... [OK]"]);
    setLogs((prev) => [...prev, "Établissement de la connexion au canal Discord sécurisé..."]);

    try {
      const payload = {
        username: "Portfolio Terminal",
        avatar_url: "https://i.imgur.com/4M34hi2.png", 
        embeds: [
          {
            title: "Nouveau message de contact !",
            color: 9133270, 
            fields: [
              { name: "👤 Nom", value: formData.name, inline: true },
              { name: "📧 Discord", value: formData.email, inline: true },
              { name: "💬 Message", value: formData.message }
            ],
            footer: { text: "Reçu depuis le terminal du portfolio" },
            timestamp: new Date().toISOString()
          }
        ]
      };

      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 200 || response.status === 204) {
        setLogs((prev) => [
          ...prev, 
          "Connexion : 200 OK",
          "[SUCCÈS] Données envoyées au canal Discord. Connexion terminée.",
          ""
        ]);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setLogs((prev) => [
          ...prev, 
          "[ERREUR] Le serveur a renvoyé une erreur.",
          ""
        ]);
      }
    } catch (error) {
      setLogs((prev) => [
        ...prev, 
        "[ERREUR CRITIQUE] Échec de la connexion. Délai dépassé.",
        ""
      ]);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-white">
            Console de <span className="text-green-500">Contact</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tapez <code>/contact</code> pour initialiser le module d'envoi.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-[#0c0c0c] rounded-lg border border-gray-800 shadow-[0_0_50px_rgba(34,197,94,0.1)] overflow-hidden font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-gray-800">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">root@portfolio: /bin/bash</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-3 h-3 rounded-full bg-[#272727] justify-center items-center flex hover:bg-white/20 transition-colors group">
                <Minus className="w-2 h-2 text-transparent group-hover:text-white" />
              </button>
              <button className="w-3 h-3 rounded-full bg-[#272727] justify-center items-center flex hover:bg-white/20 transition-colors group">
                <Square className="w-2 h-2 text-transparent group-hover:text-white" />
              </button>
              <button className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex justify-center items-center transition-colors group">
                <X className="w-2 h-2 text-black/50 group-hover:text-black opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div 
            ref={scrollContainerRef}
            className="p-6 h-[450px] overflow-y-auto flex flex-col text-sm md:text-base text-gray-300 custom-scrollbar scroll-auto"
          >
            <div className="mb-4">
              <span className="text-green-500 font-bold">Maxxx_ OS (v1.0.0)</span><br />
              Tapez 'help' pour obtenir la liste des commandes disponibles.<br />
              Pour initialiser le contact, utilisez la commande <span className="text-cyan-400">/contact</span>.
            </div>

            {/* Logs */}
            {logs.map((log, i) => (
              <div key={i} className="mb-1">
                {log.startsWith("root@") ? (
                  <span>
                    <span className="text-green-500 font-bold">root@portfolio</span>:
                    <span className="text-blue-500 font-bold">~#</span> {log.replace("root@portfolio:~# ", "")}
                  </span>
                ) : log.includes("[SUCCESS]") ? (
                  <span className="text-green-400 font-bold">{log}</span>
                ) : log.includes("[ERROR]") || log.includes("[CRITICAL") ? (
                  <span className="text-red-500 font-bold">{log}</span>
                ) : (
                  <span className={log.includes("command not found") ? "text-red-400" : "text-gray-400"}>
                    {log}
                  </span>
                )}
              </div>
            ))}

            <AnimatePresence>
              {showForm && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 border border-gray-800 bg-black/40 p-6 rounded-md overflow-hidden shrink-0"
                >
                  <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4" /> Liaison de communication sécurisée établie
                  </h4>
                  <form className="flex flex-col gap-4 font-sans" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Nom (_NAME)" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-transparent border border-gray-700 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors" 
                        required 
                      />
                      <input 
                        type="email" 
                        placeholder="Email (_EMAIL)" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-transparent border border-gray-700 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors" 
                        required 
                      />
                    </div>
                    <textarea 
                      placeholder="Message (_DATA)" 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-transparent border border-gray-700 rounded px-4 py-2 text-white focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors resize-none" 
                      required
                    ></textarea>
                    <Button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-600 text-black font-bold font-mono py-2 rounded flex items-center justify-center">
                      <Send className="w-4 h-4 mr-2" />
                      EXECUTE_SEND
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Current Input or Processing state */}
            {!showForm && !isSubmitting && (
              <div className="flex items-center mt-2 pb-4 shrink-0">
                <span className="text-green-500 font-bold mr-2">root@portfolio</span>
                <span className="text-blue-500 font-bold mr-2">~#</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleCommand}
                  disabled={isAnimating || isSubmitting}
                  className="bg-transparent border-none outline-none text-white flex-1 caret-green-500"
                />
              </div>
            )}

            {isSubmitting && (
              <div className="flex items-center gap-2 mt-2 pb-4 text-green-500 shrink-0">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Traitement du signal...</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
