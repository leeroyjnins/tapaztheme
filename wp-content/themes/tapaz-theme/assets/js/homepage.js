/**
 * Homepage Interactive Elements
 * Tapaz Citizen Portal Theme
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // IMAGE BANNER CAROUSEL
    // ========================================
    const bannerCarousel = {
        currentSlide: 0,
        slides: document.querySelectorAll('.banner-slide'),
        dots: document.querySelectorAll('.banner-dots .dot'),
        interval: null,

        init: function () {
            if (this.slides.length === 0) return;

            // Set up dot click handlers
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                    this.resetInterval();
                });
            });

            // Start auto-rotation
            this.startAutoPlay();
        },

        goToSlide: function (index) {
            // Remove active class from current slide and dot
            this.slides[this.currentSlide].classList.remove('active');
            this.dots[this.currentSlide].classList.remove('active');

            // Set new current slide
            this.currentSlide = index;

            // Add active class to new slide and dot
            this.slides[this.currentSlide].classList.add('active');
            this.dots[this.currentSlide].classList.add('active');
        },

        nextSlide: function () {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(next);
        },

        startAutoPlay: function () {
            this.interval = setInterval(() => {
                this.nextSlide();
            }, 5000); // Change slide every 5 seconds
        },

        resetInterval: function () {
            clearInterval(this.interval);
            this.startAutoPlay();
        }
    };

    bannerCarousel.init();


    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#0') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ========================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const elementsToAnimate = document.querySelectorAll(
        '.quick-link-card, .service-card, .stat-card, .mayor-content'
    );

    elementsToAnimate.forEach(el => {
        fadeInObserver.observe(el);
    });


    // ========================================
    // STATISTICS COUNTER ANIMATION
    // ========================================
    const statsSection = document.querySelector('.statistics-section');
    let statsAnimated = false;

    if (statsSection) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const hasComma = finalValue.includes(',');
            const hasPeso = finalValue.includes('₱');
            const hasDecimal = finalValue.includes('.');

            // Extract numeric value
            let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));

            if (isNaN(numericValue)) return;

            stat.textContent = hasPeso ? '₱0' : '0';

            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = numericValue / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current += increment;

                if (step >= steps) {
                    current = numericValue;
                    clearInterval(timer);
                }

                let displayValue = current.toFixed(hasDecimal ? 2 : 0);

                // Add formatting
                if (hasComma) {
                    displayValue = Number(displayValue).toLocaleString('en-US', {
                        minimumFractionDigits: hasDecimal ? 2 : 0,
                        maximumFractionDigits: hasDecimal ? 2 : 0
                    });
                }

                if (hasPeso) {
                    displayValue = '₱' + displayValue + (finalValue.includes('M') ? 'M' : '');
                }

                stat.textContent = displayValue;
            }, duration / steps);
        });
    }


    // ========================================
    // PARALLAX EFFECT FOR STATISTICS SECTION
    // ========================================
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const statsSection = document.querySelector('.statistics-section');

        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;

            if (inView) {
                const parallaxSpeed = 0.5;
                const yPos = -(scrolled - statsSection.offsetTop) * parallaxSpeed;
                statsSection.style.backgroundPositionY = yPos + 'px';
            }
        }
    });


    // ========================================
    // QUICK LINK CARDS STAGGER ANIMATION
    // ========================================
    const quickLinkCards = document.querySelectorAll('.quick-link-card');

    quickLinkCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 80)); // Stagger by 80ms
    });


    // ========================================
    // SERVICE CARDS HOVER EFFECT ENHANCEMENT
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });


    // ========================================
    // NAVBAR SCROLL EFFECT (if header exists)
    // ========================================
    const header = document.querySelector('header');

    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }


    // ========================================
    // ACCESSIBILITY: KEYBOARD NAVIGATION
    // ========================================
    document.querySelectorAll('.quick-link-card, .service-card').forEach(card => {
        card.setAttribute('tabindex', '0');

        card.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });


    // ========================================
    // PERFORMANCE: LAZY LOAD IMAGES
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }


    // ========================================
    // CONSOLE LOG FOR DEBUGGING
    // ========================================
    console.log('✅ Tapaz Citizen Portal Homepage Loaded Successfully');
    console.log(`📊 Statistics: ${document.querySelectorAll('.stat-card').length} cards`);
    console.log(`🔗 Quick Links: ${quickLinkCards.length} cards`);
    console.log(`🎯 Services: ${serviceCards.length} cards`);
    console.log(`🖼️ Banner Slides: ${bannerCarousel.slides.length} slides`);
});


// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Debounce function for scroll events
 */
function debounce(func, wait) {
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

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
