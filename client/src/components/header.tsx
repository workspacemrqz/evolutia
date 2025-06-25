import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-[#060606]/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <motion.button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="block header-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://i.ibb.co/rf3PXc8r/LOGO-Evolut-IA-com-texto-na-horizontal.png" 
                alt="Evolut IA Logo" 
                className="h-8 sm:h-10 w-auto max-w-[120px] md:max-w-[150px]"
              />
            </motion.button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection("agentes")} className="text-[#BCBCBC] hover:text-white transition-colors">
              Agentes
            </button>
            <button onClick={() => scrollToSection("vantagens")} className="text-[#BCBCBC] hover:text-white transition-colors">
              Vantagens
            </button>
            <button onClick={() => scrollToSection("como-funciona")} className="text-[#BCBCBC] hover:text-white transition-colors">
              Como Funciona
            </button>
            <button onClick={() => scrollToSection("nao-fique-para-tras")} className="bg-[#1A3B93] text-white px-6 py-2 rounded-lg hover:bg-[#1A3B93]/90 transition-colors">
              Começar Agora
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#060606] border-t border-gray-800">
            <button 
              onClick={() => scrollToSection("agentes")} 
              className="block w-full text-left px-3 py-2 text-[#BCBCBC] hover:text-white"
            >
              Agentes
            </button>
            <button 
              onClick={() => scrollToSection("vantagens")} 
              className="block w-full text-left px-3 py-2 text-[#BCBCBC] hover:text-white"
            >
              Vantagens
            </button>
            <button 
              onClick={() => scrollToSection("como-funciona")} 
              className="block w-full text-left px-3 py-2 text-[#BCBCBC] hover:text-white"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => scrollToSection("nao-fique-para-tras")} 
              className="inline-block px-4 py-2 bg-[#1A3B93] text-white rounded-lg mx-3 mt-2"
            >
              Começar Agora
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
