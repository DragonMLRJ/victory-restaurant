// Victory Restaurant - Admin Dashboard Management

// Configuration Firebase (sera initialisée plus tard)
let firebaseConfig = null;
let db = null;

// Cache pour les données
let ordersCache = [];
let statsCache = {};

// Initialisation du dashboard admin
function initAdminDashboard() {
    console.log('🔐 Initialisation Dashboard Admin');
    
    // Charger les données locales d'abord
    loadLocalData();
    
    // Essayer de se connecter à Firebase si configuré
    if (firebaseConfig) {
        initFirebase();
    }
    
    // Mise à jour automatique toutes les 30 secondes
    setInterval(refreshDashboard, 30000);
}

// Charger les données locales
function loadLocalData() {
    try {
        const orders = JSON.parse(localStorage.getItem('victoryOrders') || '[]');
        ordersCache = orders;
        updateDashboardStats(orders);
    } catch (error) {
        console.error('Erreur chargement données locales:', error);
        ordersCache = [];
    }
}

// Mettre à jour les statistiques du dashboard
function updateDashboardStats(orders = ordersCache) {
    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    // Calculer les statistiques
    const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.timestamp.split(' ')[0].split('/').reverse().join('-'));
        return orderDate.toDateString() === today;
    });
    
    const monthlyOrders = orders.filter(order => {
        const orderDate = new Date(order.timestamp.split(' ')[0].split('/').reverse().join('-'));
        return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear;
    });
    
    const pendingOrders = orders.filter(order => 
        !['livré', 'annulé'].includes(order.status)
    );
    
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);
    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.total, 0);
    
    // Temps moyen de livraison (simulation)
    const avgDeliveryTime = calculateAverageDeliveryTime(orders);
    
    // Mettre à jour l'interface
    updateStatElement('todayOrders', todayOrders.length);
    updateStatElement('todayRevenue', formatNumberShort(todayRevenue));
    updateStatElement('pendingOrders', pendingOrders.length);
    updateStatElement('avgDeliveryTime', avgDeliveryTime + 'min');
    updateStatElement('monthlyRevenue', formatNumberShort(monthlyRevenue));
    
    // Sauvegarder dans le cache
    statsCache = {
        todayOrders: todayOrders.length,
        todayRevenue,
        pendingOrders: pendingOrders.length,
        avgDeliveryTime,
        monthlyRevenue,
        lastUpdate: new Date().toISOString()
    };
}

// Mettre à jour un élément statistique
function updateStatElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        // Animation de changement de valeur
        element.style.transform = 'scale(1.1)';
        element.style.color = 'var(--primary-color)';
        
        setTimeout(() => {
            element.textContent = value;
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 200);
    }
}

// Formater les grands nombres
function formatNumberShort(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
}

// Calculer le temps moyen de livraison
function calculateAverageDeliveryTime(orders) {
    const deliveredOrders = orders.filter(order => order.status === 'livré');
    if (deliveredOrders.length === 0) return 25; // Valeur par défaut
    
    // Simulation basée sur le nombre de commandes
    const baseTime = 20;
    const loadFactor = Math.min(deliveredOrders.length / 10, 2);
    return Math.round(baseTime + loadFactor * 5);
}

// Rafraîchir le dashboard
function refreshDashboard() {
    console.log('🔄 Rafraîchissement dashboard...');
    
    // Recharger depuis localStorage
    loadLocalData();
    
    // Recharger la liste des commandes si affichée
    const ordersManager = document.getElementById('ordersManager');
    if (ordersManager && ordersManager.style.display !== 'none') {
        loadOrdersList();
    }
    
    // Mettre à jour l'activité récente
    loadRecentActivity();
}

// Charger les commandes récentes
function loadRecentOrders() {
    const recentOrders = ordersCache.slice(-5).reverse();
    console.log('📋 Commandes récentes:', recentOrders.length);
    return recentOrders;
}

// Mettre à jour le statut d'une commande
function updateOrderStatusAdmin(selectElement, orderNumber) {
    const newStatus = selectElement.value;
    
    // Mettre à jour dans le cache local
    const orderIndex = ordersCache.findIndex(order => order.orderNumber == orderNumber);
    if (orderIndex !== -1) {
        ordersCache[orderIndex].status = newStatus;
        
        // Sauvegarder en localStorage
        localStorage.setItem('victoryOrders', JSON.stringify(ordersCache));
        
        // Mettre à jour les statistiques
        updateDashboardStats();
        
        // Feedback visuel
        selectElement.style.background = 'var(--success-color)';
        selectElement.style.color = 'var(--text-inverse)';
        
        setTimeout(() => {
            selectElement.style.background = '';
            selectElement.style.color = '';
        }, 1000);
        
        showNotification(`Commande #${orderNumber} mise à jour: ${newStatus}`, 'success');
        
        // Mettre à jour l'activité
        addActivity(`Statut mis à jour pour commande #${orderNumber}`, '⚡');
        
        // Synchroniser avec Firebase si disponible
        if (db) {
            syncOrderToFirebase(ordersCache[orderIndex]);
        }
    }
}

// Ajouter une activité récente
function addActivity(description, icon = '📋') {
    const recentActivity = document.getElementById('recentActivity');
    if (!recentActivity) return;
    
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.style.animation = 'slideInLeft 0.3s ease';
    
    activityItem.innerHTML = `
        <div class="activity-icon">${icon}</div>
        <div class="activity-content">
            <div class="activity-title">${description}</div>
            <div class="activity-time">À l'instant</div>
        </div>
    `;
    
    // Ajouter en premier
    recentActivity.insertBefore(activityItem, recentActivity.firstChild);
    
    // Limiter à 5 activités
    const items = recentActivity.querySelectorAll('.activity-item');
    if (items.length > 5) {
        items[items.length - 1].remove();
    }
}

