// Close promotions banner and adjust spacing
function closePromotionsBanner() {
    const banner = document.getElementById('promotionsBanner');
    const hero = document.querySelector('.hero');
    if (banner) {
        banner.style.display = 'none';
        // Adjust hero spacing when banner is closed
        if (hero) {
            hero.style.paddingTop = '0';
            hero.style.marginTop = '70px';
        }
    }
}

// Mobile Menu Toggle (will be initialized by components.js if header is loaded dynamically)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Menu Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const menuGrids = document.querySelectorAll('.menu-grid');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and grids
        tabButtons.forEach(btn => btn.classList.remove('active'));
        menuGrids.forEach(grid => grid.classList.remove('active'));
        
        // Add active class to clicked button and corresponding grid
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Add to Cart Button Animation (for index.html preview items)
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = this.getAttribute('data-id');
        
        if (productId && addToCart(parseInt(productId))) {
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.bean-card, .menu-item, .feature, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

