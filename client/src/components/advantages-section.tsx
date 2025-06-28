import { useTranslation } from 'react-i18next';
import { Clock, TrendingUp, HeadphonesIcon, Award } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Componente de faíscas orgânicas com movimento aleatório
function OrganicSparkles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'organic-sparkle-particle';
      
      // Posições randômicas
      const startX = Math.random() * 80 + 10; // 10% a 90%
      const startY = Math.random() * 80 + 10;
      const endX = Math.random() * 80 + 10;
      const endY = Math.random() * 80 + 10;
      
      sparkle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        z-index: 2;
        left: ${startX}%;
        top: ${startY}%;
        opacity: 0;
        transform: scale(0.5);
        pointer-events: none;
      `;

      container.appendChild(sparkle);

      // Animação orgânica
      const animation = sparkle.animate([
        { 
          opacity: 0, 
          transform: 'scale(0.5)', 
          left: `${startX}%`, 
          top: `${startY}%` 
        },
        { 
          opacity: 1, 
          transform: 'scale(1)', 
          left: `${startX + (Math.random() - 0.5) * 5}%`, 
          top: `${startY + (Math.random() - 0.5) * 5}%`,
          offset: 0.2 
        },
        { 
          opacity: 1, 
          transform: 'scale(1.2)', 
          left: `${startX + (Math.random() - 0.5) * 8}%`, 
          top: `${startY + (Math.random() - 0.5) * 8}%`,
          offset: 0.4 
        },
        { 
          opacity: 0.8, 
          transform: 'scale(1)', 
          left: `${(startX + endX) / 2 + (Math.random() - 0.5) * 6}%`, 
          top: `${(startY + endY) / 2 + (Math.random() - 0.5) * 6}%`,
          offset: 0.6 
        },
        { 
          opacity: 0.4, 
          transform: 'scale(0.8)', 
          left: `${endX + (Math.random() - 0.5) * 4}%`, 
          top: `${endY + (Math.random() - 0.5) * 4}%`,
          offset: 0.8 
        },
        { 
          opacity: 0, 
          transform: 'scale(0.3)', 
          left: `${endX}%`, 
          top: `${endY}%` 
        }
      ], {
        duration: 2000 + Math.random() * 1000, // 2-3s randômico
        easing: 'ease-in-out'
      });

      animation.addEventListener('finish', () => {
        sparkle.remove();
      });
    };

    // Criar faíscas em intervalos irregulares
    const createSparkles = () => {
      createSparkle();
      setTimeout(createSparkles, 400 + Math.random() * 800); // 0.4-1.2s entre faíscas
    };

    // Iniciar múltiplas faíscas com delays diferentes
    for (let i = 0; i < 5; i++) {
      setTimeout(createSparkles, i * 500);
    }

    return () => {
      // Cleanup será feito automaticamente quando as animações terminarem
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}

// Componente de ícone animado com efeito de auto-desenho
function AnimatedIcon({ iconType }: { iconType: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('path, circle, line');
    
    paths.forEach((path, index) => {
      const element = path as SVGPathElement;
      const length = element.getTotalLength?.() || 0;
      
      if (length > 0) {
        element.style.strokeDasharray = `${length}`;
        element.style.strokeDashoffset = `${length}`;
        element.style.opacity = '1';
        
        // Animação de desenho progressivo
        element.animate([
          { strokeDashoffset: length, fill: 'transparent' },
          { strokeDashoffset: 0, fill: 'transparent' },
          { strokeDashoffset: 0, fill: 'white' }
        ], {
          duration: 800 + (index * 100),
          easing: 'ease-out',
          fill: 'forwards',
          delay: index * 50
        });
      }
    });

    // Animação de brilho pulsante contínuo
    const pulseAnimation = svg.animate([
      { transform: 'scale(1)', filter: 'brightness(1)' },
      { transform: 'scale(1.01)', filter: 'brightness(1.1)' },
      { transform: 'scale(1)', filter: 'brightness(1)' }
    ], {
      duration: 3000,
      easing: 'ease-in-out',
      iterations: Infinity
    });

    return () => {
      pulseAnimation.cancel();
    };
  }, [iconType]);

  const getIconSVG = () => {
    switch (iconType) {
      case 0: // Clock - Implementação Rápida
        return (
          <svg ref={svgRef} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
            <path d="M8 2v4M16 2v4" strokeLinecap="round" />
          </svg>
        );
      
      case 1: // TrendingUp - ROI
        return (
          <svg ref={svgRef} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="22,12 18,12 15,21 9,3 5,14 2,14" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16,8 22,8 22,14" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="18" cy="8" r="1" />
          </svg>
        );
      
      case 2: // Headphones - Suporte
        return (
          <svg ref={svgRef} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 14a9 9 0 0 1 18 0" strokeLinecap="round" />
            <path d="M21 14a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2z" />
            <path d="M3 14a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
            <line x1="12" y1="2" x2="12" y2="6" strokeLinecap="round" />
          </svg>
        );
      
      case 3: // Award - Qualidade
        return (
          <svg ref={svgRef} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 2L9.09 8.26l-6.91 1.02 5 4.87L5.64 22l6.36-3.34L18.36 22l-1.54-7.85 5-4.87-6.91-1.02L12 2z" fill="white" fillOpacity="0.1" />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return getIconSVG();
}

export default function AdvantagesSection() {
  const { t } = useTranslation();
  const advantages = [
    {
      icon: Clock,
      title: t('advantages.implementation.title'),
      description: t('advantages.implementation.description')
    },
    {
      icon: TrendingUp,
      title: t('advantages.roi.title'),
      description: t('advantages.roi.description')
    },
    {
      icon: HeadphonesIcon,
      title: t('advantages.support.title'),
      description: t('advantages.support.description')
    },
    {
      icon: Award,
      title: t('advantages.quality.title'),
      description: t('advantages.quality.description')
    }
  ];

  return (
    <section id="vantagens" className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            {t('advantages.title')}
          </h2>
          <p className="text-xl text-[#BCBCBC]">
            {t('advantages.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <div key={index} className="premium-advantage-card">
                <div className="premium-icon-container">
                  <div className="premium-grid-pattern"></div>
                  <OrganicSparkles />
                  <div className="premium-icon-circle">
                    <AnimatedIcon iconType={index} />
                  </div>
                </div>
                <h3 className="premium-card-title">{advantage.title}</h3>
                <p className="premium-card-description">{advantage.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
