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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="gradient-bg rounded-3xl p-6 sm:p-8 relative overflow-hidden glow-effect"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <motion.h2 
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 uppercase leading-tight"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Não fique<br />para trás
            </motion.h2>
            <motion.p 
              className="text-xl sm:text-3xl lg:text-4xl text-white/90 mb-3 sm:mb-4 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Seus concorrentes<br />já estão usando IA
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
            
            <div className="flex justify-center mt-8">
              <motion.div 
                className="inline-block"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-2 text-white/80 text-sm mb-1 justify-start"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {showDiagnosticForm && (
        <DiagnosticForm onClose={() => setShowDiagnosticForm(false)} />
      )}
    </section>
  );
}
