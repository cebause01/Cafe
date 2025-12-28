// Load header and footer components into all pages
// Ensure DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadHeader();
        loadFooter();
    });
} else {
    // DOM already loaded
    loadHeader();
    loadFooter();
}

function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) {
        console.warn('Header container not found');
        return;
    }
    
    // Dynamically determine the base path
    // Extract base path from current URL (e.g., /Cafe/ from /Cafe/shop/)
    const pathname = window.location.pathname;
    const baseMatch = pathname.match(/^(\/[^\/]+)/);
    const basePath = baseMatch ? baseMatch[1] : '';
    
    // Try multiple path strategies
    const headerPaths = [
        `${basePath}/header.html`,           // /Cafe/header.html
        '/Cafe/header.html',                 // Absolute path
        'header.html',                       // Same directory
        '../header.html'                     // Parent directory
    ];
    
    // Debug logging
    console.log('Loading header - Pathname:', pathname, 'Base path:', basePath, 'Trying paths:', headerPaths);
    
    // Try each path until one works
    (async function() {
        for (let i = 0; i < headerPaths.length; i++) {
            const headerPath = headerPaths[i];
            try {
                const response = await fetch(headerPath);
                if (response.ok) {
                    const data = await response.text();
                    headerContainer.innerHTML = data;
                    console.log('Header loaded successfully from:', headerPath);
                    
                    // Small delay to ensure DOM is updated
                    setTimeout(function() {
                        initializeHeaderScripts();
                        updateCartCount();
                        if (typeof updateWishlistUI === 'function') {
                            updateWishlistUI();
                        }
                        adjustHeroSpacing();
                    }, 50);
                    return; // Success, exit function
                }
            } catch (error) {
                console.warn(`Failed to load header from ${headerPath}:`, error);
                // Continue to next path
            }
        }
        
        // All paths failed, show fallback
        console.error('All header paths failed. Using fallback header.');
        headerContainer.innerHTML = '<nav class="navbar"><div class="nav-container"><div class="logo"><a href="/Cafe/home" style="text-decoration: none; color: inherit;"><h1>BforBrew</h1></a></div></div></nav>';
    })();
}

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) {
        console.warn('Footer container not found');
        return;
    }
    
    // Dynamically determine the base path (same logic as header)
    const pathname = window.location.pathname;
    const baseMatch = pathname.match(/^(\/[^\/]+)/);
    const basePath = baseMatch ? baseMatch[1] : '';
    
    // Try multiple path strategies
    const footerPaths = [
        `${basePath}/footer.html`,           // /Cafe/footer.html
        '/Cafe/footer.html',                 // Absolute path
        'footer.html',                       // Same directory
        '../footer.html'                     // Parent directory
    ];
    
    console.log('Loading footer - Pathname:', pathname, 'Base path:', basePath, 'Trying paths:', footerPaths);
    
    // Try each path until one works
    (async function() {
        for (let i = 0; i < footerPaths.length; i++) {
            const footerPath = footerPaths[i];
            try {
                const response = await fetch(footerPath);
                if (response.ok) {
                    const data = await response.text();
                    footerContainer.innerHTML = data;
                    console.log('Footer loaded successfully from:', footerPath);
                    return; // Success, exit function
                }
            } catch (error) {
                console.warn(`Failed to load footer from ${footerPath}:`, error);
                // Continue to next path
            }
        }
        
        // All paths failed, show fallback
        console.error('All footer paths failed. Using fallback footer.');
        footerContainer.innerHTML = '<footer class="footer"><div class="container"><div class="footer-bottom"><p>&copy; 2025 BforBrew. All Rights Reserved.</p></div></div></footer>';
    })();
}

function initializeHeaderScripts() {
    // Initialize mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            document.body.appendChild(overlay);
        }

        // Remove existing listeners by cloning
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        
        // Toggle menu function
        const toggleMenu = function(e) {
            if (e) e.stopPropagation();
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            newToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = isActive ? '' : 'hidden';
        };

        // Close menu function
        const closeMenu = function() {
            navMenu.classList.remove('active');
            newToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        newToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);

        // Handle dropdown toggle on mobile first
        const dropdownToggles = navMenu.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = this.closest('.nav-dropdown');
                if (dropdown) {
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close mobile menu when clicking on a link (except dropdown toggle)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            // Skip dropdown toggle links as they're handled above
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', function(e) {
                    // Don't close menu if clicking inside dropdown menu items
                    if (!link.closest('.dropdown-menu')) {
                        closeMenu();
                    } else {
                        // Close menu when clicking dropdown menu items
                        closeMenu();
                    }
                });
            }
        });

        // Close mobile menu when clicking outside
        const outsideClickHandler = function(event) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(event.target) && 
                !newToggle.contains(event.target) &&
                !overlay.contains(event.target)) {
                closeMenu();
            }
        };
        document.addEventListener('click', outsideClickHandler);

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Initialize search if search.js is loaded
    if (typeof performSearch === 'function') {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const searchModal = document.getElementById('searchModal');
        const closeSearch = document.getElementById('closeSearch');
        
        if (searchInput && searchModal) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim().toLowerCase();
                if (query.length < 2) {
                    if (searchResults) searchResults.innerHTML = '';
                    if (searchModal) searchModal.style.display = 'none';
                    return;
                }
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            });
        }

        if (closeSearch && searchModal) {
            closeSearch.addEventListener('click', () => {
                searchModal.style.display = 'none';
                if (searchInput) searchInput.value = '';
            });
        }

        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    searchModal.style.display = 'none';
                }
            });
        }
    }
}

function updateCartCount() {
    if (typeof getCart === 'function') {
        const cart = getCart();
        const cartCount = document.getElementById('cartCount') || document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }
}

// Adjust hero section spacing based on promotions banner
function adjustHeroSpacing() {
    const banner = document.getElementById('promotionsBanner');
    const hero = document.querySelector('.hero');
    if (banner && hero) {
        if (banner.style.display !== 'none') {
            hero.style.paddingTop = '130px';
            hero.style.marginTop = '0';
        } else {
            hero.style.paddingTop = '0';
            hero.style.marginTop = '70px';
        }
    }
}

// Update cart count when cart changes
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartCount();
    }
});

