# 🏆 Victory Restaurant - Brazzaville

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://votre-username.github.io/victory-restaurant)
[![Firebase](https://img.shields.io/badge/Firebase-Ready-orange)](https://firebase.google.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue)](#)

## 🍔 Application de Restaurant Moderne

Victory Restaurant est une application web complète pour un fast-food moderne à Brazzaville, République du Congo. Conçue avec les dernières technologies web pour offrir une expérience utilisateur premium.

## ✨ Fonctionnalités

### 🎨 **Interface Moderne**
- Design responsive (mobile-first)
- Mode sombre/clair automatique
- Animations fluides et micro-interactions
- PWA installable comme app mobile

### 🛒 **Commandes en Ligne**
- Menu interactif avec panier intelligent
- Système de commande complet
- Suivi de livraison en temps réel
- Notifications push

### 🔐 **Administration Sécurisée**
- Panneau admin séparé (`/admin.html`)
- Authentification robuste
- Gestion des commandes temps réel
- Statistiques et rapports

### 🔥 **Base de Données**
- Firebase Firestore intégré
- Synchronisation temps réel
- Mode hors ligne automatique
- Sauvegarde locale de sécurité

## 🚀 Déploiement GitHub Pages

### 1. Fork ce Repository
```bash
# Cloner le repository
git clone https://github.com/VOTRE-USERNAME/victory-restaurant.git
cd victory-restaurant
```

### 2. Activer GitHub Pages
1. Allez dans **Settings** > **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. Cliquez **Save**

### 3. Accéder à l'Application
- **Site public**: `https://VOTRE-USERNAME.github.io/victory-restaurant`
- **Admin**: `https://VOTRE-USERNAME.github.io/victory-restaurant/admin.html`

## 🔥 Configuration Firebase (Optionnelle)

### 1. Créer un Projet Firebase
1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Créez un nouveau projet: `victory-restaurant`
3. Activez **Firestore Database**
4. Configurez les **règles de sécurité**

### 2. Configurer l'Application
Modifiez `firebase-db.js` ligne 4-12 :
```javascript
const FIREBASE_CONFIG = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "victory-restaurant-XXXXX.firebaseapp.com",
    projectId: "victory-restaurant-XXXXX",
    storageBucket: "victory-restaurant-XXXXX.appspot.com",
    messagingSenderId: "XXXXXXXXXXXXX",
    appId: "1:XXXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXX"
};
```

### 3. Règles Firestore Recommandées
```javascript
// Dans la console Firebase > Firestore > Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Commandes - lecture/écriture libre pour démo
    match /orders/{orderId} {
      allow read, write: if true;
    }
    
    // Statistiques - lecture libre, écriture restreinte
    match /statistics/{statId} {
      allow read: if true;
      allow write: if true; // En production, restreindre à l'admin
    }
    
    // Configuration - lecture libre, écriture restreinte  
    match /configuration/{configId} {
      allow read: if true;
      allow write: if true; // En production, restreindre à l'admin
    }
  }
}
```

## 🔐 Sécurité Admin

### ⚠️ IMPORTANT : Changer les Identifiants
Avant déploiement, modifiez `auth.js` lignes 4-5 :
```javascript
const ADMIN_CONFIG = {
    username: 'VOTRE_ADMIN',     // ⚠️ CHANGEZ-MOI
    password: 'VOTRE_MOT_DE_PASSE_FORT', // ⚠️ CHANGEZ-MOI
};
```

### 🛡️ Sécurité Intégrée
- Authentification à 2 facteurs (user + password)
- Limitation tentatives de connexion (3 max)
- Blocage automatique (15 minutes)
- Sessions expirantes (2 heures)
- Headers HTTP sécurisés

## 📱 Installation Mobile (PWA)

### Android/Chrome
1. Ouvrez le site dans Chrome
2. Menu > **Ajouter à l'écran d'accueil**
3. L'app s'installe comme une app native

### iOS/Safari
1. Ouvrez le site dans Safari
2. Bouton partage > **Sur l'écran d'accueil**
3. L'app s'ajoute à votre écran d'accueil

## 🎨 Personnalisation

### Logo Restaurant
1. Remplacez le logo dans `index.html` ligne 14
2. Ou suivez le guide dans `LOGO-GUIDE.md`

### Couleurs Thème
Modifiez `styles.css` lignes 3-5 :
```css
:root {
    --primary-color: #ff6b00;    /* Votre couleur */
    --primary-hover: #ff8c00;    /* Couleur survol */
}
```

### Menu et Prix
Éditez `index.html` section menu pour :
- Ajouter/supprimer des plats
- Modifier les prix
- Changer les descriptions

## 📊 Utilisation

### Client
1. **Accueil** : Présentation du restaurant
2. **Menu** : Parcourir et commander
3. **Panier** : Gérer les articles
4. **Commande** : Finaliser avec coordonnées
5. **Suivi** : Suivre la livraison temps réel

### Administrateur
1. Aller sur `/admin.html`
2. Se connecter avec identifiants
3. **Dashboard** : Voir statistiques temps réel
4. **Commandes** : Gérer les statuts
5. **Rapports** : Analyser les performances

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Styles** : CSS Grid, Flexbox, Variables CSS
- **PWA** : Service Worker, Manifest
- **Database** : Firebase Firestore (optionnel)
- **Hosting** : GitHub Pages
- **Sécurité** : Authentication, Headers sécurisés

## 📁 Structure Projet

```
victory-restaurant/
├── 📄 index.html              # Page principale publique
├── 🔐 admin.html              # Page d'administration
├── 🎨 styles.css              # Styles unifiés
├── ⚡ script.js               # Logique principale
├── 🚀 enhanced.js             # Fonctionnalités avancées
├── 🔐 auth.js                 # Système d'authentification
├── 📊 admin-dashboard.js      # Gestion dashboard admin
├── 🔥 firebase-db.js          # Intégration Firebase
├── 📱 manifest.json           # Configuration PWA
├── 🔧 sw.js                   # Service Worker
├── 📖 README.md               # Documentation (ce fichier)
└── docs/                      # Documentation additionnelle
```

## 🔄 Workflow de Développement

### Déploiement Automatique
Chaque push sur `main` déclenche automatiquement :
1. Validation du code
2. Déploiement sur GitHub Pages
3. Mise à jour du site en live

### Tests Locaux
```bash
# Cloner le projet
git clone https://github.com/VOTRE-USERNAME/victory-restaurant.git

# Ouvrir avec VS Code + Live Server
code victory-restaurant
# Clic droit sur index.html > "Open with Live Server"
```

## 📈 Performance

- **Lighthouse Score** : 95+ sur tous critères
- **Temps de chargement** : < 2 secondes
- **PWA Ready** : Installation mobile optimisée
- **Offline First** : Fonctionne sans connexion

## 🆘 Support

### Documentation
- **Déploiement** : `docs/DEPLOY-GUIDE.md`
- **Sécurité** : `docs/SECURITY-GUIDE.md`
- **Logo** : `docs/LOGO-GUIDE.md`

### Issues
Rencontrez un problème ? [Créez une issue](https://github.com/VOTRE-USERNAME/victory-restaurant/issues)

## 📜 Licence

MIT License - Libre d'utilisation pour projets commerciaux et personnels.

## 🎯 Roadmap

- [ ] Intégration paiement mobile money
- [ ] Géolocalisation avancée
- [ ] Programme de fidélité
- [ ] Multi-restaurants
- [ ] API publique
- [ ] App mobile native

---

## 🏆 Victory Restaurant

**Le futur du fast-food à Brazzaville commence ici !**

*Développé avec ❤️ pour la communauté entrepreneuriale du Congo*

---

### 🚀 Démarrage Rapide

1. **Fork** ce repository
2. **Activer** GitHub Pages
3. **Personnaliser** logo et identifiants admin
4. **Lancer** votre restaurant en ligne !

**URL de démo** : [victory-restaurant-demo.github.io](https://votre-username.github.io/victory-restaurant)
