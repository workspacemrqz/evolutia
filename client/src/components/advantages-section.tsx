import { useTranslation } from 'react-i18next';
import { Clock, TrendingUp, HeadphonesIcon, Award } from 'lucide-react';

export default function AdvantagesSection() {
  const { t } = useTranslation();
  const advantages = [
    {
      icon: Clock,
      title: t('advantages.implementation.title'),
      description: t('advantages.implementation.description')
    },
    {
      icon: TrendingUp,
      title: t('advantages.roi.title'),
      description: t('advantages.roi.description')
    },
    {
      icon: HeadphonesIcon,
      title: t('advantages.support.title'),
      description: t('advantages.support.description')
    },
    {
      icon: Award,
      title: t('advantages.quality.title'),
      description: t('advantages.quality.description')
    }
  ];

  return (
    <section id="vantagens" className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            {t('advantages.title')}
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            {t('advantages.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <div key={index} className="premium-advantage-card">
                <div className="premium-icon-container">
                  <div className="premium-icon-circle">
                    <div className="premium-icon-glow"></div>
                    <div className="premium-icon-dots"></div>
                    <IconComponent className="premium-icon" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">{advantage.title}</h3>
                <p className="text-[#BCBCBC] text-center leading-relaxed">{advantage.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
