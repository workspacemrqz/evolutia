import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function AgentsSection() {
  const { t } = useTranslation();
  const agents = [
    {
      image: "https://i.ibb.co/nqGGg2TM/Analista.png",
      title: "Agente Analista",
      description: "Analisa dados, encontra padrões e entrega insights prontos para decisão estratégica",
      features: [
        "Análise preditiva avançada",
        "Relatórios automatizados",
        "Alertas inteligentes"
      ]
    },
    {
      image: "https://i.ibb.co/LDZDYsSH/Atendimento.png",
      title: "Agente Atendimento",
      description: "Atende seus clientes com rapidez, 24h por dia, sem perder a qualidade",
      features: [
        "Chatbot inteligente 24/7",
        "Classificação automática",
        "Escalação inteligente"
      ]
    },
    {
      image: "https://i.ibb.co/mVn9pDpY/Vendas.png",
      title: "Agente Vendas",
      description: "Encontra os leads certos e automatiza follow-ups para vender mais, no piloto automático",
      features: [
        "Lead scoring automático",
        "Sequências de e-mail",
        "Previsão de vendas"
      ]
    },
    {
      image: "https://i.ibb.co/ccz7hX07/Conte-do.png",
      title: "Agente Conteúdo",
      description: "Gera e otimiza conteúdo para redes sociais, blogs ou relatórios",
      features: [
        "Geração de conteúdo",
        "Otimização SEO",
        "Personalização em massa"
      ]
    },
    {
      image: "https://i.ibb.co/TxxY0Y1s/Opera-es.png",
      title: "Agente Operações",
      description: "Executa tarefas repetitivas e organiza fluxos para sua equipe ganhar tempo",
      features: [
        "Automação de processos",
        "Gestão de workflows",
        "Monitoramento de KPIs"
      ]
    },
    {
      image: "https://i.ibb.co/B524w8mp/Seguran-a.png",
      title: "Agente Segurança",
      description: "Protege seus sistemas e garante que tudo esteja em dia com segurança e conformidade",
      features: [
        "Detecção de anomalias",
        "Resposta automática",
        "Compliance automático"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="agentes" className="py-20 bg-[#060606] agents-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            {t('agents.title')}
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            {t('agents.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {agents.map((agent, index) => (
            <motion.img
              key={index}
              src={agent.image}
              alt={agent.title}
              className="w-full h-auto max-w-sm mx-auto transition-all duration-300"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button 
            className="gradient-bg glow-continuous text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('nao-fique-para-tras');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('agents.cta')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}