import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function GuaranteeSection() {
  const guaranteePoints = [
    { value: "60", label: "Dias de Garantia" },
    { value: "100%", label: "Devolução" },
    { value: "0", label: "Riscos" }
  ];

  return (
    <section className="py-20 bg-[#060606]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="bg-[#0D0D0D] rounded-2xl p-12 border border-gray-800"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 shimmer"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold text-white mb-6 uppercase"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Garantia de Satisfação
          </motion.h2>
          <motion.p 
            className="text-xl text-[#BCBCBC] mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Estamos tão confiantes nos resultados que oferecemos uma garantia de 60 dias. Se você não estiver completamente satisfeito com os resultados, devolvemos 100% do seu investimento
          </motion.p>
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {guaranteePoints.map((point, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  {point.value}
                </motion.div>
                <div className="text-[#BCBCBC]">{point.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.button 
            className="gradient-bg glow-continuous text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Começar Sem Riscos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
