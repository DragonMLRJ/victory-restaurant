// Victory Restaurant - Configuration Firebase Database

// Configuration Firebase - À personnaliser avec vos clés
const FIREBASE_CONFIG = {
    // ⚠️ REMPLACEZ PAR VOS VRAIES CLÉS FIREBASE
    apiKey: "VOTRE_API_KEY",
    authDomain: "victory-restaurant-XXXXX.firebaseapp.com",
    projectId: "victory-restaurant-XXXXX",
    storageBucket: "victory-restaurant-XXXXX.appspot.com",
    messagingSenderId: "XXXXXXXXXXXXX",
    appId: "1:XXXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXX",
    measurementId: "G-XXXXXXXXXX"
};

// Variables Firebase
let app = null;
let db = null;
let auth = null;
let analytics = null;

// État de connexion Firebase
let firebaseInitialized = false;
let offlineMode = true;

// Initialiser Firebase
async function initializeFirebase() {
    try {
        console.log('🔥 Initialisation Firebase...');
        
        // Vérifier si Firebase est disponible
        if (typeof firebase === 'undefined') {
            console.warn('Firebase SDK non chargé - Mode hors ligne uniquement');
            return false;
        }
        
        // Initialiser Firebase
        app = firebase.initializeApp(FIREBASE_CONFIG);
        db = firebase.firestore();
        auth = firebase.auth();
        
        // Analytics (optionnel)
        if (firebase.analytics) {
            analytics = firebase.analytics();
        }
        
        // Configurer Firestore pour fonctionner hors ligne
        db.enablePersistence({
            synchronizeTabs: true
        }).catch((err) => {
            if (err.code === 'failed-precondition') {
                console.warn('Persistence failed: Multiple tabs open');
            } else if (err.code === 'unimplemented') {
                console.warn('Persistence not supported');
            }
        });
        
        firebaseInitialized = true;
        offlineMode = false;
        
        console.log('✅ Firebase initialisé avec succès');
        showNotification('Base de données en ligne connectée! 🔥', 'success');
        
        // Synchroniser les données locales
        await syncLocalDataToFirebase();
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur initialisation Firebase:', error);
        showNotification('Fonctionnement en mode hors ligne', 'warning');
        offlineMode = true;
        return false;
    }
}

// Structure des collections Firestore
const COLLECTIONS = {
    ORDERS: 'orders',
    MENU: 'menu',
    CUSTOMERS: 'customers',
    STATS: 'statistics',
    CONFIG: 'configuration'
};

// Sauvegarder une commande
async function saveOrderToFirebase(order) {
    if (!firebaseInitialized || !db) {
        console.log('💾 Sauvegarde locale seulement');
        return saveOrderLocally(order);
    }
    
    try {
        // Sauvegarder dans Firestore
        await db.collection(COLLECTIONS.ORDERS).doc(order.orderNumber.toString()).set({
            ...order,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Aussi sauvegarder localement (backup)
        saveOrderLocally(order);
        
        console.log('✅ Commande sauvegardée dans Firebase:', order.orderNumber);
        return true;
        
    } catch (error) {
        console.error('❌ Erreur sauvegarde Firebase:', error);
        // Fallback en local
        return saveOrderLocally(order);
    }
}

// Charger les commandes depuis Firebase
async function loadOrdersFromFirebase() {
    if (!firebaseInitialized || !db) {
        return loadOrdersLocally();
    }
    
    try {
        const snapshot = await db.collection(COLLECTIONS.ORDERS)
            .orderBy('createdAt', 'desc')
            .limit(100)
            .get();
        
        const orders = [];
        snapshot.forEach(doc => {
            const order = doc.data();
            // Convertir les timestamps Firebase en dates
            if (order.createdAt) {
                order.timestamp = order.createdAt.toDate().toLocaleString('fr-FR');
            }
            orders.push(order);
        });
        
        console.log(`📊 ${orders.length} commandes chargées depuis Firebase`);
        
        // Mettre à jour le cache local
        localStorage.setItem('victoryOrders', JSON.stringify(orders));
        
        return orders;
        
    } catch (error) {
        console.error('❌ Erreur chargement Firebase:', error);
        return loadOrdersLocally();
    }
}

// Mettre à jour le statut d'une commande
async function updateOrderStatusInFirebase(orderNumber, newStatus) {
    if (!firebaseInitialized || !db) {
        return updateOrderStatusLocally(orderNumber, newStatus);
    }
    
    try {
        await db.collection(COLLECTIONS.ORDERS).doc(orderNumber.toString()).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Aussi mettre à jour localement
        updateOrderStatusLocally(orderNumber, newStatus);
        
        console.log('✅ Statut mis à jour dans Firebase:', orderNumber, newStatus);
        return true;
        
    } catch (error) {
        console.error('❌ Erreur mise à jour Firebase:', error);
        return updateOrderStatusLocally(orderNumber, newStatus);
    }
}

// Synchroniser les données locales vers Firebase
async function syncLocalDataToFirebase() {
    if (!firebaseInitialized || !db) return;
    
    try {
        console.log('🔄 Synchronisation données locales...');
        
        const localOrders = JSON.parse(localStorage.getItem('victoryOrders') || '[]');
        
        for (const order of localOrders) {
            // Vérifier si la commande existe déjà
            const docRef = db.collection(COLLECTIONS.ORDERS).doc(order.orderNumber.toString());
            const doc = await docRef.get();
            
            if (!doc.exists) {
                await docRef.set({
                    ...order,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                console.log('📤 Commande synchronisée:', order.orderNumber);
            }
        }
        
        showNotification('Données synchronisées avec la base de données! 📊', 'success');
        
    } catch (error) {
        console.error('❌ Erreur synchronisation:', error);
    }
}

// Écouter les changements en temps réel
function setupRealtimeListeners() {
    if (!firebaseInitialized || !db) return;
    
    console.log('👂 Configuration écoute temps réel...');
    
    // Écouter les nouvelles commandes
    db.collection(COLLECTIONS.ORDERS)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const order = change.doc.data();
                    console.log('🆕 Nouvelle commande détectée:', order.orderNumber);
                    
                    // Notification en temps réel
                    showNotification(`Nouvelle commande #${order.orderNumber}! 🛒`, 'info');
                    
                    // Mettre à jour l'interface si on est sur la page admin
                    if (window.location.pathname.includes('admin.html')) {
                        refreshDashboard();
                    }
                }
                
                if (change.type === 'modified') {
                    const order = change.doc.data();
                    console.log('📝 Commande modifiée:', order.orderNumber);
                    
                    // Mettre à jour l'interface
                    if (window.location.pathname.includes('admin.html')) {
                        refreshDashboard();
                    }
                }
            });
        }, (error) => {
            console.error('❌ Erreur écoute temps réel:', error);
        });
}

