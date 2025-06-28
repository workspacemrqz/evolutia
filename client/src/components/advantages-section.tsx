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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <div key={index} className="premium-advantage-card">
                <div className="premium-icon-container">
                  <div className="premium-grid-pattern"></div>
                  <div className="premium-star-1"></div>
                  <div className="premium-star-2"></div>
                  <div className="premium-star-3"></div>
                  <div className="premium-star-4"></div>
                  <div className="premium-star-5"></div>
                  <div className="premium-icon-circle">
                    <IconComponent className="premium-icon" size={40} />
                  </div>
                </div>
                <h3 className="premium-card-title">{advantage.title}</h3>
                <p className="premium-card-description">{advantage.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
