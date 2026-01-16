// Coffee Beans Data - Shared across all pages
const coffeeBeans = [
    {
        id: 1,
        name: "Humble Mornings Blend",
        description: "A smooth, balanced medium roast with notes of chocolate and caramel. Perfect for your morning routine.",
        price: 65.00,
        details: ["12 oz bag", "17-21 servings", "Medium Roast"],
        badge: "Best Seller",
        gradient: "linear-gradient(135deg, #6F4E37 0%, #8B6F47 100%)",
        image: "images/humble blend.jpeg"
    },
    {
        id: 2,
        name: "BforBrew Signature Dark Roast",
        description: "Bold and intense with smoky notes. For those who prefer a stronger cup.",
        price: 65.00,
        details: ["12 oz bag", "17-21 servings", "Dark Roast"],
        badge: "New",
        gradient: "linear-gradient(135deg, #3E2723 0%, #5D4037 100%)",
        image: "images/bforbrew signature.jpeg"
    },
    {
        id: 3,
        name: "Melaka Light Roast",
        description: "Bright and fruity with floral notes. Light body, complex flavor profile.",
        price: 65.00,
        details: ["12 oz bag", "17-21 servings", "Light Roast"],
        badge: "Light",
        gradient: "linear-gradient(135deg, #8D6E63 0%, #A1887F 100%)",
        image: "images/melaka light roast.jpeg"
    },
    {
        id: 4,
        name: "Single Origin: Ethiopian",
        description: "Premium single-origin beans with bright acidity and berry notes. Limited availability.",
        price: 85.00,
        details: ["12 oz bag", "17-21 servings", "Medium-Light"],
        badge: "Premium",
        gradient: "linear-gradient(135deg, #6F4E37 0%, #A1887F 100%)",
        image: "images/Single Origin Ethiopian.jpeg"
    },
    {
        id: 5,
        name: "Colombian Supremo",
        description: "Rich and well-balanced with hints of nuts and caramel. A classic favorite.",
        price: 75.00,
        details: ["12 oz bag", "17-21 servings", "Medium Roast"],
        badge: null,
        gradient: "linear-gradient(135deg, #5D4037 0%, #8B6F47 100%)",
        image: "images/Colombian Supremo.jpeg"
    },
    {
        id: 6,
        name: "Sumatra Dark",
        description: "Full-bodied with earthy, spicy notes. Smooth finish with low acidity.",
        price: 70.00,
        details: ["12 oz bag", "17-21 servings", "Dark Roast"],
        badge: null,
        gradient: "linear-gradient(135deg, #3E2723 0%, #4E342E 100%)",
        image: "images/Sumatra Dark.jpeg"
    },
    {
        id: 7,
        name: "Guatemala Antigua",
        description: "Complex flavor with notes of cocoa, spice, and floral undertones.",
        price: 80.00,
        details: ["12 oz bag", "17-21 servings", "Medium Roast"],
        badge: null,
        gradient: "linear-gradient(135deg, #6F4E37 0%, #8D6E63 100%)",
        image: "images/Guatemala Antigua.jpeg"
    },
    {
        id: 8,
        name: "Costa Rica Tarrazu",
        description: "Bright and clean with citrus notes and a smooth, sweet finish.",
        price: 75.00,
        details: ["12 oz bag", "17-21 servings", "Light-Medium"],
        badge: null,
        gradient: "linear-gradient(135deg, #8D6E63 0%, #A1887F 100%)",
        image: "images/Costa Rica Tarrazu.jpeg"
    },
    {
        id: 9,
        name: "Italian Espresso Blend",
        description: "Traditional dark roast blend perfect for espresso. Rich and bold.",
        price: 70.00,
        details: ["12 oz bag", "17-21 servings", "Dark Roast"],
        badge: null,
        gradient: "linear-gradient(135deg, #3E2723 0%, #5D4037 100%)",
        image: "images/Italian Espresso Blend.jpeg"
    },
    {
        id: 10,
        name: "Hawaiian Kona",
        description: "Smooth and mellow with a delicate, sweet flavor. Rare and exquisite.",
        price: 150.00,
        details: ["12 oz bag", "17-21 servings", "Medium Roast"],
        badge: "Premium",
        gradient: "linear-gradient(135deg, #6F4E37 0%, #8B6F47 100%)",
        image: "images/hawaiian kona.jpeg"
    },
    {
        id: 11,
        name: "Peruvian Organic",
        description: "Certified organic coffee with a clean, sweet profile and nutty finish.",
        price: 75.00,
        details: ["12 oz bag", "17-21 servings", "Medium Roast"],
        badge: "Organic",
        gradient: "linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)",
        image: "images/peruvian organic.jpeg"
    },
    {
        id: 12,
        name: "French Roast",
        description: "Very dark roast with intense, smoky flavor. Low acidity, bold character.",
        price: 65.00,
        details: ["12 oz bag", "17-21 servings", "Dark Roast"],
        badge: null,
        gradient: "linear-gradient(135deg, #212121 0%, #3E2723 100%)",
        image: "images/french roast.jpg"
    }
];

// Pagination settings
const itemsPerPage = 6;
let currentPage = 1;
let filteredBeans = [...coffeeBeans];
let activeFilters = {
    roastType: null,
    priceRange: null
};

