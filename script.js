// Victory Restaurant - Enhanced JavaScript with Dark/Light Mode

// App State Management
let currentSection = 'home';
let cart = [];
let cartTotal = 0;
let orderCounter = 12346;
let orders = [];
let currentTheme = 'light';

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('victoryTheme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('victoryTheme', currentTheme);
    updateThemeToggle();
    
    // Show notification
    const themeText = currentTheme === 'dark' ? 'sombre' : 'clair';
    showNotification(`Mode ${themeText} activé! ${currentTheme === 'dark' ? '🌙' : '☀️'}`, 'info');
}

function updateThemeToggle() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        themeIcon.parentElement.title = currentTheme === 'dark' ? 'Mode clair' : 'Mode sombre';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏆 Victory Restaurant Enhanced App Initialized');
    
    // Initialize theme first
    initializeTheme();
    
    // Then load other data
    loadCart();
    updateCartDisplay();
    simulateRealTimeUpdates();
    loadOrdersFromStorage();
    
    // Enhanced welcome sequence
    setTimeout(() => {
        showNotification('Bienvenue chez Victory Restaurant! 🏆', 'success');
    }, 1000);
    
    // Show theme tip after a delay
    setTimeout(() => {
        if (currentTheme === 'light') {
            showNotification('💡 Essayez le mode sombre avec le bouton 🌙', 'info');
        }
    }, 5000);
});

// Enhanced Navigation Functions
function showSection(sectionName) {
    // Hide all sections with fade out
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section with fade in
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        // Small delay for smooth transition
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 150);
    }
    
    // Update navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    currentSection = sectionName;
    
    // Special actions for certain sections
    if (sectionName === 'admin') {
        updateAdminStats();
    } else if (sectionName === 'menu') {
        // Animate menu items
        setTimeout(() => {
            animateMenuItems();
        }, 300);
    }
    
    // Update URL without reload (for better UX)
    if (history.pushState) {
        const newUrl = `${window.location.pathname}?section=${sectionName}`;
        history.pushState({ section: sectionName }, '', newUrl);
    }
}

// Animate menu items on load
function animateMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Enhanced Cart Management Functions
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCart();
    
    // Enhanced visual feedback
    const button = event.target;
    const originalText = button.textContent;
    const originalBg = button.style.background;
    
    // Success animation
    button.textContent = '✓ Ajouté!';
    button.style.background = 'var(--success-color)';
    button.classList.add('loading');
    
    // Cart icon animation
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    cartIcon.style.background = 'var(--success-color)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBg;
        button.classList.remove('loading');
        
        cartIcon.style.transform = 'scale(1)';
        cartIcon.style.background = 'var(--primary-color)';
    }, 1500);
    
    // Show enhanced notification
    showNotification(`${itemName} ajouté au panier! 🛒`, 'success');
    
    // Haptic feedback on mobile
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
    saveCart();
    showNotification(`${itemName} retiré du panier`, 'warning');
}

function updateQuantity(itemName, change) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            updateCartDisplay();
            saveCart();
        }
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCountElement = document.getElementById('cartCount');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Calculate total
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Update cart total
    cartTotalElement.textContent = formatPrice(cartTotal);
    
    // Enable/disable checkout button
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
    
    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; color: #ccc; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
                <p>Votre panier est vide</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Ajoutez des délicieux plats depuis notre menu!</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4 style="color: #ff6b00; margin-bottom: 0.5rem;">${item.name}</h4>
                    <p style="color: #ccc;">${formatPrice(item.price)} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button onclick="updateQuantity('${item.name}', -1)" 
                            style="background: #ff6b00; color: #000; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-weight: bold;">
                        -
                    </button>
                    <span style="color: #ff6b00; font-weight: bold; min-width: 20px; text-align: center;">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)" 
                            style="background: #ff6b00; color: #000; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-weight: bold;">
                        +
                    </button>
                    <button onclick="removeFromCart('${item.name}')" 
                            style="background: #dc3545; color: #fff; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; margin-left: 0.5rem;"
                            title="Supprimer cet article">
                        ×
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
    
    // Update cart display when opening
    if (cartSidebar.classList.contains('open')) {
        updateCartDisplay();
    }
}

// Checkout Process
function showCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide! Ajoutez des articles d\'abord.', 'error');
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'flex';
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = document.getElementById('customerName');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'none';
    
    // Clear form
    clearCheckoutForm();
}

function clearCheckoutForm() {
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('paymentMethod').value = 'cash';
    document.getElementById('specialInstructions').value = '';
}

