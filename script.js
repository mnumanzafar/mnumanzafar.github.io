// =====================
// Preloader
// =====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// =====================
// Custom Cursor
// =====================
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
});

// Scale cursor on link hover
const links = document.querySelectorAll('a, button, .btn');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorOutline.style.transform = 'scale(1.5)';
    });
    link.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
    });
});

// =====================
// Navigation
// =====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =====================
// Typing Animation
// =====================
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['QA Engineer', 'Software Tester', 'Automation Specialist', 'Computer Science Student', 'Problem Solver'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, newTextDelay + 250);
});

// =====================
// Scroll Animations
// =====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .award-card, .timeline-item, .certificate-card, .exp-item, .service-card, .blog-card, .linkedin-card');
animatedElements.forEach(el => observer.observe(el));

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// =====================
// Scroll to Top & WhatsApp FAB Scroll Behavior
// =====================
const scrollTopBtn = document.getElementById('scrollTop');
const waFAB = document.getElementById('waFAB');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
        if (waFAB) waFAB.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('active');
        if (waFAB) waFAB.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================
// Form Submission
// =====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create mailto link
    const mailtoLink = `mailto:mnumanzafar832@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
});

// =====================
// Smooth Scrolling
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================
// Particle Effect (Hero Section)
// =====================
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: particleFloat 3s ease-in-out infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    
    document.querySelector('.hero-particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// =====================
// Dynamic Year in Footer
// =====================
document.querySelector('.footer-content p').innerHTML = `&copy; ${new Date().getFullYear()} M Noman Zafar. All Rights Reserved.`;

// =====================
// Dark/Light Mode Theme Toggle
// =====================
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
    const themeToggleIcon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.body.classList.add('light-mode');
        themeToggleIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('light-mode');
        themeToggleIcon.className = 'fas fa-moon';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeToggleIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggleIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// =====================
// Stats Counter Animation
// =====================
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const counterObserverOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = 2000 / target; // duration 2s divided by target

                const updateCount = () => {
                    if (count < target) {
                        count++;
                        counter.innerText = count + (target === 30 ? '+' : '');
                        setTimeout(updateCount, speed);
                    } else {
                        counter.innerText = target + (target === 30 ? '+' : '');
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, counterObserverOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

// =====================
// Testimonials Carousel
// =====================
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const prevBtn = document.getElementById('testimonialPrev');
const nextBtn = document.getElementById('testimonialNext');

if (testimonialTrack && testimonialCards.length > 0) {
    let currentIndex = 0;
    let autoSlideInterval;

    const updateTestimonials = (index) => {
        currentIndex = index;
        
        // Wrap index around
        if (currentIndex < 0) currentIndex = testimonialCards.length - 1;
        if (currentIndex >= testimonialCards.length) currentIndex = 0;

        // Slide track
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active classes on cards
        testimonialCards.forEach((card, idx) => {
            card.classList.toggle('active', idx === currentIndex);
        });

        // Update active classes on dots
        testimonialDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    };

    const nextSlide = () => updateTestimonials(currentIndex + 1);
    const prevSlide = () => updateTestimonials(currentIndex - 1);

    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    };

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
    });

    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            updateTestimonials(index);
            startAutoSlide();
        });
    });

    // Touch support for swiping
    let startX = 0;
    testimonialTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoSlide();
    }, { passive: true });

    // Initialize auto slide
    startAutoSlide();
}

// =====================
// Skill Progress Bars Animation
// =====================
const skillBarFills = document.querySelectorAll('.skill-bar-fill');
if (skillBarFills.length > 0) {
    const skillBarObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetProgress = fill.getAttribute('data-progress');
                fill.style.width = `${targetProgress}%`;
                skillBarObserver.unobserve(fill);
            }
        });
    }, skillBarObserverOptions);

    skillBarFills.forEach(fill => skillBarObserver.observe(fill));
}

// =====================
// 3D Tilt Effect on Project Cards
// =====================
const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within element
        const y = e.clientY - rect.top;  // y position within element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation angles (max 10 degrees)
        const rotateX = ((centerY - y) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// =====================
// Parallax Scrolling on Hero Particles
// =====================
const heroParticles = document.querySelector('.hero-particles');
window.addEventListener('scroll', () => {
    if (heroParticles) {
        const scrollValue = window.scrollY;
        // Shift particle container slightly slower than scroll speed
        heroParticles.style.transform = `translateY(${scrollValue * 0.15}px)`;
    }
});