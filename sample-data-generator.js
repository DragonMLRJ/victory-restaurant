// Victory Restaurant - Sample Data Generator for Testing Dashboard

function generateSampleOrders() {
    const sampleCustomers = [
        { name: "Marie Kouala", phone: "+242 06 123 4567", address: "Quartier Moungali, Brazzaville" },
        { name: "Jean Mbemba", phone: "+242 06 234 5678", address: "Plateau des 15 ans, Brazzaville" },
        { name: "Grace Nzambi", phone: "+242 06 345 6789", address: "Bacongo, Brazzaville" },
        { name: "Paul Massamba", phone: "+242 06 456 7890", address: "Poto-Poto, Brazzaville" },
        { name: "Sylvie Makaya", phone: "+242 06 567 8901", address: "Ouenzé, Brazzaville" },
        { name: "Michel Poaty", phone: "+242 06 678 9012", address: "Talangaï, Brazzaville" },
        { name: "Antoinette Malonga", phone: "+242 06 789 0123", address: "Makélékélé, Brazzaville" }
    ];

    const sampleItems = [
        { name: "Burger Victory", price: 3500, category: "burgers" },
        { name: "Chicken Délice", price: 4000, category: "burgers" },
        { name: "Fish Burger", price: 3800, category: "burgers" },
        { name: "Pizza Margherita", price: 5500, category: "pizzas" },
        { name: "Pizza 4 Fromages", price: 6500, category: "pizzas" },
        { name: "Frites Victory", price: 1500, category: "sides" },
        { name: "Salade César", price: 2500, category: "salads" },
        { name: "Coca-Cola", price: 800, category: "drinks" },
        { name: "Jus d'Orange", price: 1000, category: "drinks" },
        { name: "Eau Minérale", price: 600, category: "drinks" }
    ];

    const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'completed'];
    const orders = [];

    // Generate 15 sample orders with different statuses and times
    for (let i = 1; i <= 15; i++) {
        const customer = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];
        const orderItems = [];
        const numItems = Math.floor(Math.random() * 4) + 1; // 1-4 items per order

        // Generate random items for the order
        for (let j = 0; j < numItems; j++) {
            const item = sampleItems[Math.floor(Math.random() * sampleItems.length)];
            const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
            orderItems.push({
                name: item.name,
                price: item.price,
                quantity: quantity,
                category: item.category,
                customization: Math.random() > 0.8 ? "Sans sauce piquante" : ""
            });
        }

        // Calculate total
        const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Generate timestamp (last 2 hours)
        const now = new Date();
        const orderTime = new Date(now.getTime() - Math.random() * 2 * 60 * 60 * 1000);
        const timestamp = orderTime.toLocaleString('fr-FR');

        const order = {
            id: (12340 + i).toString(),
            customerName: customer.name,
            phone: customer.phone,
            address: customer.address,
            items: orderItems,
            total: total,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            timestamp: timestamp,
            estimatedTime: Math.max(15, orderItems.length * 5),
            priority: 'normal',
            lastStatusUpdate: timestamp
        };

        orders.push(order);
    }

    return orders;
}

function loadSampleData() {
    const existingOrders = JSON.parse(localStorage.getItem('victoryOrders') || '[]');
    
    if (existingOrders.length === 0) {
        const sampleOrders = generateSampleOrders();
        localStorage.setItem('victoryOrders', JSON.stringify(sampleOrders));
        
        console.log('📝 Données d\'exemple chargées:', sampleOrders.length, 'commandes');
        showNotification(`📝 ${sampleOrders.length} commandes d'exemple ajoutées pour tester le dashboard!`, 'info');
        
        // Refresh dashboard if it's loaded
        if (typeof refreshDashboardData === 'function') {
            refreshDashboardData();
        }
    } else {
        console.log('📋 Données existantes trouvées:', existingOrders.length, 'commandes');
    }
}

function clearAllOrders() {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les commandes? Cette action est irréversible.')) {
        localStorage.removeItem('victoryOrders');
        localStorage.removeItem('victoryActivities');
        showNotification('🗑️ Toutes les commandes ont été supprimées!', 'info');
        
        // Refresh dashboard if it's loaded
        if (typeof refreshDashboardData === 'function') {
            refreshDashboardData();
        }
    }
}

function addQuickTestOrder() {
    const existingOrders = JSON.parse(localStorage.getItem('victoryOrders') || '[]');
    
    const testOrder = {
        id: Date.now().toString().slice(-6),
        customerName: "Client Test",
        phone: "+242 06 999 9999",
        address: "Adresse de test, Brazzaville",
        items: [
            { name: "Burger Victory", price: 3500, quantity: 1, category: "burgers" },
            { name: "Frites Victory", price: 1500, quantity: 1, category: "sides" },
            { name: "Coca-Cola", price: 800, quantity: 1, category: "drinks" }
        ],
        total: 5800,
        status: 'pending',
        timestamp: new Date().toLocaleString('fr-FR'),
        estimatedTime: 20,
        priority: 'normal',
        lastStatusUpdate: new Date().toLocaleString('fr-FR')
    };

    existingOrders.unshift(testOrder);
    localStorage.setItem('victoryOrders', JSON.stringify(existingOrders));
    
    showNotification(`✅ Nouvelle commande test #${testOrder.id} ajoutée!`, 'success');
    
    // Refresh dashboard if it's loaded
    if (typeof refreshDashboardData === 'function') {
        refreshDashboardData();
    }
}

// Auto-load sample data when script loads (only if no orders exist)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadSampleData, 1000); // Wait a bit for other scripts to load
});

// Export functions for use in console/debugging
window.generateSampleOrders = generateSampleOrders;
window.loadSampleData = loadSampleData;
window.clearAllOrders = clearAllOrders;
window.addQuickTestOrder = addQuickTestOrder;