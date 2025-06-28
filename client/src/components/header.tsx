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

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="w-full z-50 px-2 sm:px-4 lg:px-6 py-2 mt-2 sm:mt-4 relative">
      {/* Header Capsule Container */}
      <div className={`max-w-6xl mx-auto bg-[#0a0a0a]/95 backdrop-blur-md border border-gray-800/50 shadow-xl transition-all ${
        mobileMenuOpen ? 'rounded-[10px] duration-75' : 'rounded-full duration-300'
      }`}>
        {/* Dotted Texture Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none rounded-full" 
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
               backgroundSize: '20px 20px'
             }}>
        </div>

        <div className="relative px-4 lg:px-6 py-2">
          <div className="flex justify-between items-center">
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
                  className="h-5 sm:h-7 w-auto max-w-[100px] md:max-w-[120px] filter brightness-100"
                />
              </motion.button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection("agentes")} 
                className="text-gray-400 hover:text-white transition-colors duration-300 font-light"
              >
                Agentes
              </button>
              <button 
                onClick={() => scrollToSection("vantagens")} 
                className="text-gray-400 hover:text-white transition-colors duration-300 font-light"
              >
                Vantagens
              </button>
              <button 
                onClick={() => scrollToSection("como-funciona")} 
                className="text-gray-400 hover:text-white transition-colors duration-300 font-light"
              >
                Como Funciona
              </button>

              {/* Contact Button */}
              <button 
                onClick={() => scrollToSection("nao-fique-para-tras")} 
                className="relative bg-[#0a0a0a] text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 border border-gray-700 hover:border-gray-600 overflow-hidden group"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:-translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ease-out animate-shine"></div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-transform duration-2000 ease-linear animate-shine-continuous"></div>
                <span className="relative z-10">Começar Agora</span>
              </button>
            </nav>

            {/* Mobile Navigation - Menu and CTA Button */}
            <div className="md:hidden flex items-center space-x-3">
              <motion.button 
                className="p-1.5 text-white/90 hover:text-[#1E90FF] transition-colors relative z-30"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                animate={mobileMenuOpen ? {
                  x: 85,
                  transition: { duration: 0.3, ease: "easeInOut" }
                } : {
                  x: 0,
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
              >
                <motion.div
                  animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </motion.button>
              
              <motion.button 
                onClick={() => scrollToSection("nao-fique-para-tras")} 
                className="relative bg-[#0a0a0a] text-white px-4 py-2 rounded-lg font-medium border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden group text-sm z-20"
                animate={mobileMenuOpen ? {
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.2, ease: "easeInOut" }
                } : {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.3, ease: "easeInOut", delay: 0.1 }
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:-translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ease-out animate-shine"></div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-transform duration-2000 ease-linear animate-shine-continuous"></div>
                <span className="relative z-10">Começar Agora</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Expansion */}
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden overflow-visible relative"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            >
              <div className="px-4 pb-4 pt-3">
                {/* Horizontal Divider */}
                <div className="w-full flex justify-center mb-6">
                  <div 
                    className="h-px w-[90%] bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" 
                    style={{ opacity: 0.3 }}
                  ></div>
                </div>
                
                {/* Navigation Links */}
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <button 
                    onClick={() => scrollToSection("agentes")} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-lg"
                  >
                    Agentes
                  </button>
                  <button 
                    onClick={() => scrollToSection("vantagens")} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-lg"
                  >
                    Vantagens
                  </button>
                  <button 
                    onClick={() => scrollToSection("como-funciona")} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-lg"
                  >
                    Como Funciona
                  </button>
                  
                  {/* Centered CTA Button - appears when menu is open */}
                  <motion.div 
                    className="pt-4 w-full flex justify-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                  >
                    <button 
                      onClick={() => scrollToSection("nao-fique-para-tras")} 
                      className="relative bg-[#0a0a0a] text-white px-6 py-3 rounded-lg font-medium border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden group"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:-translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ease-out animate-shine"></div>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-transform duration-2000 ease-linear animate-shine-continuous"></div>
                      <span className="relative z-10">Começar Agora</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}