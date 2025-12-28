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
            const response = await fetch('header.html');
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
                // Adjust hero section spacing if promotions banner exists
                adjustHeroSpacing();
            }, 50);
        } catch (error) {
            console.error('Error loading header:', error);
            // Fallback: show basic header
            headerContainer.innerHTML = '<nav class="navbar"><div class="nav-container"><div class="logo"><a href="index.html" style="text-decoration: none; color: inherit;"><h1>BforBrew</h1></a></div></div></nav>';
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
        };
        
        // Clone to remove old listeners
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        
        newToggle.addEventListener('click', newHandler);

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        const outsideClickHandler = function(event) {
            if (!navMenu.contains(event.target) && !newToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        };
        document.addEventListener('click', outsideClickHandler);
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

