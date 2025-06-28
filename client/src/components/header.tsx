import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageMenuOpen(false);
  };

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

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown')) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full z-50 px-4 sm:px-8 lg:px-16 py-2 mt-2 sm:mt-4 relative">
      {/* Header Capsule Container */}
      <div className={`max-w-3xl mx-auto bg-[#0a0a0a]/95 backdrop-blur-md border border-gray-800/50 shadow-xl transition-all ${
        mobileMenuOpen ? 'rounded-[10px] duration-75' : 'rounded-full duration-300'
      }`}>
        {/* Dotted Texture Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none rounded-full" 
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
               backgroundSize: '20px 20px'
             }}>
        </div>

        <div className="relative px-8 lg:px-12 py-3">
          <div className="flex items-center">
            {/* Desktop Navigation - Compact spacing */}
            <div className="hidden md:flex items-center w-full">
              {/* Logo */}
              <motion.button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block header-logo flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <img 
                  src="https://i.ibb.co/rf3PXc8r/LOGO-Evolut-IA-com-texto-na-horizontal.png" 
                  alt="Evolut IA Logo" 
                  className="h-6 sm:h-7 w-auto max-w-[120px] md:max-w-[120px] filter brightness-100"
                />
              </motion.button>

              {/* Navigation Links */}
              <div className="flex items-center space-x-8 ml-10">
                {/* Agentes */}
                <button 
                  onClick={() => scrollToSection("agentes")} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-light"
                >
                  {t('nav.agents', 'Agentes')}
                </button>

                {/* Vantagens */}
                <button 
                  onClick={() => scrollToSection("vantagens")} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-light"
                >
                  {t('nav.advantages', 'Vantagens')}
                </button>

                {/* Como Funciona */}
                <button 
                  onClick={() => scrollToSection("como-funciona")} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-light whitespace-nowrap"
                >
                  {t('nav.howItWorks', 'Como Funciona')}
                </button>

                {/* Globe Icon */}
                <div className="relative language-dropdown">
                  <button 
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-300"
                    title="Select Language"
                  >
                    <Globe size={24} />
                    <ChevronDown size={16} />
                  </button>
                  
                  {languageMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-gray-700 rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => changeLanguage('pt')}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors flex items-center space-x-3 ${
                          i18n.language === 'pt' ? 'text-white bg-gray-800 rounded-t-lg' : 'text-gray-400 rounded-t-lg'
                        }`}
                      >
                        <span className="text-lg">🇧🇷</span>
                        <span>Português</span>
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors flex items-center space-x-3 ${
                          i18n.language === 'en' ? 'text-white bg-gray-800 rounded-b-lg' : 'text-gray-400 rounded-b-lg'
                        }`}
                      >
                        <span className="text-lg">🇺🇸</span>
                        <span>English</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => scrollToSection("nao-fique-para-tras")} 
                  className="relative bg-[#0a0a0a] text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 border border-gray-700 hover:border-gray-600 overflow-hidden group whitespace-nowrap ml-2 flex items-center justify-center"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:-translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ease-out animate-shine"></div>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-transform duration-2000 ease-linear animate-shine-continuous"></div>
                  <span className="relative z-10">{t('cta.startNow', 'Começar Agora')}</span>
                </button>
              </div>
            </div>

            {/* Mobile Navigation - Separate structure */}
            <div className="md:hidden flex items-center justify-between w-full">
              {/* Logo Mobile */}
              <motion.button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block header-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <img 
                  src="https://i.ibb.co/rf3PXc8r/LOGO-Evolut-IA-com-texto-na-horizontal.png" 
                  alt="Evolut IA Logo" 
                  className="h-6 sm:h-7 w-auto max-w-[120px] md:max-w-[120px] filter brightness-100"
                />
              </motion.button>

              {/* Right side elements aligned */}
              <div className="flex items-center space-x-3">
                {/* Mobile menu button */}
                <motion.button
                  className="p-1.5 transition-colors relative z-30 text-white hover:text-white"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  animate={mobileMenuOpen ? {
                    x: 110,
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
                      <X className="w-6 h-6 text-white" />
                    ) : (
                      <Menu className="w-6 h-6 text-white" />
                    )}
                  </motion.div>
                </motion.button>

                {/* CTA Button */}
                <motion.button 
                  onClick={() => scrollToSection("nao-fique-para-tras")} 
                  className="relative bg-[#0a0a0a] text-white px-4 py-2 rounded-lg font-medium border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden group text-sm z-20 whitespace-nowrap"
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
                  <span className="relative z-10">{t('cta.startNow', 'Começar Agora')}</span>
                </motion.button>
              </div>
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
                    {t('nav.agents', 'Agentes')}
                  </button>
                  <button 
                    onClick={() => scrollToSection("vantagens")} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-lg"
                  >
                    {t('nav.advantages', 'Vantagens')}
                  </button>
                  <button 
                    onClick={() => scrollToSection("como-funciona")} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-lg"
                  >
                    {t('nav.howItWorks', 'Como Funciona')}
                  </button>

                  {/* Globe Icon - Mobile Menu */}
                  <div className="relative language-dropdown pt-2">
                    <button 
                      onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                      title="Select Language"
                    >
                      <Globe size={22} />
                      <ChevronDown size={16} />
                      <span className="text-lg">{i18n.language === 'pt' ? 'Idioma' : 'Language'}</span>
                    </button>
                    
                    {languageMenuOpen && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-44 bg-[#0a0a0a] border border-gray-700 rounded-lg shadow-lg z-50">
                        <button
                          onClick={() => changeLanguage('pt')}
                          className={`w-full text-left px-3 py-2 hover:bg-gray-800 transition-colors flex items-center space-x-2 text-sm ${
                            i18n.language === 'pt' ? 'text-white bg-gray-800 rounded-t-lg' : 'text-gray-400 rounded-t-lg'
                          }`}
                        >
                          <span>🇧🇷</span>
                          <span>Português</span>
                        </button>
                        <button
                          onClick={() => changeLanguage('en')}
                          className={`w-full text-left px-3 py-2 hover:bg-gray-800 transition-colors flex items-center space-x-2 text-sm ${
                            i18n.language === 'en' ? 'text-white bg-gray-800 rounded-b-lg' : 'text-gray-400 rounded-b-lg'
                          }`}
                        >
                          <span>🇺🇸</span>
                          <span>English</span>
                        </button>
                      </div>
                    )}
                  </div>

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
                      <span className="relative z-10">{t('cta.startNow', 'Começar Agora')}</span>
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