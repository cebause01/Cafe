// Wishlist functionality
const WISHLIST_KEY = 'bforbrew_wishlist';

function getWishlist() {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

function addToWishlist(productId) {
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveWishlist(wishlist);
        updateWishlistUI();
        showNotification('Added to wishlist!', 'success');
        return true;
    }
    return false;
}

function removeFromWishlist(productId) {
    const wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        saveWishlist(wishlist);
        updateWishlistUI();
        showNotification('Removed from wishlist', 'info');
        return true;
    }
    return false;
}

function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
}

function toggleWishlist(productId) {
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(productId);
    }
}

function updateWishlistUI() {
    // Update wishlist count in navigation
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        const count = getWishlist().length;
        wishlistCount.textContent = count;
        wishlistCount.style.display = count > 0 ? 'block' : 'none';
    }

    // Update wishlist buttons on product cards
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.getAttribute('data-id'));
        if (isInWishlist(productId)) {
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
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistUI();
});

