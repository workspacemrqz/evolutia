import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function IntegrationsSection() {
  const { t } = useTranslation();
  const integrations = [
    {
      name: "Slack",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
    },
    {
      name: "Teams",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg"
    },
    {
      name: "HubSpot",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg"
    },
    {
      name: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
    },
    {
      name: "Gmail",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
    },
    {
      name: "Outlook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg"
    },
    {
      name: "Trello",
      logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Trello_logo.svg"
    },
    {
      name: "Asana",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Asana_logo.svg"
    },
    {
      name: "WhatsApp",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    },
    {
      name: "Discord",
      logo: "https://upload.wikimedia.org/wikipedia/en/9/98/Discord_logo.svg"
    }
  ];

  // Duplicate for infinite scroll effect
  const duplicatedIntegrations = [...integrations, ...integrations];

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
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            {t('integrations.title')}
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            {t('integrations.subtitle')}
          </p>
        </motion.div>
        
        {/* Infinite scroll container */}
        <div className="relative overflow-hidden mask-fade">
          <motion.div 
            className="flex space-x-8 infinite-scroll"
            style={{ width: "fit-content" }}
          >
            {duplicatedIntegrations.map((integration, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg p-4 w-24 h-20 flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0 pulse-gentle"
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <img 
                  src={integration.logo} 
                  alt={`${integration.name} logo`} 
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        

      </div>
    </section>
  );
}
