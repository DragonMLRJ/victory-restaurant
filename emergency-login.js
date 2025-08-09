// ACCÈS D'URGENCE SIMPLE - TOUJOURS FONCTIONNEL
function emergencyLogin() {
    console.log('🚨 ACCÈS D\'URGENCE ACTIVÉ');
    
    // Masquer login, afficher dashboard
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    
    // Créer un dashboard simple mais fonctionnel
    document.getElementById('adminDashboard').innerHTML = `
        <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #ff6b00, #ff8c00); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
                <h1 style="margin: 0 0 10px 0; font-size: 2.5rem;">🏆 Victory Restaurant</h1>
                <h2 style="margin: 0; font-size: 1.5rem; opacity: 0.9;">Dashboard Administrateur</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.8;">Système de gestion des commandes - Version d'urgence</p>
            </div>
            
            <!-- Statistiques Rapides -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: white; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; color: #ff6b00; font-weight: bold;" id="statsOrders">0</div>
                    <div style="color: #666; font-size: 1.1rem;">Commandes Aujourd'hui</div>
                </div>
                <div style="background: white; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; color: #26de81; font-weight: bold;" id="statsRevenue">0 FCFA</div>
                    <div style="color: #666; font-size: 1.1rem;">Chiffre d'Affaires</div>
                </div>
                <div style="background: white; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; color: #3742fa; font-weight: bold;" id="statsPending">0</div>
                    <div style="color: #666; font-size: 1.1rem;">En Cours</div>
                </div>
                <div style="background: white; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; color: #2ed573; font-weight: bold;">23min</div>
                    <div style="color: #666; font-size: 1.1rem;">Temps Moyen</div>
                </div>
            </div>
            
            <!-- Actions Rapides -->
            <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <h3 style="color: #ff6b00; margin-bottom: 20px; font-size: 1.5rem;">⚡ Actions Rapides</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <button onclick="generateTestData()" style="padding: 15px; background: #ff6b00; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold;">
                        📝 Créer Données Test
                    </button>
                    <button onclick="showOrdersList()" style="padding: 15px; background: #3742fa; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold;">
                        📋 Voir Commandes
                    </button>
                    <button onclick="exportData()" style="padding: 15px; background: #26de81; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold;">
                        💾 Exporter Données
                    </button>
                    <button onclick="location.reload()" style="padding: 15px; background: #ff4757; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold;">
                        🔄 Recharger
                    </button>
                </div>
            </div>
            
            <!-- Liste des Commandes -->
            <div id="ordersSection" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <h3 style="color: #ff6b00; margin-bottom: 20px; font-size: 1.5rem;">📋 Commandes Récentes</h3>
                <div id="ordersList">
                    <p style="text-align: center; color: #666; padding: 40px;">
                        Aucune commande trouvée. Cliquez sur "Créer Données Test" pour ajouter des exemples.
                    </p>
                </div>
            </div>
            
            <!-- Déconnexion -->
            <div style="text-align: center; margin-top: 30px;">
                <button onclick="document.getElementById('loginSection').style.display='block'; document.getElementById('adminDashboard').style.display='none';" 
                        style="padding: 15px 30px; background: #ff4757; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold;">
                    🚪 Retour à la Connexion
                </button>
            </div>
        </div>
    `;
    
    // Charger les données existantes
    loadDashboardData();
}

// Charger et afficher les données
function loadDashboardData() {
    try {
        const orders = JSON.parse(localStorage.getItem('victoryOrders') || '[]');
        
        // Calculer les statistiques
        const today = new Date().toDateString();
        const todayOrders = orders.filter(order => {
            try {
                const orderDate = new Date(order.timestamp).toDateString();
                return orderDate === today;
            } catch {
                return false;
            }
        });
        
        const todayRevenue = todayOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const pendingOrders = orders.filter(order => ['pending', 'confirmed', 'preparing'].includes(order.status));
        
        // Mettre à jour les statistiques
        document.getElementById('statsOrders').textContent = todayOrders.length;
        document.getElementById('statsRevenue').textContent = todayRevenue.toLocaleString() + ' FCFA';
        document.getElementById('statsPending').textContent = pendingOrders.length;
        
        // Afficher les commandes
        showOrdersList();
        
    } catch (error) {
        console.error('Erreur chargement données:', error);
    }
}

