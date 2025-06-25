export default function PoweredBySection() {
  const technologies = [
    {
      name: "OpenAI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
    },
    {
      name: "AWS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
    },
    {
      name: "Azure",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg"
    },
    {
      name: "TensorFlow",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg"
    },
    {
      name: "PyTorch",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg"
    }
  ];

  return (
    <section className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            Powered by
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            Utilizamos as tecnologias mais avançadas e confiáveis do mercado para garantir a melhor performance dos seus agentes de IA
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-white rounded-lg p-6 w-32 h-20 flex items-center justify-center hover:scale-110 transition-transform">
              <img 
                src={tech.logo} 
                alt={`${tech.name} logo`} 
                className="max-w-full max-h-full object-contain"
                style={{ filter: 'brightness(0) saturate(100%)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
