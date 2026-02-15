document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.tapaz-slider-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.tapaz-next-btn');
    const prevBtn = document.querySelector('.tapaz-prev-btn');
    
    // Config
    const autoPlayDelay = 5000;
    let slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    
    // Update slide width on resize
    window.addEventListener('resize', () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        updateSlidePosition();
    });

    const updateSlidePosition = () => {
        track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
    };

    const moveToNextSlide = () => {
        // Loop back logic specific for 3-up view vs 1-up view needs care.
        // For simplicity, simple endless loop logic or bound stop.
        // Let's do simple bounds for now and loop to start.
        
        const slidesVisible = window.innerWidth >= 768 ? 3 : 1;
        const maxIndex = slides.length - slidesVisible;

        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlidePosition();
    };

    const moveToPrevSlide = () => {
        const slidesVisible = window.innerWidth >= 768 ? 3 : 1;
        const maxIndex = slides.length - slidesVisible;

        if (currentIndex <= 0) {
            currentIndex = maxIndex;
        } else {
            currentIndex--;
        }
        updateSlidePosition();
    };

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', moveToNextSlide);
    if (prevBtn) prevBtn.addEventListener('click', moveToPrevSlide);

    // Auto Play
    let autoPlayInterval = setInterval(moveToNextSlide, autoPlayDelay);

    // Pause on hover
    const sliderContainer = document.querySelector('.tapaz-news-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(moveToNextSlide, autoPlayDelay);
    });
});
