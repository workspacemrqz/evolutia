import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function MethodSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const videoVariants = {
    hidden: { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="metodo" className="py-20 bg-[#060606] method-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Nosso Método Evolut
          </motion.h2>
          <motion.p 
            className="text-xl text-[#BCBCBC] mb-12"
            variants={itemVariants}
          >
            Uma metodologia comprovada que combina análise profunda, desenvolvimento personalizado e implementação gradual para garantir resultados excepcionais.
          </motion.p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={videoVariants}
          >
            {/* Video Embed Placeholder */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl method-video">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="text-center">
                  <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 pulse-gentle">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-[#BCBCBC]">Vídeo: Conheça o Método Evolut</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="flex items-start space-x-4" variants={itemVariants}>
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Análise Profunda</h3>
                <p className="text-[#BCBCBC]">Mapeamos todos os processos da sua empresa e identificamos oportunidades de melhoria.</p>
              </div>
            </motion.div>
            
            <motion.div className="flex items-start space-x-4" variants={itemVariants}>
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Desenvolvimento Personalizado</h3>
                <p className="text-[#BCBCBC]">Criamos agentes de IA específicos para suas necessidades e objetivos únicos</p>
              </div>
            </motion.div>
            
            <motion.div className="flex items-start space-x-4" variants={itemVariants}>
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Implementação Gradual</h3>
                <p className="text-[#BCBCBC]">Integramos as soluções de forma gradual, garantindo adaptação e resultados consistentes</p>
              </div>
            </motion.div>
            
            <motion.div className="pt-6" variants={itemVariants}>
              <motion.button 
                className="gradient-bg glow-continuous text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conhecer o Método Completo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
