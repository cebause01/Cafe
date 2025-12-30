// Checkout Page Functionality
// API URL - use from window (set by auth.js)
if (typeof window.API_BASE_URL === 'undefined') {
    window.API_BASE_URL = (() => {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:3000/api';
        }
        return 'https://cafe-whvh.onrender.com/api';
    })();
}
// Use window.API_BASE_URL directly instead of const to avoid redeclaration error

document.addEventListener('DOMContentLoaded', async () => {
    const cart = await window.getCart();
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    await renderCheckoutSummary();
    
    // Handle form submission
    document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            state: document.getElementById('state').value
        };
        
        // Check if user is logged in
        if (window.isLoggedIn && window.isLoggedIn()) {
            // Save order to database
            try {
                const cart = await window.getCart();
                const subtotal = await window.getCartTotal();
                const shipping = 10.00;
                const total = subtotal + shipping;
                
                const response = await fetch(`${window.API_BASE_URL}/orders/create`, {
                    method: 'POST',
                    headers: window.getAuthHeaders(),
                    body: JSON.stringify({
                        items: cart,
                        shippingAddress: formData,
                        subtotal,
                        shipping,
                        total
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    // Store order number for payment success page
                    localStorage.setItem('lastOrderNumber', data.order.orderNumber);
                    localStorage.setItem('orderDetails', JSON.stringify(formData));
                    
                    // Clear cart
                    await window.clearCart();
                    
                    // Redirect to payment success page
                    window.location.href = 'payment-success.html';
                } else {
                    const error = await response.json();
                    alert(error.error || 'Failed to create order. Please try again.');
                }
            } catch (error) {
                console.error('Error creating order:', error);
                alert('Failed to create order. Please try again.');
            }
        } else {
            // Guest checkout - save to localStorage (legacy support)
            localStorage.setItem('orderDetails', JSON.stringify(formData));
            
            // Redirect to payment success page
            window.location.href = 'payment-success.html';
        }
    });
});

async function renderCheckoutSummary() {
    const cart = await window.getCart();
    const summaryContainer = document.getElementById('checkoutSummary');
    const subtotal = await window.getCartTotal();
    const shipping = 10.00;
    const grandTotal = subtotal + shipping;
    
    const itemsHTML = cart.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-image" style="background: ${item.gradient || 'linear-gradient(135deg, #6F4E37 0%, #8B6F47 100%)'};"></div>
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

