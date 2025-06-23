// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Exhibition Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const exhibitionCards = document.querySelectorAll('.exhibition-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                exhibitionCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.display = 'block';
                        }, 10);
                    } else {
                        if (card.getAttribute('data-category') === filterValue) {
                            card.classList.remove('hidden');
                            card.style.display = 'block';
                        } else {
                            card.classList.add('hidden');
                            setTimeout(() => {
                                if (card.classList.contains('hidden')) {
                                    card.style.display = 'none';
                                }
                            }, 300);
                        }
                    }
                });
            });
        });
    }

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formFields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message'),
            newsletter: document.getElementById('newsletter')
        };

        const errorElements = {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            subject: document.getElementById('subjectError'),
            message: document.getElementById('messageError')
        };

        const submitBtn = contactForm.querySelector('.submit-btn');
        const formSuccess = document.getElementById('formSuccess');

        // Validation functions
        function validateName(name) {
            return name.trim().length >= 2;
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email.trim());
        }

        function validateSubject(subject) {
            return subject.trim() !== '';
        }

        function validateMessage(message) {
            return message.trim().length >= 10;
        }

        function showError(field, message) {
            const formGroup = field.closest('.form-group');
            const errorElement = errorElements[field.name];
            
            formGroup.classList.add('error');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
        }

        function hideError(field) {
            const formGroup = field.closest('.form-group');
            const errorElement = errorElements[field.name];
            
            formGroup.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }

        // Real-time validation
        Object.keys(formFields).forEach(fieldName => {
            const field = formFields[fieldName];
            if (field && field.type !== 'checkbox') {
                field.addEventListener('blur', function() {
                    validateField(this);
                });

                field.addEventListener('input', function() {
                    if (this.closest('.form-group').classList.contains('error')) {
                        validateField(this);
                    }
                });
            }
        });

        function validateField(field) {
            const value = field.value;
            let isValid = true;
            let errorMessage = '';

            switch (field.name) {
                case 'name':
                    if (!validateName(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid name (at least 2 characters)';
                    }
                    break;
                case 'email':
                    if (!validateEmail(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'subject':
                    if (!validateSubject(value)) {
                        isValid = false;
                        errorMessage = 'Please select a subject';
                    }
                    break;
                case 'message':
                    if (!validateMessage(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a message (at least 10 characters)';
                    }
                    break;
            }

            if (isValid) {
                hideError(field);
            } else {
                showError(field, errorMessage);
            }

            return isValid;
        }

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all required fields
            const nameValid = validateField(formFields.name);
            const emailValid = validateField(formFields.email);
            const subjectValid = validateField(formFields.subject);
            const messageValid = validateField(formFields.message);

            const allValid = nameValid && emailValid && subjectValid && messageValid;

            if (allValid) {
                // Show loading state
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;

                // Simulate form submission (replace with actual form submission logic)
                setTimeout(() => {
                    // Hide loading state
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;

                    // Show success message
                    contactForm.style.display = 'none';
                    formSuccess.classList.add('show');

                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth' });

                    // Reset form after showing success
                    setTimeout(() => {
                        contactForm.reset();
                        Object.keys(errorElements).forEach(key => {
                            hideError(formFields[key]);
                        });
                    }, 100);

                }, 2000);
            } else {
                // Scroll to first error
                const firstError = contactForm.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Smooth scrolling for anchor links
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

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.work-item, .exhibition-card, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[src]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for older browsers
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});