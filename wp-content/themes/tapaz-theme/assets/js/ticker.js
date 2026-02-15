document.addEventListener('DOMContentLoaded', function () {
    // Optional: Logic to clone ticker items for a smoother infinite loop effect if the content is short.
    const tickerMove = document.querySelector('.tapaz-ticker-move');

    if (tickerMove) {
        // Calculate width to see if we need to clone
        // For a CSS-only marquee, usually, we just let it run.
        // But for a true infinite loop without gaps, we often clone content.

        // Cloning content once to ensure there's no gap when the animation resets
        const content = tickerMove.innerHTML;
        tickerMove.innerHTML = content + content;
    }
});
