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
    
    // Use async/await for better error handling
    (async function() {
        try {
            // Try loading header with a timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            const response = await fetch('header.html', { 
                signal: controller.signal,
                cache: 'no-cache'
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) throw new Error('Failed to load header: ' + response.status);
            const data = await response.text();
            headerContainer.innerHTML = data;
            
            // Small delay to ensure DOM is updated
            setTimeout(function() {
                // Re-initialize scripts that depend on header elements
                initializeHeaderScripts();
                updateCartCount();
                if (typeof updateWishlistUI === 'function') {
                    updateWishlistUI();
                }
                // Update auth UI if auth.js is loaded - try multiple times to ensure it works
                if (typeof updateAuthUI === 'function') {
                    updateAuthUI();
                    // Try again after a short delay to handle any timing issues
                    setTimeout(() => {
                        updateAuthUI();
                    }, 100);
                    setTimeout(() => {
                        updateAuthUI();
                    }, 500);
                } else {
                    // If updateAuthUI is not available yet, wait a bit and try again
                    setTimeout(() => {
                        if (typeof updateAuthUI === 'function') {
                            updateAuthUI();
                        }
                    }, 200);
                }
                // Adjust hero section spacing if promotions banner exists
                adjustHeroSpacing();
            }, 50);
        } catch (error) {
            console.error('Error loading header:', error);
            // Fallback: show basic header with minimal styling
            headerContainer.innerHTML = '<nav class="navbar" style="position: fixed; top: 0; width: 100%; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; padding: 1rem 0;"><div class="nav-container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;"><div class="logo"><a href="index.html" style="text-decoration: none; color: #6F4E37;"><h1 style="margin: 0;">BforBrew</h1></a></div><div style="display: flex; gap: 20px;"><a href="shop.html" style="text-decoration: none; color: #2C2416;">Shop</a><a href="cart.html" style="text-decoration: none; color: #2C2416;">Cart</a></div></div></nav>';
            // Make sure content is visible even if header fails
            document.body.style.display = 'block';
        }
    })();
}

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) {
        console.warn('Footer container not found');
        return;
    }
    
    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load footer: ' + response.status);
            return response.text();
        })
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback footer
            footerContainer.innerHTML = '<footer class="footer"><div class="container"><div class="footer-bottom"><p>&copy; 2025 BforBrew. All Rights Reserved.</p></div></div></footer>';
        });
}

function initializeHeaderScripts() {
    // Initialize mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        // Remove existing listeners by replacing with new handler
        const newHandler = function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        };
        
        // Clone to remove old listeners
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        
        newToggle.addEventListener('click', newHandler);

        // Handle dropdown toggle on mobile
        const dropdownToggles = navMenu.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdown = this.closest('.nav-dropdown');
                if (dropdown) {
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close mobile menu when clicking on a link (except dropdown toggles)
        const navLinks = navMenu.querySelectorAll('a:not(.dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                newToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        const outsideClickHandler = function(event) {
            if (!navMenu.contains(event.target) && !newToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                newToggle.classList.remove('active');
            }
        };
        document.addEventListener('click', outsideClickHandler);
    }

    // Initialize search if search.js is loaded
    if (typeof performSearch === 'function') {
        const searchInput = document.getElementById('searchInput');
        const searchModalInput = document.getElementById('searchModalInput');
        const searchResults = document.getElementById('searchResults');
        const searchModal = document.getElementById('searchModal');
        const closeSearch = document.getElementById('closeSearch');
        const searchIconBtn = document.getElementById('searchIconBtn');
        let searchTimeout;

        // Initialize mobile search icon button
        if (searchIconBtn) {
            searchIconBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (searchModal) {
                    searchModal.style.display = 'flex';
                    if (searchModalInput) {
                        setTimeout(() => searchModalInput.focus(), 100);
                    }
                }
            });
        }
        
        // Handle desktop search input
        if (searchInput && searchModal) {
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

            searchInput.addEventListener('focus', () => {
                const query = searchInput.value.trim().toLowerCase();
                if (query.length >= 2) {
                    performSearch(query);
                }
            });
        }

        // Handle mobile modal search input
        if (searchModalInput) {
            searchModalInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim().toLowerCase();
                if (query.length < 2) {
                    if (searchResults) searchResults.innerHTML = '';
                    return;
                }
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            });
        }

        // Handle close button
        if (closeSearch && searchModal) {
            closeSearch.addEventListener('click', () => {
                searchModal.style.display = 'none';
                if (searchInput) searchInput.value = '';
                if (searchModalInput) searchModalInput.value = '';
                if (searchResults) searchResults.innerHTML = '';
            });
        }

        // Close modal when clicking outside
        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    searchModal.style.display = 'none';
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchModal && (searchModal.style.display === 'flex' || searchModal.style.display === 'block')) {
                searchModal.style.display = 'none';
                if (searchInput) searchInput.value = '';
                if (searchModalInput) searchModalInput.value = '';
                if (searchResults) searchResults.innerHTML = '';
            }
        });
    }

    // Make openSearchModal available globally for onclick handlers
    if (typeof openSearchModal === 'undefined') {
        window.openSearchModal = function() {
            const searchModal = document.getElementById('searchModal');
            const searchModalInput = document.getElementById('searchModalInput');
            
            if (searchModal) {
                searchModal.style.display = 'flex';
                if (searchModalInput) {
                    setTimeout(() => searchModalInput.focus(), 100);
                }
            }
        };
    }
}

async function updateCartCount() {
    if (typeof getCart === 'function') {
        try {
            const cart = await getCart();
        const cartCount = document.getElementById('cartCount') || document.querySelector('.cart-count');
            if (cartCount && Array.isArray(cart)) {
                const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
            }
        } catch (error) {
            console.error('Error updating cart count:', error);
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