// Exporter les données vers CSV
function exportOrdersToCSV() {
    const csvContent = generateOrdersCSV(ordersCache);
    downloadCSV(csvContent, 'victory-orders-' + new Date().toISOString().split('T')[0] + '.csv');
    showNotification('Export CSV téléchargé! 📊', 'success');
}

// Générer le CSV des commandes
function generateOrdersCSV(orders) {
    const headers = ['Numéro', 'Date', 'Client', 'Téléphone', 'Total', 'Statut', 'Adresse'];
    const rows = orders.map(order => [
        order.orderNumber,
        order.timestamp,
        order.customer.name,
        order.customer.phone,
        order.total,
        order.status,
        order.customer.address.replace(/,/g, ';') // Éviter les conflits avec les virgules CSV
    ]);
    
    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
    
    return csvContent;
}

// Télécharger un fichier CSV
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Filtrer les commandes
function filterOrders(filterType) {
    let filteredOrders = [...ordersCache];
    
    switch (filterType) {
        case 'today':
            const today = new Date().toDateString();
            filteredOrders = ordersCache.filter(order => {
                const orderDate = new Date(order.timestamp.split(' ')[0].split('/').reverse().join('-'));
                return orderDate.toDateString() === today;
            });
            break;
        case 'pending':
            filteredOrders = ordersCache.filter(order => 
                !['livré', 'annulé'].includes(order.status)
            );
            break;
        case 'delivered':
            filteredOrders = ordersCache.filter(order => order.status === 'livré');
            break;
    }
    
    return filteredOrders;
}

// Rechercher des commandes
function searchOrders(query) {
    if (!query.trim()) return ordersCache;
    
    const searchTerm = query.toLowerCase();
    return ordersCache.filter(order => 
        order.orderNumber.toString().includes(searchTerm) ||
        order.customer.name.toLowerCase().includes(searchTerm) ||
        order.customer.phone.includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm)
    );
}

// Initialisation Firebase (placeholders pour future intégration)
function initFirebase() {
    console.log('🔥 Initialisation Firebase...');
    // TODO: Implémenter l'initialisation Firebase
    // firebase.initializeApp(firebaseConfig);
    // db = firebase.firestore();
}

// Synchroniser une commande avec Firebase
function syncOrderToFirebase(order) {
    if (!db) return;
    
    // TODO: Implémenter la synchronisation Firebase
    console.log('🔥 Sync Firebase:', order.orderNumber);
}

// Sauvegarder la configuration
function saveAdminConfig(config) {
    try {
        localStorage.setItem('victoryAdminConfig', JSON.stringify(config));
        showNotification('Configuration sauvegardée! ⚙️', 'success');
    } catch (error) {
        console.error('Erreur sauvegarde config:', error);
        showNotification('Erreur lors de la sauvegarde', 'error');
    }
}

// Charger la configuration
function loadAdminConfig() {
    try {
        const config = localStorage.getItem('victoryAdminConfig');
        return config ? JSON.parse(config) : {};
    } catch (error) {
        console.error('Erreur chargement config:', error);
        return {};
    }
}

// Générer un rapport quotidien
function generateDailyReport() {
    const today = new Date().toDateString();
    const todayOrders = ordersCache.filter(order => {
        const orderDate = new Date(order.timestamp.split(' ')[0].split('/').reverse().join('-'));
        return orderDate.toDateString() === today;
    });
    
    const report = {
        date: today,
        totalOrders: todayOrders.length,
        totalRevenue: todayOrders.reduce((sum, order) => sum + order.total, 0),
        averageOrderValue: todayOrders.length > 0 ? 
            Math.round(todayOrders.reduce((sum, order) => sum + order.total, 0) / todayOrders.length) : 0,
        statusBreakdown: {
            'livré': todayOrders.filter(o => o.status === 'livré').length,
            'en livraison': todayOrders.filter(o => o.status === 'en livraison').length,
            'en préparation': todayOrders.filter(o => o.status === 'en préparation').length,
            'confirmée': todayOrders.filter(o => o.status === 'confirmée').length
        },
        topItems: getTopItems(todayOrders)
    };
    
    return report;
}

// Obtenir les articles les plus vendus
function getTopItems(orders) {
    const itemCounts = {};
    
    orders.forEach(order => {
        order.items.forEach(item => {
            itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
        });
    });
    
    return Object.entries(itemCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));
}

// Notification système pour les nouveaux événements
function checkForNewOrders() {
    const lastCheck = localStorage.getItem('lastOrderCheck');
    const currentOrderCount = ordersCache.length;
    
    if (lastCheck && parseInt(lastCheck) < currentOrderCount) {
        const newOrdersCount = currentOrderCount - parseInt(lastCheck);
        showNotification(`${newOrdersCount} nouvelle(s) commande(s)! 🛒`, 'info');
        
        // Son de notification (si supporté)
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Victory Restaurant', {
                body: `${newOrdersCount} nouvelle(s) commande(s) reçue(s)`,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🏆</text></svg>'
            });
        }
    }
    
    localStorage.setItem('lastOrderCheck', currentOrderCount.toString());
}

// Demander permission pour les notifications
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification('Notifications activées! 🔔', 'success');
            }
        });
    }
}

// Initialiser le système de notifications
document.addEventListener('DOMContentLoaded', function() {
    if (typeof authState !== 'undefined' && authState.isAuthenticated) {
        requestNotificationPermission();
        
        // Vérifier les nouvelles commandes toutes les minutes
        setInterval(checkForNewOrders, 60000);
    }
});

console.log('🔐 Module Admin Dashboard chargé!');
