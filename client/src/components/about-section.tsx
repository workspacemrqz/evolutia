export default function AboutSection() {
  const stats = [
    { value: "500+", label: "Empresas Atendidas" },
    { value: "1000+", label: "Agentes Implementados" },
    { value: "98%", label: "Satisfação" }
  ];

  return (
    <section id="sobre" className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            Quem somos
          </h2>
          <p className="text-xl text-[#BCBCBC] mb-12">
            Somos uma equipe de especialistas em IA e automação, dedicados a transformar empresas através da tecnologia mais avançada disponível no mercado.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Equipe Evolut IA em reunião estratégica" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Nossa Missão</h3>
              <p className="text-[#BCBCBC]">
                Democratizar o acesso à inteligência artificial para empresas de todos os tamanhos, permitindo que foquem no que realmente importa: crescer e inovar.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Nossa Experiência</h3>
              <p className="text-[#BCBCBC]">
                Mais de 10 anos de experiência combinada em desenvolvimento de IA, automação de processos e transformação digital em empresas de diversos setores.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-[#BCBCBC] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
