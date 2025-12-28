// Cart Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cartContainer');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '';
        emptyCart.style.display = 'block';
        return;
    }
    
    emptyCart.style.display = 'none';
    
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
    
    const total = getCartTotal();
    
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

function updateQuantity(productId, newQuantity) {
    updateCartQuantity(productId, newQuantity);
    renderCart();
}

function removeItem(productId) {
    removeFromCart(productId);
    renderCart();
}

