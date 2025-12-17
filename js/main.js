// ===== Loading Screen =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        initAnimations();
    }, 2000);
});

// ===== Navigation Menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translateY(8px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(5, 5, 5, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 300) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Initialize Animations =====
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
    
    // Observe team members
    document.querySelectorAll('.team-member').forEach((member, index) => {
        member.style.animationDelay = `${index * 0.1}s`;
        member.style.animationPlayState = 'paused';
        observer.observe(member);
    });
    
    // Add parallax effect to hero background
    const heroBackground = document.querySelector('.hero-bg-image');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
    
    // Add hover effects to faction cards
    initFactionCards();
    
    // Initialize audio player
    initAudioPlayer();
    
    // Initialize contact form
    initContactForm();
    
    // Add typing effect to multiple elements
    addTypingEffects();
    
    // Add glitch effect on hover to title
    addGlitchHoverEffect();
}

// ===== Faction Cards Interaction =====
function initFactionCards() {
    const factionCards = document.querySelectorAll('.faction-card');
    
    factionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
        
        const detailsBtn = card.querySelector('.btn-faction-details');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const faction = detailsBtn.getAttribute('data-faction');
                showFactionModal(faction);
            });
        }
    });
}

// ===== Faction Modal =====
function showFactionModal(faction) {
    const factionData = {
        citizens: {
            title: 'CITIZENS',
            description: 'The citizens of Shiryokai are the heart and soul of this vibrant city. They were once a fun, loving, and happy community, but have been oppressed by the Elite Corporation. They dream of taking back their city and turning it into a prosperous place full of opportunities and happiness.',
            color: '#00ff00'
        },
        rebels: {
            title: 'REBELS',
            description: 'The Rebels are a group of determined citizens who have banded together to liberate Shiryokai from the Elite. They are a beacon of hope, led by passionate leaders who won\'t conform to living under oppression. Their fight is challenging, but they have unwavering determination.',
            color: '#ff00ff'
        },
        androids: {
            title: 'ANDROIDS',
            description: 'The Elite Corp\'s androids are a technological achievement never seen before. Designed with precision, they have incredible strength, speed, and intelligence. They are constantly improving and are the ultimate defenders of Elite Corp\'s interests.',
            color: '#00ffff'
        },
        elite: {
            title: 'ELITE',
            description: 'The Elite started as visionaries working toward a brighter future, but their greed for power and control transformed them into oppressive rulers. They now use technology to control everything and maintain their regime where only the rich can live extraordinarily.',
            color: '#ff0000'
        }
    };
    
    const data = factionData[faction];
    if (!data) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'faction-modal';
    modal.innerHTML = `
        <div class="modal-content" style="border-color: ${data.color}">
            <span class="modal-close">&times;</span>
            <h2 class="modal-title" style="color: ${data.color}">${data.title}</h2>
            <p class="modal-description">${data.description}</p>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .faction-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s;
        }
        .modal-content {
            background: var(--bg-darker);
            padding: 40px;
            max-width: 600px;
            border: 3px solid;
            position: relative;
            animation: slideIn 0.3s;
        }
        .modal-close {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 30px;
            color: var(--text-gray);
            cursor: pointer;
        }
        .modal-close:hover {
            color: var(--primary-color);
        }
        .modal-title {
            font-size: 2rem;
            margin-bottom: 20px;
        }
        .modal-description {
            font-size: 0.8rem;
            line-height: 1.8;
            color: var(--text-gray);
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

// ===== Audio Player =====
function initAudioPlayer() {
    const audioToggle = document.getElementById('audio-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    if (audioToggle && backgroundMusic) {
        let isPlaying = false;
        
        audioToggle.addEventListener('click', () => {
            if (isPlaying) {
                backgroundMusic.pause();
                audioToggle.classList.remove('playing');
                audioToggle.innerHTML = '<span class="audio-icon">🎵</span>';
            } else {
                backgroundMusic.play().catch(e => {
                    console.log('Audio play failed:', e);
                });
                audioToggle.classList.add('playing');
                audioToggle.innerHTML = '<span class="audio-icon">⏸️</span>';
            }
            isPlaying = !isPlaying;
        });
    }
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add submission animation
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Reset form after showing success
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.classList.remove('show');
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

// ===== Typing Effects =====
function addTypingEffects() {
    const elementsToType = document.querySelectorAll('.typewriter');
    
    elementsToType.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, index * 500);
    });
}

// ===== Glitch Hover Effect =====
function addGlitchHoverEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s infinite';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animation = 'glitch 2s infinite';
        });
    });
}

// ===== Particle Effect =====
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ff00;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s infinite linear;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(10px) translateX(-10px); }
            75% { transform: translateY(-10px) translateX(20px); }
            100% { transform: translateY(0) translateX(0); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles
createParticles();

// ===== Easter Egg - Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                    'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 3s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = 'none';
        style.remove();
    }, 10000);
    
    // Show easter egg message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-darker);
        border: 3px solid var(--primary-color);
        padding: 30px;
        z-index: 10000;
        font-family: 'Press Start 2P', cursive;
        font-size: 1.5rem;
        color: var(--primary-color);
        animation: fadeInUp 0.5s;
    `;
    message.textContent = 'KONAMI CODE ACTIVATED!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// ===== Performance Optimization =====
// Debounce function for scroll events
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

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Update UI based on scroll
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ===== Initialize Everything on DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Kaizen Portfolio Initialized! 🚀');
});
