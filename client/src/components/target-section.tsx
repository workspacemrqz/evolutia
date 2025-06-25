import { Building, TrendingUp, Lightbulb, Users, DollarSign, BarChart } from "lucide-react";

export default function TargetSection() {
  const targets = [
    {
      icon: Building,
      title: "Empresas Médias",
      description: "De 50 a 500 funcionários que precisam escalar operações sem aumentar custos proporcionalmente."
    },
    {
      icon: TrendingUp,
      title: "Startups em Crescimento",
      description: "Empresas inovadoras que querem automatizar desde cedo e crescer de forma inteligente."
    },
    {
      icon: Lightbulb,
      title: "Empresas Tradicionais",
      description: "Negócios estabelecidos que querem se modernizar e manter competitividade no mercado."
    },
    {
      icon: Users,
      title: "Equipes Remotas",
      description: "Times distribuídos que precisam de automação para manter produtividade e coordenação."
    },
    {
      icon: DollarSign,
      title: "Redução de Custos",
      description: "Organizações focadas em otimizar custos operacionais e aumentar margem de lucro."
    },
    {
      icon: BarChart,
      title: "Orientadas por Dados",
      description: "Empresas que valorizam decisões baseadas em dados e análises preditivas."
    }
  ];

  return (
    <section id="target" className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            Não fique para trás
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            A Evolut IA é ideal para empresas que buscam inovação, eficiência e crescimento sustentável através da inteligência artificial
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
