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
    
    // Detect if we're in a subdirectory and adjust path accordingly
    // Check if pathname has more segments than just /Cafe/ or /Cafe
    const pathSegments = window.location.pathname.split('/').filter(seg => seg.length > 0);
    // If we have more than 1 segment (e.g., ['Cafe', 'shop']), we're in a subdirectory
    // Also check if pathname ends with a page name (not just /Cafe/)
    const isSubdirectory = pathSegments.length > 1 && pathSegments[pathSegments.length - 1] !== '';
    const headerPath = isSubdirectory ? '../header.html' : 'header.html';
    
    // Debug logging (remove in production if desired)
    console.log('Loading header - Path:', window.location.pathname, 'Segments:', pathSegments, 'Is subdirectory:', isSubdirectory, 'Using path:', headerPath);
    
    // Use async/await for better error handling
    (async function() {
        try {
            const response = await fetch(headerPath);
            if (!response.ok) throw new Error('Failed to load header: ' + response.status);
            const data = await response.text();
            // Header.html uses absolute paths, so no updates needed
            const updatedData = data;
            headerContainer.innerHTML = updatedData;
            
            // Small delay to ensure DOM is updated
            setTimeout(function() {
                // Re-initialize scripts that depend on header elements
                initializeHeaderScripts();
                updateCartCount();
                if (typeof updateWishlistUI === 'function') {
                    updateWishlistUI();
                }
                // Adjust hero section spacing if promotions banner exists
                adjustHeroSpacing();
            }, 50);
        } catch (error) {
            console.error('Error loading header:', error);
            console.error('Tried to load from:', headerPath);
            // Try alternative path if first attempt failed
            const altPath = isSubdirectory ? 'header.html' : '../header.html';
            try {
                const altResponse = await fetch(altPath);
                if (altResponse.ok) {
                    const altData = await altResponse.text();
                    headerContainer.innerHTML = altData;
                    setTimeout(function() {
                        initializeHeaderScripts();
                        updateCartCount();
                        if (typeof updateWishlistUI === 'function') {
                            updateWishlistUI();
                        }
                        adjustHeroSpacing();
                    }, 50);
                    return;
                }
            } catch (altError) {
                console.error('Alternative path also failed:', altError);
            }
            // Final fallback: show basic header
            headerContainer.innerHTML = '<nav class="navbar"><div class="nav-container"><div class="logo"><a href="/Cafe/home" style="text-decoration: none; color: inherit;"><h1>BforBrew</h1></a></div></div></nav>';
        }
    })();
}

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) {
        console.warn('Footer container not found');
        return;
    }
    
    // Detect if we're in a subdirectory and adjust path accordingly
    const pathSegments = window.location.pathname.split('/').filter(seg => seg.length > 0);
    const isSubdirectory = pathSegments.length > 1 && pathSegments[pathSegments.length - 1] !== '';
    const footerPath = isSubdirectory ? '../footer.html' : 'footer.html';
    
    console.log('Loading footer - Path:', window.location.pathname, 'Using path:', footerPath);
    
    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load footer: ' + response.status);
            return response.text();
        })
        .then(data => {
            // Footer.html now uses absolute paths, so no updates needed
            const updatedData = data;
            footerContainer.innerHTML = updatedData;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            console.error('Tried to load from:', footerPath);
            // Try alternative path
            const altPath = isSubdirectory ? 'footer.html' : '../footer.html';
            fetch(altPath)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error('Alternative path failed');
                })
                .then(data => {
                    // Footer.html uses absolute paths, so no updates needed
                    footerContainer.innerHTML = data;
                })
                .catch(altError => {
                    console.error('Alternative footer path also failed:', altError);
                    // Final fallback footer
                    footerContainer.innerHTML = '<footer class="footer"><div class="container"><div class="footer-bottom"><p>&copy; 2025 BforBrew. All Rights Reserved.</p></div></div></footer>';
                });
        });
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

