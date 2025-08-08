# 🚀 GUIDE DE DÉMARRAGE RAPIDE - Victory Restaurant Enhanced

## ⚡ Lancement en 3 étapes

### Option 1: Script automatique (RECOMMANDÉ)
1. **Double-cliquez** sur `start.bat`
2. Suivez les instructions à l'écran
3. Votre application s'ouvrira automatiquement!

### Option 2: Via VS Code
1. **Ouvrez VS Code**
2. **File > Open Folder** → Sélectionnez le dossier `Victory-Restaurant`
3. **Installez Live Server** (VS Code vous proposera automatiquement)
4. **Clic droit** sur `index.html` → **Open with Live Server**
5. ✅ L'application s'ouvre sur `http://localhost:3000`

---

## 🎨 NOUVELLES FONCTIONNALITÉS

### 🌙 Mode Sombre/Clair
- **Cliquez** sur l'icône 🌙/☀️ en haut à droite
- **Raccourci clavier** : `Ctrl + T`
- Le thème est **automatiquement sauvegardé**

### 🎯 Logo Personnalisable
- **Emplacement préparé** pour votre logo
- **Guide complet** dans `LOGO-GUIDE.md`
- **Responsive** sur tous appareils

### ⌨️ Raccourcis Clavier
- `Ctrl + Enter` : Ouvrir le panier (depuis le menu)
- `Ctrl + T` : Basculer mode sombre/clair
- `Alt + 1` : Accueil
- `Alt + 2` : Menu  
- `Alt + 3` : Suivi
- `Alt + 4` : Admin
- `Échap` : Fermer modales

### 🎭 Animations Améliorées
- **Transitions fluides** entre sections
- **Animations au scroll** pour les cartes
- **Feedback visuel** renforcé
- **Micro-interactions** sur tous les boutons

---

## 🧪 Comment tester l'application

### 1. Navigation
- Cliquez sur **Menu** pour voir tous les plats
- Essayez la page **Suivi** pour suivre une commande
- Explorez **Admin** pour la gestion du restaurant

### 2. Passer une commande test
1. Aller dans **Menu**
2. Cliquer **Ajouter** sur quelques articles
3. Cliquer sur l'icône panier 🛒
4. Cliquer **Commander**
5. Remplir le formulaire avec des données test:
   - Nom: `Jean Test`
   - Téléphone: `+242 06 123 4567`
   - Adresse: `Quartier Centre-ville, près du marché`
6. **Confirmer la commande**

### 3. Suivre la commande
1. Noter le numéro de commande reçu
2. Aller dans **Suivi**
3. Entrer le numéro de commande
4. Voir le statut évoluer automatiquement

### 4. Panneau Admin
1. Aller dans **Admin**
2. Voir les statistiques en temps réel
3. Changer le statut des commandes
4. Observer les mises à jour automatiques

---

## 🎨 Personnalisation

### Modifier les couleurs
**Fichier:** `styles.css`
```css
/* Couleur principale (actuellement orange) */
--primary-color: #ff6b00;
--primary-hover: #ff8c00;

/* Couleur de fond */
--bg-color: #1a1a1a;
--card-bg: #2d2d2d;
```

### Modifier le menu
**Fichier:** `index.html` - Section Menu
```html
<div class="menu-item">
    <div class="item-info">
        <h3>Nom du plat</h3>
        <p>Description du plat</p>
    </div>
    <div>
        <span class="item-price">PRIX FCFA</span>
        <button class="add-to-cart" onclick="addToCart('Nom du plat', PRIX)">Ajouter</button>
    </div>
</div>
```

### Ajouter des fonctionnalités
**Fichier:** `script.js`
- Toutes les fonctions JavaScript sont commentées
- Facile d'ajouter de nouvelles fonctionnalités

---

## 📱 Fonctionnalités incluses

✅ **Menu interactif** avec ajout au panier  
✅ **Système de commandes** complet  
✅ **Suivi en temps réel** des commandes  
✅ **Panneau d'administration** pour gérer le restaurant  
✅ **Interface responsive** (mobile + desktop)  
✅ **Sauvegarde automatique** des données  
✅ **Notifications** pour les actions  
✅ **PWA Ready** (peut être installée comme app)  
✅ **Thème Congo** (FCFA, noms locaux, etc.)  

---

## 🔧 Dépannage

### ❌ L'application ne se charge pas
- Vérifiez que tous les fichiers sont dans le même dossier
- Utilisez Live Server au lieu d'ouvrir directement le fichier
- Vérifiez la console (F12) pour les erreurs

### ❌ Les fonctionnalités ne marchent pas
- JavaScript doit être activé dans votre navigateur
- Utilisez un navigateur récent (Chrome, Firefox, Edge)
- Videz le cache (Ctrl+F5)

### ❌ Live Server ne démarre pas
- Installez l'extension "Live Server" dans VS Code
- Redémarrez VS Code après installation
- Clic droit précisément sur `index.html`

---

## 🎯 Prochaines étapes

1. **Testez** toutes les fonctionnalités
2. **Personnalisez** selon vos besoins
3. **Déployez** sur un hébergeur web pour la production
4. **Ajoutez** une base de données pour la persistance
5. **Intégrez** le paiement mobile money

---

**🏆 Votre restaurant Victory est prêt à conquérir Brazzaville! 🏆**

*Besoin d'aide? Consultez le fichier README.md pour plus de détails.*