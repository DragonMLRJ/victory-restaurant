// Victory Restaurant - Données d'exemple pour tests
// Ce fichier peut être utilisé pour charger des données de démonstration

const sampleData = {
    // Menu étendu avec plus d'options
    extendedMenu: {
        burgers: [
            {
                name: "Victory Classique",
                description: "Bœuf 100g, fromage, salade, tomate, oignon, sauce Victory",
                price: 2500,
                category: "burgers",
                popular: true,
                image: "🍔"
            },
            {
                name: "Champion Deluxe",
                description: "Double bœuf 200g, bacon, fromage, oignons frits, sauce barbecue",
                price: 3500,
                category: "burgers",
                popular: true,
                image: "🍔"
            },
            {
                name: "Chicken Victory",
                description: "Filet de poulet pané croustillant, salade, mayonnaise",
                price: 2200,
                category: "burgers",
                image: "🍗"
            },
            {
                name: "Fish Victory",
                description: "Filet de tilapia frit, salade, sauce tartare maison",
                price: 2800,
                category: "burgers",
                image: "🐟"
            },
            {
                name: "Veggie Victory",
                description: "Galette végétale, avocat, tomate, salade, sauce verte",
                price: 2000,
                category: "burgers",
                vegetarian: true,
                image: "🥬"
            }
        ],
        sides: [
            {
                name: "Frites Victory",
                description: "Frites croustillantes avec notre sauce signature",
                price: 800,
                category: "sides",
                image: "🍟"
            },
            {
                name: "Nuggets Poulet",
                description: "6 pièces de nuggets croustillants avec sauce",
                price: 1500,
                category: "sides",
                image: "🍗"
            },
            {
                name: "Onion Rings",
                description: "Rondelles d'oignons panées et dorées",
                price: 1000,
                category: "sides",
                image: "🧅"
            },
            {
                name: "Plantain Frit",
                description: "Banane plantain frite, spécialité locale",
                price: 600,
                category: "sides",
                local: true,
                image: "🍌"
            }
        ],
        drinks: [
            {
                name: "Coca-Cola",
                description: "33cl, bien fraîche",
                price: 500,
                category: "drinks",
                image: "🥤"
            },
            {
                name: "Bissap",
                description: "Boisson traditionnelle à l'hibiscus, fraîche",
                price: 600,
                category: "drinks",
                local: true,
                image: "🧃"
            },
            {
                name: "Jus d'Orange",
                description: "Jus d'orange frais pressé",
                price: 700,
                category: "drinks",
                fresh: true,
                image: "🍊"
            },
            {
                name: "Eau Minérale",
                description: "50cl, eau pure et rafraîchissante",
                price: 300,
                category: "drinks",
                image: "💧"
            }
        ],
        desserts: [
            {
                name: "Brownie Victory",
                description: "Brownie au chocolat avec glace vanille",
                price: 1200,
                category: "desserts",
                image: "🍰"
            },
            {
                name: "Glace Artisanale",
                description: "3 boules au choix: vanille, chocolat, fraise",
                price: 1000,
                category: "desserts",
                image: "🍨"
            }
        ]
    },

    // Clients d'exemple congolais
    sampleCustomers: [
        {
            name: "Jean-Baptiste Makaya",
            phone: "+242 06 123 4567",
            address: "Quartier Poto-Poto, Rue de la Paix, près de l'école"
        },
        {
            name: "Marie-Claire Bouanga",
            phone: "+242 05 987 6543",
            address: "Centre-ville, Avenue Marien Ngouabi, immeuble bleu"
        },
        {
            name: "Paul Nzaba",
            phone: "+242 06 456 7890",
            address: "Bacongo, Rue Félix Éboué, maison verte portail blanc"
        },
        {
            name: "Sylvie Mongo",
            phone: "+242 05 321 9876",
            address: "Moungali, près du marché total, villa rose"
        },
        {
            name: "Pierre Kongo",
            phone: "+242 06 654 3210",
            address: "Ouenzé, Rue de l'Indépendance, face pharmacie"
        }
    ],

    // Commandes d'exemple
    sampleOrders: [
        {
            orderNumber: 12340,
            customer: {
                name: "Jean-Baptiste Makaya",
                phone: "+242 06 123 4567",
                address: "Quartier Poto-Poto, Rue de la Paix"
            },
            items: [
                { name: "Victory Classique", price: 2500, quantity: 1 },
                { name: "Frites Victory", price: 800, quantity: 1 },
                { name: "Coca-Cola", price: 500, quantity: 1 }
            ],
            total: 3800,
            status: "livrée",
            timestamp: "08/08/2025 12:30",
            paymentMethod: "cash",
            specialInstructions: ""
        },
        {
            orderNumber: 12341,
            customer: {
                name: "Marie-Claire Bouanga",
                phone: "+242 05 987 6543",
                address: "Centre-ville, Avenue Marien Ngouabi"
            },
            items: [
                { name: "Champion Deluxe", price: 3500, quantity: 1 },
                { name: "Nuggets Poulet", price: 1500, quantity: 1 },
                { name: "Bissap", price: 600, quantity: 2 }
            ],
            total: 6200,
            status: "en livraison",
            timestamp: "08/08/2025 13:15",
            paymentMethod: "mobile",
            specialInstructions: "Pas d'oignons SVP"
        },
        {
            orderNumber: 12342,
            customer: {
                name: "Paul Nzaba",
                phone: "+242 06 456 7890",
                address: "Bacongo, Rue Félix Éboué"
            },
            items: [
                { name: "Chicken Victory", price: 2200, quantity: 2 },
                { name: "Plantain Frit", price: 600, quantity: 2 },
                { name: "Jus d'Orange", price: 700, quantity: 2 },
                { name: "Brownie Victory", price: 1200, quantity: 1 }
            ],
            total: 7500,
            status: "en préparation",
            timestamp: "08/08/2025 13:45",
            paymentMethod: "cash",
            specialInstructions: "Commande pour 2 personnes"
        }
    ],

    // Quartiers de livraison avec temps estimés
    deliveryZones: {
        "Centre-ville": { time: 15, fee: 0 },
        "Poto-Poto": { time: 20, fee: 300 },
        "Bacongo": { time: 25, fee: 500 },
        "Moungali": { time: 30, fee: 500 },
        "Ouenzé": { time: 35, fee: 700 },
        "Mfilou": { time: 40, fee: 1000 },
        "Talangaï": { time: 45, fee: 1200 }
    },

    // Messages système
    systemMessages: {
        orderConfirmed: "Commande confirmée! Votre numéro de commande est #",
        orderPreparing: "Votre commande est en cours de préparation! 👨‍🍳",
        orderDelivering: "Votre commande est en route! 🏍️",
        orderDelivered: "Commande livrée avec succès! Merci pour votre confiance! 🏆",
        welcome: "Bienvenue chez Victory Restaurant! 🏆",
        cartEmpty: "Votre panier est vide. Ajoutez des délicieux plats!",
        orderNotFound: "Commande non trouvée. Vérifiez le numéro.",
        invalidPhone: "Format de téléphone invalide. Utilisez: +242 XX XXX XXXX"
    },

    // Statistiques pour l'admin
    adminStats: {
        daily: {
            orders: 47,
            revenue: 125500,
            avgOrderValue: 2670,
            topItem: "Victory Classique"
        },
        weekly: {
            orders: 312,
            revenue: 834600,
            avgOrderValue: 2675,
            growth: "+12%"
        },
        monthly: {
            orders: 1340,
            revenue: 3584000,
            avgOrderValue: 2674,
            growth: "+18%"
        }
    }
};

