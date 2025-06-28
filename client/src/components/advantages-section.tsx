
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

// Componente de faíscas orgânicas com exatamente 4 partículas ativas
function OrganicSparkles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeParticles = useRef(0);
  const maxParticles = 4;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createSparkle = () => {
      if (activeParticles.current >= maxParticles) return;

      const sparkle = document.createElement('div');
      sparkle.className = 'organic-sparkle-particle';
      
      // Posição inicial aleatória
      const startX = 15 + Math.random() * 70; // 15% a 85%
      const startY = 15 + Math.random() * 70; // 15% a 85%
      
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
        pointer-events: none;
      `;

      container.appendChild(sparkle);
      activeParticles.current++;

      // Animação suave: fade-in → movimento vertical de 8px → fade-out
      const animation = sparkle.animate([
        { 
          opacity: 0,
          transform: 'translateY(0px)'
        },
        { 
          opacity: 1,
          transform: 'translateY(-2px)',
          offset: 0.2
        },
        { 
          opacity: 1,
          transform: 'translateY(-5px)',
          offset: 0.6
        },
        { 
          opacity: 0,
          transform: 'translateY(-8px)'
        }
      ], {
        duration: 2000,
        easing: 'ease-in-out'
      });

      animation.addEventListener('finish', () => {
        sparkle.remove();
        activeParticles.current--;
      });
    };

    // Criar faíscas em intervalos regulares
    const interval = setInterval(() => {
      createSparkle();
    }, 500); // Nova partícula a cada 0.5s

    // Iniciar com algumas faíscas
    for (let i = 0; i < 2; i++) {
      setTimeout(() => createSparkle(), i * 250);
    }

    return () => {
      clearInterval(interval);
      activeParticles.current = 0;
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
}

// Componente de ícone animado com SVG que se desenha linha por linha
function AnimatedIcon({ iconType }: { iconType: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let animationInterval: NodeJS.Timeout;

    const startContinuousAnimation = () => {
      const paths = svg.querySelectorAll('path, circle, line, polyline');
      
      const animateIconCycle = () => {
        paths.forEach((element, index) => {
          const pathElement = element as SVGPathElement;
          
          // Calcular o comprimento do path
          let length = 0;
          if (pathElement.getTotalLength) {
            length = pathElement.getTotalLength();
          } else if (element.tagName === 'circle') {
            const radius = parseFloat(element.getAttribute('r') || '0');
            length = 2 * Math.PI * radius;
          }
          
          if (length > 0) {
            // Reset para estado inicial
            pathElement.style.strokeDasharray = `${length}`;
            pathElement.style.strokeDashoffset = `${length}`;
            pathElement.style.fill = 'transparent';
            pathElement.style.stroke = 'white';
            pathElement.style.strokeWidth = '2.5';
            pathElement.style.opacity = '1';
            
            // Animação de desenho progressivo (apenas contorno)
            const drawAnimation = pathElement.animate([
              { 
                strokeDashoffset: length,
                filter: 'brightness(1) drop-shadow(0 0 2px rgba(255,255,255,0.2))'
              },
              { 
                strokeDashoffset: 0,
                filter: 'brightness(1.1) drop-shadow(0 0 6px rgba(255,255,255,0.4))'
              }
            ], {
              duration: 800,
              easing: 'ease-out',
              delay: index * 100,
              fill: 'forwards'
            });

            // Após desenhar, aplicar brilho pulsante por 3 segundos
            setTimeout(() => {
              const glowAnimation = pathElement.animate([
                { 
                  filter: 'brightness(1.1) drop-shadow(0 0 6px rgba(255,255,255,0.4))',
                  transform: 'scale(1)'
                },
                { 
                  filter: 'brightness(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.6))',
                  transform: 'scale(1.02)'
                },
                { 
                  filter: 'brightness(1.1) drop-shadow(0 0 6px rgba(255,255,255,0.4))',
                  transform: 'scale(1)'
                }
              ], {
                duration: 3000,
                easing: 'ease-in-out',
                iterations: 1
              });
            }, 800 + (index * 100));
          }
        });
      };

      // Animação inicial
      setTimeout(() => {
        animateIconCycle();
        
        // Repetir a cada 5 segundos (0.8s desenho + 3s brilho + 1.2s pausa)
        animationInterval = setInterval(() => {
          animateIconCycle();
        }, 5000);
      }, 100);
    };

    startContinuousAnimation();

    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [iconType]);

  const getIconSVG = () => {
    switch (iconType) {
      case 0: // Clock - Implementação Rápida
        return (
          <svg 
            ref={svgRef} 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
        );
      
      case 1: // TrendingUp - ROI
        return (
          <svg 
            ref={svgRef} 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22,12 18,12 15,21 9,3 5,14 2,14" />
            <polyline points="16,8 22,8 22,14" />
          </svg>
        );
      
      case 2: // Headphones - Suporte
        return (
          <svg 
            ref={svgRef} 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 14a9 9 0 0 1 18 0" />
            <path d="M21 14a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2z" />
            <path d="M3 14a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
          </svg>
        );
      
      case 3: // Award - Qualidade
        return (
          <svg 
            ref={svgRef} 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
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
      title: t('advantages.implementation.title'),
      description: t('advantages.implementation.description')
    },
    {
      title: t('advantages.roi.title'),
      description: t('advantages.roi.description')
    },
    {
      title: t('advantages.support.title'),
      description: t('advantages.support.description')
    },
    {
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
