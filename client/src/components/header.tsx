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
    <header className="fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-4">
      {/* Header Capsule Container */}
      <div className="max-w-7xl mx-auto bg-[#0a0a0a]/95 backdrop-blur-md border border-gray-800/50 rounded-2xl shadow-xl">
        {/* Dotted Texture Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl" 
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
                  className="h-8 sm:h-10 w-auto max-w-[120px] md:max-w-[150px] filter brightness-100"
                />
              </motion.button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection("agentes")} 
                className="text-white/90 hover:text-[#1E90FF] transition-colors duration-300 font-medium"
              >
                Agentes
              </button>
              <button 
                onClick={() => scrollToSection("vantagens")} 
                className="text-white/90 hover:text-[#1E90FF] transition-colors duration-300 font-medium"
              >
                Vantagens
              </button>
              <button 
                onClick={() => scrollToSection("como-funciona")} 
                className="text-white/90 hover:text-[#1E90FF] transition-colors duration-300 font-medium"
              >
                Como Funciona
              </button>
              
              {/* Icons Section */}
              <div className="flex items-center space-x-4 ml-4">
                {/* GitHub Icon */}
                <button className="text-white/70 hover:text-[#1E90FF] transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
                
                {/* Language Icon */}
                <button className="text-white/70 hover:text-[#1E90FF] transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="m8 2c1.5 0 2.5 1.5 3 5"/>
                    <path d="m16 2c-1.5 0-2.5 1.5-3 5"/>
                    <path d="m8 22c1.5 0 2.5-1.5 3-5"/>
                    <path d="m16 22c-1.5 0-2.5-1.5-3-5"/>
                  </svg>
                </button>
              </div>
              
              {/* Contact Button */}
              <button 
                onClick={() => scrollToSection("nao-fique-para-tras")} 
                className="bg-[#1A3B93] hover:bg-[#1E90FF] text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#1E90FF]/20 transform hover:scale-105"
              >
                Começar Agora
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white/90 hover:text-[#1E90FF] transition-colors"
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
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 px-4">
          <div className="bg-[#0a0a0a]/95 backdrop-blur-md border border-gray-800/50 rounded-2xl p-4 space-y-3">
            <button 
              onClick={() => scrollToSection("agentes")} 
              className="block w-full text-left px-4 py-3 text-white/90 hover:text-[#1E90FF] transition-colors duration-300 font-medium rounded-lg hover:bg-white/5"
            >
              Agentes
            </button>
            <button 
              onClick={() => scrollToSection("vantagens")} 
              className="block w-full text-left px-4 py-3 text-white/90 hover:text-[#1E90FF] transition-colors duration-300 font-medium rounded-lg hover:bg-white/5"
            >
              Vantagens
            </button>
            <button 
              onClick={() => scrollToSection("como-funciona")} 
              className="block w-full text-left px-4 py-3 text-white/90 hover:text-[#1E90FF] transition-colors duration-300 font-medium rounded-lg hover:bg-white/5"
            >
              Como Funciona
            </button>
            
            {/* Mobile Icons */}
            <div className="flex items-center justify-center space-x-6 py-2">
              <button className="text-white/70 hover:text-[#1E90FF] transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </button>
              <button className="text-white/70 hover:text-[#1E90FF] transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="m8 2c1.5 0 2.5 1.5 3 5"/>
                  <path d="m16 2c-1.5 0-2.5 1.5-3 5"/>
                  <path d="m8 22c1.5 0 2.5-1.5 3-5"/>
                  <path d="m16 22c-1.5 0-2.5-1.5-3-5"/>
                </svg>
              </button>
            </div>
            
            <button 
              onClick={() => scrollToSection("nao-fique-para-tras")} 
              className="w-full bg-[#1A3B93] hover:bg-[#1E90FF] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#1E90FF]/20 mt-4"
            >
              Começar Agora
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