// Fonction pour charger les données d'exemple
function loadSampleData() {
    console.log('🧪 Chargement des données d'exemple...');
    
    // Charger les commandes d'exemple
    if (typeof orders !== 'undefined') {
        orders.push(...sampleData.sampleOrders);
        saveOrdersToStorage();
        console.log('✅ Commandes d\'exemple chargées');
    }
    
    // Afficher les données disponibles
    console.log('📊 Données disponibles:');
    console.log('- Menu étendu:', sampleData.extendedMenu);
    console.log('- Clients exemple:', sampleData.sampleCustomers);
    console.log('- Commandes exemple:', sampleData.sampleOrders);
    console.log('- Zones de livraison:', sampleData.deliveryZones);
    
    return sampleData;
}

// Fonction pour tester rapidement l'application
function quickTest() {
    console.log('🚀 Test rapide de Victory Restaurant...');
    
    // Test ajout au panier
    addToCart('Victory Classique', 2500);
    addToCart('Frites Victory', 800);
    addToCart('Coca-Cola', 500);
    
    console.log('✅ Articles ajoutés au panier');
    console.log('🛒 Panier actuel:', cart);
    console.log('💰 Total:', formatPrice(cartTotal));
    
    // Simuler une commande
    setTimeout(() => {
        console.log('📱 Simulation d\'une nouvelle commande...');
        addRandomOrder();
        updateAdminStats();
    }, 2000);
}

// Exporter les données si dans un environnement Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sampleData;
}

console.log('🧪 Données d\'exemple Victory Restaurant chargées!');
console.log('💡 Utilisez loadSampleData() pour charger les données de test');
console.log('🚀 Utilisez quickTest() pour un test rapide de l\'application');
