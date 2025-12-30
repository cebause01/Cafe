// Authentication helper functions
// API URL - automatically detects environment
// For local development: http://localhost:3000/api
// For production: Update this to your backend API URL (e.g., Heroku, Render, etc.)
if (typeof window.API_BASE_URL === 'undefined') {
    window.API_BASE_URL = (() => {
        // Check if we're on localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:3000/api';
        }
        // For GitHub Pages or other hosting, use your backend URL
        return 'https://cafe-whvh.onrender.com/api';
    })();
}
const API_BASE_URL = window.API_BASE_URL;

// Get auth token from localStorage
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Set auth token in localStorage
function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

// Remove auth token from localStorage
function removeAuthToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
}

// Get current user from localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Set current user in localStorage
function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// Check if user is logged in
function isLoggedIn() {
    return !!getAuthToken();
}

// Register new user
async function register(email, password, name) {
    try {
        console.log('Attempting registration to:', `${API_BASE_URL}/auth/register`);
        
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        });

        console.log('Response status:', response.status, response.statusText);

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response:', text);
            throw new Error('Server returned invalid response. Please check if the service is running.');
        }

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        setAuthToken(data.token);
        setCurrentUser(data.user);
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        // Provide more helpful error messages
        if (error.message.includes('fetch')) {
            throw new Error('Cannot connect to server. The service might be sleeping. Please wait 30 seconds and try again.');
        }
        throw error;
    }
}

// Login user
async function login(email, password) {
    try {
        console.log('Attempting login to:', `${API_BASE_URL}/auth/login`);
        
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        console.log('Response status:', response.status, response.statusText);

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response:', text);
            throw new Error('Server returned invalid response. Please check if the service is running.');
        }

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        setAuthToken(data.token);
        setCurrentUser(data.user);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        // Provide more helpful error messages
        if (error.message.includes('fetch')) {
            throw new Error('Cannot connect to server. The service might be sleeping. Please wait 30 seconds and try again.');
        }
        throw error;
    }
}

// Logout user
function logout() {
    removeAuthToken();
    // Clear cart and wishlist from localStorage (they're now in DB)
    localStorage.removeItem('cart');
    localStorage.removeItem('bforbrew_wishlist');
    updateAuthUI();
}

// Get authenticated fetch headers
function getAuthHeaders() {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

// Update auth UI in header
function updateAuthUI() {
    const authContainer = document.getElementById('authContainer');
    const userMenu = document.getElementById('userMenu');
    
    if (!authContainer) return;

    if (isLoggedIn()) {
        const user = getCurrentUser();
        authContainer.innerHTML = `
            <div class="user-menu-wrapper">
                <button class="user-menu-btn" id="userMenuBtn">
                    <span>${user?.name || 'User'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <div class="user-dropdown" id="userDropdown" style="display: none;">
                    <a href="order-tracking.html">My Orders</a>
                    <button onclick="logout()">Logout</button>
                </div>
            </div>
        `;
        
        // Add click handler for user menu
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');
        if (userMenuBtn && userDropdown) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                userDropdown.style.display = 'none';
            });
        }
    } else {
        authContainer.innerHTML = `
            <button class="btn btn-login" onclick="openLoginModal()">Login</button>
            <button class="btn btn-signup" onclick="openSignupModal()">Sign Up</button>
        `;
    }
}

// Open login modal
function openLoginModal() {
    const modal = document.getElementById('authModal');
    const modalContent = document.getElementById('authModalContent');
    if (modal && modalContent) {
        modalContent.innerHTML = `
            <div class="auth-modal-header">
                <h2>Login</h2>
                <button class="close-modal" onclick="closeAuthModal()">×</button>
            </div>
            <form id="loginForm" onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label for="loginEmail">Email</label>
                    <input type="email" id="loginEmail" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
                <p class="auth-switch">Don't have an account? <a href="#" onclick="switchToSignup()">Sign up</a></p>
            </form>
        `;
        modal.style.display = 'flex';
    }
}

// Open signup modal
function openSignupModal() {
    const modal = document.getElementById('authModal');
    const modalContent = document.getElementById('authModalContent');
    if (modal && modalContent) {
        modalContent.innerHTML = `
            <div class="auth-modal-header">
                <h2>Create Account</h2>
                <button class="close-modal" onclick="closeAuthModal()">×</button>
            </div>
            <form id="signupForm" onsubmit="handleSignup(event)">
                <div class="form-group">
                    <label for="signupName">Full Name</label>
                    <input type="text" id="signupName" required>
                </div>
                <div class="form-group">
                    <label for="signupEmail">Email</label>
                    <input type="email" id="signupEmail" required>
                </div>
                <div class="form-group">
                    <label for="signupPassword">Password</label>
                    <input type="password" id="signupPassword" required minlength="6">
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
                <p class="auth-switch">Already have an account? <a href="#" onclick="switchToLogin()">Login</a></p>
            </form>
        `;
        modal.style.display = 'flex';
    }
}

// Close auth modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Switch to signup form
function switchToSignup() {
    openSignupModal();
}

// Switch to login form
function switchToLogin() {
    openLoginModal();
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        await login(email, password);
        closeAuthModal();
        updateAuthUI();
        showNotification('Login successful!', 'success');
        
        // Sync cart and wishlist from server
        if (typeof syncCartFromServer === 'function') syncCartFromServer();
        if (typeof syncWishlistFromServer === 'function') syncWishlistFromServer();
    } catch (error) {
        showNotification(error.message || 'Login failed', 'error');
    }
}

// Handle signup
async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    try {
        await register(email, password, name);
        closeAuthModal();
        updateAuthUI();
        showNotification('Account created successfully!', 'success');
        
        // Sync cart and wishlist from server
        if (typeof syncCartFromServer === 'function') syncCartFromServer();
        if (typeof syncWishlistFromServer === 'function') syncWishlistFromServer();
    } catch (error) {
        showNotification(error.message || 'Registration failed', 'error');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});

