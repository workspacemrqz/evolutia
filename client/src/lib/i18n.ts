
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      nav: {
        agents: 'Agentes',
        advantages: 'Vantagens',
        howItWorks: 'Como Funciona'
      },
      cta: {
        startNow: 'Começar Agora'
      }
    }
  },
  en: {
    translation: {
      nav: {
        agents: 'Agents',
        advantages: 'Advantages',
        howItWorks: 'How It Works'
      },
      cta: {
        startNow: 'Get Started'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    lng: 'pt',
    
    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
