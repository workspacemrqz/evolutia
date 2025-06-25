import { Rocket, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import DiagnosticForm from "./diagnostic-form";

export default function FinalCTASection() {
  const [showDiagnosticForm, setShowDiagnosticForm] = useState(false);

  const benefits = [
    "Sem compromisso",
    "Consultoria gratuita",
    "Resultados comprovados"
  ];

  return (
    <section id="nao-fique-para-tras" className="py-24 sm:py-32 bg-[#060606]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative flex justify-center">
        {/* Seta animada apenas no mobile */}
        <motion.div 
          className="block sm:hidden absolute -top-24 z-20"
          style={{ 
            left: '50%', 
            transform: 'translateX(-50%)',
            position: 'absolute'
          }}
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            animate={{ 
              y: [0, 12, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "easeInOut" 
            }}
            className="flex justify-center items-center"
          >
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              {/* Círculo externo com gradiente */}
              <motion.circle
                cx="24"
                cy="24"
                r="22"
                stroke="url(#arrowGradient)"
                strokeWidth="2"
                fill="transparent"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Círculo interno */}
              <circle
                cx="24"
                cy="24"
                r="18"
                fill="rgba(255, 255, 255, 0.1)"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
              />
              
              {/* Seta principal */}
              <motion.path
                d="M16 20L24 28L32 20"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              
              {/* Seta secundária (mais sutil) */}
              <motion.path
                d="M18 16L24 22L30 16"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0.6 }}
                animate={{ pathLength: 1, opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.3 }}
              />
              
              {/* Definição do gradiente */}
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: "#3064EF", stopOpacity: 1}} />
                  <stop offset="50%" style={{stopColor: "#FFFFFF", stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: "#1A3B93", stopOpacity: 1}} />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        <motion.div 
          className="gradient-bg rounded-3xl p-8 sm:p-12 relative overflow-hidden glow-effect"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <motion.h2 
              className="text-2xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 uppercase leading-tight"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Não fique para trás
            </motion.h2>
            <motion.p 
              className="hidden sm:block text-xl sm:text-3xl lg:text-4xl text-white/90 mb-3 sm:mb-4 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Seus concorrentes já estão usando IA
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Agende sua consultoria gratuita e veja como evoluir seu negócio agora
            </motion.p>

            <motion.button 
              className="bg-white text-[#1A3B93] px-12 py-6 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 glow-effect inline-flex items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.3 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 50px rgba(48, 100, 239, 1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDiagnosticForm(true)}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "easeInOut" 
                }}
              >
                <Rocket className="w-6 h-6" />
              </motion.div>
              INICIAR AGORA
            </motion.button>

            
              <motion.div 
                className="hidden sm:flex items-center justify-center gap-6 text-sm text-white/80 mt-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                 <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>Sem compromisso</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>Consultoria gratuita</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>Resultados comprovados</span>
                  </div>
              </motion.div>
            
          </div>
        </motion.div>
      </div>

      {showDiagnosticForm && (
        <DiagnosticForm onClose={() => setShowDiagnosticForm(false)} />
      )}
    </section>
  );
}