// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const cart = getCart();
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    renderCheckoutSummary();
    
    // Handle form submission
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Save order details to localStorage
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            state: document.getElementById('state').value
        };
        
        localStorage.setItem('orderDetails', JSON.stringify(formData));
        
        // Redirect to payment success page
        window.location.href = 'payment-success.html';
    });
});

function renderCheckoutSummary() {
    const cart = getCart();
    const summaryContainer = document.getElementById('checkoutSummary');
    const subtotal = getCartTotal();
    const shipping = 10.00;
    const grandTotal = subtotal + shipping;
    
    const itemsHTML = cart.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-image" style="background: ${item.gradient};"></div>
            <div class="checkout-item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="checkout-item-price">
                RM ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
    
    summaryContainer.innerHTML = `
        <div class="checkout-items">
            ${itemsHTML}
        </div>
    `;
    
    document.getElementById('subtotal').textContent = `RM ${subtotal.toFixed(2)}`;
    document.getElementById('grandTotal').textContent = `RM ${grandTotal.toFixed(2)}`;
}

