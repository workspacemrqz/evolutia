import { useTranslation } from 'react-i18next';

export default function HowItWorksSection() {
  const { t } = useTranslation();
  const steps = [
    {
      number: "1",
      title: t('howItWorks.steps.consultation.title'),
      description: t('howItWorks.steps.consultation.description')
    },
    {
      number: "2",
      title: t('howItWorks.steps.analysis.title'),
      description: t('howItWorks.steps.analysis.description')
    },
    {
      number: "3",
      title: t('howItWorks.steps.development.title'),
      description: t('howItWorks.steps.development.description')
    },
    {
      number: "4",
      title: t('howItWorks.steps.implementation.title'),
      description: t('howItWorks.steps.implementation.description')
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            {t('howItWorks.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
              <p className="text-[#BCBCBC]">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            className="gradient-bg text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => {
              const element = document.getElementById('nao-fique-para-tras');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('howItWorks.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
