// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        menuIcon.textContent = '✕';
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = '☰';
    }
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = '☰';
    }
}

// FAQ Toggle
function toggleFAQ(questionElement) {
    const answer = questionElement.nextElementSibling;
    const toggle = questionElement.querySelector('.faq-toggle');
    
    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '−';
        toggle.classList.add('rotated');
    } else {
        answer.style.maxHeight = '0';
        setTimeout(() => {
            answer.classList.add('hidden');
        }, 300);
        toggle.textContent = '+';
        toggle.classList.remove('rotated');
    }
}

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special animations for specific sections
                if (entry.target.classList.contains('help-section')) {
                    animateHelpCards();
                } else if (entry.target.classList.contains('agents-section')) {
                    animateAgentCards();
                } else if (entry.target.classList.contains('advantages-section')) {
                    animateAdvantageCards();
                } else if (entry.target.classList.contains('target-section')) {
                    animateTargetCards();
                } else if (entry.target.classList.contains('how-it-works-section')) {
                    animateSteps();
                } else if (entry.target.classList.contains('new-routine-section')) {
                    animateRoutineSteps();
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
}

// Animate Help Cards
function animateHelpCards() {
    const cards = document.querySelectorAll('.help-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Animate Agent Cards
function animateAgentCards() {
    const cards = document.querySelectorAll('.agent-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.95)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }, index * 150);
    });
}

// Animate Advantage Cards
function animateAdvantageCards() {
    const cards = document.querySelectorAll('.advantage-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 150);
    });
}

// Animate Target Cards
function animateTargetCards() {
    const cards = document.querySelectorAll('.target-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.95)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }, index * 150);
    });
}

// Animate Steps
function animateSteps() {
    const steps = document.querySelectorAll('.step-item');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(40px) scale(0.95)';
            step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }, index * 200);
    });
}

// Animate Routine Steps
function animateRoutineSteps() {
    const steps = document.querySelectorAll('.routine-step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-30px)';
            step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, 100);
        }, index * 300);
    });
}

// Method Video Animation
function animateMethodVideo() {
    const video = document.querySelector('.method-video');
    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.style.clipPath = 'inset(100% 0 0 0)';
                    video.style.transform = 'scale(1.1)';
                    video.style.transition = 'clip-path 1.2s ease, transform 1.2s ease';
                    
                    setTimeout(() => {
                        video.style.clipPath = 'inset(0% 0 0 0)';
                        video.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(video);
    }
}

// Method Steps Animation
function animateMethodSteps() {
    const steps = document.querySelectorAll('.method-step');
    if (steps.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.style.opacity = '0';
                            step.style.transform = 'translateY(30px)';
                            step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            
                            setTimeout(() => {
                                step.style.opacity = '1';
                                step.style.transform = 'translateY(0)';
                            }, 100);
                        }, index * 300);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        const methodSection = document.querySelector('.method-section');
        if (methodSection) {
            observer.observe(methodSection);
        }
    }
}

// Add Tilt Effect to Cards
function addTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(6, 6, 6, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(6, 6, 6, 0.9)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Animate Numbers Counter
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-counter'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Add Parallax Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize all animations and effects
function initializeAnimations() {
    initScrollAnimations();
    animateMethodVideo();
    animateMethodSteps();
    addTiltEffect();
    initHeaderScroll();
    animateCounters();
    initParallax();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    
    // Initialize all cards with opacity 0 for animation
    const animatedElements = [
        '.help-card',
        '.agent-card',
        '.advantage-card',
        '.target-card',
        '.step-item',
        '.routine-step',
        '.method-step'
    ];
    
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.opacity = '1'; // Start visible, will be animated on scroll
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = event.target.closest('.md\\:hidden');
    
    if (!menuButton && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('hidden');
        document.getElementById('menu-icon').textContent = '☰';
    }
});

// Add smooth scroll behavior to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize image loading effects
document.addEventListener('DOMContentLoaded', initImageLoading);

// Add click handlers for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Any scroll-based animations can be added here
}, 16);

window.addEventListener('scroll', throttledScroll);