// Sauvegarder les statistiques
async function saveStatsToFirebase(stats) {
    if (!firebaseInitialized || !db) return;
    
    try {
        const today = new Date().toISOString().split('T')[0];
        
        await db.collection(COLLECTIONS.STATS).doc(today).set({
            ...stats,
            date: today,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        console.log('📊 Statistiques sauvegardées:', today);
        
    } catch (error) {
        console.error('❌ Erreur sauvegarde stats:', error);
    }
}

// Sauvegarder la configuration du restaurant
async function saveRestaurantConfig(config) {
    if (!firebaseInitialized || !db) {
        localStorage.setItem('restaurantConfig', JSON.stringify(config));
        return;
    }
    
    try {
        await db.collection(COLLECTIONS.CONFIG).doc('restaurant').set({
            ...config,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log('⚙️ Configuration restaurant sauvegardée');
        showNotification('Configuration sauvegardée! ⚙️', 'success');
        
    } catch (error) {
        console.error('❌ Erreur sauvegarde config:', error);
        localStorage.setItem('restaurantConfig', JSON.stringify(config));
    }
}

// Fonctions de fallback local
function saveOrderLocally(order) {
    try {
        const orders = JSON.parse(localStorage.getItem('victoryOrders') || '[]');
        const existingIndex = orders.findIndex(o => o.orderNumber === order.orderNumber);
        
        if (existingIndex >= 0) {
            orders[existingIndex] = order;
        } else {
            orders.push(order);
        }
        
        localStorage.setItem('victoryOrders', JSON.stringify(orders));
        return true;
    } catch (error) {
        console.error('❌ Erreur sauvegarde locale:', error);
        return false;
    }
}

function loadOrdersLocally() {
    try {
        return JSON.parse(localStorage.getItem('victoryOrders') || '[]');
    } catch (error) {
        console.error('❌ Erreur chargement local:', error);
        return [];
    }
}

function updateOrderStatusLocally(orderNumber, newStatus) {
    try {
        const orders = loadOrdersLocally();
        const orderIndex = orders.findIndex(o => o.orderNumber == orderNumber);
        
        if (orderIndex >= 0) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem('victoryOrders', JSON.stringify(orders));
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('❌ Erreur mise à jour locale:', error);
        return false;
    }
}

// Vérifier l'état de la connexion
function checkConnectionStatus() {
    if (navigator.onLine && firebaseInitialized) {
        return 'online';
    } else if (navigator.onLine && !firebaseInitialized) {
        return 'local';
    } else {
        return 'offline';
    }
}

// Afficher l'état de connexion
function displayConnectionStatus() {
    const status = checkConnectionStatus();
    const statusIndicator = document.getElementById('connectionStatus');
    
    if (statusIndicator) {
        let statusText = '';
        let statusColor = '';
        
        switch (status) {
            case 'online':
                statusText = '🔥 Base de données en ligne';
                statusColor = 'var(--success-color)';
                break;
            case 'local':
                statusText = '💾 Mode local seulement';
                statusColor = 'var(--warning-color)';
                break;
            case 'offline':
                statusText = '📴 Mode hors ligne';
                statusColor = 'var(--error-color)';
                break;
        }
        
        statusIndicator.textContent = statusText;
        statusIndicator.style.color = statusColor;
    }
}

// Initialiser automatiquement si on est sur la page admin
document.addEventListener('DOMContentLoaded', async function() {
    if (window.location.pathname.includes('admin.html')) {
        console.log('🔐 Page admin détectée - Initialisation base de données...');
        
        // Attendre que l'auth soit vérifiée
        setTimeout(async () => {
            if (typeof authState !== 'undefined' && authState.isAuthenticated) {
                await initializeFirebase();
                setupRealtimeListeners();
                
                // Mettre à jour l'indicateur de connexion toutes les 10 secondes
                setInterval(displayConnectionStatus, 10000);
                displayConnectionStatus();
            }
        }, 2000);
    }
});

// Gérer les changements de connexion
window.addEventListener('online', async () => {
    console.log('🌐 Connexion rétablie');
    if (!firebaseInitialized) {
        await initializeFirebase();
    }
    displayConnectionStatus();
});

window.addEventListener('offline', () => {
    console.log('📴 Connexion perdue - Mode hors ligne');
    displayConnectionStatus();
});

console.log('🔥 Module Firebase Database chargé!');
