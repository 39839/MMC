// Montgomery Medical Clinic - Simplified Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('MMC Website Loaded');
    
    // Initialize AOS (Animate on Scroll) - Delayed slightly to prevent flicker with dropdown
    if (typeof AOS !== 'undefined') {
        // Small delay ensures header and dropdown are rendered before AOS animations trigger
        setTimeout(() => {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
                easing: 'ease-in-out'
            });
        }, 150); // 150ms delay to let DOM stabilize
    }

    // SERVICES DROPDOWN - Mobile Click Only (CSS handles hover)
    const servicesButton = document.getElementById('services-button');
    const servicesDropdown = document.getElementById('services-dropdown');
    
    if (servicesButton && servicesDropdown) {
        console.log('✅ Dropdown elements found');
        
        // Only handle clicks for mobile/touch devices
        let isOpen = false;
        
        servicesButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle for mobile
            if (window.innerWidth <= 1024) {
                isOpen = !isOpen;
                if (isOpen) {
                    servicesDropdown.style.display = 'block';
                    // Force reflow for transition
                    servicesDropdown.offsetHeight;
                    servicesDropdown.style.opacity = '1';
                    servicesDropdown.style.visibility = 'visible';
                    servicesDropdown.style.pointerEvents = 'auto';
                    servicesDropdown.style.transform = 'translateX(-50%) translateY(0)';
                } else {
                    servicesDropdown.style.opacity = '0';
                    servicesDropdown.style.visibility = 'hidden';
                    servicesDropdown.style.pointerEvents = 'none';
                    servicesDropdown.style.transform = 'translateX(-50%) translateY(-10px)';
                    // After transition, reset display to match CSS (hide completely)
                    setTimeout(() => {
                        servicesDropdown.style.display = '';
                    }, 300); // Match transition duration
                }
                console.log('Mobile dropdown toggled:', isOpen);
            }
        });
        
        // Close on outside click (mobile)
        document.addEventListener('click', function(e) {
            if (isOpen && !servicesButton.contains(e.target) && !servicesDropdown.contains(e.target)) {
                isOpen = false;
                servicesDropdown.style.opacity = '0';
                servicesDropdown.style.visibility = 'hidden';
                servicesDropdown.style.pointerEvents = 'none';
                servicesDropdown.style.transform = 'translateX(-50%) translateY(-10px)';
                setTimeout(() => {
                    servicesDropdown.style.display = '';
                }, 300);
                console.log('Dropdown closed (outside click)');
            }
        });
    } else {
        console.error('❌ Dropdown elements not found');
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
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
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Slideshow functionality (if exists)
    if (typeof showSlides === 'function') {
        showSlides();
    }
});

// Expose test function for debugging
window.testDropdown = function() {
    const dropdown = document.getElementById('services-dropdown');
    if (dropdown) {
        console.log('Testing dropdown visibility...');
        dropdown.style.cssText = `
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            transform: translateX(-50%) translateY(0) !important;
        `;
        console.log('Dropdown should now be visible');
        
        // Check links
        const links = dropdown.querySelectorAll('.dropdown-link');
        console.log(`Found ${links.length} dropdown links:`);
        links.forEach(link => console.log('- ' + link.textContent.trim()));
    } else {
        console.error('Dropdown element not found!');
    }
};