function validateCheckoutForm() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    
    if (!name) {
        showNotification('Veuillez entrer votre nom complet.', 'error');
        document.getElementById('customerName').focus();
        return false;
    }
    
    if (!phone) {
        showNotification('Veuillez entrer votre numéro de téléphone.', 'error');
        document.getElementById('customerPhone').focus();
        return false;
    }
    
    if (!address) {
        showNotification('Veuillez entrer votre adresse de livraison.', 'error');
        document.getElementById('customerAddress').focus();
        return false;
    }
    
    // Validate phone number format (basic)
    if (!/^\+?242\s?\d{2}\s?\d{3}\s?\d{4}$/.test(phone.replace(/\s+/g, ' '))) {
        showNotification('Format de téléphone invalide. Utilisez: +242 XX XXX XXXX', 'error');
        document.getElementById('customerPhone').focus();
        return false;
    }
    
    return true;
}

function submitOrder() {
    if (!validateCheckoutForm()) {
        return;
    }
    
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    const specialInstructions = document.getElementById('specialInstructions').value.trim();
    
    // Generate order
    const orderNumber = orderCounter++;
    const order = {
        orderNumber: orderNumber,
        customer: {
            name: customerName,
            phone: customerPhone,
            address: customerAddress
        },
        items: [...cart],
        total: cartTotal,
        paymentMethod: paymentMethod,
        specialInstructions: specialInstructions,
        status: 'confirmée',
        timestamp: new Date().toLocaleString('fr-FR'),
        estimatedDelivery: calculateDeliveryTime(),
        id: Date.now()
    };
    
    // Save order
    orders.push(order);
    saveOrdersToStorage();
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    saveCart();
    
    // Close modals
    closeCheckout();
    toggleCart();
    
    // Success feedback
    showNotification(`Commande #${orderNumber} confirmée avec succès! 🎉`, 'success');
    
    // Redirect to tracking
    setTimeout(() => {
        showSection('track');
        document.getElementById('trackingNumber').value = orderNumber;
    }, 1500);
}

// Order Tracking
function trackOrder() {
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    
    if (!trackingNumber) {
        showNotification('Veuillez entrer un numéro de commande.', 'error');
        return;
    }
    
    // Find order (in real app, this would query the database)
    const order = orders.find(o => o.orderNumber == trackingNumber);
    
    if (!order) {
        showNotification('Commande non trouvée. Vérifiez le numéro.', 'error');
        return;
    }
    
    // Show order status
    const orderStatus = document.getElementById('orderStatus');
    const orderNumberDisplay = document.getElementById('orderNumberDisplay');
    const estimatedTime = document.getElementById('estimatedTime');
    
    orderNumberDisplay.textContent = trackingNumber;
    estimatedTime.textContent = order.estimatedDelivery + ' minutes';
    orderStatus.style.display = 'block';
    
    // Simulate real-time status updates
    setTimeout(() => {
        updateOrderStatus(['confirmée', 'en préparation']);
        showNotification('Votre commande est en préparation! 👨‍🍳', 'success');
    }, 1000);
    
    setTimeout(() => {
        updateOrderStatus(['confirmée', 'en préparation', 'en livraison']);
        showNotification('Votre commande est en route! 🏍️', 'success');
    }, 3000);
}

function updateOrderStatus(activeSteps) {
    const steps = document.querySelectorAll('.status-step');
    const stepNames = ['confirmée', 'en préparation', 'en livraison', 'livrée'];
    
    steps.forEach((step, index) => {
        if (activeSteps.includes(stepNames[index])) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Admin Functions
function updateOrderStatusAdmin(selectElement) {
    const row = selectElement.closest('.order-row');
    const orderNumber = row.querySelector('div').textContent;
    const newStatus = selectElement.value;
    
    // Find and update order
    const order = orders.find(o => o.orderNumber == orderNumber.replace('#', ''));
    if (order) {
        order.status = newStatus;
        saveOrdersToStorage();
    }
    
    // Visual feedback
    selectElement.style.background = '#4CAF50';
    selectElement.style.color = '#fff';
    
    setTimeout(() => {
        selectElement.style.background = '#1a1a1a';
        selectElement.style.color = '#fff';
    }, 1000);
    
    showNotification(`Commande ${orderNumber} mise à jour: ${newStatus}`, 'success');
}

function updateAdminStats() {
    // Update statistics (in real app, this would come from database)
    const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.timestamp.split(' ')[0].split('/').reverse().join('-'));
        const today = new Date();
        return orderDate.toDateString() === today.toDateString();
    }).length;
    
    const todayRevenue = orders
        .filter(order => {
            const orderDate = new Date(order.timestamp.split(' ')[0].split('/').reverse().join('-'));
            const today = new Date();
            return orderDate.toDateString() === today.toDateString();
        })
        .reduce((total, order) => total + order.total, 0);
    
    const pendingOrders = orders.filter(order => 
        order.status !== 'livrée' && order.status !== 'annulée'
    ).length;
    
    // Update DOM
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = todayOrders;
        statNumbers[1].textContent = formatPrice(todayRevenue).replace(' FCFA', '');
        statNumbers[2].textContent = pendingOrders;
        statNumbers[3].textContent = '23min'; // Fixed for demo
    }
}

