/**
 * SCULPTOR Official Store - Main Script
 * Required Stack: Lenis.js, GSAP 3, ScrollTrigger, Swiper.js, Lucide Icons
 * Vanilla JavaScript (No React / Framework-free)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Initialize Lucide Icons
       ========================================================================== */
    function initIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    initIcons();

    /* ==========================================================================
       2. Initialize Lenis Smooth Scroll
       ========================================================================== */
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.8,
        });

        // Sync GSAP ticker with Lenis raf
        if (typeof gsap !== 'undefined') {
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        } else {
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
    }

    /* ==========================================================================
       3. Header Scroll State
       ========================================================================== */
    const header = document.getElementById('header');
    const updateHeader = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    /* ==========================================================================
       4. GSAP & ScrollTrigger Animations
       ========================================================================== */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
        }

        // 4.1 Hero Banner Fade-In
        const heroVisual = document.querySelector('.hero-visual-img');
        if (heroVisual) {
            gsap.fromTo(heroVisual,
                { opacity: 0, scale: 1.03 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power2.out'
                }
            );
        }

        // 4.2 Section Titles Fade-Up
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title) => {
            gsap.fromTo(title,
                { opacity: 0, y: 22 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // 4.3 Middle Full Release Banner
        const middleBanner = document.querySelector('.middle-banner-section');
        if (middleBanner) {
            gsap.fromTo(middleBanner,
                { opacity: 0.3, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: middleBanner,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        // 4.4 Style Edit Grid Stagger
        const styleCards = document.querySelectorAll('.style-card');
        if (styleCards.length > 0) {
            gsap.fromTo(styleCards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '#style-edit',
                        start: 'top 75%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        // 4.5 Y2K Ornament Dividers
        const ornaments = document.querySelectorAll('.ornament-img');
        ornaments.forEach((ornament) => {
            gsap.fromTo(ornament,
                { opacity: 0, scale: 0.94 },
                {
                    opacity: 0.75,
                    scale: 1,
                    duration: 1.0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: ornament,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // 4.6 Inside Sculptor Cards
        const insideCards = document.querySelectorAll('.inside-card');
        if (insideCards.length > 0) {
            gsap.fromTo(insideCards,
                { opacity: 0, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '#inside-sculptor',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    }

    /* ==========================================================================
       5. Swiper Carousels (Responsive Grid & Manual Controls)
       ========================================================================== */
    if (typeof Swiper !== 'undefined') {
        
        // 5.1 New Drop (PC: Exactly 4 Items Displayed)
        new Swiper('.newDropSwiper', {
            slidesPerView: 2,
            spaceBetween: 14,
            grabCursor: true,
            autoplay: false,
            loop: false,
            speed: 550,
            navigation: {
                prevEl: '.new-prev-btn',
                nextEl: '.new-next-btn',
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                }
            }
        });

        // 5.2 Best Seller (PC: Exactly 5 Items Displayed)
        new Swiper('.bestSellerSwiper', {
            slidesPerView: 2,
            spaceBetween: 14,
            grabCursor: true,
            autoplay: false,
            loop: false,
            speed: 550,
            navigation: {
                prevEl: '.best-prev-btn',
                nextEl: '.best-next-btn',
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 22,
                }
            }
        });
    }

    /* ==========================================================================
       6. Mobile Navigation Drawer
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileDrawer() {
        mobileDrawer?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
        mobileDrawer?.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuBtn?.addEventListener('click', openMobileDrawer);
    closeDrawerBtn?.addEventListener('click', closeMobileDrawer);
    mobileDrawer?.addEventListener('click', (e) => {
        if (e.target === mobileDrawer) {
            closeMobileDrawer();
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileDrawer();
        });
    });

    /* ==========================================================================
       7. Search Modal
       ========================================================================== */
    const searchBtn = document.getElementById('search-btn');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');

    function openSearchModal() {
        searchModal?.classList.add('active');
        setTimeout(() => searchInput?.focus(), 100);
    }

    function closeSearchModal() {
        searchModal?.classList.remove('active');
    }

    searchBtn?.addEventListener('click', openSearchModal);
    closeSearchBtn?.addEventListener('click', closeSearchModal);
    searchModal?.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (searchModal?.classList.contains('active')) closeSearchModal();
            if (mobileDrawer?.classList.contains('active')) closeMobileDrawer();
        }
    });

    /* ==========================================================================
       8. Back to Top Button & Smooth Anchor Navigation
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 400) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    }, { passive: true });

    backToTopBtn?.addEventListener('click', () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.0 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Anchor smooth scrolling via Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href === '#login') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(target, { offset: -80, duration: 1.0 });
                } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

});
