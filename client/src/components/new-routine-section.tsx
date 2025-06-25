import { Clock, Sun, Moon, ExternalLink } from "lucide-react";

export default function NewRoutineSection() {
  const routineSteps = [
    {
      icon: Clock,
      title: "Manhã: Relatórios Automáticos",
      description: "Receba um resumo completo das atividades da noite anterior e indicadores de performance atualizados."
    },
    {
      icon: Sun,
      title: "Tarde: Foco no Estratégico",
      description: "Enquanto os agentes cuidam das operações, você se concentra em decisões estratégicas e crescimento."
    },
    {
      icon: Moon,
      title: "Noite: Processos Contínuos",
      description: "Seus agentes continuam trabalhando 24/7, processando dados, respondendo clientes e otimizando resultados."
    }
  ];

  return (
    <section className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Sua nova rotina
          </h2>
          <p className="text-xl text-[#BCBCBC] mb-12">
            Imagine acordar todos os dias sabendo que seus processos estão rodando automaticamente, seus dados estão sendo analisados e suas decisões estão sendo apoiadas por inteligência artificial.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {routineSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-[#BCBCBC]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-[#0D0D0D] rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center">
                <ExternalLink className="w-10 h-10 text-white" />
              </div>
              <blockquote className="text-lg text-[#BCBCBC] italic mb-4">
                "Depois de implementar os agentes da Evolut IA, nossa produtividade aumentou 250% e conseguimos focar no que realmente importa: crescer o negócio"
              </blockquote>
              <div className="text-white font-semibold">Carlos Silva</div>
              <div className="text-[#BCBCBC] text-sm">CEO, TechCorp</div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <button className="gradient-bg text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105">
            Transformar Minha Rotina
          </button>
        </div>
      </div>
    </section>
  );
}
