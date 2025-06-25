import { Check, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function SubscriptionSection() {
  const benefits = [
    "Consultoria gratuita",
    "Implementação em 30 dias",
    "Suporte 24/7"
  ];

  return (
    <section className="py-20 bg-[#060606]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="gradient-bg rounded-3xl p-12 glow-effect relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
            >
              Assinatura Evolut IA
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Consultoria gratuita + Implementação completa
            </motion.p>
            <motion.p 
              className="text-white/80 mb-8 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Agende uma consultoria gratuita e descubra como nossos agentes de IA podem transformar sua empresa. Sem compromisso. Sem custo. Apenas resultados
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-2 text-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <Check className="w-5 h-5" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.button 
              className="bg-white text-[#1A3B93] px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 glow-effect inline-flex items-center gap-2 pulse-gentle"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7, type: "spring", bounce: 0.3 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(48, 100, 239, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Rocket className="w-6 h-6" />
              </motion.div>
              Agendar Consultoria Gratuita
            </motion.button>
            
            <motion.p 
              className="text-white/70 text-sm mt-4"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Mais de 500 empresas já transformaram seus processos conosco
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
