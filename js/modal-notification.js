// Global Modal Notification System
// Reusable modal for success, error, and info messages

window.showModal = function(message, type = 'success', title = null) {
    // Remove existing modal if any
    const existingModal = document.getElementById('globalNotificationModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Set title based on type if not provided
    if (!title) {
        title = type === 'success' ? 'Success!' : 
                type === 'error' ? 'Error' : 
                type === 'info' ? 'Information' : 'Notification';
    }

    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'globalNotificationModal';
    modal.className = 'global-notification-modal';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'global-notification-modal-content';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'global-notification-modal-header';
    
    const titleEl = document.createElement('h2');
    titleEl.textContent = title;
    header.appendChild(titleEl);
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'global-notification-modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => closeModal();
    header.appendChild(closeBtn);
    
    // Create body
    const body = document.createElement('div');
    body.className = 'global-notification-modal-body';
    
    // Icon based on type
    const icon = document.createElement('div');
    icon.className = 'notification-icon';
    if (type === 'success') {
        icon.textContent = '✓';
        icon.style.background = '#4CAF50';
    } else if (type === 'error') {
        icon.textContent = '✕';
        icon.style.background = '#f44336';
    } else {
        icon.textContent = 'ℹ';
        icon.style.background = '#2196F3';
    }
    
    const messageEl = document.createElement('p');
    messageEl.className = 'notification-message';
    messageEl.textContent = message;
    
    body.appendChild(icon);
    body.appendChild(messageEl);
    
    // Create actions
    const actions = document.createElement('div');
    actions.className = 'global-notification-modal-actions';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'btn btn-primary';
    closeButton.textContent = 'Close';
    closeButton.onclick = () => closeModal();
    actions.appendChild(closeButton);
    
    // Assemble modal
    modalContent.appendChild(header);
    modalContent.appendChild(body);
    modalContent.appendChild(actions);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }, 10);
    
    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 300);
    }
    
    // Close on outside click
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Close on Escape key
    const escapeHandler = function(event) {
        if (event.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
};
