// Profile management functions

// Check if user is logged in, redirect if not
document.addEventListener('DOMContentLoaded', async () => {
    if (!window.isLoggedIn || !window.isLoggedIn()) {
        window.location.href = 'login.html?return=' + encodeURIComponent(window.location.href);
        return;
    }

    // Load user profile data
    await loadUserProfile();
});

// Load user profile from server
async function loadUserProfile() {
    try {
        const response = await fetch(window.API_BASE_URL + '/auth/me', {
            method: 'GET',
            headers: window.getAuthHeaders()
        });

        if (response.status === 401 || response.status === 403) {
            // Token expired or invalid
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = 'login.html?return=' + encodeURIComponent(window.location.href);
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to load profile');
        }

        const data = await response.json();
        const user = data.user;

        // Populate form fields
        document.getElementById('email').value = user.email || '';
        document.getElementById('name').value = user.name || '';
        document.getElementById('contact').value = user.contact || '';

        // Update localStorage with latest user data
        localStorage.setItem('user', JSON.stringify({
            id: user._id || user.id,
            email: user.email,
            name: user.name,
            contact: user.contact
        }));

    } catch (error) {
        console.error('Error loading profile:', error);
        showMessage('Failed to load profile. Please try again.', 'error');
    }
}

// Handle profile update (name and contact)
window.handleProfileUpdate = async function handleProfileUpdate(event) {
    event.preventDefault();
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    const submitBtn = document.getElementById('profileSubmitBtn');

    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if (!name) {
        showMessage('Name is required', 'error');
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Updating...';
        document.getElementById('profileForm').classList.add('loading');

        const response = await fetch(window.API_BASE_URL + '/auth/profile', {
            method: 'PUT',
            headers: window.getAuthHeaders(),
            body: JSON.stringify({ name, contact })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update profile');
        }

        // Update localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser.name = data.user.name;
        currentUser.contact = data.user.contact;
        localStorage.setItem('user', JSON.stringify(currentUser));

        // Update auth UI in header
        if (typeof window.updateAuthUI === 'function') {
            window.updateAuthUI();
        }

        showMessage('Profile updated successfully!', 'success');

    } catch (error) {
        console.error('Error updating profile:', error);
        showMessage(error.message || 'Failed to update profile. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update Profile';
        document.getElementById('profileForm').classList.remove('loading');
    }
}

// Handle password change
window.handlePasswordChange = async function handlePasswordChange(event) {
    event.preventDefault();
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    const submitBtn = document.getElementById('passwordSubmitBtn');

    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        showMessage('All password fields are required', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showMessage('New password must be at least 6 characters', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showMessage('New passwords do not match', 'error');
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Changing Password...';
        document.getElementById('passwordForm').classList.add('loading');

        const response = await fetch(window.API_BASE_URL + '/auth/profile', {
            method: 'PUT',
            headers: window.getAuthHeaders(),
            body: JSON.stringify({
                password: newPassword,
                currentPassword: currentPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to change password');
        }

        // Clear password fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';

        showMessage('Password changed successfully!', 'success');

    } catch (error) {
        console.error('Error changing password:', error);
        showMessage(error.message || 'Failed to change password. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Change Password';
        document.getElementById('passwordForm').classList.remove('loading');
    }
}

// Show message helper
function showMessage(message, type) {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');

    if (type === 'error') {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
    } else {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
    }

    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
}
