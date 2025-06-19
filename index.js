// Initialize DOM elements
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm ? contactForm.querySelectorAll('input, textarea') : [];

// Theme Switching
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    const typingText = document.querySelector('.typing-text');
    typingText.textContent = '';
    
    // Typing Animation object
    // const typingAnimation = {
    //     textArray: ['Frontend Developer', 'Web Designer', 'Problem Solver'],
    //     textIndex: 0,
    //     charIndex: 0,
        
    //     typeText: function() {
    //         if (this.charIndex < this.textArray[this.textIndex].length) {
    //             typingText.textContent += this.textArray[this.textIndex].charAt(this.charIndex);
    //             this.charIndex++;
    //             setTimeout(() => this.typeText(), 100);
    //         } else {
    //             setTimeout(() => this.eraseText(), 2000);
    //         }
    //     },
        
    //     eraseText: function() {
    //         if (this.charIndex > 0) {
    //             typingText.textContent = this.textArray[this.textIndex].substring(0, this.charIndex - 1);
    //             this.charIndex--;
    //             setTimeout(() => this.eraseText(), 50);
    //         } else {
    //             this.textIndex = (this.textIndex + 1) % this.textArray.length;
    //             setTimeout(() => this.typeText(), 500);
    //         }
    //     }
    // };
    
    // Start typing animation
    typingAnimation.typeText();
    
    // Get saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    html.className = savedTheme;
    
    // Update theme toggle icon
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Add smooth transitions
    document.documentElement.style.transition = `all ${getComputedStyle(html).getPropertyValue('--transition-duration')} ease`;
});

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    // Get current theme
    const currentTheme = html.className;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update theme
    html.className = newTheme;
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icon
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile Menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate menu button
    const spans = menuBtn.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = navLinks.classList.contains('active') 
            ? `translateY(${index * 10}px) rotate(${index * 45}deg)`
            : `translateY(0) rotate(0)`;
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            const spans = menuBtn.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'translateY(0) rotate(0)';
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// AOS Initialization
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('img');
        image.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('img');
        image.style.transform = 'scale(1)';
    });
});

// Form Validation
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
            input.style.boxShadow = '0 0 5px red';
        } else {
            input.style.borderColor = '#e5e7eb';
            input.style.boxShadow = 'none';
        }
    });
    
    if (isValid) {
        console.log('Form submitted successfully');
        contactForm.reset();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully! I will get back to you soon.';
        contactForm.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
});

// Add success message styling
const style = document.createElement('style');
style.textContent = `
    .success-message {
        background: var(--primary-color);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        text-align: center;
        margin-top: 1rem;
        animation: slideIn 0.5s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const spans = menuBtn.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'translateY(0) rotate(0)';
        });
    }
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const textArray = ['Frontend Developer', 'Web Designer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;

function typeText() {
    if (charIndex < textArray[textIndex].length) {
        typingText.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingText.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeText, 500);
    }
}

typeText();

// Smooth Scroll
const scrollLinks = document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation
contactForm = document.getElementById('contactForm');
formInputs = contactForm.querySelectorAll('input, textarea');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    let isValid = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    });
    
    if (isValid) {
        // Here you would typically send the form data to a server
        console.log('Form submitted successfully');
        contactForm.reset();
        alert('Message sent successfully! I will get back to you soon.');
    }
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
        }
    });
}, {
    threshold: 0.1
});

// Observe all elements with animation classes
document.querySelectorAll('.animate-reveal').forEach((el) => {
    observer.observe(el);
});

// Project Card Hover Effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Skill Card Hover Effects
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Social Icon Hover Effects
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress');
const observerProgress = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
        }
    });
});

progressBars.forEach(bar => {
    bar.style.width = '0';
    bar.dataset.width = bar.style.width;
    observerProgress.observe(bar);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelector('.hero').style.transform = `translateY(${scrolled * 0.5}px)`;
});