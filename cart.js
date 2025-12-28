// Cart Management Functions
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const cart = getCart();
    const coffeeBeans = getAllCoffeeBeans();
    const product = coffeeBeans.find(b => b.id === productId);
    
    if (!product) return;
    
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
    
    saveCart(cart);
    return true;
}

function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
}

function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartCount() {
    const count = getCartItemCount();
    const cartIcons = document.querySelectorAll('.cart-count');
    cartIcons.forEach(icon => {
        icon.textContent = count;
        icon.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

// Get all coffee beans (shared data from shop.js or fallback)
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
            image: null
        },
        {
            id: 2,
            name: "BforBrew Signature Dark Roast",
            description: "Bold and intense with smoky notes. For those who prefer a stronger cup.",
            price: 65.00,
            details: ["12 oz bag", "17-21 servings", "Dark Roast"],
            badge: "New",
            gradient: "linear-gradient(135deg, #3E2723 0%, #5D4037 100%)",
            image: null
        },
        {
            id: 3,
            name: "Melaka Light Roast",
            description: "Bright and fruity with floral notes. Light body, complex flavor profile.",
            price: 65.00,
            details: ["12 oz bag", "17-21 servings", "Light Roast"],
            badge: "Light",
            gradient: "linear-gradient(135deg, #8D6E63 0%, #A1887F 100%)",
            image: null
        }
    ];
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

