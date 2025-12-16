/*
* Kayden Clinic - Global JavaScript
* Author: Gemini
* Version: 1.0
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Simple accessibility improvement
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- 2. Active Navigation Link Styling ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        // Handle index.html being the root path
        if (currentPath === '' && linkPath === 'index.html') {
            link.classList.add('active');
        } else if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // --- 3. Enhanced Fade-in on Scroll Animation ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const animateElements = document.querySelectorAll('.animate-slide-up, .animate-fade-scale');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Enhanced card hover effects
    const serviceCards = document.querySelectorAll('.service-card, .pharmacy-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // Animate elements on page load
    animateElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });

    // Enhanced card hover effects
    const serviceCards = document.querySelectorAll('.service-card, .pharmacy-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(26, 54, 93, 0.2)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(26, 54, 93, 0.08)';
        });
    });

    // Smooth scroll for navigation
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

    // Loading animation for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // --- 4. Appointment Form Validation ---
    const appointmentForm = document.querySelector('#appointment-form');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            let isValid = true;
            
            // Clear previous errors
            const errorMessages = appointmentForm.querySelectorAll('.form-error');
            errorMessages.forEach(msg => msg.style.display = 'none');

            // --- Name Validation ---
            const name = appointmentForm.querySelector('#name');
            if (name.value.trim() === '') {
                showError(name, 'Full name is required.');
                isValid = false;
            }

            // --- Email Validation ---
            const email = appointmentForm.querySelector('#email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            }

            // --- Phone Validation ---
            const phone = appointmentForm.querySelector('#phone');
            const phonePattern = /^[0-9\s\-\(\)+]{10,}$/;
            if (!phonePattern.test(phone.value.trim())) {
                showError(phone, 'Please enter a valid phone number.');
                isValid = false;
            }
            
            // --- Date Validation ---
            const date = appointmentForm.querySelector('#date');
            if (date.value === '') {
                showError(date, 'Please select an appointment date.');
                isValid = false;
            } else {
                const selectedDate = new Date(date.value);
                const today = new Date();
                today.setHours(0,0,0,0); // Reset time to compare dates only
                if(selectedDate < today) {
                    showError(date, 'Please select a future date.');
                    isValid = false;
                }
            }

            // --- Service Validation ---
            const service = appointmentForm.querySelector('#service');
            if (service.value === '') {
                showError(service, 'Please select a service.');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault(); // Prevent form submission if validation fails
            } else {
                // On successful validation, you could show a success message
                // For this example, we'll just let it submit.
                // In a real application, you'd handle the submission via AJAX.
                e.preventDefault(); // Prevent actual submission for this demo
                alert('Appointment request submitted successfully! We will contact you shortly to confirm.');
                appointmentForm.reset();
            }
        });
    }

    function showError(inputElement, message) {
        const formGroup = inputElement.parentElement;
        const errorElement = formGroup.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
});
