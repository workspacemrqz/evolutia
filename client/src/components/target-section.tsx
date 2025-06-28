import { Building, TrendingUp, Lightbulb, Users, DollarSign, BarChart } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function TargetSection() {
  const { t } = useTranslation();
  
  const targets = [
    {
      icon: Building,
      title: t('target.types.medium.title'),
      description: t('target.types.medium.description')
    },
    {
      icon: TrendingUp,
      title: t('target.types.startups.title'),
      description: t('target.types.startups.description')
    },
    {
      icon: Lightbulb,
      title: t('target.types.traditional.title'),
      description: t('target.types.traditional.description')
    },
    {
      icon: Users,
      title: t('target.types.remote.title'),
      description: t('target.types.remote.description')
    },
    {
      icon: DollarSign,
      title: t('target.types.costReduction.title'),
      description: t('target.types.costReduction.description')
    },
    {
      icon: BarChart,
      title: t('target.types.dataDriven.title'),
      description: t('target.types.dataDriven.description')
    }
  ];

  return (
    <section id="target" className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            {t('target.title')}
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            {t('target.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {targets.map((target, index) => (
            <div key={index} className="bg-[#0D0D0D] rounded-xl p-8 text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <target.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{target.title}</h3>
              <p className="text-[#BCBCBC]">{target.description}</p>
            </div>
          ))}
        </div>
        

      </div>
    </section>
  );
}