// Initialize shop page - only run on shop.html
document.addEventListener('DOMContentLoaded', () => {
    // Only run on shop page
    const beansGrid = document.getElementById('beansGrid');
    if (!beansGrid) {
        // Not on shop page, skip initialization
        return;
    }
    
    // Wait a bit for header to load (if loaded dynamically)
    setTimeout(() => {
        renderBeans();
        renderPagination();
        setupFilters();
        
        // Load wishlist.js and update wishlist buttons
        if (typeof updateWishlistUI === 'function') {
            updateWishlistUI();
        }
        
        // Check for product ID in URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product');
        if (productId) {
            setTimeout(() => {
                openBeanModal(parseInt(productId));
            }, 500);
        }
    }, 100);
});

// Setup filter functionality
function setupFilters() {
    // Roast type filter chips
    document.querySelectorAll('.filter-chip[data-filter="roast"]').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip[data-filter="roast"]').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeFilters.roastType = chip.textContent === 'All' ? null : chip.textContent;
            applyFilters();
        });
    });

    // Price range filter
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            activeFilters.priceRange = e.target.value === 'all' ? null : e.target.value;
            applyFilters();
        });
    }

    // Clear filters button
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            activeFilters.roastType = null;
            activeFilters.priceRange = null;
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.filter-chip[data-filter="roast"]')[0]?.classList.add('active');
            if (priceFilter) priceFilter.value = 'all';
            applyFilters();
        });
    }
}

// Apply filters
function applyFilters() {
    filteredBeans = coffeeBeans.filter(bean => {
        // Roast type filter
        if (activeFilters.roastType) {
            const roastMatch = bean.details.some(detail => 
                detail.toLowerCase().includes(activeFilters.roastType.toLowerCase())
            );
            if (!roastMatch) return false;
        }

        // Price range filter
        if (activeFilters.priceRange) {
            const [min, max] = activeFilters.priceRange.split('-').map(Number);
            if (max) {
                if (bean.price < min || bean.price > max) return false;
            } else {
                if (bean.price < min) return false;
            }
        }

        return true;
    });

    currentPage = 1;
    renderBeans();
    renderPagination();
}

// Render coffee beans for current page
function renderBeans() {
    const beansGrid = document.getElementById('beansGrid');
    
    // Check if element exists
    if (!beansGrid) {
        // Not on shop page, skip
        return;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const beansToShow = filteredBeans.slice(startIndex, endIndex);

    beansGrid.innerHTML = beansToShow.map(bean => `
        <div class="bean-card" onclick="openBeanModal(${bean.id})" style="cursor: pointer;">
            <div class="bean-image" style="background: ${bean.image ? 'none' : bean.gradient};">
                ${bean.image ? `<img src="${bean.image}" alt="${bean.name}" class="bean-product-image">` : ''}
            </div>
            <div class="bean-info">
                ${bean.badge ? `<span class="bean-badge">${bean.badge}</span>` : ''}
                <h3>${bean.name}</h3>
                <p class="bean-description">${bean.description}</p>
                <div class="bean-details">
                    ${bean.details.map(detail => `<span class="detail-item">${detail}</span>`).join('')}
                </div>
                <div class="bean-price">
                    <span class="price">RM ${bean.price.toFixed(2)}</span>
                    <button class="btn btn-add-to-cart" data-id="${bean.id}" onclick="event.stopPropagation();">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');

    // Re-attach event listeners for add to cart buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-id'));
            const originalText = this.textContent;
            
            // Disable button while processing
            this.disabled = true;
            this.textContent = 'Adding...';
            
            try {
                // Use window.addToCart if available (from cart.js)
                const addToCartFunc = window.addToCart || addToCart;
                const success = await addToCartFunc(productId);
                
                if (success) {
                    this.textContent = 'Added!';
                    this.style.background = '#4CAF50';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                        this.disabled = false;
                    }, 2000);
                } else {
                    this.textContent = originalText;
                    this.disabled = false;
                }
            } catch (error) {
                console.error('Error in add to cart button:', error);
                this.textContent = originalText;
                this.disabled = false;
            }
        });
    });

    // Smooth scroll to top of grid
    beansGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(filteredBeans.length / itemsPerPage);
    const paginationNumbers = document.getElementById('paginationNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Check if elements exist
    if (!paginationNumbers || !prevBtn || !nextBtn) {
        // Not on shop page, skip
        return;
    }

    // Update prev/next buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Render page numbers
    paginationNumbers.innerHTML = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        const firstPageBtn = document.createElement('button');
        firstPageBtn.className = 'page-number';
        firstPageBtn.textContent = '1';
        firstPageBtn.addEventListener('click', () => goToPage(1));
        paginationNumbers.appendChild(firstPageBtn);

        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationNumbers.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-number';
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToPage(i));
        paginationNumbers.appendChild(pageBtn);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationNumbers.appendChild(ellipsis);
        }

        const lastPageBtn = document.createElement('button');
        lastPageBtn.className = 'page-number';
        lastPageBtn.textContent = totalPages;
        lastPageBtn.addEventListener('click', () => goToPage(totalPages));
        paginationNumbers.appendChild(lastPageBtn);
    }

    // Add event listeners to prev/next buttons
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };
}

// Navigate to specific page
function goToPage(page) {
    currentPage = page;
    renderBeans();
    renderPagination();
}

