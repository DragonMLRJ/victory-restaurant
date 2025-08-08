// Victory Restaurant - Enhanced Professional Admin Dashboard
// Complete order management system with real-time updates

// State management for the dashboard
let dashboardState = {
    currentView: 'overview',
    orders: [],
    stats: {},
    filters: {
        status: 'all',
        dateRange: 'today',
        customer: ''
    },
    realTimeUpdate: true,
    lastUpdate: null
};

// Order status configurations
const ORDER_STATUS_CONFIG = {
    'pending': { 
        label: 'En Attente', 
        color: '#ffa502', 
        icon: '⏳',
        next: ['confirmed', 'cancelled']
    },
    'confirmed': { 
        label: 'Confirmée', 
        color: '#3742fa', 
        icon: '✅',
        next: ['preparing', 'cancelled']
    },
    'preparing': { 
        label: 'En Préparation', 
        color: '#ff6b00', 
        icon: '👨‍🍳',
        next: ['ready', 'cancelled']
    },
    'ready': { 
        label: 'Prête', 
        color: '#2ed573', 
        icon: '🍽️',
        next: ['delivering', 'completed']
    },
    'delivering': { 
        label: 'En Livraison', 
        color: '#1e90ff', 
        icon: '🚗',
        next: ['completed', 'cancelled']
    },
    'completed': { 
        label: 'Livrée', 
        color: '#26de81', 
        icon: '✨',
        next: []
    },
    'cancelled': { 
        label: 'Annulée', 
        color: '#ff4757', 
        icon: '❌',
        next: []
    }
};

// Initialize enhanced dashboard
function initEnhancedDashboard() {
    console.log('🚀 Initializing Enhanced Professional Dashboard');
    
    loadOrdersData();
    createDashboardUI();
    setupRealTimeUpdates();
    setupKeyboardShortcuts();
    
    // Update every 30 seconds
    setInterval(refreshDashboardData, 30000);
}

// Load orders from localStorage and process
function loadOrdersData() {
    try {
        const orders = JSON.parse(localStorage.getItem('victoryOrders') || '[]');
        dashboardState.orders = orders.map(order => ({
            ...order,
            id: order.id || generateOrderId(),
            status: order.status || 'pending',
            timestamp: order.timestamp || new Date().toLocaleString('fr-FR'),
            estimatedTime: order.estimatedTime || calculateEstimatedTime(order.items),
            priority: calculateOrderPriority(order)
        }));
        
        calculateDashboardStats();
        dashboardState.lastUpdate = new Date();
        
    } catch (error) {
        console.error('Error loading orders:', error);
        dashboardState.orders = [];
    }
}

// Calculate comprehensive dashboard statistics
function calculateDashboardStats() {
    const orders = dashboardState.orders;
    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    // Filter orders by date
    const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.timestamp.split(' ')[0].split('/').reverse().join('-'));
        return orderDate.toDateString() === today;
    });
    
    const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.timestamp.split(' ')[0].split('/').reverse().join('-'));
        return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear;
    });
    
    // Calculate statistics
    dashboardState.stats = {
        // Today stats
        todayOrders: todayOrders.length,
        todayRevenue: todayOrders.reduce((sum, order) => sum + (order.total || 0), 0),
        todayCompleted: todayOrders.filter(o => o.status === 'completed').length,
        
        // Current status counts
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        ready: orders.filter(o => o.status === 'ready').length,
        delivering: orders.filter(o => o.status === 'delivering').length,
        
        // Monthly stats
        monthlyOrders: monthOrders.length,
        monthlyRevenue: monthOrders.reduce((sum, order) => sum + (order.total || 0), 0),
        
        // Performance metrics
        avgOrderValue: orders.length > 0 ? 
            orders.reduce((sum, order) => sum + (order.total || 0), 0) / orders.length : 0,
        avgDeliveryTime: calculateAverageDeliveryTime(orders),
        customerSatisfaction: calculateCustomerSatisfaction(orders),
        
        // Recent trends
        hourlyOrders: calculateHourlyDistribution(todayOrders),
        topItems: calculateTopItems(orders),
        recentActivity: generateRecentActivity(orders.slice(-10))
    };
}

