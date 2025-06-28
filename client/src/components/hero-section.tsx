import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero-section pt-24 pb-20 bg-transparent relative overflow-hidden">

      {/* Pulsing center glow */}
      {/* <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #224FC4 0%, transparent 70%)',
          animation: 'pulse-glow 4s ease-in-out infinite'
        }}
      /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            className="hidden sm:inline-block gradient-bg text-white px-4 py-2 rounded-full text-sm font-semibold mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t('hero.badge')}
          </motion.div>

          {/* Mobile layout with image first */}
          <div className="block sm:hidden relative mb-6">
            <div className="w-screen relative -mx-4 sm:mx-0 sm:w-full">
              <img 
                src="https://i.ibb.co/qMtb4gky/IMG.png" 
                alt="Evolut IA Mobile Hero" 
                className="w-full h-auto object-cover"
              />
            </div>

            <motion.h1 
              className="text-3xl font-bold text-white hero-title px-2 -mt-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {t('hero.title')}
            </motion.h1>
          </div>

          {/* Desktop title */}
          <motion.h1 
            className="hidden sm:block text-5xl lg:text-6xl font-bold text-white mb-6 hero-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-[#BCBCBC] mb-4 sm:mb-6 flex-wrap"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <span>{t('hero.year')}</span>
            <span className="hidden sm:inline">•</span>
            <span>{t('hero.agency')}</span>
            <span className="hidden sm:inline">•</span>
            <span className="gradient-bg text-white px-2 py-1 rounded text-xs font-semibold">{t('hero.businessSolutions')}</span>
            <span className="hidden sm:inline">•</span>
            <span className="gradient-bg text-white px-2 py-1 rounded text-sm sm:text-lg font-bold">{t('hero.ai')}</span>
          </motion.div>

          <motion.p 
            className="text-sm sm:text-lg text-[#BCBCBC] mb-6 sm:mb-8 max-w-3xl mx-auto hero-description px-4 sm:px-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.button
            className="gradient-bg glow-effect text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 mb-4 w-full sm:w-auto max-w-xs sm:max-w-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('nao-fique-para-tras');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t('hero.cta')}
          </motion.button>

          <motion.p
            className="text-sm text-[#BCBCBC]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          >
            {t('hero.subtitle')}
          </motion.p>

        </div>
      </div>
    </section>
  );
}