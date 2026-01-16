// Cart Page Functionality
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for cart.js to load
    if (typeof getCart === 'undefined') {
        // Wait a bit and try again
        setTimeout(async () => {
            if (typeof getCart !== 'undefined') {
                await renderCart();
                updateSignInPrompt();
            } else {
                console.error('cart.js not loaded. Make sure cart.js is loaded before cart-page.js');
            }
        }, 100);
    } else {
        await renderCart();
        updateSignInPrompt();
    }
});

// Update sign-in prompt visibility
function updateSignInPrompt() {
    const prompt = document.getElementById('cartSignInPrompt');
    if (!prompt) return;
    
    // Check if user is logged in
    const loggedIn = typeof isLoggedIn === 'function' && isLoggedIn();
    
    // Show prompt only if not logged in and cart has items
    if (!loggedIn) {
        // Wait a bit for cart to load, then check
        setTimeout(async () => {
            if (typeof getCart === 'undefined') {
                console.warn('getCart not available yet');
                return;
            }
            const cart = await getCart();
            if (cart && cart.length > 0) {
                // Check if user dismissed the prompt
                const dismissed = localStorage.getItem('cartPromptDismissed') === 'true';
                if (!dismissed) {
                    prompt.style.display = 'block';
                }
            } else {
                prompt.style.display = 'none';
            }
        }, 500);
    } else {
        prompt.style.display = 'none';
    }
}

// Close sign-in prompt
function closeSignInPrompt() {
    const prompt = document.getElementById('cartSignInPrompt');
    if (prompt) {
        prompt.style.display = 'none';
        localStorage.setItem('cartPromptDismissed', 'true');
    }
}

// Reset prompt dismissal when user logs in
if (typeof updateAuthUI === 'function') {
    const originalUpdateAuthUI = updateAuthUI;
    window.updateAuthUI = function() {
        originalUpdateAuthUI();
        if (isLoggedIn()) {
            localStorage.removeItem('cartPromptDismissed');
            updateSignInPrompt();
        }
    };
}

async function renderCart() {
    // Check if getCart is available
    if (typeof getCart === 'undefined') {
        console.error('getCart function not available. Make sure cart.js is loaded.');
        return;
    }
    
    const cart = await getCart();
    const cartContainer = document.getElementById('cartContainer');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cart || cart.length === 0) {
        if (cartContainer) cartContainer.innerHTML = '';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    
    const cartItemsHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background: ${item.image ? 'none' : item.gradient};">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" class="bean-product-image">` : ''}
            </div>
            <div class="cart-item-details">
                ${item.badge ? `<span class="bean-badge">${item.badge}</span>` : ''}
                <h3>${item.name}</h3>
                <p class="cart-item-price">RM ${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
            </div>
            <div class="cart-item-total">
                <span>RM ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    `).join('');
    
    const total = await getCartTotal();
    
    cartContainer.innerHTML = `
        <div class="cart-items">
            ${cartItemsHTML}
        </div>
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Subtotal:</span>
                <span>RM ${total.toFixed(2)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Shipping:</span>
                <span>RM 10.00</span>
            </div>
            <div class="cart-summary-row cart-total">
                <span>Total:</span>
                <span>RM ${(total + 10).toFixed(2)}</span>
            </div>
            <a href="checkout.html" class="btn btn-primary checkout-btn">Proceed to Checkout</a>
        </div>
    `;
}

async function updateQuantity(productId, newQuantity) {
    if (typeof updateCartQuantity === 'undefined') {
        console.error('updateCartQuantity function not available');
        return;
    }
    await updateCartQuantity(productId, newQuantity);
    await renderCart();
}

async function removeItem(productId) {
    if (typeof removeFromCart === 'undefined') {
        console.error('removeFromCart function not available');
        return;
    }
    await removeFromCart(productId);
    await renderCart();
}

