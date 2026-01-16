// Cart Management Functions
// API URL - use from window (set by auth.js) or set it here
if (typeof window.API_BASE_URL === 'undefined') {
    window.API_BASE_URL = (() => {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:3000/api';
        }
        return 'https://cafe-whvh.onrender.com/api';
    })();
}
// Use window.API_BASE_URL directly instead of const to avoid redeclaration error

// Use isLoggedIn from auth.js (window.isLoggedIn)
// Don't define a local isLoggedIn to avoid conflicts

// Get cart from localStorage (for guests) or API (for logged in users)
// Make globally available for checkout.js and other scripts
window.getCart = async function getCart() {
    if (window.isLoggedIn && window.isLoggedIn()) {
        try {
            const response = await fetch(`${window.API_BASE_URL}/cart`, {
                headers: window.getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                return data.cart || [];
            } else if (response.status === 403 || response.status === 401) {
                // Token expired or invalid - clear it
                console.warn('Auth token invalid, clearing...');
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }
    // Fallback to localStorage for guests
    try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
    } catch (e) {
        return [];
    }
}

// Save cart to localStorage (for guests) or API (for logged in users)
async function saveCart(cart) {
    if (window.isLoggedIn && window.isLoggedIn()) {
        // Cart is saved automatically on API calls, just update UI
        updateCartCount();
        return;
    }
    // Save to localStorage for guests
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
// Make globally available for shop.js and modal.js
window.addToCart = async function addToCart(productId) {
    // Use window.getAllCoffeeBeans if available (defined later in this file or in shop.js)
    const getAllCoffeeBeansFunc = typeof window.getAllCoffeeBeans === 'function' ? window.getAllCoffeeBeans : 
                                   (typeof getAllCoffeeBeans === 'function' ? getAllCoffeeBeans : null);
    
    if (!getAllCoffeeBeansFunc) {
        console.error('getAllCoffeeBeans function not available');
        return false;
    }
    
    const coffeeBeans = getAllCoffeeBeansFunc();
    const product = coffeeBeans.find(b => b.id === productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        return false;
    }
    
    if (window.isLoggedIn && window.isLoggedIn()) {
        try {
            console.log('Adding to cart (logged in):', productId);
            const response = await fetch(`${window.API_BASE_URL}/cart/add`, {
                method: 'POST',
                headers: window.getAuthHeaders(),
                body: JSON.stringify({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    badge: product.badge,
                    gradient: product.gradient,
                    image: product.image
                })
            });
            
            console.log('Cart add response status:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                await updateCartCount();
                if (typeof showNotification === 'function') {
                    showNotification('Added to cart!', 'success');
                }
                return true;
            } else {
                const error = await response.json().catch(() => ({ error: 'Unknown error' }));
                console.error('Cart add error:', error);
                if (typeof showNotification === 'function') {
                    showNotification(error.error || 'Failed to add to cart', 'error');
                }
                return false;
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            if (typeof showNotification === 'function') {
                showNotification('Failed to add to cart. Please try again.', 'error');
            }
            return false;
        }
    } else {
        // Guest mode - use localStorage
        const cart = await getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            badge: product.badge,
            gradient: product.gradient,
            image: product.image
        });
    }
    
        await saveCart(cart);
    return true;
}
}

// Remove item from cart
async function removeFromCart(productId) {
    if (window.isLoggedIn && window.isLoggedIn()) {
        try {
            const response = await fetch(`${window.API_BASE_URL}/cart/remove/${productId}`, {
                method: 'DELETE',
                headers: window.getAuthHeaders()
            });
            
            if (response.ok) {
                updateCartCount();
                return;
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    } else {
        // Guest mode - use localStorage
        const cart = await getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
        await saveCart(updatedCart);
    }
}

// Update cart item quantity
async function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
        await removeFromCart(productId);
        return;
    }
    
    if (window.isLoggedIn && window.isLoggedIn()) {
        try {
            const response = await fetch(`${window.API_BASE_URL}/cart/update`, {
                method: 'PUT',
                headers: window.getAuthHeaders(),
                body: JSON.stringify({ productId, quantity })
            });
            
            if (response.ok) {
                updateCartCount();
                return;
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    } else {
        // Guest mode - use localStorage
        const cart = await getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
            await saveCart(cart);
    }
}
}

// Clear cart
// Make globally available for checkout.js
window.clearCart = async function clearCart() {
    if (window.isLoggedIn && window.isLoggedIn()) {
        try {
            const response = await fetch(`${window.API_BASE_URL}/cart/clear`, {
                method: 'DELETE',
                headers: window.getAuthHeaders()
            });
            
            if (response.ok) {
                updateCartCount();
                return;
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    } else {
        // Guest mode - use localStorage
    localStorage.removeItem('cart');
    updateCartCount();
}
}

// Sync cart from server (called after login)
async function syncCartFromServer() {
    if (window.isLoggedIn && window.isLoggedIn()) {
        try {
            const cart = await getCart();
            updateCartCount();
            return cart;
        } catch (error) {
            console.error('Error syncing cart:', error);
        }
    }
}

// Make globally available for checkout.js
window.getCartTotal = async function getCartTotal() {
    const cart = await getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

async function getCartItemCount() {
    const cart = await getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

async function updateCartCount() {
    const count = await getCartItemCount();
    const cartIcons = document.querySelectorAll('.cart-count');
    cartIcons.forEach(icon => {
        icon.textContent = count;
        icon.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

// Get all coffee beans (shared data from shop.js or fallback)
// Define as regular function first for hoisting, then make globally available
function getAllCoffeeBeans() {
    // Use coffeeBeans from shop.js if available
    if (typeof coffeeBeans !== 'undefined' && Array.isArray(coffeeBeans) && coffeeBeans.length > 0) {
        return coffeeBeans;
    }
    // Fallback: return minimal dataset for pages that don't load shop.js (like index.html)
    // This matches the products shown on the homepage
    return [
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
        }
    ];
}

// Make getAllCoffeeBeans globally available for modal.js and other scripts
window.getAllCoffeeBeans = getAllCoffeeBeans;

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', async () => {
    await updateCartCount();
});

