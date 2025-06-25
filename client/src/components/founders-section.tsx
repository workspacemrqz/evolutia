import { ExternalLink } from "lucide-react";

export default function FoundersSection() {
  const founders = [
    {
      name: "Dr. André Silva",
      role: "CEO & Co-Fundador",
      description: "PhD em Inteligência Artificial pela USP. Mais de 15 anos de experiência em desenvolvimento de soluções de IA para grandes corporações",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Dra. Marina Costa",
      role: "CTO & Co-Fundadora",
      description: "Mestre em Ciência da Computação pela UNICAMP. Especialista em automação de processos e arquitetura de sistemas distribuídos",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
    }
  ];

  return (
    <section className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Fundadores
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            Conheça os visionários por trás da Evolut IA, especialistas que dedicam suas carreiras a revolucionar como as empresas utilizam inteligência artificial
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {founders.map((founder, index) => (
            <div key={index} className="bg-[#0D0D0D] rounded-2xl p-8 text-center">
              <div className="w-32 h-32 gradient-bg rounded-full mx-auto mb-6 overflow-hidden">
                <img 
                  src={founder.image} 
                  alt={`Foto profissional de ${founder.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{founder.name}</h3>
              <p className="text-[#BCBCBC] mb-4">{founder.role}</p>
              <p className="text-[#BCBCBC] mb-6">{founder.description}</p>
              <a 
                href="#" 
                className="inline-flex items-center space-x-2 text-white border border-[#3064EF] px-4 py-2 rounded-lg hover:bg-[#3064EF] hover:text-white transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
