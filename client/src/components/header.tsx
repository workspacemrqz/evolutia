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
    <header className="w-full z-50 px-4 sm:px-6 lg:px-8 py-4 mt-4 sm:mt-8 relative">
      {/* Header Capsule Container */}
      <div className={`max-w-7xl mx-auto bg-[#0a0a0a]/95 backdrop-blur-md border border-gray-800/50 shadow-xl transition-all ${
        mobileMenuOpen ? 'rounded-[10px] duration-75' : 'rounded-full duration-300'
      }`}>
        {/* Dotted Texture Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none rounded-full" 
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
               backgroundSize: '20px 20px'
             }}>
        </div>

        <div className="relative px-6 lg:px-8 py-4">
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
                  className="h-6 sm:h-8 w-auto max-w-[100px] md:max-w-[120px] filter brightness-100"
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
                className="relative bg-[#0a0a0a] text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                Começar Agora
              </button>
            </nav>

            {/* Mobile Navigation - Menu and CTA Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                className="p-2 text-white/90 hover:text-[#1E90FF] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <motion.button 
                onClick={() => scrollToSection("nao-fique-para-tras")} 
                className="relative bg-[#0a0a0a] text-white px-4 py-2 rounded-lg font-medium border border-gray-700 hover:border-gray-600 text-sm"
                animate={mobileMenuOpen ? { 
                  y: 120,
                  x: -80,
                  scale: 1.1
                } : { 
                  y: 0,
                  x: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                style={{ zIndex: mobileMenuOpen ? 20 : 10 }}
              >
                Começar Agora
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
              <div className="px-6 pb-6 pt-4">
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
                    className="text-[#d1d1d1] hover:text-[#1E90FF] transition-colors duration-300 font-semibold text-lg"
                  >
                    Agentes
                  </button>
                  <button 
                    onClick={() => scrollToSection("vantagens")} 
                    className="text-[#d1d1d1] hover:text-[#1E90FF] transition-colors duration-300 font-semibold text-lg"
                  >
                    Vantagens
                  </button>
                  <button 
                    onClick={() => scrollToSection("como-funciona")} 
                    className="text-[#d1d1d1] hover:text-[#1E90FF] transition-colors duration-300 font-semibold text-lg"
                  >
                    Como Funciona
                  </button>
                  
                  {/* Space for animated button */}
                  <div className="h-12 w-full flex justify-center items-center">
                    {/* The animated button will appear here */}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}