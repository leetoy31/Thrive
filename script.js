// Carousel functionality - only run if carousel exists
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
let autoSlideInterval;

// Only initialize carousel if elements exist (homepage only)
if (slides.length > 0 && indicators.length > 0) {
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function changeSlide(direction) {
        showSlide(currentSlide + direction);
        resetAutoSlide();
    }

    function goToSlide(index) {
        showSlide(index);
        resetAutoSlide();
    }

    function autoSlide() {
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlide();
    }

    // Make functions global so they can be called from HTML onclick
    window.changeSlide = changeSlide;
    window.goToSlide = goToSlide;

    // Initialize carousel - start at slide 0 (first slide)
    currentSlide = 0;
    showSlide(0);
    autoSlide();
}

// Smooth scrolling - works on all pages
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return; // Exit if section doesn't exist
    
    const navHeight = document.getElementById('header').offsetHeight;
    const targetPosition = section.offsetTop - navHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Close mobile menu
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
}

// Make scrollToSection global
window.scrollToSection = scrollToSection;

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position (only on single page with sections)
    const sections = ['home', 'classes', 'why', 'contact'];
    const navHeight = header.offsetHeight;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) return; // Skip if section doesn't exist
        
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Make toggleMenu global
window.toggleMenu = toggleMenu;

// Modal functionality
function openModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalTitle || !modalBody) return; // Exit if modal elements don't exist
    
    if (type === 'purchase') {
        modalTitle.textContent = 'Membership Plans';
        modalBody.innerHTML = `
            <p>Choose the perfect plan for your fitness journey:</p>
            <div style="margin-top: 2rem;">
                <h3 style="color: #c41e3a;">Basic Plan - $29/month</h3>
                <p style="color: #ccc; margin-bottom: 1.5rem;">Access to gym facilities and group classes</p>
                
                <h3 style="color: #c41e3a;">Premium Plan - $49/month</h3>
                <p style="color: #ccc; margin-bottom: 1.5rem;">Everything in Basic + Personal Training sessions</p>
                
                <h3 style="color: #c41e3a;">Elite Plan - $79/month</h3>
                <p style="color: #ccc; margin-bottom: 1.5rem;">All-inclusive access with nutrition coaching</p>
            </div>
            <button class="button button-primary" style="width: 100%; margin-top: 1rem;" onclick="closeModal()">Close</button>
        `;
    } else if (type === 'class') {
        modalTitle.textContent = 'Class Information';
        modalBody.innerHTML = `
            <p>Our classes are designed for all fitness levels. Each session is led by certified instructors who ensure proper form and safety.</p>
            <div style="margin-top: 2rem;">
                <h3 style="color: #c41e3a;">Class Schedule</h3>
                <p style="color: #ccc; margin-bottom: 1rem;">Monday - Friday: 6:00 AM - 9:00 PM</p>
                <p style="color: #ccc; margin-bottom: 1rem;">Saturday - Sunday: 8:00 AM - 6:00 PM</p>
                
                <h3 style="color: #c41e3a; margin-top: 1.5rem;">What to Bring</h3>
                <p style="color: #ccc;">Water bottle, towel, and comfortable workout attire. We provide mats and equipment.</p>
            </div>
            <button class="button button-primary" style="width: 100%; margin-top: 1rem;" onclick="closeModal()">Close</button>
        `;
    }
    
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Make modal functions global
window.openModal = openModal;
window.closeModal = closeModal;

// Close modal when clicking outside - only if modal exists
const modal = document.getElementById('modal');
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            closeModal();
        }
    });
}

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    alert(`Thank you, ${data.name}! We've received your message and will contact you at ${data.email} shortly.`);
    event.target.reset();
}

// Make handleSubmit global
window.handleSubmit = handleSubmit;

// Service card click handlers - only if service cards exist
const serviceCards = document.querySelectorAll('.service-card');
if (serviceCards.length > 0) {
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = 'classes.html';
        });
    });
}