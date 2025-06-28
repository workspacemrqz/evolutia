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
    <header className="w-full z-50 px-4 sm:px-6 lg:px-8 py-4 mt-8 relative">
      {/* Header Capsule Container */}
      <div className="max-w-7xl mx-auto bg-[#0a0a0a]/95 backdrop-blur-md border border-gray-800/50 rounded-full shadow-xl">
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

              {/* Contact Button */}
              <button 
                onClick={() => scrollToSection("nao-fique-para-tras")} 
                className="relative bg-[#0a0a0a] text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 laser-border-btn"
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
        <div className="md:hidden fixed inset-0 z-40 bg-[#060606] w-screen h-screen">
          {/* Header Capsule at top */}
          <div className="w-full px-4 py-4 mt-8">
            <div className="max-w-7xl mx-auto bg-[#0a0a0a]/95 backdrop-blur-md border border-gray-800/50 rounded-full shadow-xl">
              <div className="relative px-6 py-4">
                <div className="flex justify-between items-center">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <motion.button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="block header-logo"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src="https://i.ibb.co/rf3PXc8r/LOGO-Evolut-IA-com-texto-na-horizontal.png" 
                        alt="Evolut IA Logo" 
                        className="h-6 sm:h-8 w-auto max-w-[100px] md:max-w-[120px] filter brightness-100"
                      />
                    </motion.button>
                  </div>

                  {/* Close Button */}
                  <button 
                    className="p-2 text-white/90 hover:text-[#1E90FF] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col justify-center items-center h-full px-8 -mt-20">
            {/* Navigation Links */}
            <div className="flex flex-col items-center space-y-12 mb-12">
              <button 
                onClick={() => scrollToSection("agentes")} 
                className="text-white hover:text-[#1E90FF] transition-colors duration-300 font-medium text-2xl"
              >
                Agentes
              </button>
              <button 
                onClick={() => scrollToSection("vantagens")} 
                className="text-white hover:text-[#1E90FF] transition-colors duration-300 font-medium text-2xl"
              >
                Vantagens
              </button>
              <button 
                onClick={() => scrollToSection("como-funciona")} 
                className="text-white hover:text-[#1E90FF] transition-colors duration-300 font-medium text-2xl"
              >
                Como Funciona
              </button>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => scrollToSection("nao-fique-para-tras")} 
              className="bg-[#0a0a0a] text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 laser-border-btn"
            >
              Começar Agora
            </button>
          </div>
        </div>
      )}
    </header>
  );
}