// Afficher la liste des commandes
function showOrdersList() {
    try {
        const orders = JSON.parse(localStorage.getItem('victoryOrders') || '[]');
        const ordersList = document.getElementById('ordersList');
        
        if (orders.length === 0) {
            ordersList.innerHTML = `
                <p style="text-align: center; color: #666; padding: 40px;">
                    Aucune commande trouvée. Cliquez sur "Créer Données Test" pour ajouter des exemples.
                </p>
            `;
            return;
        }
        
        const ordersHtml = orders.slice(0, 10).map(order => `
            <div style="border: 1px solid #eee; border-radius: 8px; padding: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong style="color: #ff6b00;">#${order.id}</strong> - 
                    <span style="color: #333;">${order.customerName || 'Client'}</span><br>
                    <small style="color: #666;">${order.timestamp} - ${(order.total || 0).toLocaleString()} FCFA</small>
                </div>
                <div>
                    <span style="padding: 5px 10px; background: ${getStatusColor(order.status)}; color: white; border-radius: 15px; font-size: 0.8rem;">
                        ${getStatusLabel(order.status)}
                    </span>
                </div>
            </div>
        `).join('');
        
        ordersList.innerHTML = ordersHtml;
        
    } catch (error) {
        console.error('Erreur affichage commandes:', error);
        document.getElementById('ordersList').innerHTML = '<p style="color: #ff4757;">Erreur lors du chargement des commandes</p>';
    }
}

// Créer des données de test
function generateTestData() {
    const testOrders = [];
    const customers = ['Marie Kouala', 'Jean Mbemba', 'Grace Nzambi', 'Paul Massamba', 'Sylvie Makaya'];
    const items = ['Burger Victory', 'Chicken Délice', 'Pizza Margherita', 'Frites Victory', 'Salade César'];
    const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];
    
    for (let i = 1; i <= 10; i++) {
        const order = {
            id: (12340 + i).toString(),
            customerName: customers[Math.floor(Math.random() * customers.length)],
            phone: '+242 06 ' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
            items: [{ name: items[Math.floor(Math.random() * items.length)], quantity: Math.floor(Math.random() * 3) + 1 }],
            total: Math.floor(Math.random() * 15000) + 3000,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            timestamp: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000).toLocaleString('fr-FR')
        };
        testOrders.push(order);
    }
    
    localStorage.setItem('victoryOrders', JSON.stringify(testOrders));
    loadDashboardData();
    
    alert('✅ 10 commandes de test créées avec succès!');
}

// Exporter les données
function exportData() {
    try {
        const orders = JSON.parse(localStorage.getItem('victoryOrders') || '[]');
        const dataStr = JSON.stringify(orders, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'victory-restaurant-orders.json';
        link.click();
        URL.revokeObjectURL(url);
        
        alert('💾 Données exportées avec succès!');
    } catch (error) {
        console.error('Erreur export:', error);
        alert('❌ Erreur lors de l\'export');
    }
}

// Utilitaires
function getStatusColor(status) {
    const colors = {
        'pending': '#ffa502',
        'confirmed': '#3742fa', 
        'preparing': '#ff6b00',
        'ready': '#2ed573',
        'delivering': '#1e90ff',
        'completed': '#26de81',
        'cancelled': '#ff4757'
    };
    return colors[status] || '#666';
}

function getStatusLabel(status) {
    const labels = {
        'pending': 'En Attente',
        'confirmed': 'Confirmée',
        'preparing': 'En Préparation', 
        'ready': 'Prête',
        'delivering': 'En Livraison',
        'completed': 'Livrée',
        'cancelled': 'Annulée'
    };
    return labels[status] || status;
}
