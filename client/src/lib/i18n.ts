
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      nav: {
        agents: 'Agentes',
        advantages: 'Vantagens',
        howItWorks: 'Como Funciona'
      },
      cta: {
        startNow: 'Começar Agora'
      },
      hero: {
        badge: 'AGÊNCIA DE IA',
        title: 'Deixe nossos agentes de IA trabalharem por você',
        year: '2025',
        agency: 'Agência de IA',
        businessSolutions: 'Soluções Empresariais',
        description: 'Faça sua empresa crescer 70% mais rápido. Implemente inteligência artificial em todos os setores do seu negócio',
        cta: 'Começar agora',
        subtitle: 'Tenha Agentes de IA na Sua Equipe'
      },
      about: {
        badge: 'AGENTES EVOLUT IA',
        title: 'Agentes Evolut IA',
        subtitle: 'Cada desafio exige uma solução inteligente. Conheça alguns dos agentes já criados pela Evolut IA',
        description: 'Na Evolut IA, criamos agentes inteligentes para transformar processos e impulsionar os seus resultados',
        cta: 'Crie Seu Próprio Agente'
      },
      agents: {
        badge: 'NOSSOS AGENTES',
        title: 'Agentes de IA especializados para cada necessidade',
        subtitle: 'Cada agente é desenvolvido para otimizar processos específicos do seu negócio',
        items: {
          customer: {
            title: 'Atendimento ao Cliente',
            description: 'Agente especializado em atendimento 24/7, resolução de dúvidas e suporte técnico automatizado.'
          },
          sales: {
            title: 'Vendas Inteligentes',
            description: 'Qualificação de leads, follow-up automatizado e análise preditiva de vendas.'
          },
          marketing: {
            title: 'Marketing Digital',
            description: 'Criação de conteúdo, gestão de campanhas e análise de performance automatizada.'
          },
          hr: {
            title: 'Recursos Humanos',
            description: 'Triagem de candidatos, agendamento de entrevistas e gestão de documentos.'
          },
          finance: {
            title: 'Financeiro',
            description: 'Análise de fluxo de caixa, previsões financeiras e controle de inadimplência.'
          },
          operations: {
            title: 'Operações',
            description: 'Otimização de processos, controle de estoque e gestão de fornecedores.'
          }
        }
      },
      advantages: {
        badge: 'VANTAGENS DA EVOLUT IA',
        title: 'Vantagens da Evolut IA',
        subtitle: 'Na Evolut IA, criamos agentes inteligentes para transformar processos e impulsionar os seus resultados',
        items: {
          fastImplementation: {
            title: 'Implementação Rápida',
            description: 'Seus agentes ficam prontos em até 30 dias, com suporte completo durante todo o processo'
          },
          guaranteedROI: {
            title: 'ROI Garantido',
            description: 'Reduza custos em até 70% e aumente a produtividade em até 300% com nossas soluções'
          },
          support: {
            title: 'Suporte',
            description: 'Equipe especializada disponível 24 horas por dia para garantir que tudo funcione perfeitamente'
          },
          premiumQuality: {
            title: 'Qualidade Premium',
            description: 'Tecnologia de ponta com os melhores modelos de IA do mercado, sempre atualizados'
          }
        }
      },
      howItWorks: {
        badge: 'COMO FUNCIONA',
        title: 'Como funciona',
        subtitle: 'Um processo simples e estruturado para transformar sua empresa em apenas algumas semanas.',
        steps: {
          consultation: {
            title: 'Consultoria Gratuita',
            description: 'Agendamos uma reunião para entender suas necessidades e mapear oportunidades de automação.'
          },
          analysis: {
            title: 'Análise e Proposta',
            description: 'Nossa equipe faz uma análise detalhada e apresenta uma proposta personalizada para sua empresa.'
          },
          development: {
            title: 'Desenvolvimento',
            description: 'Desenvolvemos e configuramos seus agentes de IA de acordo com suas necessidades específicas.'
          },
          implementation: {
            title: 'Implementação',
            description: 'Integramos os agentes em seus sistemas e treinamos sua equipe para o uso eficiente.'
          }
        }
      },
      method: {
        badge: 'NOSSO MÉTODO',
        title: 'Metodologia proprietária EvolutIA',
        subtitle: 'Processo testado e aprovado por centenas de empresas',
        description: 'Nossa metodologia exclusiva garante implementações bem-sucedidas, combinando análise profunda, planejamento estratégico e execução eficiente.',
        steps: {
          discover: {
            title: 'Descobrir',
            description: 'Mapeamento completo dos processos e identificação de oportunidades.'
          },
          design: {
            title: 'Projetar',
            description: 'Desenvolvimento de soluções personalizadas para cada necessidade.'
          },
          deploy: {
            title: 'Implementar',
            description: 'Execução controlada com testes e validações contínuas.'
          },
          optimize: {
            title: 'Otimizar',
            description: 'Monitoramento e ajustes para performance máxima.'
          }
        }
      },
      target: {
        badge: 'NÃO FIQUE PARA TRÁS',
        title: 'Não fique para trás',
        subtitle: 'A Evolut IA é ideal para empresas que buscam inovação, eficiência e crescimento sustentável através da inteligência artificial.',
        segments: {
          midSized: {
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
        },
        cta: 'Ver Se É Ideal Para Minha Empresa'
      },
      newRoutine: {
        badge: 'NOVA ROTINA',
        title: 'Como será sua nova rotina com IA',
        subtitle: 'Imagine um dia de trabalho onde a IA cuida dos processos repetitivos',
        items: {
          morning: {
            time: '08:00',
            title: 'Relatório automático',
            description: 'Você recebe um resumo completo das atividades da noite anterior.'
          },
          leads: {
            time: '09:00',
            title: 'Leads qualificados',
            description: 'Sua IA já qualificou e priorizou os melhores prospects.'
          },
          support: {
            time: '10:00',
            title: 'Suporte automatizado',
            description: '80% dos atendimentos são resolvidos sem intervenção humana.'
          },
          analysis: {
            time: '14:00',
            title: 'Análises inteligentes',
            description: 'Insights automáticos sobre performance e oportunidades.'
          },
          planning: {
            time: '16:00',
            title: 'Planejamento estratégico',
            description: 'Você foca no que realmente importa: estratégia e crescimento.'
          },
          report: {
            time: '18:00',
            title: 'Relatório do dia',
            description: 'Resumo completo de todas as atividades e resultados.'
          }
        }
      },
      integrations: {
        badge: 'INTEGRAÇÕES',
        title: 'Integrações',
        subtitle: 'Conecte nossos agentes com as ferramentas que você já usa. Integração simples e rápida com as principais plataformas do mercado.',
        cta: 'Ver Todas as Integrações'
      },
      poweredBy: {
        badge: 'POWERED BY',
        title: 'Powered by',
        subtitle: 'Utilizamos as tecnologias mais avançadas e confiáveis do mercado para garantir a melhor performance dos seus agentes de IA.'
      },
      guarantee: {
        badge: 'NOSSA GARANTIA',
        title: 'Garantia de resultados em 30 dias',
        subtitle: 'Estamos tão confiantes que oferecemos garantia total',
        items: {
          implementation: {
            title: 'Implementação em 30 dias',
            description: 'Sua IA estará funcionando em no máximo 30 dias ou devolvemos seu dinheiro.'
          },
          roi: {
            title: 'ROI garantido',
            description: 'Garantimos retorno do investimento em até 6 meses de uso.'
          },
          support: {
            title: 'Suporte ilimitado',
            description: 'Suporte técnico e estratégico sem limites durante todo o contrato.'
          }
        }
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
        subtitle: 'Soluções flexíveis para empresas de todos os tamanhos',
        popular: 'Mais Popular',
        plans: {
          starter: {
            title: 'Starter',
            price: 'R$ 2.997',
            period: '/mês',
            description: 'Ideal para pequenas empresas',
            features: [
              '3 agentes de IA',
              'Até 1.000 interações/mês',
              'Integração com 5 ferramentas',
              'Suporte por email',
              'Relatórios básicos'
            ]
          },
          professional: {
            title: 'Professional',
            price: 'R$ 5.997',
            period: '/mês',
            description: 'Para empresas em crescimento',
            features: [
              '10 agentes de IA',
              'Até 5.000 interações/mês',
              'Integração ilimitada',
              'Suporte prioritário',
              'Relatórios avançados',
              'Customizações personalizadas'
            ]
          },
          enterprise: {
            title: 'Enterprise',
            price: 'Sob consulta',
            period: '',
            description: 'Para grandes empresas',
            features: [
              'Agentes ilimitados',
              'Interações ilimitadas',
              'Desenvolvimento personalizado',
              'Gerente de conta dedicado',
              'SLA garantido',
              'Treinamento da equipe'
            ]
          }
        },
        cta: 'Começar agora'
      },
      faq: {
        badge: 'FAQ',
        title: 'Perguntas frequentes',
        subtitle: 'Tire suas dúvidas sobre nossa solução de IA',
        items: {
          q1: {
            question: 'Quanto tempo leva para implementar a IA na minha empresa?',
            answer: 'O processo de implementação leva em média 15 a 30 dias, dependendo da complexidade dos processos e número de integrações necessárias.'
          },
          q2: {
            question: 'Preciso ter conhecimento técnico para usar os agentes de IA?',
            answer: 'Não! Nossos agentes são desenvolvidos para serem intuitivos e fáceis de usar. Além disso, oferecemos treinamento completo para sua equipe.'
          },
          q3: {
            question: 'A IA pode se integrar com meus sistemas atuais?',
            answer: 'Sim, temos mais de 200 integrações disponíveis e podemos desenvolver conexões personalizadas para sistemas específicos.'
          },
          q4: {
            question: 'Como é calculado o ROI da implementação?',
            answer: 'Calculamos o ROI baseado na redução de custos operacionais, aumento de produtividade e novas receitas geradas pelos processos automatizados.'
          },
          q5: {
            question: 'Existe suporte após a implementação?',
            answer: 'Sim, oferecemos suporte contínuo, atualizações regulares e otimizações para garantir máxima performance dos seus agentes de IA.'
          }
        }
      },
      finalCta: {
        badge: 'NÃO DEIXE SEUS CONCORRENTES SAÍREM NA FRENTE',
        title: 'Transforme sua empresa hoje mesmo',
        subtitle: 'Não deixe seus concorrentes saírem na frente',
        description: 'Dê o primeiro passo rumo à automação inteligente. Agende sua consultoria gratuita e transforme sua operação com IA.',
        cta: 'Começar Transformação AGORA',
        features: {
          noObligation: 'Sem compromisso',
          freeConsultation: 'Consultoria gratuita',
          guaranteedResults: 'Resultado garantido'
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
        howItWorks: 'How It Works'
      },
      cta: {
        startNow: 'Get Started'
      },
      hero: {
        badge: 'AI AGENCY',
        title: 'Let our AI agents work for you',
        year: '2025',
        agency: 'AI Agency',
        businessSolutions: 'Business Solutions',
        description: 'Make your company grow 70% faster. Implement artificial intelligence in all sectors of your business',
        cta: 'Get started now',
        subtitle: 'Have AI Agents on Your Team'
      },
      about: {
        badge: 'EVOLUT AI AGENTS',
        title: 'Evolut AI Agents',
        subtitle: 'Each challenge demands an intelligent solution. Meet some of the agents already created by Evolut AI',
        description: 'At Evolut AI, we create intelligent agents to transform processes and boost your results',
        cta: 'Create Your Own Agent'
      },
      agents: {
        badge: 'OUR AGENTS',
        title: 'Specialized AI agents for every need',
        subtitle: 'Each agent is developed to optimize specific processes in your business',
        items: {
          customer: {
            title: 'Customer Service',
            description: 'Agent specialized in 24/7 support, query resolution and automated technical support.'
          },
          sales: {
            title: 'Smart Sales',
            description: 'Lead qualification, automated follow-up and predictive sales analysis.'
          },
          marketing: {
            title: 'Digital Marketing',
            description: 'Content creation, campaign management and automated performance analysis.'
          },
          hr: {
            title: 'Human Resources',
            description: 'Candidate screening, interview scheduling and document management.'
          },
          finance: {
            title: 'Finance',
            description: 'Cash flow analysis, financial forecasting and default control.'
          },
          operations: {
            title: 'Operations',
            description: 'Process optimization, inventory control and supplier management.'
          }
        }
      },
      advantages: {
        badge: 'EVOLUT AI ADVANTAGES',
        title: 'Evolut AI Advantages',
        subtitle: 'At Evolut AI, we create intelligent agents to transform processes and boost your results',
        items: {
          fastImplementation: {
            title: 'Fast Implementation',
            description: 'Your agents are ready within 30 days, with full support throughout the process'
          },
          guaranteedROI: {
            title: 'Guaranteed ROI',
            description: 'Cut costs by up to 70% and increase productivity by up to 300% with our solutions'
          },
          support: {
            title: 'Support',
            description: 'Specialized team available 24 hours a day to make sure everything runs perfectly'
          },
          premiumQuality: {
            title: 'Premium Quality',
            description: 'Cutting-edge technology with the market\'s best AI models, always up to date'
          }
        }
      },
      howItWorks: {
        badge: 'HOW IT WORKS',
        title: 'How it works',
        subtitle: 'A simple, structured process to transform your company in just a few weeks.',
        steps: {
          consultation: {
            title: 'Free Consultation',
            description: 'We schedule a meeting to understand your needs and map automation opportunities.'
          },
          analysis: {
            title: 'Analysis & Proposal',
            description: 'Our team performs a detailed analysis and presents a tailored proposal for your company.'
          },
          development: {
            title: 'Development',
            description: 'We develop and configure your AI agents according to your specific needs.'
          },
          implementation: {
            title: 'Implementation',
            description: 'We integrate the agents into your systems and train your team for efficient use.'
          }
        }
      },
      method: {
        badge: 'OUR METHOD',
        title: 'EvolutIA proprietary methodology',
        subtitle: 'Process tested and approved by hundreds of companies',
        description: 'Our exclusive methodology ensures successful implementations, combining deep analysis, strategic planning and efficient execution.',
        steps: {
          discover: {
            title: 'Discover',
            description: 'Complete process mapping and opportunity identification.'
          },
          design: {
            title: 'Design',
            description: 'Development of personalized solutions for each need.'
          },
          deploy: {
            title: 'Deploy',
            description: 'Controlled execution with continuous testing and validation.'
          },
          optimize: {
            title: 'Optimize',
            description: 'Monitoring and adjustments for maximum performance.'
          }
        }
      },
      target: {
        badge: 'FOR WHOM',
        title: 'Solutions for companies that want to grow',
        subtitle: 'Evolut AI is ideal for companies seeking innovation, efficiency, and sustainable growth through artificial intelligence.',
        segments: {
          midSized: {
            title: 'Mid-Sized Companies',
            description: 'From 50 to 500 employees who need to scale operations without proportionally increasing costs.'
          },
          startups: {
            title: 'Growing Startups',
            description: 'Innovative companies that want to automate early and grow smart.'
          },
          traditional: {
            title: 'Traditional Companies',
            description: 'Established businesses that want to modernize and stay competitive in the market.'
          },
          remote: {
            title: 'Remote Teams',
            description: 'Distributed teams that need automation to maintain productivity and coordination.'
          },
          costReduction: {
            title: 'Cost Reduction',
            description: 'Organizations focused on optimizing operating costs and increasing profit margin.'
          },
          dataDriven: {
            title: 'Data-Driven',
            description: 'Companies that value data-based decisions and predictive analytics.'
          }
        },
        cta: 'See If It\'s Right for My Company'
      },
      newRoutine: {
        badge: 'NEW ROUTINE',
        title: 'How your new routine with AI will be',
        subtitle: 'Imagine a workday where AI takes care of repetitive processes',
        items: {
          morning: {
            time: '08:00',
            title: 'Automatic report',
            description: 'You receive a complete summary of the previous night activities.'
          },
          leads: {
            time: '09:00',
            title: 'Qualified leads',
            description: 'Your AI has already qualified and prioritized the best prospects.'
          },
          support: {
            time: '10:00',
            title: 'Automated support',
            description: '80% of customer service is resolved without human intervention.'
          },
          analysis: {
            time: '14:00',
            title: 'Smart analysis',
            description: 'Automatic insights about performance and opportunities.'
          },
          planning: {
            time: '16:00',
            title: 'Strategic planning',
            description: 'You focus on what really matters: strategy and growth.'
          },
          report: {
            time: '18:00',
            title: 'Daily report',
            description: 'Complete summary of all activities and results.'
          }
        }
      },
      integrations: {
        badge: 'INTEGRATIONS',
        title: 'Integrations',
        subtitle: 'Connect our agents to the tools you already use. Simple, fast integration with the market\'s leading platforms.',
        cta: 'View All Integrations'
      },
      poweredBy: {
        badge: 'POWERED BY',
        title: 'Powered by',
        subtitle: 'We use the most advanced and reliable technologies on the market to ensure the best performance for your AI agents.'
      },
      guarantee: {
        badge: 'OUR GUARANTEE',
        title: 'Results guarantee in 30 days',
        subtitle: 'We are so confident that we offer total guarantee',
        items: {
          implementation: {
            title: 'Implementation in 30 days',
            description: 'Your AI will be working in maximum 30 days or we return your money.'
          },
          roi: {
            title: 'Guaranteed ROI',
            description: 'We guarantee return on investment in up to 6 months of use.'
          },
          support: {
            title: 'Unlimited support',
            description: 'Technical and strategic support without limits during the entire contract.'
          }
        }
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
        subtitle: 'Flexible solutions for companies of all sizes',
        popular: 'Most Popular',
        plans: {
          starter: {
            title: 'Starter',
            price: '$597',
            period: '/month',
            description: 'Ideal for small businesses',
            features: [
              '3 AI agents',
              'Up to 1,000 interactions/month',
              'Integration with 5 tools',
              'Email support',
              'Basic reports'
            ]
          },
          professional: {
            title: 'Professional',
            price: '$1,197',
            period: '/month',
            description: 'For growing companies',
            features: [
              '10 AI agents',
              'Up to 5,000 interactions/month',
              'Unlimited integration',
              'Priority support',
              'Advanced reports',
              'Custom customizations'
            ]
          },
          enterprise: {
            title: 'Enterprise',
            price: 'Custom quote',
            period: '',
            description: 'For large companies',
            features: [
              'Unlimited agents',
              'Unlimited interactions',
              'Custom development',
              'Dedicated account manager',
              'Guaranteed SLA',
              'Team training'
            ]
          }
        },
        cta: 'Get started now'
      },
      faq: {
        badge: 'FAQ',
        title: 'Frequently asked questions',
        subtitle: 'Clear your doubts about our AI solution',
        items: {
          q1: {
            question: 'How long does it take to implement AI in my company?',
            answer: 'The implementation process takes on average 15 to 30 days, depending on the complexity of processes and number of integrations needed.'
          },
          q2: {
            question: 'Do I need technical knowledge to use AI agents?',
            answer: 'No! Our agents are developed to be intuitive and easy to use. Additionally, we offer complete training for your team.'
          },
          q3: {
            question: 'Can AI integrate with my current systems?',
            answer: 'Yes, we have more than 200 integrations available and can develop custom connections for specific systems.'
          },
          q4: {
            question: 'How is the implementation ROI calculated?',
            answer: 'We calculate ROI based on operational cost reduction, productivity increase and new revenue generated by automated processes.'
          },
          q5: {
            question: 'Is there support after implementation?',
            answer: 'Yes, we offer continuous support, regular updates and optimizations to ensure maximum performance of your AI agents.'
          }
        }
      },
      finalCta: {
        badge: 'DON\'T FALL BEHIND',
        title: 'Transform your company today',
        subtitle: 'Don\'t let your competitors get ahead',
        description: 'Take the first step toward intelligent automation. Schedule your free consultation and transform your operation with AI.',
        cta: 'Start Transformation NOW',
        features: {
          noObligation: 'No obligation',
          freeConsultation: 'Free consultation',
          guaranteedResults: 'Guaranteed results'
        }
      },
      footer: {
        description: 'We transform companies through customized AI agents. Digitize processes, optimize results, and grow intelligently.',
        rights: '© 2024 Evolut AI. All rights reserved.',
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
    fallbackLng: 'pt',
    lng: 'pt',
    
    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
