document.addEventListener('DOMContentLoaded', () => {
    // Scroll Fade-in Animation
    const fadeElems = document.querySelectorAll('.fade-in');

    const checkFade = () => {
        fadeElems.forEach(elem => {
            const rect = elem.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                elem.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkFade);
    checkFade(); // Check manually at start

    // --- MATRIX BINARY RAIN ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const columns = Math.floor(width / 35); // Spacing increased for fewer numbers
    const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * height / 20)); // Randomize starts

    const binary = "01";

    function drawMatrix() {
        // Subtle fade effect to create trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(255, 102, 0, 0.3)'; // Salvetech Orange with low opacity
        ctx.font = '15px "Space Mono"';

        for (let i = 0; i < drops.length; i++) {
            const text = binary.charAt(Math.floor(Math.random() * binary.length));
            ctx.fillText(text, i * 35, drops[i] * 20);

            if (drops[i] * 20 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    let matrixInterval = setInterval(drawMatrix, 50);

    // Resize handler
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        // Recalculate columns on resize
        const newColumns = Math.floor(width / 35);
        if (newColumns > drops.length) {
            for (let i = drops.length; i < newColumns; i++) {
                drops[i] = Math.floor(Math.random() * height / 20);
            }
        } else if (newColumns < drops.length) {
            drops.length = newColumns;
        }
    });
});
