import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Header logo animation
    gsap.from('.header-logo', {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.2
    });

    // Hero section animations
    gsap.timeline()
      .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.hero-description', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.3')
      .from('.hero-cta', {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.2');

    // Help section animations
    gsap.from('.help-content', {
      scrollTrigger: {
        trigger: '.help-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // Method section video reveal
    gsap.from('.method-video', {
      scrollTrigger: {
        trigger: '.method-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      },
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.2,
      ease: 'power3.out'
    });

    // Agents cards stagger animation
    gsap.from('.agent-card', {
      scrollTrigger: {
        trigger: '.agents-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    });

    // Target cards animation
    gsap.from('.target-card', {
      scrollTrigger: {
        trigger: '.target-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    });

    // How it works steps animation
    gsap.from('.step-item', {
      scrollTrigger: {
        trigger: '.how-it-works-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // About section image reveal
    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      },
      clipPath: 'inset(0 100% 0 0)',
      scale: 1.1,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Founders cards animation
    gsap.from('.founder-card', {
      scrollTrigger: {
        trigger: '.founders-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // FAQ items animation
    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faq-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      },
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Footer animation
    gsap.from('.footer-content', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    // Generic section animations
    gsap.utils.toArray('.animate-section').forEach((section: any) => {
      gsap.from(section.querySelectorAll('.animate-item'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

export const useGSAPStagger = (selector: string, trigger: string, delay = 0) => {
  useEffect(() => {
    const animation = gsap.from(selector, {
      scrollTrigger: {
        trigger: trigger,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      delay
    });

    return () => {
      animation.kill();
    };
  }, [selector, trigger, delay]);
};