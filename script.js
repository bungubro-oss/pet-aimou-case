/*
    NekoBIN - script.js
    Interactions & Animations
*/

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once it's visible, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements with .animate-on-scroll class (to be added in Step 2)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // Parallax and Dynamic Scroll Effects
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Header shadow
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }

        // Parallax for Hero
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${currentScroll * 0.3}px)`;
            hero.style.opacity = 1 - currentScroll / 700;
        }

        // Section Titles dynamic movement
        const titles = document.querySelectorAll('.section-title');
        titles.forEach(title => {
            const rect = title.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const shift = (window.innerHeight / 2 - rect.top) * 0.05;
                title.style.transform = `translateY(${shift}px)`;
            }
        });
        
        lastScroll = currentScroll;
    });

    // Hamburger Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Cat Footprint Cursor Trail Implementation
    let lastX = 0;
    let lastY = 0;
    const distanceThreshold = 60; // Distance to spawn next paw
    let stepCount = 0;

    document.addEventListener('mousemove', (e) => {
        const x = e.pageX;
        const y = e.pageY;

        const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));

        if (distance > distanceThreshold) {
            const angle = Math.atan2(y - lastY, x - lastX) * (180 / Math.PI) + 90;
            
            const offsetDist = 12;
            const isRight = stepCount % 2 === 0;
            const offsetX = Math.cos((angle - 180) * (Math.PI / 180)) * (isRight ? offsetDist : -offsetDist);
            const offsetY = Math.sin((angle - 180) * (Math.PI / 180)) * (isRight ? offsetDist : -offsetDist);

            createPawPrint(x + offsetX, y + offsetY, angle);
            
            lastX = x;
            lastY = y;
            stepCount++;
        }
    });

    function createPawPrint(x, y, angle) {
        const paw = document.createElement('div');
        paw.className = 'cat-paw-trail';
        paw.style.left = `${x - 30}px`; // Centering 60px width
        paw.style.top = `${y - 30}px`;
        paw.style.width = '60px';
        paw.style.height = '60px';
        paw.style.transform = `rotate(${angle}deg)`;
        
        paw.innerHTML = `
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="fill: #d4af37; width: 100%; height: 100%;">
                <path d="M234.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5 .3-86.2 32.6-96.8 70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3-14.3-70.1 10.2-84.1 59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5l0 1.6c0 25.8-20.9 46.7-46.7 46.7-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2-25.8 0-46.7-20.9-46.7-46.7l0-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3 29.1 51.7 10.2 84.1-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5 46.9 53.9 32.6 96.8-52.1 69.1-84.4 58.5z"/>
            </svg>
        `;
        
        document.body.appendChild(paw);

        setTimeout(() => {
            paw.remove();
        }, 3000);
    }
});
