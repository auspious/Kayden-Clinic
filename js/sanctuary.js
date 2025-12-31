/**
 * KAYDEN CLINIC - THE SANCTUARY OF HEALING
 * Premium Interactive Experience
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. CURSOR GLOW TRAIL - ILLUMINATING EFFECT
    // ============================================
    const initCursorGlow = () => {
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });

        // Smooth follow animation
        const animateGlow = () => {
            const dx = mouseX - glowX;
            const dy = mouseY - glowY;

            glowX += dx * 0.1;
            glowY += dy * 0.1;

            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';

            requestAnimationFrame(animateGlow);
        };

        animateGlow();
    };

    // Only enable cursor glow on devices with hover capability
    if (window.matchMedia('(hover: hover)').matches) {
        initCursorGlow();
    }

    // ============================================
    // 2. SCROLL-TRIGGERED REVEAL ANIMATIONS
    // ============================================
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-scale');

        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    };

    initScrollReveal();

    // ============================================
    // 3. HEADER SCROLL TRANSFORMATION
    // ============================================
    const initHeaderScroll = () => {
        const header = document.querySelector('.header-sanctuary');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    };

    initHeaderScroll();

    // ============================================
    // 4. MOBILE NAVIGATION
    // ============================================
    const initMobileNav = () => {
        const navToggle = document.querySelector('.nav-toggle-sanctuary');
        const navMenu = document.querySelector('.nav-sanctuary');

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    };

    initMobileNav();

    // ============================================
    // 5. ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    const initActiveNav = () => {
        const navLinks = document.querySelectorAll('.nav-sanctuary .nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href')?.split('/').pop() || '';
            if (linkPath === currentPath ||
                (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    };

    initActiveNav();

    // ============================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    const headerHeight = document.querySelector('.header-sanctuary')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    initSmoothScroll();

    // ============================================
    // 7. PARALLAX LIGHT RAYS
    // ============================================
    const initParallaxLightRays = () => {
        const lightRays = document.querySelectorAll('.light-ray');
        if (lightRays.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            lightRays.forEach((ray, index) => {
                const speed = 0.1 + (index * 0.05);
                ray.style.transform = `translateY(${scrollY * speed}px) rotate(15deg)`;
            });
        });
    };

    initParallaxLightRays();

    // ============================================
    // 8. CONSULTATION MODAL
    // ============================================
    const initModal = () => {
        const modalTriggers = document.querySelectorAll('[data-modal="consultation"]');
        const modalOverlay = document.querySelector('.modal-overlay');
        const modal = document.querySelector('.modal-sanctuary');
        const modalClose = document.querySelector('.modal-close');

        if (!modal) return;

        const openModal = () => {
            modalOverlay?.classList.add('active');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modalOverlay?.classList.remove('active');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        modalClose?.addEventListener('click', closeModal);
        modalOverlay?.addEventListener('click', closeModal);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    };

    initModal();

    // ============================================
    // 9. FORM VALIDATION
    // ============================================
    const initFormValidation = () => {
        const forms = document.querySelectorAll('.form-sanctuary');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });

                // Email validation
                const emailField = form.querySelector('input[type="email"]');
                if (emailField) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(emailField.value.trim())) {
                        isValid = false;
                        emailField.classList.add('error');
                    }
                }

                if (isValid) {
                    // Show success state
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        const originalText = submitBtn.textContent;
                        submitBtn.textContent = 'Request Received';
                        submitBtn.disabled = true;

                        setTimeout(() => {
                            form.reset();
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;

                            // Close modal if inside one
                            const modal = form.closest('.modal-sanctuary');
                            if (modal) {
                                modal.classList.remove('active');
                                document.querySelector('.modal-overlay')?.classList.remove('active');
                                document.body.style.overflow = '';
                            }
                        }, 2000);
                    }
                }
            });
        });
    };

    initFormValidation();

    // ============================================
    // 10. JOURNEY STOPS STAGGER ANIMATION
    // ============================================
    const initJourneyAnimation = () => {
        const journeyStops = document.querySelectorAll('.journey-stop');
        if (journeyStops.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const journeyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                    journeyObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        journeyStops.forEach(stop => {
            stop.style.opacity = '0';
            stop.style.transform = 'translateY(40px)';
            stop.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            journeyObserver.observe(stop);
        });

        // Add visible styles
        const style = document.createElement('style');
        style.textContent = `
            .journey-stop.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    };

    initJourneyAnimation();

    // ============================================
    // 11. PAGE TRANSITIONS (VELVET WIPE)
    // ============================================
    const initPageTransitions = () => {
        // Create transition overlay
        const transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'page-transition';
        document.body.appendChild(transitionOverlay);

        // Handle link clicks
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');

            // Only apply to internal navigation links
            if (href &&
                !href.startsWith('#') &&
                !href.startsWith('http') &&
                !href.startsWith('mailto:') &&
                !href.startsWith('tel:') &&
                !href.startsWith('https://wa.me')) {

                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    transitionOverlay.classList.add('active');

                    setTimeout(() => {
                        window.location.href = href;
                    }, 600);
                });
            }
        });

        // Entry animation
        window.addEventListener('pageshow', () => {
            transitionOverlay.classList.remove('active');
            transitionOverlay.classList.add('exit');

            setTimeout(() => {
                transitionOverlay.classList.remove('exit');
            }, 800);
        });
    };

    initPageTransitions();

    // ============================================
    // 12. BREATHING ANIMATION SYNC
    // ============================================
    const initBreathingSync = () => {
        const breathingElements = document.querySelectorAll('.breathe, .breathe-glow');

        // Stagger the breathing animations slightly for a more organic feel
        breathingElements.forEach((el, index) => {
            el.style.animationDelay = `${(index * 0.5) % 4}s`;
        });
    };

    initBreathingSync();

    // ============================================
    // 13. PHILOSOPHY CARDS HOVER EFFECT
    // ============================================
    const initPhilosophyCards = () => {
        const cards = document.querySelectorAll('.philosophy-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-15px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });
        });
    };

    initPhilosophyCards();

    // ============================================
    // 14. SERVICE ICONS ROTATION ON HOVER
    // ============================================
    const initServiceIcons = () => {
        const serviceItems = document.querySelectorAll('.service-narrative-item');

        serviceItems.forEach(item => {
            const icon = item.querySelector('.service-icon-large');
            if (!icon) return;

            item.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            });

            item.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1)';
            });
        });
    };

    initServiceIcons();

    // ============================================
    // 15. CTA BEACON VISIBILITY
    // ============================================
    const initCTABeacon = () => {
        const beacon = document.querySelector('.cta-beacon');
        if (!beacon) return;

        const heroSection = document.querySelector('.hero-sanctuary');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const heroHeight = heroSection?.offsetHeight || 600;

            if (scrollY > heroHeight * 0.5) {
                beacon.style.opacity = '1';
                beacon.style.transform = 'translateY(0)';
            } else {
                beacon.style.opacity = '0';
                beacon.style.transform = 'translateY(20px)';
            }
        });

        // Initial state
        beacon.style.opacity = '0';
        beacon.style.transform = 'translateY(20px)';
        beacon.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    };

    initCTABeacon();

    // ============================================
    // 16. INTERSECTION OBSERVER POLYFILL CHECK
    // ============================================
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers - just show everything
        document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-scale, .journey-stop').forEach(el => {
            el.classList.add('visible');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // ============================================
    // 17. PARTNERS MARQUEE PAUSE ON HOVER
    // ============================================
    const initMarqueePause = () => {
        const marqueeTrack = document.querySelector('.partners-track');
        if (!marqueeTrack) return;

        marqueeTrack.addEventListener('mouseenter', () => {
            marqueeTrack.style.animationPlayState = 'paused';
        });

        marqueeTrack.addEventListener('mouseleave', () => {
            marqueeTrack.style.animationPlayState = 'running';
        });
    };

    initMarqueePause();

    // ============================================
    // 18. ACCESSIBILITY IMPROVEMENTS
    // ============================================
    const initAccessibility = () => {
        // Handle focus visible for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        // Add focus styles
        const focusStyle = document.createElement('style');
        focusStyle.textContent = `
            body.keyboard-nav *:focus {
                outline: 2px solid var(--liquid-gold) !important;
                outline-offset: 4px !important;
            }
        `;
        document.head.appendChild(focusStyle);
    };

    initAccessibility();

    console.log('🏥 The Sanctuary of Healing - Experience Initialized');
});
