// ================================
// MOBILE MENU
// ================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for empty hash
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// ================================
// HEADER SCROLL EFFECT
// ================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(10, 37, 64, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
const animateOnScroll = document.querySelectorAll('.value-prop, .contact-info, .contact-form-container');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// ================================
// CONTACT FORM HANDLING
// ================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // In a real implementation, you would send this data to a server
        // For now, we'll show a success message and log the data
        console.log('Form submitted:', formData);

        // Create mailto link as fallback
        const mailtoLink = `mailto:unitednotaryservicesva@gmail.com?subject=Notary Service Request - ${formData.service}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0AService: ${formData.service}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;

        // Show success message
        showNotification('Thank you! Opening your email client to send your request...', 'success');

        // Small delay before opening mailto
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1000);

        // Reset form
        contactForm.reset();
    });
}

// ================================
// NOTIFICATION SYSTEM
// ================================
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#0A2540' : '#C9A961'};
        color: white;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        border-left: 4px solid ${type === 'success' ? '#C9A961' : '#0A2540'};
        box-shadow: 0 8px 24px rgba(10, 37, 64, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.4s ease-out;
    `;

    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 5 seconds with animation
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 5000);
}

// ================================
// MOBILE MENU STYLES (Dynamic)
// ================================
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 968px) {
        .nav.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(250, 249, 246, 0.98);
            backdrop-filter: blur(12px);
            padding: var(--spacing-md);
            border-bottom: 1px solid var(--color-gray-light);
            box-shadow: 0 8px 24px rgba(10, 37, 64, 0.1);
            gap: var(--spacing-sm);
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .nav.mobile-active a {
            padding: 0.75rem;
            border-bottom: 1px solid var(--color-gray-light);
        }

        .nav.mobile-active a:last-child {
            border-bottom: none;
        }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(mobileMenuStyles);

// ================================
// PHONE NUMBER FORMATTING
// ================================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }

        e.target.value = value;
    });
}

// ================================
// LOADING PERFORMANCE
// ================================
// Add loading class to body
document.body.classList.add('loaded');

// Preload critical images/fonts on page load
window.addEventListener('load', () => {
    // Any additional load actions can go here
    console.log('United Notary Services VA - Website Loaded');
});

// ================================
// SERVICE CARD STAGGER ANIMATION
// ================================
// Add scroll-triggered animation for service cards
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            serviceObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

serviceCards.forEach(card => {
    serviceObserver.observe(card);
});

// ================================
// EASTER EGG: Seal Rotation on Click
// ================================
const sealIcons = document.querySelectorAll('.seal-icon');
sealIcons.forEach(seal => {
    let rotations = 0;
    seal.addEventListener('click', () => {
        rotations += 360;
        seal.style.transform = `rotate(${rotations}deg)`;
        seal.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});