// Global Variables
let currentLang = 'he';

// Language Toggle Function
function toggleLanguage() {
    const body = document.body;
    const toggleBtn = document.querySelector('.lang-toggle');
    const html = document.documentElement;
    
    if (currentLang === 'he') {
        // Switch to English
        currentLang = 'en';
        html.lang = 'en';
        html.dir = 'ltr';
        body.classList.add('lang-en');
        toggleBtn.textContent = 'עב';
        
        // Update all text elements
        document.querySelectorAll('[data-en]').forEach(element => {
            element.textContent = element.getAttribute('data-en');
        });
        
        // Update placeholders
        updatePlaceholders('en');
    } else {
        // Switch to Hebrew
        currentLang = 'he';
        html.lang = 'he';
        html.dir = 'rtl';
        body.classList.remove('lang-en');
        toggleBtn.textContent = 'EN';
        
        // Update all text elements
        document.querySelectorAll('[data-he]').forEach(element => {
            element.textContent = element.getAttribute('data-he');
        });
        
        // Update placeholders
        updatePlaceholders('he');
    }
    
    // Save language preference
    localStorage.setItem('secgate-lang', currentLang);
}

// Update Form Placeholders
function updatePlaceholders(lang) {
    const placeholders = {
        he: {
            message: "מה הבעיות הטכנולוגיות שאתם מתמודדים איתן? איזה שירותים מעניינים אתכם?",
            name: "שם מלא",
            email: "כתובת אימייל",
            phone: "טלפון",
            company: "שם החברה/ארגון",
            employees: "בחר...",
            subject: "נושא"
        },
        en: {
            message: "What technological challenges are you facing? Which services interest you?",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone",
            company: "Company/Organization Name",
            employees: "Select...",
            subject: "Subject"
        }
    };
    
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.placeholder = placeholders[lang].message;
    }
    
    const nameField = document.getElementById('name');
    if (nameField) {
        nameField.placeholder = placeholders[lang].name;
    }
    
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.placeholder = placeholders[lang].email;
    }
    
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.placeholder = placeholders[lang].phone;
    }
    
    const companyField = document.getElementById('company');
    if (companyField) {
        companyField.placeholder = placeholders[lang].company;
    }
    
    const subjectField = document.getElementById('subject');
    if (subjectField) {
        subjectField.placeholder = placeholders[lang].subject;
    }
}

// Initialize Language
function initializeLanguage() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('secgate-lang');
    if (savedLang && savedLang !== currentLang) {
        toggleLanguage();
    }
    
    // Set initial language state
    if (currentLang === 'he') {
        document.documentElement.lang = 'he';
        document.documentElement.dir = 'rtl';
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderEffects() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Active Navigation Link
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Form Validation
function initFormValidation() {
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            let isValid = true;
            
            // Validate name
            const nameField = form.querySelector('#name');
            if (nameField) {
                const name = nameField.value.trim();
                if (name.length < 2) {
                    showError('nameError', currentLang === 'he' ? 'שם חייב להכיל לפחות 2 תווים' : 'Name must contain at least 2 characters');
                    isValid = false;
                }
            }
            
            // Validate email
            const emailField = form.querySelector('#email');
            if (emailField) {
                const email = emailField.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showError('emailError', currentLang === 'he' ? 'כתובת אימייל לא תקינה' : 'Invalid email address');
                    isValid = false;
                }
            }
            
            // Validate message
            const messageField = form.querySelector('#message');
            if (messageField) {
                const message = messageField.value.trim();
                if (message.length < 10) {
                    showError('messageError', currentLang === 'he' ? 'הודעה חייבת להכיל לפחות 10 תווים' : 'Message must contain at least 10 characters');
                    isValid = false;
                }
            }
            
            // Validate phone (optional but if provided, should be valid)
            const phoneField = form.querySelector('#phone');
            if (phoneField && phoneField.value.trim()) {
                const phone = phoneField.value.trim();
                const phoneRegex = /^[\d\-\+\(\)\s]+$/;
                if (!phoneRegex.test(phone) || phone.length < 9) {
                    showError('phoneError', currentLang === 'he' ? 'מספר טלפון לא תקין' : 'Invalid phone number');
                    isValid = false;
                }
            }
            
            if (isValid) {
                submitForm(form);
            }
        });
    });
}

// Form Submission
function submitForm(form) {
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = currentLang === 'he' ? 'שולח...' : 'Sending...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add metadata
    data.timestamp = new Date().toISOString();
    data.language = currentLang;
    data.page = window.location.pathname;
    
    // Submit via EmailJS or webhook
    submitToEmailJS(data, form, submitBtn, originalText);
    
    // Track form submission
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'contact',
            event_label: 'contact_form',
            form_id: form.id || 'contact_form'
        });
    }
}

