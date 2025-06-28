import { useTranslation } from 'react-i18next';

export default function AdvantagesSection() {
  const { t } = useTranslation();
  const advantages = [
    {
      iconUrl: "https://i.ibb.co/zVWf8zFs/Implementa-o-R-pida.png",
      title: t('advantages.implementation.title'),
      description: t('advantages.implementation.description')
    },
    {
      iconUrl: "https://i.ibb.co/DfdNT6hY/ROI-Garantido.png",
      title: t('advantages.roi.title'),
      description: t('advantages.roi.description')
    },
    {
      iconUrl: "https://i.ibb.co/x87MCn5j/Suporte.png",
      title: t('advantages.support.title'),
      description: t('advantages.support.description')
    },
    {
      iconUrl: "https://i.ibb.co/V06vns99/Qualidade.png",
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
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <img src={advantage.iconUrl} alt={advantage.title} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{advantage.title}</h3>
              <p className="text-[#BCBCBC] px-4">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
