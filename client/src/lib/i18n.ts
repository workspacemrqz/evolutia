import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      nav: {
        agents: 'Agentes',
        advantages: 'Vantagens',
        howItWorks: 'Como Funciona',
        getStarted: 'Começar Agora'
      },
      hero: {
        badge: 'AGÊNCIA DE IA',
        title: 'Deixe nossos agentes de IA trabalharem por você',
        year: '2025',
        agency: 'Agência de IA',
        businessSolutions: 'Soluções Empresariais',
        ai: 'IA',
        description: 'Faça sua empresa crescer 70% mais rápido. Implemente inteligência artificial em todos os setores do seu negócio',
        cta: 'Começar agora',
        subtitle: 'Tenha Agentes de IA na Sua Equipe'
      },
      chat: {
        placeholder: 'Como posso te ajudar?',
        sendPlaceholder: 'Envie uma mensagem…'
      },
      agents: {
        title: 'Agentes Evolut IA',
        subtitle: 'Cada desafio exige uma solução inteligente. Conheça alguns dos agentes já criados pela Evolut IA',
        cta: 'Crie Seu Próprio Agente'
      },
      advantages: {
        title: 'Vantagens da Evolut IA',
        subtitle: 'Na Evolut IA, criamos agentes inteligentes para transformar processos e impulsionar os seus resultados',
        implementation: {
          title: 'Implementação Rápida',
          description: 'Seus agentes ficam prontos em até 30 dias, com suporte completo durante todo o processo'
        },
        roi: {
          title: 'ROI Garantido',
          description: 'Reduza custos em até 70% e aumente a produtividade em até 300% com nossas soluções'
        },
        support: {
          title: 'Suporte',
          description: 'Equipe especializada disponível 24 horas por dia para garantir que tudo funcione perfeitamente'
        },
        quality: {
          title: 'Qualidade Premium',
          description: 'Tecnologia de ponta com os melhores modelos de IA do mercado, sempre atualizados'
        }
      },
      about: {
        title: 'Quem somos',
        subtitle: 'Somos uma equipe de especialistas em IA e automação, dedicados a transformar empresas através da tecnologia mais avançada disponível no mercado.',
        mission: {
          title: 'Nossa Missão',
          description: 'Democratizar o acesso à inteligência artificial para empresas de todos os tamanhos, permitindo que foquem no que realmente importa: crescer e inovar.'
        },
        experience: {
          title: 'Nossa Experiência',
          description: 'Mais de 10 anos de experiência combinada em desenvolvimento de IA, automação de processos e transformação digital em empresas de diversos setores.'
        },
        stats: {
          companies: 'Empresas Atendidas',
          agents: 'Agentes Implementados',
          satisfaction: 'Satisfação'
        }
      },
      howItWorks: {
        title: 'Como funciona',
        subtitle: 'Um processo simples e estruturado para transformar sua empresa em apenas algumas semanas',
        steps: {
          consultation: {
            title: 'Consultoria Gratuita',
            description: 'Entendemos sua operação e mapeamos onde a IA pode ajudar'
          },
          analysis: {
            title: 'Análise e Proposta',
            description: 'Criamos uma proposta clara, personalizada para o seu negócio'
          },
          development: {
            title: 'Desenvolvimento',
            description: 'Montamos e treinamos seus agentes sob medida'
          },
          implementation: {
            title: 'Implementação',
            description: 'Testamos tudo e ensinamos como usar'
          }
        },
        cta: 'Começar Agora'
      },
      target: {
        title: 'Não fique para trás',
        subtitle: 'A Evolut IA é ideal para empresas que buscam inovação, eficiência e crescimento sustentável através da inteligência artificial',
        types: {
          medium: {
            title: 'Empresas Médias',
            description: 'De 50 a 500 funcionários que precisam escalar operações sem aumentar custos proporcionalmente.'
          },
          startups: {
            title: 'Startups em Crescimento',
            description: 'Empresas inovadoras que querem automatizar desde cedo e crescer de forma inteligente.'
          },
          traditional: {
            title: 'Empresas Tradicionais',
            description: 'Negócios estabelecidos que querem se modernizar e manter competitividade no mercado.'
          },
          remote: {
            title: 'Equipes Remotas',
            description: 'Times distribuídos que precisam de automação para manter produtividade e coordenação.'
          },
          costReduction: {
            title: 'Redução de Custos',
            description: 'Organizações focadas em otimizar custos operacionais e aumentar margem de lucro.'
          },
          dataDriven: {
            title: 'Orientadas por Dados',
            description: 'Empresas que valorizam decisões baseadas em dados e análises preditivas.'
          }
        }
      },
      newRoutine: {
        badge: 'NOVA ROTINA',
        title: 'Como será sua nova rotina com IA',
        subtitle: 'Imagine um dia de trabalho onde a IA cuida dos processos repetitivos'
      },
      poweredBy: {
        title: 'Powered by',
        subtitle: 'Utilizamos as tecnologias mais avançadas e confiáveis do mercado para garantir a melhor performance dos seus agentes de IA'
      },
      integrations: {
        title: 'Integrações',
        subtitle: 'Conecte nossos agentes com as ferramentas que você já usa. Integração simples e rápida com as principais plataformas do mercado'
      },
      guarantee: {
        badge: 'NOSSA GARANTIA',
        title: 'Garantia de resultados em 30 dias',
        subtitle: 'Temos tanta confiança que oferecemos garantia total'
      },
      founders: {
        badge: 'FUNDADORES',
        title: 'Conheça quem está por trás da EvolutIA',
        subtitle: 'Especialistas em IA com mais de 10 anos de experiência'
      },
      help: {
        badge: 'PRECISA DE AJUDA?',
        title: 'Fale com um especialista agora',
        subtitle: 'Nossa equipe está pronta para ajudar você a implementar IA na sua empresa',
        cta: 'Conversar com especialista'
      },
      subscription: {
        badge: 'PLANOS',
        title: 'Escolha o plano ideal para sua empresa',
        subtitle: 'Soluções flexíveis para empresas de todos os tamanhos'
      },
      faq: {
        badge: 'FAQ',
        title: 'Perguntas frequentes',
        subtitle: 'Tire suas dúvidas sobre nossa solução de IA'
      },
      finalCta: {
        title: 'Não fique para trás',
        subtitle: 'Seus concorrentes já estão usando IA',
        description: 'Agende sua consultoria gratuita e veja como evoluir seu negócio agora',
        cta: 'INICIAR AGORA',
        features: {
          noObligation: 'Sem compromisso',
          freeConsultation: 'Consultoria gratuita',
          guaranteedResults: 'Resultados comprovados'
        }
      },
      footer: {
        description: 'Transformamos empresas através de agentes de IA personalizados. Automatize processos, otimize resultados e cresça de forma inteligente.',
        rights: '© 2024 Evolut IA. Todos os direitos reservados.',
        links: {
          terms: 'Termos de Uso',
          privacy: 'Política de Privacidade',
          lgpd: 'LGPD'
        }
      }
    }
  },
  en: {
    translation: {
      nav: {
        agents: 'Agents',
        advantages: 'Advantages',
        howItWorks: 'How It Works',
        getStarted: 'Get Started Now'
      },
      hero: {
        badge: 'AI AGENCY',
        title: 'Let our AI agents work for you',
        year: '2025',
        agency: 'AI Agency',
        businessSolutions: 'Business Solutions',
        ai: 'AI',
        description: 'Make your company grow 70% faster. Implement artificial intelligence in all sectors of your business',
        cta: 'Get started now',
        subtitle: 'Have AI Agents on Your Team'
      },
      chat: {
        placeholder: 'How can I help you?',
        sendPlaceholder: 'Send a message…'
      },
      agents: {
        title: 'Evolut AI Agents',
        subtitle: 'Each challenge demands an intelligent solution. Meet some of the agents already created by Evolut AI',
        cta: 'Create Your Own Agent'
      },
      advantages: {
        title: 'Evolut AI Advantages',
        subtitle: 'At Evolut AI, we create intelligent agents to transform processes and boost your results',
        implementation: {
          title: 'Fast Implementation',
          description: 'Your agents are ready within 30 days, with full support throughout the process'
        },
        roi: {
          title: 'Guaranteed ROI',
          description: 'Cut costs by up to 70% and increase productivity by up to 300% with our solutions'
        },
        support: {
          title: 'Support',
          description: 'Specialized team available 24 hours a day to ensure everything works perfectly'
        },
        quality: {
          title: 'Premium Quality',
          description: 'Cutting-edge technology with the best AI models on the market, always updated'
        }
      },
      about: {
        title: 'Who we are',
        subtitle: 'We are a team of AI and automation specialists, dedicated to transforming companies through the most advanced technology available on the market.',
        mission: {
          title: 'Our Mission',
          description: 'Democratize access to artificial intelligence for companies of all sizes, allowing them to focus on what really matters: growing and innovating.'
        },
        experience: {
          title: 'Our Experience',
          description: 'More than 10 years of combined experience in AI development, process automation and digital transformation in companies across various sectors.'
        },
        stats: {
          companies: 'Companies Served',
          agents: 'Agents Implemented',
          satisfaction: 'Satisfaction'
        }
      },
      howItWorks: {
        title: 'How it works',
        subtitle: 'A simple and structured process to transform your company in just a few weeks',
        steps: {
          consultation: {
            title: 'Free Consultation',
            description: 'We understand your operation and map where AI can help'
          },
          analysis: {
            title: 'Analysis and Proposal',
            description: 'We create a clear proposal, customized for your business'
          },
          development: {
            title: 'Development',
            description: 'We build and train your agents to measure'
          },
          implementation: {
            title: 'Implementation',
            description: 'We test everything and teach you how to use it'
          }
        },
        cta: 'Get Started Now'
      },
      target: {
        title: 'Don\'t fall behind',
        subtitle: 'Evolut AI is ideal for companies seeking innovation, efficiency and sustainable growth through artificial intelligence',
        types: {
          medium: {
            title: 'Medium Companies',
            description: 'From 50 to 500 employees who need to scale operations without increasing costs proportionally.'
          },
          startups: {
            title: 'Growing Startups',
            description: 'Innovative companies that want to automate early and grow intelligently.'
          },
          traditional: {
            title: 'Traditional Companies',
            description: 'Established businesses that want to modernize and maintain market competitiveness.'
          },
          remote: {
            title: 'Remote Teams',
            description: 'Distributed teams that need automation to maintain productivity and coordination.'
          },
          costReduction: {
            title: 'Cost Reduction',
            description: 'Organizations focused on optimizing operational costs and increasing profit margins.'
          },
          dataDriven: {
            title: 'Data-Driven',
            description: 'Companies that value decisions based on data and predictive analytics.'
          }
        }
      },
      newRoutine: {
        badge: 'NEW ROUTINE',
        title: 'What your new routine with AI will look like',
        subtitle: 'Imagine a workday where AI takes care of repetitive processes'
      },
      poweredBy: {
        title: 'Powered by',
        subtitle: 'We use the most advanced and reliable technologies on the market to ensure the best performance for your AI agents'
      },
      integrations: {
        title: 'Integrations',
        subtitle: 'Connect our agents with the tools you already use. Simple and fast integration with the main market platforms'
      },
      guarantee: {
        badge: 'OUR GUARANTEE',
        title: 'Results guarantee in 30 days',
        subtitle: 'We are so confident that we offer total guarantee'
      },
      founders: {
        badge: 'FOUNDERS',
        title: 'Meet who is behind EvolutIA',
        subtitle: 'AI specialists with more than 10 years of experience'
      },
      help: {
        badge: 'NEED HELP?',
        title: 'Talk to a specialist now',
        subtitle: 'Our team is ready to help you implement AI in your company',
        cta: 'Talk to specialist'
      },
      subscription: {
        badge: 'PLANS',
        title: 'Choose the ideal plan for your company',
        subtitle: 'Flexible solutions for companies of all sizes'
      },
      faq: {
        badge: 'FAQ',
        title: 'Frequently asked questions',
        subtitle: 'Clear your doubts about our AI solution'
      },
      finalCta: {
        title: 'Don\'t fall behind',
        subtitle: 'Your competitors are already using AI',
        description: 'Schedule your free consultation and see how to evolve your business now',
        cta: 'START NOW',
        features: {
          noObligation: 'No obligation',
          freeConsultation: 'Free consultation',
          guaranteedResults: 'Proven results'
        }
      },
      footer: {
        description: 'We transform companies through personalized AI agents. Automate processes, optimize results and grow intelligently.',
        rights: '© 2024 Evolut IA. All rights reserved.',
        links: {
          terms: 'Terms of Use',
          privacy: 'Privacy Policy',
          lgpd: 'LGPD'
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;