// Real-time Updates Simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        if (currentSection === 'admin') {
            // Randomly add new orders for demo
            if (Math.random() > 0.95) { // 5% chance every 10 seconds
                addRandomOrder();
                updateAdminStats();
                showNotification('Nouvelle commande reçue! 📱', 'success');
            }
        }
    }, 10000); // Every 10 seconds
}

function addRandomOrder() {
    const customers = ['Jean Makaya', 'Marie Bouanga', 'Paul Nzaba', 'Sylvie Mongo', 'Pierre Kongo'];
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const orderValue = Math.floor(Math.random() * 5000) + 1000;
    
    const newOrder = {
        orderNumber: orderCounter++,
        customer: {
            name: randomCustomer,
            phone: '+242 06 XXX XXXX',
            address: 'Adresse fictive'
        },
        items: [{ name: 'Commande aléatoire', price: orderValue, quantity: 1 }],
        total: orderValue,
        status: 'confirmée',
        timestamp: new Date().toLocaleString('fr-FR'),
        estimatedDelivery: 25,
        id: Date.now()
    };
    
    orders.push(newOrder);
    saveOrdersToStorage();
}

// Utility Functions
function formatPrice(price) {
    return price.toLocaleString() + ' FCFA';
}

function calculateDeliveryTime() {
    // Simple delivery time calculation (15-35 minutes)
    return Math.floor(Math.random() * 20) + 15;
}

// Enhanced notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => {
        notif.style.transform = 'translateX(100%)';
        setTimeout(() => notif.remove(), 300);
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create notification content with icon
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">${icons[type] || icons.success}</span>
            <span>${message}</span>
        </div>
    `;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.onclick = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    };
    
    notification.appendChild(closeBtn);
    
    // Initial state for animation
    notification.style.transform = 'translateX(100%)';
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Local Storage Functions
function saveCart() {
    try {
        localStorage.setItem('victoryCart', JSON.stringify(cart));
    } catch (error) {
        console.warn('Could not save cart to localStorage:', error);
    }
}

function loadCart() {
    try {
        const savedCart = localStorage.getItem('victoryCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (error) {
        console.warn('Could not load cart from localStorage:', error);
        cart = [];
    }
}

function saveOrdersToStorage() {
    try {
        localStorage.setItem('victoryOrders', JSON.stringify(orders));
    } catch (error) {
        console.warn('Could not save orders to localStorage:', error);
    }
}

function loadOrdersFromStorage() {
    try {
        const savedOrders = localStorage.getItem('victoryOrders');
        if (savedOrders) {
            orders = JSON.parse(savedOrders);
        }
    } catch (error) {
        console.warn('Could not load orders from localStorage:', error);
        orders = [];
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter to open cart (when in menu)
    if (e.ctrlKey && e.key === 'Enter' && currentSection === 'menu') {
        toggleCart();
        e.preventDefault();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cartSidebar');
        const checkoutModal = document.getElementById('checkoutModal');
        
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
        
        if (checkoutModal.style.display === 'flex') {
            closeCheckout();
        }
    }
});

// Print Receipt Function
function printReceipt(orderNumber) {
    const order = orders.find(o => o.orderNumber == orderNumber);
    if (!order) {
        showNotification('Commande introuvable pour impression', 'error');
        return;
    }
    
    const printWindow = window.open('', '_blank');
    const receiptContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Reçu Victory - Commande #${orderNumber}</title>
            <style>
                body { 
                    font-family: 'Courier New', monospace; 
                    padding: 20px; 
                    line-height: 1.6;
                    max-width: 400px;
                    margin: 0 auto;
                }
                .header { 
                    text-align: center; 
                    border-bottom: 2px solid #000; 
                    padding-bottom: 10px; 
                    margin-bottom: 20px;
                }
                .logo {
                    font-size: 2em;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .item { 
                    display: flex; 
                    justify-content: space-between; 
                    padding: 5px 0; 
                    border-bottom: 1px dotted #ccc;
                }
                .total { 
                    font-weight: bold; 
                    font-size: 1.2em; 
                    border-top: 2px solid #000; 
                    padding-top: 10px; 
                    margin-top: 10px;
                    text-align: center;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 0.9em;
                    border-top: 1px solid #ccc;
                    padding-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">🏆 VICTORY RESTAURANT</div>
                <p>Brazzaville, République du Congo</p>
                <p>Tél: +242 06 XXX XXXX</p>
                <hr>
                <p><strong>Commande #${orderNumber}</strong></p>
                <p>${order.timestamp}</p>
                <p>Client: ${order.customer.name}</p>
                <p>Tél: ${order.customer.phone}</p>
            </div>
            
            <div class="items">
                ${order.items.map(item => `
                    <div class="item">
                        <span>${item.name} x${item.quantity}</span>
                        <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="total">
                TOTAL: ${formatPrice(order.total)}
            </div>
            
            <div class="footer">
                <p>Paiement: ${order.paymentMethod === 'cash' ? 'Espèces' : order.paymentMethod === 'mobile' ? 'Mobile Money' : 'Carte bancaire'}</p>
                <p>Adresse: ${order.customer.address}</p>
                ${order.specialInstructions ? `<p>Instructions: ${order.specialInstructions}</p>` : ''}
                <hr>
                <p>Merci de votre confiance!</p>
                <p>🏆 Victory Restaurant - Votre satisfaction, notre victoire! 🏆</p>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// Geolocation for delivery optimization