// Create professional dashboard UI
function createDashboardUI() {
    const dashboardContainer = document.getElementById('adminDashboard');
    if (!dashboardContainer) return;
    
    dashboardContainer.innerHTML = `
        <!-- Dashboard Header -->
        <div class="dashboard-header">
            <div class="dashboard-title">
                <h1>📊 Victory Restaurant - Dashboard</h1>
                <div class="last-update">
                    Dernière mise à jour: <span id="lastUpdateTime">${formatTime(new Date())}</span>
                    <button id="refreshBtn" onclick="refreshDashboardData()" class="refresh-btn">🔄</button>
                </div>
            </div>
            
            <!-- Dashboard Navigation -->
            <div class="dashboard-nav">
                <button class="nav-btn active" onclick="showDashboardView('overview')" data-view="overview">
                    📈 Vue d'ensemble
                </button>
                <button class="nav-btn" onclick="showDashboardView('orders')" data-view="orders">
                    📋 Commandes (${dashboardState.orders.length})
                </button>
                <button class="nav-btn" onclick="showDashboardView('kitchen')" data-view="kitchen">
                    👨‍🍳 Cuisine (${dashboardState.stats.preparing || 0})
                </button>
                <button class="nav-btn" onclick="showDashboardView('delivery')" data-view="delivery">
                    🚗 Livraison (${dashboardState.stats.delivering || 0})
                </button>
                <button class="nav-btn" onclick="showDashboardView('reports')" data-view="reports">
                    📊 Rapports
                </button>
            </div>
        </div>

        <!-- Dashboard Content -->
        <div id="dashboardContent">
            ${createOverviewContent()}
        </div>
    `;
    
    // Add custom styles for enhanced dashboard
    addDashboardStyles();
}

