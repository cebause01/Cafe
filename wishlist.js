// Wishlist functionality
const WISHLIST_KEY = 'bforbrew_wishlist';
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

// Check if user is logged in (use window.isLoggedIn from auth.js if available)
function isLoggedIn() {
    if (typeof window.isLoggedIn === 'function') {
        return window.isLoggedIn();
    }
    if (typeof window.getAuthToken === 'function') {
        return window.getAuthToken() !== null;
    }
    return false;
}

// Get wishlist from API (requires sign-in) or return empty for guests
async function getWishlist() {
    if (isLoggedIn()) {
        try {
            const response = await fetch(`${window.API_BASE_URL}/wishlist`, {
                headers: window.getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                return data.wishlist || [];
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    }
    // Return empty array for guests (wishlist requires sign-in)
    return [];
}

// Save wishlist to localStorage (for guests) or API (for logged in users)
async function saveWishlist(wishlist) {
    if (isLoggedIn()) {
        // Wishlist is saved automatically on API calls, just update UI
        updateWishlistUI();
        return;
    }
    // Save to localStorage for guests
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    updateWishlistUI();
}

// Add item to wishlist (requires sign-in)
async function addToWishlist(productId) {
    // Check if user is logged in
    if (!isLoggedIn()) {
        showNotification('Please sign in to add items to your wishlist', 'error');
        // Open login modal
        if (typeof openLoginModal === 'function') {
            setTimeout(() => openLoginModal(), 500);
        }
        return false;
    }
    
    try {
        console.log('Adding to wishlist (logged in):', productId);
        const response = await fetch(`${window.API_BASE_URL}/wishlist/add`, {
            method: 'POST',
            headers: window.getAuthHeaders(),
            body: JSON.stringify({ productId })
        });
        
        console.log('Wishlist add response status:', response.status);
        
        if (response.ok) {
            await updateWishlistUI();
            showNotification('Added to wishlist!', 'success');
            return true;
        } else {
            const contentType = response.headers.get('content-type');
            let error;
            if (contentType && contentType.includes('application/json')) {
                error = await response.json();
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                error = { error: 'Server returned invalid response' };
            }
            console.error('Wishlist add error:', error);
            showNotification(error.error || 'Failed to add to wishlist', 'error');
            return false;
        }
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        if (error.message && error.message.includes('fetch')) {
            showNotification('Cannot connect to server. Please wait 30 seconds and try again.', 'error');
        } else {
            showNotification('Failed to add to wishlist. Please try again.', 'error');
        }
        return false;
    }
}

// Remove item from wishlist (requires sign-in)
async function removeFromWishlist(productId) {
    // Check if user is logged in
    if (!isLoggedIn()) {
        showNotification('Please sign in to manage your wishlist', 'error');
        return false;
    }
    
    try {
        const response = await fetch(`${window.API_BASE_URL}/wishlist/remove/${productId}`, {
            method: 'DELETE',
            headers: window.getAuthHeaders()
        });
        
        if (response.ok) {
            await updateWishlistUI();
            showNotification('Removed from wishlist', 'info');
            return true;
        } else {
            const error = await response.json();
            showNotification(error.error || 'Failed to remove from wishlist', 'error');
            return false;
        }
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        showNotification('Failed to remove from wishlist. Please try again.', 'error');
        return false;
    }
}

// Check if item is in wishlist
async function isInWishlist(productId) {
    const wishlist = await getWishlist();
    return wishlist.includes(productId);
}

// Toggle wishlist item (requires sign-in)
// Make globally available immediately for inline onclick handlers
window.toggleWishlist = async function toggleWishlist(productId) {
    // Check if user is logged in
    if (!isLoggedIn()) {
        showNotification('Please sign in to add items to your wishlist', 'error');
        // Open login modal
        if (typeof openLoginModal === 'function') {
            setTimeout(() => openLoginModal(), 500);
        }
        return;
    }
    
    try {
        const response = await fetch(`${window.API_BASE_URL}/wishlist/toggle`, {
            method: 'POST',
            headers: window.getAuthHeaders(),
            body: JSON.stringify({ productId })
        });
        
        if (response.ok) {
            const data = await response.json();
            await updateWishlistUI();
            showNotification(
                data.added ? 'Added to wishlist!' : 'Removed from wishlist',
                data.added ? 'success' : 'info'
            );
            return;
        } else {
            const error = await response.json();
            showNotification(error.error || 'Failed to update wishlist', 'error');
        }
    } catch (error) {
        console.error('Error toggling wishlist:', error);
        showNotification('Failed to update wishlist. Please try again.', 'error');
    }
}

// Sync wishlist from server (called after login)
async function syncWishlistFromServer() {
    if (isLoggedIn()) {
        try {
            const wishlist = await getWishlist();
            updateWishlistUI();
            return wishlist;
        } catch (error) {
            console.error('Error syncing wishlist:', error);
        }
    }
}

async function updateWishlistUI() {
    // Update wishlist count in navigation
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        const wishlist = await getWishlist();
        const count = wishlist.length;
        wishlistCount.textContent = count;
        wishlistCount.style.display = count > 0 ? 'block' : 'none';
    }

    // Update wishlist buttons on product cards
    document.querySelectorAll('.wishlist-btn').forEach(async btn => {
        const productId = parseInt(btn.getAttribute('data-id'));
        const inWishlist = await isInWishlist(productId);
        if (inWishlist) {
            btn.classList.add('active');
            btn.setAttribute('aria-label', 'Remove from wishlist');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-label', 'Add to wishlist');
        }
    });
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize wishlist UI on page load
document.addEventListener('DOMContentLoaded', async () => {
    await updateWishlistUI();
});

