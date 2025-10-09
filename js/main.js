// Montgomery Medical Clinic - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // SERVICES DROPDOWN - COMPLETELY REWRITTEN FOR RELIABILITY
    function initDropdown() {
        const servicesWrapper = document.querySelector('.services-dropdown-wrapper');
        const servicesButton = document.getElementById('services-button');
        const servicesDropdown = document.getElementById('services-dropdown');
        
        if (!servicesWrapper || !servicesButton || !servicesDropdown) {
            console.error('Dropdown elements not found!');
            return;
        }
        
        console.log('Initializing dropdown...');
        
        // Remove any existing event listeners by cloning
        const newWrapper = servicesWrapper.cloneNode(true);
        servicesWrapper.parentNode.replaceChild(newWrapper, servicesWrapper);
        
        // Get fresh references
        const wrapper = document.querySelector('.services-dropdown-wrapper');
        const button = document.getElementById('services-button');
        const dropdown = document.getElementById('services-dropdown');
        
        // Ensure dropdown starts hidden
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            border: 2px solid #0d47a1;
            z-index: 99999;
            margin-top: 0.5rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            display: none;
        `;
        
        let isOpen = false;
        let closeTimer = null;
        
        function openDropdown() {
            console.log('Opening dropdown...');
            clearTimeout(closeTimer);
            dropdown.style.display = 'block';
            // Force reflow
            dropdown.offsetHeight;
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateX(-50%) translateY(0)';
            isOpen = true;
        }
        
        function closeDropdown() {
            console.log('Closing dropdown...');
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
            closeTimer = setTimeout(() => {
                dropdown.style.display = 'none';
            }, 300);
            isOpen = false;
        }
        
        // MOUSE EVENTS
        wrapper.addEventListener('mouseenter', function() {
            console.log('Mouse enter wrapper');
            openDropdown();
        });
        
        wrapper.addEventListener('mouseleave', function(e) {
            console.log('Mouse leave wrapper');
            // Check if we're moving to the dropdown
            const toElement = e.relatedTarget;
            if (!dropdown.contains(toElement)) {
                closeDropdown();
            }
        });
        
        dropdown.addEventListener('mouseenter', function() {
            console.log('Mouse enter dropdown');
            clearTimeout(closeTimer);
        });
        
        dropdown.addEventListener('mouseleave', function(e) {
            console.log('Mouse leave dropdown');
            const toElement = e.relatedTarget;
            if (!wrapper.contains(toElement)) {
                closeDropdown();
            }
        });
        
        // CLICK EVENT for mobile
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Button clicked, isOpen:', isOpen);
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!wrapper.contains(e.target) && !dropdown.contains(e.target)) {
                if (isOpen) {
                    closeDropdown();
                }
            }
        });
        
        // Close on ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                closeDropdown();
            }
        });
        
        console.log('Dropdown initialized successfully!');
    }
    
    // Initialize dropdown
    initDropdown();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between hamburger and X
            const icon = mobileMenuButton.querySelector('svg path');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            } else {
                icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('svg path');
                icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            });
        });
    }

    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
});

// Add test function to window for debugging
window.testDropdown = function() {
    const dropdown = document.getElementById('services-dropdown');
    if (dropdown) {
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            border: 2px solid #0d47a1;
            z-index: 99999;
            margin-top: 0.5rem;
            opacity: 1;
            visibility: visible;
            display: block;
        `;
        console.log('Dropdown forced open for testing');
    } else {
        console.log('Dropdown not found');
    }
};