// Create overview content
function createOverviewContent() {
    const stats = dashboardState.stats;
    
    return `
        <!-- Key Performance Indicators -->
        <div class="kpi-grid">
            <div class="kpi-card revenue">
                <div class="kpi-icon">💰</div>
                <div class="kpi-content">
                    <div class="kpi-value">${formatCurrency(stats.todayRevenue || 0)}</div>
                    <div class="kpi-label">CA Aujourd'hui</div>
                    <div class="kpi-trend positive">+12% vs hier</div>
                </div>
            </div>
            
            <div class="kpi-card orders">
                <div class="kpi-icon">📦</div>
                <div class="kpi-content">
                    <div class="kpi-value">${stats.todayOrders || 0}</div>
                    <div class="kpi-label">Commandes Aujourd'hui</div>
                    <div class="kpi-trend positive">+${stats.todayCompleted || 0} livrées</div>
                </div>
            </div>
            
            <div class="kpi-card avg-order">
                <div class="kpi-icon">🛒</div>
                <div class="kpi-content">
                    <div class="kpi-value">${formatCurrency(stats.avgOrderValue || 0)}</div>
                    <div class="kpi-label">Panier Moyen</div>
                    <div class="kpi-trend neutral">Stable</div>
                </div>
            </div>
            
            <div class="kpi-card delivery-time">
                <div class="kpi-icon">⏱️</div>
                <div class="kpi-content">
                    <div class="kpi-value">${stats.avgDeliveryTime || '25'}min</div>
                    <div class="kpi-label">Temps Moyen</div>
                    <div class="kpi-trend positive">-3min vs hier</div>
                </div>
            </div>
        </div>

        <!-- Status Overview -->
        <div class="status-overview">
            <h3>📋 État des Commandes en Temps Réel</h3>
            <div class="status-grid">
                ${Object.entries(ORDER_STATUS_CONFIG).map(([status, config]) => {
                    const count = dashboardState.stats[status] || 0;
                    return `
                        <div class="status-card ${status}" onclick="showDashboardView('orders', '${status}')">
                            <div class="status-icon">${config.icon}</div>
                            <div class="status-count">${count}</div>
                            <div class="status-label">${config.label}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <!-- Live Orders Queue -->
        <div class="live-orders">
            <div class="section-header">
                <h3>🔥 Queue des Commandes Actives</h3>
                <div class="section-actions">
                    <button onclick="refreshDashboardData()" class="action-btn">🔄 Actualiser</button>
                    <button onclick="showDashboardView('orders')" class="action-btn">📋 Voir Tout</button>
                </div>
            </div>
            
            <div class="orders-queue">
                ${createActiveOrdersQueue()}
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions-panel">
            <h3>⚡ Actions Rapides</h3>
            <div class="actions-grid">
                <button class="action-card" onclick="createManualOrder()">
                    <div class="action-icon">➕</div>
                    <div class="action-label">Nouvelle Commande</div>
                </button>
                
                <button class="action-card" onclick="showDashboardView('kitchen')">
                    <div class="action-icon">👨‍🍳</div>
                    <div class="action-label">Vue Cuisine</div>
                </button>
                
                <button class="action-card" onclick="generateDailyReport()">
                    <div class="action-icon">📊</div>
                    <div class="action-label">Rapport Journalier</div>
                </button>
                
                <button class="action-card" onclick="exportOrders()">
                    <div class="action-icon">💾</div>
                    <div class="action-label">Exporter Données</div>
                </button>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="recent-activity-panel">
            <h3>📈 Activité Récente</h3>
            <div class="activity-list">
                ${(stats.recentActivity || []).map(activity => `
                    <div class="activity-item">
                        <div class="activity-icon">${activity.icon}</div>
                        <div class="activity-content">
                            <div class="activity-text">${activity.text}</div>
                            <div class="activity-time">${activity.time}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}// Create active orders queue for live monitoring
function createActiveOrdersQueue() {
    const activeOrders = dashboardState.orders.filter(order => 
        !['completed', 'cancelled'].includes(order.status)
    );
    
    if (activeOrders.length === 0) {
        return `
            <div class="empty-queue">
                <div class="empty-icon">🎉</div>
                <div class="empty-text">Aucune commande active - Tout est à jour!</div>
            </div>
        `;
    }
    
    return activeOrders.map(order => {
        const config = ORDER_STATUS_CONFIG[order.status];
        const timeElapsed = calculateTimeElapsed(order.timestamp);
        const priority = order.priority || 'normal';
        
        return `
            <div class="queue-order ${order.status} priority-${priority}" data-order-id="${order.id}">
                <div class="order-header">
                    <div class="order-number">#${order.id}</div>
                    <div class="order-status" style="color: ${config.color}">
                        ${config.icon} ${config.label}
                    </div>
                    <div class="order-time ${timeElapsed > 30 ? 'urgent' : ''}">${timeElapsed}min</div>
                </div>
                
                <div class="order-details">
                    <div class="customer-info">
                        <strong>${order.customerName || 'Client'}</strong>
                        <span class="phone">${order.phone || ''}</span>
                    </div>
                    <div class="order-total">${formatCurrency(order.total || 0)}</div>
                </div>
                
                <div class="order-items">
                    ${(order.items || []).slice(0, 3).map(item => `
                        <span class="item-badge">${item.quantity}x ${item.name}</span>
                    `).join('')}
                    ${order.items && order.items.length > 3 ? `<span class="more-items">+${order.items.length - 3}</span>` : ''}
                </div>
                
                <div class="order-actions">
                    ${config.next.map(nextStatus => {
                        const nextConfig = ORDER_STATUS_CONFIG[nextStatus];
                        return `
                            <button class="status-btn ${nextStatus}" onclick="updateOrderStatus('${order.id}', '${nextStatus}')">
                                ${nextConfig.icon} ${nextConfig.label}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// Show different dashboard views
function showDashboardView(view, filter = null) {
    dashboardState.currentView = view;
    
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    const content = document.getElementById('dashboardContent');
    
    switch(view) {
        case 'overview':
            content.innerHTML = createOverviewContent();
            break;
            
        case 'orders':
            content.innerHTML = createOrdersManagementView(filter);
            break;
            
        case 'kitchen':
            content.innerHTML = createKitchenView();
            break;
            
        case 'delivery':
            content.innerHTML = createDeliveryView();
            break;
            
        case 'reports':
            content.innerHTML = createReportsView();
            break;
    }
}

// Create orders management view
function createOrdersManagementView(statusFilter = null) {
    let filteredOrders = dashboardState.orders;
    
    if (statusFilter && statusFilter !== 'all') {
        filteredOrders = dashboardState.orders.filter(order => order.status === statusFilter);
    }
    
    return `
        <div class="orders-management">
            <!-- Filters and Search -->
            <div class="orders-controls">
                <div class="search-box">
                    <input type="text" id="orderSearch" placeholder="🔍 Rechercher par client, téléphone, commande..." 
                           onkeyup="filterOrders()" class="search-input">
                </div>
                
                <div class="filter-buttons">
                    <button class="filter-btn ${!statusFilter ? 'active' : ''}" onclick="showDashboardView('orders', null)">
                        Toutes (${dashboardState.orders.length})
                    </button>
                    ${Object.entries(ORDER_STATUS_CONFIG).map(([status, config]) => {
                        const count = dashboardState.orders.filter(o => o.status === status).length;
                        return `
                            <button class="filter-btn ${statusFilter === status ? 'active' : ''}" 
                                    onclick="showDashboardView('orders', '${status}')">
                                ${config.icon} ${config.label} (${count})
                            </button>
                        `;
                    }).join('')}
                </div>
                
                <div class="view-options">
                    <button class="view-btn active" onclick="setOrdersView('list')">📋 Liste</button>
                    <button class="view-btn" onclick="setOrdersView('cards')">🗂️ Cartes</button>
                </div>
            </div>
            
            <!-- Orders List -->
            <div class="orders-container">
                <div class="orders-table">
                    <div class="table-header">
                        <div class="col-id">Commande</div>
                        <div class="col-customer">Client</div>
                        <div class="col-items">Articles</div>
                        <div class="col-total">Total</div>
                        <div class="col-time">Heure</div>
                        <div class="col-status">Statut</div>
                        <div class="col-actions">Actions</div>
                    </div>
                    
                    <div class="table-body" id="ordersTableBody">
                        ${filteredOrders.map(order => createOrderRow(order)).join('')}
                    </div>
                </div>
                
                ${filteredOrders.length === 0 ? `
                    <div class="empty-orders">
                        <div class="empty-icon">📭</div>
                        <div class="empty-text">Aucune commande trouvée</div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Create individual order row
function createOrderRow(order) {
    const config = ORDER_STATUS_CONFIG[order.status];
    const timeElapsed = calculateTimeElapsed(order.timestamp);
    
    return `
        <div class="order-row ${order.status}" data-order-id="${order.id}">
            <div class="col-id">
                <div class="order-number">#${order.id}</div>
                <div class="order-priority priority-${order.priority || 'normal'}">${order.priority || 'normal'}</div>
            </div>
            
            <div class="col-customer">
                <div class="customer-name">${order.customerName || 'Client'}</div>
                <div class="customer-phone">${order.phone || ''}</div>
                <div class="customer-address">${order.address || ''}</div>
            </div>
            
            <div class="col-items">
                <div class="items-summary">
                    ${(order.items || []).slice(0, 2).map(item => `
                        <div class="item-line">${item.quantity}x ${item.name}</div>
                    `).join('')}
                    ${order.items && order.items.length > 2 ? `<div class="more-items">+${order.items.length - 2} autres</div>` : ''}
                </div>
            </div>
            
            <div class="col-total">
                <div class="order-total">${formatCurrency(order.total || 0)}</div>
            </div>
            
            <div class="col-time">
                <div class="order-time">${order.timestamp}</div>
                <div class="elapsed-time ${timeElapsed > 30 ? 'urgent' : ''}">${timeElapsed}min écoulées</div>
            </div>
            
            <div class="col-status">
                <div class="status-badge ${order.status}" style="background-color: ${config.color}20; color: ${config.color};">
                    ${config.icon} ${config.label}
                </div>
            </div>
            
            <div class="col-actions">
                <div class="action-buttons">
                    ${config.next.map(nextStatus => {
                        const nextConfig = ORDER_STATUS_CONFIG[nextStatus];
                        return `
                            <button class="action-btn ${nextStatus}" onclick="updateOrderStatus('${order.id}', '${nextStatus}')" 
                                    title="Marquer comme ${nextConfig.label}">
                                ${nextConfig.icon}
                            </button>
                        `;
                    }).join('')}
                    
                    <button class="action-btn details" onclick="showOrderDetails('${order.id}')" title="Voir détails">
                        👁️
                    </button>
                    
                    <button class="action-btn edit" onclick="editOrder('${order.id}')" title="Modifier">
                        ✏️
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Create kitchen view for food preparation
function createKitchenView() {
    const kitchenOrders = dashboardState.orders.filter(order => 
        ['confirmed', 'preparing'].includes(order.status)
    );
    
    return `
        <div class="kitchen-view">
            <div class="kitchen-header">
                <h2>👨‍🍳 Vue Cuisine - Préparation des Commandes</h2>
                <div class="kitchen-stats">
                    <div class="stat">
                        <span class="stat-number">${kitchenOrders.length}</span>
                        <span class="stat-label">Commandes en cours</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${kitchenOrders.filter(o => o.status === 'confirmed').length}</span>
                        <span class="stat-label">À préparer</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${kitchenOrders.filter(o => o.status === 'preparing').length}</span>
                        <span class="stat-label">En préparation</span>
                    </div>
                </div>
            </div>
            
            <div class="kitchen-board">
                <div class="kitchen-column">
                    <h3 class="column-title confirmed">📝 À Préparer</h3>
                    <div class="kitchen-orders">
                        ${kitchenOrders
                            .filter(order => order.status === 'confirmed')
                            .map(order => createKitchenOrderCard(order))
                            .join('')}
                    </div>
                </div>
                
                <div class="kitchen-column">
                    <h3 class="column-title preparing">👨‍🍳 En Préparation</h3>
                    <div class="kitchen-orders">
                        ${kitchenOrders
                            .filter(order => order.status === 'preparing')
                            .map(order => createKitchenOrderCard(order))
                            .join('')}
                    </div>
                </div>
                
                <div class="kitchen-column">
                    <h3 class="column-title ready">🍽️ Prêtes</h3>
                    <div class="kitchen-orders">
                        ${dashboardState.orders
                            .filter(order => order.status === 'ready')
                            .map(order => createKitchenOrderCard(order))
                            .join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create kitchen order card
function createKitchenOrderCard(order) {
    const timeElapsed = calculateTimeElapsed(order.timestamp);
    const config = ORDER_STATUS_CONFIG[order.status];
    
    return `
        <div class="kitchen-order-card ${order.status} priority-${order.priority || 'normal'}" data-order-id="${order.id}">
            <div class="card-header">
                <div class="order-number">#${order.id}</div>
                <div class="order-time ${timeElapsed > 30 ? 'urgent' : ''}">${timeElapsed}min</div>
            </div>
            
            <div class="card-customer">
                <strong>${order.customerName || 'Client'}</strong>
            </div>
            
            <div class="card-items">
                ${(order.items || []).map(item => `
                    <div class="kitchen-item">
                        <span class="item-qty">${item.quantity}x</span>
                        <span class="item-name">${item.name}</span>
                        ${item.customization ? `<div class="item-custom">${item.customization}</div>` : ''}
                    </div>
                `).join('')}
            </div>
            
            <div class="card-actions">
                ${config.next.map(nextStatus => {
                    const nextConfig = ORDER_STATUS_CONFIG[nextStatus];
                    return `
                        <button class="kitchen-btn ${nextStatus}" onclick="updateOrderStatus('${order.id}', '${nextStatus}')">
                            ${nextConfig.icon} ${nextConfig.label}
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}            grid-template-columns: 100px 200px 250px 120px 150px 120px 150px;
            gap: var(--spacing-md);
            padding: var(--spacing-md);
            border-bottom: 1px solid var(--border-color);
            transition: all 0.3s ease;
            align-items: center;
        }
        
        .order-row:hover {
            background: var(--bg-card);
        }
        
        .order-row.updating {
            animation: pulse 0.6s ease-in-out;
        }
        
        .order-priority {
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: var(--border-radius-sm);
            text-transform: uppercase;
            font-weight: 600;
        }
        
        .priority-normal {
            background: #e9ecef;
            color: #6c757d;
        }
        
        .priority-high {
            background: #ffa50230;
            color: #ffa502;
        }
        
        .priority-urgent {
            background: #ff475730;
            color: #ff4757;
        }
        
        .customer-name {
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .customer-phone, .customer-address {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .items-summary {
            font-size: 0.9rem;
        }
        
        .item-line {
            color: var(--text-primary);
            margin-bottom: 2px;
        }
        
        .more-items {
            color: var(--text-secondary);
            font-style: italic;
        }
        
        .elapsed-time {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .elapsed-time.urgent {
            color: #ff4757;
            font-weight: 600;
        }
        
        .status-badge {
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--border-radius-md);
            font-size: 0.8rem;
            font-weight: 600;
            text-align: center;
        }
        
        .action-buttons {
            display: flex;
            gap: var(--spacing-xs);
            flex-wrap: wrap;
        }
        
        .action-btn {
            padding: var(--spacing-xs);
            border: none;
            border-radius: var(--border-radius-sm);
            cursor: pointer;
            font-size: 0.8rem;
            transition: all 0.3s ease;
            min-width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .action-btn.confirmed { background: #3742fa20; color: #3742fa; }
        .action-btn.confirmed:hover { background: #3742fa; color: white; }
        
        .action-btn.preparing { background: #ff6b0020; color: #ff6b00; }
        .action-btn.preparing:hover { background: #ff6b00; color: white; }
        
        .action-btn.ready { background: #2ed57320; color: #2ed573; }
        .action-btn.ready:hover { background: #2ed573; color: white; }
        
        .action-btn.delivering { background: #1e90ff20; color: #1e90ff; }
        .action-btn.delivering:hover { background: #1e90ff; color: white; }
        
        .action-btn.completed { background: #26de8120; color: #26de81; }
        .action-btn.completed:hover { background: #26de81; color: white; }
        
        .action-btn.cancelled { background: #ff475720; color: #ff4757; }
        .action-btn.cancelled:hover { background: #ff4757; color: white; }
        
        .action-btn.details { background: var(--bg-card); color: var(--text-primary); }
        .action-btn.details:hover { background: var(--primary-color); color: white; }
        
        .action-btn.edit { background: var(--bg-card); color: var(--text-secondary); }
        .action-btn.edit:hover { background: #ffa502; color: white; }
        
        /* Kitchen View Styles */
        .kitchen-view {
            padding: var(--spacing-lg);
        }
        
        .kitchen-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-xl);
            background: var(--bg-card);
            padding: var(--spacing-lg);
            border-radius: var(--border-radius-xl);
            border: 1px solid var(--border-color);
        }
        
        .kitchen-header h2 {
            color: var(--text-primary);
            margin: 0;
        }
        
        .kitchen-stats {
            display: flex;
            gap: var(--spacing-lg);
        }
        
        .kitchen-stats .stat {
            text-align: center;
        }
        
        .kitchen-stats .stat-number {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary-color);
            display: block;
        }
        
        .kitchen-stats .stat-label {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .kitchen-board {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-lg);
        }
        
        .kitchen-column {
            background: var(--bg-card);
            border-radius: var(--border-radius-xl);
            border: 1px solid var(--border-color);
            min-height: 500px;
        }
        
        .column-title {
            padding: var(--spacing-lg);
            margin: 0;
            font-size: 1.1rem;
            border-bottom: 1px solid var(--border-color);
            text-align: center;
        }
        
        .column-title.confirmed { color: #3742fa; }
        .column-title.preparing { color: #ff6b00; }
        .column-title.ready { color: #2ed573; }
        
        .kitchen-orders {
            padding: var(--spacing-md);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        
        .kitchen-order-card {
            background: var(--bg-secondary);
            padding: var(--spacing-md);
            border-radius: var(--border-radius-lg);
            border: 2px solid var(--border-color);
            transition: all 0.3s ease;
        }
        
        .kitchen-order-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px var(--shadow-color);
        }
        
        .kitchen-order-card.priority-urgent {
            border-color: #ff4757;
            background: #ff475710;
        }
        
        .kitchen-order-card.priority-high {
            border-color: #ffa502;
            background: #ffa50210;
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-sm);
        }
        
        .card-customer {
            color: var(--text-primary);
            font-weight: 600;
            margin-bottom: var(--spacing-sm);
        }
        
        .card-items {
            margin-bottom: var(--spacing-md);
        }
        
        .kitchen-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-xs);
            padding: var(--spacing-xs);
            background: var(--bg-card);
            border-radius: var(--border-radius-md);
        }
        
        .item-qty {
            background: var(--primary-color);
            color: white;
            padding: 2px 6px;
            border-radius: var(--border-radius-sm);
            font-size: 0.8rem;
            font-weight: 600;
            min-width: 30px;
            text-align: center;
        }
        
        .item-name {
            flex: 1;
            color: var(--text-primary);
            font-weight: 500;
        }
        
        .item-custom {
            font-size: 0.8rem;
            color: var(--text-secondary);
            font-style: italic;
            margin-top: 2px;
        }
        
        .card-actions {
            display: flex;
            gap: var(--spacing-xs);
        }
        
        .kitchen-btn {
            flex: 1;
            padding: var(--spacing-sm);
            border: none;
            border-radius: var(--border-radius-md);
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .kitchen-btn.confirmed { background: #3742fa; color: white; }
        .kitchen-btn.confirmed:hover { background: #2c35d1; }
        
        .kitchen-btn.preparing { background: #ff6b00; color: white; }
        .kitchen-btn.preparing:hover { background: #e55a00; }
        
        .kitchen-btn.ready { background: #2ed573; color: white; }
        .kitchen-btn.ready:hover { background: #1abc4e; }
        
        .kitchen-btn.delivering { background: #1e90ff; color: white; }
        .kitchen-btn.delivering:hover { background: #0066cc; }
        
        .kitchen-btn.completed { background: #26de81; color: white; }
        .kitchen-btn.completed:hover { background: #1bb565; }
        
        .kitchen-btn.cancelled { background: #ff4757; color: white; }
        .kitchen-btn.cancelled:hover { background: #e33d44; }
        
        /* Order Details Modal */
        .order-details-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            background: var(--bg-card);
            border-radius: var(--border-radius-xl);
            border: 1px solid var(--border-color);
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            z-index: 1001;
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-lg);
            border-bottom: 1px solid var(--border-color);
        }
        
        .modal-header h2 {
            color: var(--text-primary);
            margin: 0;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            padding: var(--spacing-xs);
            border-radius: var(--border-radius-md);
            transition: all 0.3s ease;
        }
        
        .close-btn:hover {
            background: var(--bg-secondary);
        }
        
        .modal-body {
            padding: var(--spacing-lg);
        }
        
        .order-info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-lg);
        }
        
        .info-section h3 {
            color: var(--primary-color);
            margin-bottom: var(--spacing-md);
            font-size: 1.1rem;
        }
        
        .info-item {
            margin-bottom: var(--spacing-sm);
        }
        
        .info-item strong {
            color: var(--text-primary);
        }
        
        .order-items-detail h3,
        .order-actions-detail h3 {
            color: var(--primary-color);
            margin-bottom: var(--spacing-md);
            margin-top: var(--spacing-lg);
        }
        
        .items-list {
            background: var(--bg-secondary);
            border-radius: var(--border-radius-lg);
            padding: var(--spacing-md);
        }
        
        .item-detail {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-sm);
            border-bottom: 1px solid var(--border-color);
        }
        
        .item-detail:last-child {
            border-bottom: none;
        }
        
        .item-info {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .item-name {
            color: var(--text-primary);
            font-weight: 500;
        }
        
        .item-qty {
            background: var(--primary-color);
            color: white;
            padding: 2px 8px;
            border-radius: var(--border-radius-sm);
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .item-price {
            color: var(--primary-color);
            font-weight: 600;
        }
        
        .item-custom {
            font-size: 0.8rem;
            color: var(--text-secondary);
            font-style: italic;
            grid-column: 1 / -1;
            margin-top: var(--spacing-xs);
        }
        
        .action-buttons {
            display: flex;
            gap: var(--spacing-sm);
            flex-wrap: wrap;
        }
        
        .action-btn.secondary {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
        }
        
        .action-btn.secondary:hover {
            background: var(--text-secondary);
            color: white;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .dashboard-nav {
                flex-direction: column;
            }
            
            .nav-btn {
                text-align: center;
            }
            
            .kpi-grid {
                grid-template-columns: 1fr;
            }
            
            .status-grid {
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            }
            
            .actions-grid {
                grid-template-columns: 1fr;
            }
            
            .orders-controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .filter-buttons {
                flex-wrap: wrap;
            }
            
            .table-header,
            .order-row {
                grid-template-columns: 80px 150px 200px 100px 120px 100px 120px;
                font-size: 0.8rem;
            }
            
            .kitchen-board {
                grid-template-columns: 1fr;
            }
            
            .order-info-grid {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 480px) {
            .table-header,
            .order-row {
                display: block;
                padding: var(--spacing-sm);
            }
            
            .order-row {
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius-md);
                margin-bottom: var(--spacing-sm);
            }
            
            .col-id,
            .col-customer,
            .col-items,
            .col-total,
            .col-time,
            .col-status,
            .col-actions {
                display: block;
                margin-bottom: var(--spacing-xs);
            }
            
            .col-id::before { content: "Commande: "; font-weight: 600; }
            .col-customer::before { content: "Client: "; font-weight: 600; }
            .col-total::before { content: "Total: "; font-weight: 600; }
            .col-time::before { content: "Heure: "; font-weight: 600; }
            .col-status::before { content: "Statut: "; font-weight: 600; }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize the enhanced dashboard when the admin dashboard is shown
function showAdminDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'inline-flex';
    
    // Initialize enhanced dashboard
    initEnhancedDashboard();
}

// Export the main function for use in admin.html
window.initEnhancedDashboard = initEnhancedDashboard;
window.showDashboardView = showDashboardView;
window.updateOrderStatus = updateOrderStatus;
window.showOrderDetails = showOrderDetails;
window.closeModal = closeModal;
window.filterOrders = filterOrders;
window.createManualOrder = createManualOrder;
window.generateDailyReport = generateDailyReport;
window.exportOrders = exportOrders;
window.refreshDashboardData = refreshDashboardData;