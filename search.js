// Search functionality for products and menu items
const searchData = {
    products: [
        { id: 1, name: "Humble Mornings Blend", type: "product", category: "Medium Roast", price: 65.00 },
        { id: 2, name: "BforBrew Signature Dark Roast", type: "product", category: "Dark Roast", price: 65.00 },
        { id: 3, name: "Melaka Light Roast", type: "product", category: "Light Roast", price: 65.00 },
        { id: 4, name: "Single Origin: Ethiopian", type: "product", category: "Medium-Light", price: 85.00 },
        { id: 5, name: "Colombian Supremo", type: "product", category: "Medium Roast", price: 75.00 },
        { id: 6, name: "Sumatra Dark", type: "product", category: "Dark Roast", price: 70.00 },
        { id: 7, name: "Guatemala Antigua", type: "product", category: "Medium Roast", price: 80.00 },
        { id: 8, name: "Costa Rica Tarrazu", type: "product", category: "Light-Medium", price: 75.00 },
        { id: 9, name: "Italian Espresso Blend", type: "product", category: "Dark Roast", price: 70.00 },
        { id: 10, name: "Hawaiian Kona", type: "product", category: "Medium Roast", price: 150.00 },
        { id: 11, name: "Peruvian Organic", type: "product", category: "Medium Roast", price: 75.00 },
        { id: 12, name: "French Roast", type: "product", category: "Dark Roast", price: 65.00 }
    ],
    menu: [
        { name: "BforBrew Favorite Latte", type: "menu", category: "Drinks", price: 18.00 },
        { name: "Cold Brew", type: "menu", category: "Drinks", price: 16.00 },
        { name: "Cappuccino", type: "menu", category: "Drinks", price: 17.00 },
        { name: "Americano", type: "menu", category: "Drinks", price: 12.00 },
        { name: "Mocha", type: "menu", category: "Drinks", price: 19.00 },
        { name: "Espresso", type: "menu", category: "Drinks", price: 10.00 },
        { name: "Macchiato", type: "menu", category: "Drinks", price: 15.00 },
        { name: "Flat White", type: "menu", category: "Drinks", price: 17.00 },
        { name: "Iced Coffee", type: "menu", category: "Drinks", price: 14.00 },
        { name: "Fresh Pastries", type: "menu", category: "Food", price: 12.00 },
        { name: "Breakfast Sandwiches", type: "menu", category: "Food", price: 22.00 },
        { name: "Avocado Toast", type: "menu", category: "Food", price: 25.00 },
        { name: "Quiche", type: "menu", category: "Food", price: 20.00 },
        { name: "Bagel & Cream Cheese", type: "menu", category: "Food", price: 14.00 },
        { name: "Granola Bowl", type: "menu", category: "Food", price: 23.00 },
        { name: "Turkey & Avocado Wrap", type: "menu", category: "Food", price: 28.00 },
        { name: "Veggie Panini", type: "menu", category: "Food", price: 26.00 },
        { name: "Chocolate Croissant", type: "menu", category: "Food", price: 15.00 }
    ]
};

// Function to open search modal (for mobile icon button)
function openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    const searchModalInput = document.getElementById('searchModalInput');
    
    if (searchModal) {
        searchModal.style.display = 'flex';
        if (searchModalInput) {
            setTimeout(() => searchModalInput.focus(), 100);
        }
    }
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchModalInput = document.getElementById('searchModalInput');
    const searchResults = document.getElementById('searchResults');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.getElementById('closeSearch');
    let searchTimeout;

    // Handle search input in header (desktop)
    if (searchInput) {
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

    // Handle search input in modal (mobile)
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

    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            if (searchModal) searchModal.style.display = 'none';
            if (searchInput) searchInput.value = '';
            if (searchModalInput) searchModalInput.value = '';
            if (searchResults) searchResults.innerHTML = '';
        });
    }

    // Close search modal when clicking outside
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
});

function performSearch(query) {
    const allItems = [...searchData.products, ...searchData.menu];
    const results = allItems.filter(item => 
        item.name.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query))
    );

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    const searchModal = document.getElementById('searchModal');

    if (!searchResults || !searchModal) return;

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found. Try a different search term.</div>';
        searchModal.style.display = 'flex';
        return;
    }

    const products = results.filter(r => r.type === 'product');
    const menu = results.filter(r => r.type === 'menu');

    let html = '';

    if (products.length > 0) {
        html += '<div class="search-category"><h3>Coffee Beans</h3>';
        html += products.map(item => `
            <div class="search-result-item" onclick="goToProduct(${item.id})">
                <div class="search-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.category} • RM ${item.price.toFixed(2)}</p>
                </div>
                <span class="search-item-link">View →</span>
            </div>
        `).join('');
        html += '</div>';
    }

    if (menu.length > 0) {
        html += '<div class="search-category"><h3>Menu Items</h3>';
        html += menu.map(item => `
            <div class="search-result-item" onclick="goToMenu('${item.name}')">
                <div class="search-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.category} • RM ${item.price.toFixed(2)}</p>
                </div>
                <span class="search-item-link">View →</span>
            </div>
        `).join('');
        html += '</div>';
    }

    searchResults.innerHTML = html;
    searchModal.style.display = 'flex';
}

function goToProduct(productId) {
    window.location.href = `shop.html?product=${productId}`;
}

function goToMenu(itemName) {
    window.location.href = `menu.html?item=${encodeURIComponent(itemName)}`;
}