// EmailJS Integration (you'll need to replace with your IDs)
function submitToEmailJS(data, form, submitBtn, originalText) {
    // Replace these with your actual EmailJS IDs
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';
    
    // If EmailJS is loaded
    if (typeof emailjs !== 'undefined') {
        emailjs.send(serviceID, templateID, data, publicKey)
            .then(() => {
                showSuccessMessage(form);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                showErrorMessage(form);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    } else {
        // Fallback: show success message and log data
        console.log('Form Data:', data);
        setTimeout(() => {
            showSuccessMessage(form);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }
}

// Alternative: Submit to Webhook
function submitToWebhook(data, form, submitBtn, originalText) {
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showSuccessMessage(form);
        } else {
            showErrorMessage(form);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage(form);
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Show Error Message in Form
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.display = 'block';
    }
}

// Clear All Errors
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

// Show Success Message
function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        margin-top: 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        animation: fadeInUp 0.5s ease forwards;
    `;
    successMessage.innerHTML = currentLang === 'he' ? 
        '✅ תודה! ההודעה נשלחה בהצלחה. נחזור אליכם תוך 24 שעות.' :
        '✅ Thank you! Message sent successfully. We will get back to you within 24 hours.';
    
    form.style.display = 'none';
    form.parentNode.appendChild(successMessage);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show Error Message
function showErrorMessage(form) {
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText = `
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        margin-top: 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
    `;
    errorMessage.innerHTML = currentLang === 'he' ? 
        '❌ אירעה שגיאה בשליחת ההודעה. אנא נסו שוב או צרו קשר טלפונית.' :
        '❌ An error occurred sending the message. Please try again or contact us by phone.';
    
    form.parentNode.appendChild(errorMessage);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

// Track Phone Clicks
function initPhoneTracking() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_click', {
                    event_category: 'contact',
                    event_label: 'phone_number',
                    phone_number: this.getAttribute('href').replace('tel:', '')
                });
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards for staggered animation
    document.querySelectorAll('.service-card, .case-study-card, .testimonial, .value-item').forEach((card, index) => {
        setTimeout(() => {
            observer.observe(card);
        }, index * 100);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    if (window.innerWidth <= 768) {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
            position: absolute;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1001;
        `;
        
        navContainer.appendChild(mobileMenuBtn);
        
        // Toggle menu
        let menuOpen = false;
        mobileMenuBtn.addEventListener('click', () => {
            if (!menuOpen) {
                navMenu.style.display = 'flex';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'var(--primary-blue)';
                navMenu.style.padding = '1rem';
                navMenu.style.flexDirection = 'column';
                navMenu.style.zIndex = '1000';
                mobileMenuBtn.innerHTML = '✕';
                menuOpen = true;
            } else {
                navMenu.style.display = 'none';
                mobileMenuBtn.innerHTML = '☰';
                menuOpen = false;
            }
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.style.display = 'none';
                mobileMenuBtn.innerHTML = '☰';
                menuOpen = false;
            }
        });
    }
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Cookie Consent (Optional)
function initCookieConsent() {
    if (!localStorage.getItem('secgate-cookies-accepted')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--primary-blue);
            color: white;
            padding: 1rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
        `;
        
        cookieBanner.innerHTML = `
            <p style="margin-bottom: 1rem;">
                ${currentLang === 'he' ? 
                    'אנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלכם.' : 
                    'We use cookies to improve your browsing experience.'}
            </p>
            <button onclick="acceptCookies()" style="background: white; color: var(--primary-blue); border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                ${currentLang === 'he' ? 'אני מסכים' : 'I Accept'}
            </button>
        `;
        
        document.body.appendChild(cookieBanner);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (cookieBanner.parentNode) {
                cookieBanner.remove();
            }
        }, 10000);
    }
}

function acceptCookies() {
    localStorage.setItem('secgate-cookies-accepted', 'true');
    const cookieBanner = document.querySelector('div[style*="position: fixed"]');
    if (cookieBanner) {
        cookieBanner.remove();
    }
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Track page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                event_category: 'performance',
                value: Math.round(loadTime)
            });
        }
        
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Initialize All Functions
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initializeLanguage();
    initSmoothScrolling();
    initHeaderEffects();
    updateActiveNavLink();
    initFormValidation();
    initPhoneTracking();
    
    // Enhanced functionality
    initScrollAnimations();
    initMobileMenu();
    initLazyLoading();
    initCookieConsent();
    initPerformanceMonitoring();
    
    // Add loading animation to hero
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
        }
    }, 100);
    
    console.log('SecGate website initialized successfully');
});

// Global function for language toggle (can be called from HTML)
window.toggleLanguage = toggleLanguage