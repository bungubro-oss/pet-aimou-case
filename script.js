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
        paw.style.left = `${x - 20}px`;
        paw.style.top = `${y - 20}px`;
        paw.style.transform = `rotate(${angle}deg)`;
        
        paw.innerHTML = `
            <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style="fill: #E8727A; width: 100%; height: 100%;">
                <circle cx="50" cy="18" r="15"/>
                <circle cx="18" cy="45" r="13"/>
                <circle cx="82" cy="45" r="13"/>
                <circle cx="50" cy="82" r="28"/>
            </svg>
        `;
        
        document.body.appendChild(paw);

        setTimeout(() => {
            paw.remove();
        }, 3000);
    }
});
