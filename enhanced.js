// Victory Restaurant - Enhanced Features & UI Improvements

// Enhanced URL handling for better navigation
function handleURLNavigation() {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    
    if (section && document.getElementById(section)) {
        showSection(section);
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.section) {
        showSection(event.state.section);
    } else {
        showSection('home');
    }
});

// Enhanced cart display with better animations
function updateCartDisplayEnhanced() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCountElement = document.getElementById('cartCount');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Calculate total
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update cart count with animation
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const currentCount = parseInt(cartCountElement.textContent);
    
    if (totalItems !== currentCount) {
        cartCountElement.style.transform = 'scale(1.3)';
        cartCountElement.textContent = totalItems;
        
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Update cart total with formatting
    cartTotalElement.textContent = formatPrice(cartTotal);
    
    // Enable/disable checkout button
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
    }
    
    // Enhanced cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: var(--spacing-xl);">
                <div style="font-size: 4rem; margin-bottom: var(--spacing-sm); opacity: 0.5;">🛒</div>
                <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-xs);">Votre panier est vide</h3>
                <p style="font-size: 0.9rem;">Ajoutez des délicieux plats depuis notre menu!</p>
                <button onclick="showSection('menu')" style="
                    background: var(--primary-color);
                    color: var(--text-inverse);
                    border: none;
                    padding: var(--spacing-xs) var(--spacing-sm);
                    border-radius: var(--border-radius);
                    margin-top: var(--spacing-sm);
                    cursor: pointer;
                    font-weight: 600;
                ">Voir le Menu</button>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item" style="animation: slideInLeft 0.3s ease ${index * 0.1}s both;">
                <div>
                    <h4 style="color: var(--primary-color); margin-bottom: var(--spacing-xs); font-weight: 600;">${item.name}</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">
                        ${formatPrice(item.price)} × ${item.quantity} = 
                        <strong style="color: var(--primary-color);">${formatPrice(item.price * item.quantity)}</strong>
                    </p>
                </div>
                <div style="display: flex; align-items: center; gap: var(--spacing-xs);">
                    <button onclick="updateQuantity('${item.name}', -1)" 
                            style="background: var(--bg-secondary); color: var(--primary-color); border: 1px solid var(--border-color); border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center;"
                            title="Diminuer la quantité">
                        −
                    </button>
                    <span style="color: var(--primary-color); font-weight: bold; min-width: 24px; text-align: center; font-size: 1.1rem;">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)" 
                            style="background: var(--primary-color); color: var(--text-inverse); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center;"
                            title="Augmenter la quantité">
                        +
                    </button>
                    <button onclick="removeFromCart('${item.name}')" 
                            style="background: var(--error-color); color: var(--text-inverse); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; margin-left: var(--spacing-xs); display: flex; align-items: center; justify-content: center;"
                            title="Supprimer cet article">
                        ×
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Override the original updateCartDisplay
window.updateCartDisplay = updateCartDisplayEnhanced;

// Enhanced keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter to open cart (when in menu)
    if (e.ctrlKey && e.key === 'Enter' && currentSection === 'menu') {
        toggleCart();
        e.preventDefault();
        showNotification('Raccourci clavier utilisé! 🎯', 'info');
    }
    
    // Ctrl+T to toggle theme
    if (e.ctrlKey && e.key === 't') {
        toggleTheme();
        e.preventDefault();
    }
    
    // Number keys 1-4 for quick navigation
    if (e.altKey && e.key >= '1' && e.key <= '4') {
        const sections = ['home', 'menu', 'track', 'admin'];
        const sectionIndex = parseInt(e.key) - 1;
        showSection(sections[sectionIndex]);
        e.preventDefault();
        showNotification(`Navigation rapide vers ${sections[sectionIndex]}! ⚡`, 'info');
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cartSidebar');
        const checkoutModal = document.getElementById('checkoutModal');
        
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            toggleCart();
        }
        
        if (checkoutModal && checkoutModal.style.display === 'flex') {
            closeCheckout();
        }
    }
});

// Enhanced scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .menu-category, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addScrollAnimations, 1000);
});

// Enhanced form validation with better UX
function validateFormField(field, validationFn, errorMessage) {
    const value = field.value.trim();
    const isValid = validationFn(value);
    
    // Remove existing validation classes
    field.classList.remove('error', 'success');
    
    // Add appropriate class
    if (value.length > 0) {
        field.classList.add(isValid ? 'success' : 'error');
    }
    
    // Show/hide error message
    let errorDiv = field.parentNode.querySelector('.error-message');
    
    if (!isValid && value.length > 0) {
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: var(--error-color);
                font-size: 0.85rem;
                margin-top: var(--spacing-xs);
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = errorMessage;
        errorDiv.style.opacity = '1';
    } else if (errorDiv) {
        errorDiv.style.opacity = '0';
        setTimeout(() => errorDiv.remove(), 300);
    }
    
    return isValid;
}

// Real-time form validation
function initializeFormValidation() {
    const nameField = document.getElementById('customerName');
    const phoneField = document.getElementById('customerPhone');
    const addressField = document.getElementById('customerAddress');
    
    if (nameField) {
        nameField.addEventListener('input', () => {
            validateFormField(
                nameField,
                value => value.length >= 2,
                'Le nom doit contenir au moins 2 caractères'
            );
        });
    }
    
    if (phoneField) {
        phoneField.addEventListener('input', () => {
            validateFormField(
                phoneField,
                value => /^\+?242\s?\d{2}\s?\d{3}\s?\d{4}$/.test(value.replace(/\s+/g, ' ')),
                'Format: +242 XX XXX XXXX'
            );
        });
    }
    
    if (addressField) {
        addressField.addEventListener('input', () => {
            validateFormField(
                addressField,
                value => value.length >= 10,
                'Veuillez fournir une adresse détaillée'
            );
        });
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    handleURLNavigation();
    setTimeout(initializeFormValidation, 2000);
});

// Add CSS for enhanced animations
const enhancedCSS = `
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.form-group input.success,
.form-group textarea.success {
    border-color: var(--success-color);
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

.form-group input.error,
.form-group textarea.error {
    border-color: var(--error-color);
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.error-message {
    animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject enhanced CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedCSS;
document.head.appendChild(styleSheet);

console.log('🚀 Victory Restaurant Enhanced Features Loaded!');
