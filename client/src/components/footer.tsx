import { Linkedin, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-[#060606] border-t border-gray-800 py-16">
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={itemVariants}>
          <motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mx-auto mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://i.ibb.co/rf3PXc8r/LOGO-Evolut-IA-com-texto-na-horizontal.png" 
              alt="Evolut IA Logo" 
              className="h-10 w-auto max-w-[150px]"
            />
          </motion.button>
          <p className="text-[#BCBCBC] mb-8 max-w-2xl mx-auto">
            Transformamos empresas através de agentes de IA personalizados. Automatize processos, otimize resultados e cresça de forma inteligente.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <motion.a 
              href="http://wa.me/556299004295" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#BCBCBC] hover:text-white transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
            >
              <FaWhatsapp className="w-6 h-6" />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/company/evolutoficial" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#BCBCBC] hover:text-white transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/evolutoficial/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#BCBCBC] hover:text-white transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
            >
              <Instagram className="w-6 h-6" />
            </motion.a>
          </div>
          
          <motion.div 
            className="border-t border-gray-800 pt-8 mt-8"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-[#BCBCBC]">
              <p>&copy; 2024 Evolut IA. Todos os direitos reservados.</p>
              <div className="flex space-x-6">
                <a href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</a>
                <a href="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</a>
                <a href="/lgpd" className="hover:text-white transition-colors">LGPD</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}