function getLocationForDelivery() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log('Customer location:', lat, lon);
                showNotification('Localisation détectée pour optimiser la livraison 📍', 'info');
            },
            function(error) {
                console.warn('Geolocation error:', error);
                showNotification('Localisation non disponible, livraison standard', 'warning');
            }
        );
    } else {
        showNotification('Géolocalisation non supportée par ce navigateur', 'warning');
    }
}

// PWA Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateQuantity,
        formatPrice,
        calculateDeliveryTime,
        validateCheckoutForm
    };
}

console.log('🏆 Victory Restaurant JavaScript loaded successfully!');


// Emergency Button Handler
function handleEmergency() {
    // Numéros d'urgence au Congo-Brazzaville
    const emergencyNumbers = {
        police: '117',
        pompiers: '118',
        ambulance: '112',
        general: '112'
    };
    
    // Créer un modal d'urgence
    const modal = document.createElement('div');
    modal.className = 'emergency-modal';
    modal.innerHTML = `
        <div class="emergency-modal-content">
            <h2 style="color: #ff0000; margin-bottom: 20px;">🆘 NUMÉROS D'URGENCE</h2>
            <div class="emergency-numbers">
                <a href="tel:117" class="emergency-number-btn">
                    <span class="emergency-service">👮 POLICE</span>
                    <span class="emergency-phone">117</span>
                </a>
                <a href="tel:118" class="emergency-number-btn">
                    <span class="emergency-service">🚒 POMPIERS</span>
                    <span class="emergency-phone">118</span>
                </a>
                <a href="tel:112" class="emergency-number-btn">
                    <span class="emergency-service">🚑 AMBULANCE</span>
                    <span class="emergency-phone">112</span>
                </a>
                <a href="tel:112" class="emergency-number-btn">
                    <span class="emergency-service">📞 URGENCE GÉNÉRALE</span>
                    <span class="emergency-phone">112</span>
                </a>
            </div>
            <button onclick="closeEmergencyModal()" class="close-emergency-btn">Fermer</button>
        </div>
    `;
    
    // Ajouter les styles pour le modal
    const style = document.createElement('style');
    style.textContent = `
        .emergency-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .emergency-modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        
        .emergency-numbers {
            display: grid;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .emergency-number-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background: linear-gradient(135deg, #ff6b00, #ff8c00);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            transition: all 0.3s ease;
            font-weight: bold;
        }
        
        .emergency-number-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 0, 0.4);
        }
        
        .emergency-service {
            font-size: 14px;
        }
        
        .emergency-phone {
            font-size: 20px;
        }
        
        .close-emergency-btn {
            padding: 10px 30px;
            background: #666;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s ease;
        }
        
        .close-emergency-btn:hover {
            background: #555;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
}

// Fonction pour fermer le modal d'urgence
function closeEmergencyModal() {
    const modal = document.querySelector('.emergency-modal');
    if (modal) {
        modal.remove();
    }
}

// Ajouter un écouteur pour la touche Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEmergencyModal();
    }
});

console.log('🆘 Emergency button functionality loaded!');