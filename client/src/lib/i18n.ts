
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
        badge: 'SOBRE NÓS',
        title: 'Transformamos empresas com Inteligência Artificial',
        subtitle: 'Somos especialistas em implementar soluções de IA que revolucionam processos empresariais',
        description: 'Nossa missão é democratizar o acesso à inteligência artificial, oferecendo soluções personalizadas que automatizam tarefas, otimizam processos e impulsionam o crescimento do seu negócio de forma sustentável e eficiente.',
        stats: {
          clients: 'Clientes Atendidos',
          satisfaction: 'Satisfação',
          growth: 'Crescimento Médio',
          automation: 'Automatização'
        }
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
        badge: 'VANTAGENS',
        title: 'Por que escolher nossa solução de IA?',
        subtitle: 'Benefícios comprovados que transformam empresas',
        items: {
          efficiency: {
            title: 'Eficiência 10x maior',
            description: 'Automatize tarefas repetitivas e libere sua equipe para atividades estratégicas.'
          },
          costs: {
            title: 'Redução de custos',
            description: 'Diminua custos operacionais em até 60% com processos automatizados.'
          },
          available: {
            title: 'Disponibilidade 24/7',
            description: 'Seus agentes de IA trabalham ininterruptamente, sem pausas ou feriados.'
          },
          scalable: {
            title: 'Escalabilidade total',
            description: 'Cresça sem limites. Nossa IA se adapta ao tamanho do seu negócio.'
          },
          integration: {
            title: 'Integração simples',
            description: 'Conecte com suas ferramentas existentes sem complicações técnicas.'
          },
          support: {
            title: 'Suporte especializado',
            description: 'Equipe dedicada para garantir o sucesso da sua implementação.'
          }
        }
      },
      howItWorks: {
        badge: 'COMO FUNCIONA',
        title: 'Processo simples e eficiente',
        subtitle: 'Em apenas 4 etapas, sua empresa estará transformada pela IA',
        steps: {
          analysis: {
            title: 'Análise Diagnóstica',
            description: 'Identificamos oportunidades de automação e melhoria nos seus processos atuais.'
          },
          planning: {
            title: 'Planejamento Estratégico',
            description: 'Desenvolvemos um plano personalizado com agentes específicos para suas necessidades.'
          },
          implementation: {
            title: 'Implementação Rápida',
            description: 'Deploy dos agentes de IA integrados aos seus sistemas em até 30 dias.'
          },
          optimization: {
            title: 'Otimização Contínua',
            description: 'Monitoramento e aprimoramento constante para máxima performance.'
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
        badge: 'PARA QUEM',
        title: 'Soluções para empresas que querem crescer',
        subtitle: 'Independente do setor, temos a solução ideal para sua empresa',
        segments: {
          ecommerce: {
            title: 'E-commerce',
            description: 'Automatize atendimento, gestão de estoque e marketing digital.'
          },
          services: {
            title: 'Prestação de Serviços',
            description: 'Otimize agendamentos, follow-up de clientes e processos internos.'
          },
          industry: {
            title: 'Indústria',
            description: 'Controle de produção, qualidade e gestão de fornecedores automatizada.'
          },
          healthcare: {
            title: 'Saúde',
            description: 'Agendamentos, prontuários digitais e atendimento ao paciente.'
          },
          education: {
            title: 'Educação',
            description: 'Gestão de alunos, conteúdo personalizado e suporte acadêmico.'
          },
          finance: {
            title: 'Financeiro',
            description: 'Análise de risco, aprovação de crédito e atendimento automatizado.'
          }
        }
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
        title: 'Conecta com suas ferramentas favoritas',
        subtitle: 'Mais de 200 integrações disponíveis'
      },
      poweredBy: {
        title: 'Alimentado pelas melhores tecnologias de IA'
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
        badge: 'NÃO FIQUE PARA TRÁS',
        title: 'Suas empresas concorrentes já estão usando IA',
        subtitle: 'Não deixe sua empresa ficar para trás. Comece sua transformação digital hoje mesmo.',
        cta: 'Quero começar agora',
        urgency: 'Vagas limitadas para este mês'
      },
      footer: {
        description: 'Transformamos empresas através da Inteligência Artificial, oferecendo soluções inovadoras e personalizadas para cada necessidade.',
        links: {
          company: 'Empresa',
          about: 'Sobre nós',
          blog: 'Blog',
          careers: 'Carreiras',
          contact: 'Contato',
          solutions: 'Soluções',
          agents: 'Agentes de IA',
          integrations: 'Integrações',
          pricing: 'Preços',
          support: 'Suporte',
          legal: 'Legal',
          terms: 'Termos de Uso',
          privacy: 'Política de Privacidade',
          lgpd: 'LGPD'
        },
        rights: 'Todos os direitos reservados.'
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
        badge: 'ABOUT US',
        title: 'We transform companies with Artificial Intelligence',
        subtitle: 'We are specialists in implementing AI solutions that revolutionize business processes',
        description: 'Our mission is to democratize access to artificial intelligence, offering personalized solutions that automate tasks, optimize processes and drive your business growth in a sustainable and efficient way.',
        stats: {
          clients: 'Clients Served',
          satisfaction: 'Satisfaction',
          growth: 'Average Growth',
          automation: 'Automation'
        }
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
        badge: 'ADVANTAGES',
        title: 'Why choose our AI solution?',
        subtitle: 'Proven benefits that transform companies',
        items: {
          efficiency: {
            title: '10x greater efficiency',
            description: 'Automate repetitive tasks and free your team for strategic activities.'
          },
          costs: {
            title: 'Cost reduction',
            description: 'Reduce operational costs by up to 60% with automated processes.'
          },
          available: {
            title: '24/7 availability',
            description: 'Your AI agents work uninterrupted, without breaks or holidays.'
          },
          scalable: {
            title: 'Total scalability',
            description: 'Grow without limits. Our AI adapts to the size of your business.'
          },
          integration: {
            title: 'Simple integration',
            description: 'Connect with your existing tools without technical complications.'
          },
          support: {
            title: 'Specialized support',
            description: 'Dedicated team to ensure the success of your implementation.'
          }
        }
      },
      howItWorks: {
        badge: 'HOW IT WORKS',
        title: 'Simple and efficient process',
        subtitle: 'In just 4 steps, your company will be transformed by AI',
        steps: {
          analysis: {
            title: 'Diagnostic Analysis',
            description: 'We identify automation and improvement opportunities in your current processes.'
          },
          planning: {
            title: 'Strategic Planning',
            description: 'We develop a personalized plan with specific agents for your needs.'
          },
          implementation: {
            title: 'Rapid Implementation',
            description: 'Deploy AI agents integrated to your systems in up to 30 days.'
          },
          optimization: {
            title: 'Continuous Optimization',
            description: 'Monitoring and constant improvement for maximum performance.'
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
        subtitle: 'Regardless of the sector, we have the ideal solution for your company',
        segments: {
          ecommerce: {
            title: 'E-commerce',
            description: 'Automate customer service, inventory management and digital marketing.'
          },
          services: {
            title: 'Service Providers',
            description: 'Optimize scheduling, customer follow-up and internal processes.'
          },
          industry: {
            title: 'Industry',
            description: 'Production control, quality and automated supplier management.'
          },
          healthcare: {
            title: 'Healthcare',
            description: 'Scheduling, digital records and patient care.'
          },
          education: {
            title: 'Education',
            description: 'Student management, personalized content and academic support.'
          },
          finance: {
            title: 'Finance',
            description: 'Risk analysis, credit approval and automated service.'
          }
        }
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
        title: 'Connects with your favorite tools',
        subtitle: 'More than 200 integrations available'
      },
      poweredBy: {
        title: 'Powered by the best AI technologies'
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
        badge: 'DON\'T STAY BEHIND',
        title: 'Your competitor companies are already using AI',
        subtitle: 'Don\'t let your company fall behind. Start your digital transformation today.',
        cta: 'I want to start now',
        urgency: 'Limited spots for this month'
      },
      footer: {
        description: 'We transform companies through Artificial Intelligence, offering innovative and personalized solutions for each need.',
        links: {
          company: 'Company',
          about: 'About us',
          blog: 'Blog',
          careers: 'Careers',
          contact: 'Contact',
          solutions: 'Solutions',
          agents: 'AI Agents',
          integrations: 'Integrations',
          pricing: 'Pricing',
          support: 'Support',
          legal: 'Legal',
          terms: 'Terms of Use',
          privacy: 'Privacy Policy',
          lgpd: 'LGPD'
        },
        rights: 'All rights reserved.'
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
