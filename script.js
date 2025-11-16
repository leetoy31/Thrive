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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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
    
    if (!modal || !modalTitle || !modalBody) return;
    
    if (type === 'purchase') {
        modalTitle.textContent = 'Membership Plans';
        modalBody.innerHTML = `
            <div class="plan-card">
                <h3>Basic Plan</h3>
                <div class="price">₱899/month</div>
                <ul>
                    <li>Access to gym facilities during operating hours</li>
                    <li>All group fitness classes included</li>
                    <li>Locker room and shower access</li>
                    <li>Free parking at our Tagbilaran facility</li>
                    <li>Access to cardio and strength equipment</li>
                </ul>
                <button class="button button-primary button-center" onclick="selectPlan('Basic - ₱899/month')">Choose Basic</button>
            </div>
            
            <div class="plan-card">
                <h3>Premium Plan</h3>
                <div class="price">₱1,499/month</div>
                <ul>
                    <li>Everything in Basic Plan</li>
                    <li>2 personal training sessions per month</li>
                    <li>Nutrition consultation with local meal plans</li>
                    <li>2 guest passes per month</li>
                    <li>Priority class booking</li>
                    <li>Access to premium equipment area</li>
                </ul>
                <button class="button button-primary button-center" onclick="selectPlan('Premium - ₱1,499/month')">Choose Premium</button>
            </div>
            
            <div class="plan-card">
                <h3>Elite Plan</h3>
                <div class="price">₱2,499/month</div>
                <ul>
                    <li>Everything in Premium Plan</li>
                    <li>Unlimited personal training sessions</li>
                    <li>Monthly body composition analysis</li>
                    <li>Personalized meal planning with Bohol ingredients</li>
                    <li>Towel service included</li>
                    <li>VIP locker assignment</li>
                    <li>Free 1 fitness apparel per quarter</li>
                </ul>
                <button class="button button-primary button-center" onclick="selectPlan('Elite - ₱2,499/month')">Choose Elite</button>
            </div>
            
            <div class="modal-buttons">
                <button class="button" onclick="closeModal()">Close</button>
            </div>
        `;
    } else if (type.startsWith('class-')) {
        const classInfo = getClassInfo(type);
        modalTitle.textContent = classInfo.title;
        modalBody.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <p style="color: #ccc; line-height: 1.8;">${classInfo.description}</p>
            </div>
            
            <div style="background: #0a0a0a; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <h3 style="color: #c41e3a; margin-bottom: 1rem;">Class Details</h3>
                <p style="color: #ccc; margin-bottom: 0.5rem;"><strong>Duration:</strong> ${classInfo.duration}</p>
                <p style="color: #ccc; margin-bottom: 0.5rem;"><strong>Intensity Level:</strong> ${classInfo.level}</p>
                <p style="color: #ccc; margin-bottom: 0.5rem;"><strong>Class Size:</strong> ${classInfo.size}</p>
                <p style="color: #ccc;"><strong>Equipment Provided:</strong> ${classInfo.equipment}</p>
            </div>
            
            <div style="background: #0a0a0a; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <h3 style="color: #c41e3a; margin-bottom: 1rem;">What to Expect</h3>
                <p style="color: #ccc; line-height: 1.8;">${classInfo.expect}</p>
            </div>
            
            <div style="background: #0a0a0a; padding: 1.5rem; border-radius: 8px;">
                <h3 style="color: #c41e3a; margin-bottom: 1rem;">Schedule</h3>
                <p style="color: #ccc;">${classInfo.schedule}</p>
            </div>
            
            <div class="modal-buttons">
                <button class="button button-primary" onclick="location.href='contact.html'; closeModal()">Book a Trial Class</button>
                <button class="button" onclick="closeModal()">Close</button>
            </div>
        `;
    }
    
    modal.classList.add('active');
}

function getClassInfo(type) {
    const classData = {
        'class-strength': {
            title: 'Strength Training',
            description: 'Our strength training program focuses on building lean muscle mass, increasing overall strength, and improving bone density. Using a combination of free weights, machines, and functional training equipment, our certified trainers will guide you through progressive overload techniques.',
            duration: '60 minutes',
            level: 'All Levels (Beginner to Advanced)',
            size: 'Maximum 12 participants per class',
            equipment: 'Dumbbells, barbells, kettlebells, resistance bands',
            expect: 'Each session includes a proper warm-up, compound movements (squats, deadlifts, presses), accessory exercises, and cool-down stretching. Our trainers ensure proper form and provide modifications based on your fitness level.',
            schedule: 'Monday, Wednesday, Friday: 6:00 AM, 5:30 PM, 7:00 PM | Tuesday, Thursday: 5:30 PM'
        },
        'class-yoga': {
            title: 'Yoga Sessions',
            description: 'Experience the transformative power of yoga in our peaceful Tagbilaran studio. We offer various styles including Hatha for beginners, Vinyasa for flowing movement, and Power Yoga for those seeking a more intense workout.',
            duration: '45-90 minutes',
            level: 'Beginner to Advanced',
            size: 'Maximum 15 participants per class',
            equipment: 'Yoga mats, blocks, straps, bolsters',
            expect: 'Sessions begin with breathing exercises (pranayama), move through asanas (poses), and conclude with relaxation (savasana). Suitable for improving flexibility, reducing stress, and enhancing mind-body connection.',
            schedule: 'Monday, Wednesday, Friday: 9:00 AM, 7:00 PM | Tuesday, Thursday: 7:00 PM | Saturday, Sunday: 9:00 AM'
        },
        'class-cardio': {
            title: 'Cardio Blast',
            description: 'High-intensity cardiovascular training designed to torch calories, improve endurance, and boost metabolism. This fast-paced class combines HIIT protocols, cycling, and bodyweight exercises.',
            duration: '45 minutes',
            level: 'Intermediate to Advanced',
            size: 'Maximum 15 participants per class',
            equipment: 'Stationary bikes, jump ropes, battle ropes',
            expect: 'Expect heart-pumping intervals, minimal rest periods, and maximum calorie burn. Modifications available for different fitness levels. Bring plenty of water and prepare to sweat!',
            schedule: 'Monday, Wednesday: 5:00 PM | Tuesday: 6:00 AM | Thursday: 7:00 PM | Saturday: 8:00 AM'
        },
        'class-calisthenics': {
            title: 'Calisthenics',
            description: 'Master the art of bodyweight training. Learn to control your body through space with exercises like pull-ups, dips, muscle-ups, handstands, and advanced core movements.',
            duration: '60 minutes',
            level: 'All Levels',
            size: 'Maximum 10 participants per class',
            equipment: 'Pull-up bars, parallel bars, gymnastic rings',
            expect: 'Progressive skill development from basic movements to advanced techniques. Build functional strength, improve body control, and develop impressive calisthenic skills over time.',
            schedule: 'Tuesday, Thursday: 10:00 AM, 5:30 PM | Saturday, Sunday: 12:00 PM'
        },
        'class-pilates': {
            title: 'Pilates',
            description: 'Focus on core strength, flexibility, and postural alignment through controlled, precise movements. Our Pilates classes emphasize quality over quantity and mind-body integration.',
            duration: '50 minutes',
            level: 'All Levels',
            size: 'Maximum 12 participants per class',
            equipment: 'Pilates mats, resistance bands, small balls',
            expect: 'Low-impact exercises targeting deep core muscles, improving posture, and building long, lean muscle tone. Perfect for rehabilitation, injury prevention, and overall body conditioning.',
            schedule: 'Tuesday, Thursday: 6:00 AM, 10:00 AM | Sunday: 11:00 AM'
        },
        'class-boxing': {
            title: 'Boxing & Kickboxing',
            description: 'Learn proper boxing and kickboxing techniques while getting an incredible full-body workout. Release stress, build power, and improve coordination through this martial arts-inspired fitness class.',
            duration: '60 minutes',
            level: 'All Levels',
            size: 'Maximum 12 participants per class',
            equipment: 'Boxing gloves, heavy bags, speed bags, focus mitts',
            expect: 'Combination of technique drills, bag work, partner pad work, and conditioning exercises. Builds cardiovascular endurance, upper body strength, and mental toughness.',
            schedule: 'Monday, Wednesday, Friday: 7:00 PM, 9:00 AM | Sunday: 4:00 PM'
        }
    };
    return classData[type] || classData['class-strength'];
}

function selectPlan(planName) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="success-message">
            <h3 style="margin-bottom: 1rem;">🎉 Salamat! Great Choice!</h3>
            <p>You've selected the <strong>${planName}</strong> plan.</p>
            <p style="margin-top: 1rem;">Our team will contact you shortly to complete your registration and schedule your facility tour here in Tagbilaran.</p>
        </div>
        <div style="text-align: center; color: #ccc;">
            <p><strong>What happens next?</strong></p>
            <p style="margin-top: 1rem;">1. Confirmation call/SMS within 24 hours</p>
            <p>2. Schedule your THRIVE Tagbilaran facility tour</p>
            <p>3. Meet with a certified trainer for fitness assessment</p>
            <p>4. Start your transformation journey in Bohol!</p>
            <p style="margin-top: 1.5rem; font-style: italic; color: #999;">You can also visit us directly at CPG Avenue, Cogon District, Tagbilaran City</p>
        </div>
        <div class="modal-buttons">
            <button class="button button-primary" onclick="closeModal()">Got it!</button>
            <button class="button" onclick="location.href='contact.html'; closeModal()">Contact Us Now</button>
        </div>
    `;
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
window.selectPlan = selectPlan;

// Close modal when clicking outside
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
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Show success message
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = 'Message Sent Successfully!';
        modalBody.innerHTML = `
            <div class="success-message">
                <h3 style="margin-bottom: 1rem;">✅ Salamat, ${data.name}!</h3>
                <p>We've received your message and will respond to you at <strong>${data.email}</strong> or <strong>${data.phone}</strong> within 24 hours.</p>
                <p style="margin-top: 1rem;">Our Tagbilaran team is excited to help you start your fitness journey!</p>
            </div>
            <div style="text-align: center; color: #ccc; margin-top: 2rem;">
                <p><strong>Need immediate assistance?</strong></p>
                <p style="margin-top: 1rem;">Call us at: <strong>(038) 411-3456</strong></p>
                <p>Mobile: <strong>0917-123-4567</strong></p>
                <p style="margin-top: 1rem;">Or visit us at:</p>
                <p><strong>CPG Avenue, Cogon District<br>Tagbilaran City, Bohol</strong></p>
            </div>
            <div class="modal-buttons">
                <button class="button button-primary" onclick="closeModal()">Close</button>
            </div>
        `;
        
        modal.classList.add('active');
        event.target.reset();
    }
}

// Make handleSubmit global
window.handleSubmit = handleSubmit;
