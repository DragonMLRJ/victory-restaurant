# 🤝 Guide de Contribution - Victory Restaurant

Merci de votre intérêt pour contribuer à Victory Restaurant ! Ce guide vous aidera à participer au développement.

## 🎯 Types de Contributions

### 🐛 Corrections de Bugs
- Signaler des problèmes via les [Issues](https://github.com/VOTRE-USERNAME/victory-restaurant/issues)
- Proposer des corrections via Pull Requests

### ✨ Nouvelles Fonctionnalités  
- Proposer des améliorations
- Développer de nouvelles features
- Améliorer l'expérience utilisateur

### 📖 Documentation
- Améliorer la documentation
- Traduire en d'autres langues
- Créer des tutoriels

### 🎨 Design & UX
- Améliorer l'interface
- Proposer de nouveaux thèmes
- Optimiser l'accessibilité

## 🚀 Comment Commencer

### 1. Fork & Clone
```bash
# Fork le repository sur GitHub
# Puis cloner votre fork
git clone https://github.com/VOTRE-USERNAME/victory-restaurant.git
cd victory-restaurant
```

### 2. Configuration Locale
```bash
# Créer une branche pour votre feature
git checkout -b feature/nouvelle-fonctionnalite

# Installer VS Code avec Live Server (recommandé)
code .
# Clic droit sur index.html > "Open with Live Server"
```

### 3. Développement
- Modifiez les fichiers nécessaires
- Testez localement sur mobile et desktop
- Vérifiez que l'admin fonctionne (`admin.html`)
- Assurez-vous que les modes sombre/clair marchent

### 4. Tests
```bash
# Checklist minimale
✅ Site se charge sans erreur (F12 console)
✅ Navigation fonctionne (Accueil, Menu, Suivi)
✅ Panier fonctionnel (ajout, suppression, quantités)
✅ Mode sombre/clair fonctionne
✅ Responsive mobile optimisé
✅ Admin accessible et sécurisé
✅ PWA installable
```

### 5. Pull Request
```bash
# Commit vos changements
git add .
git commit -m "✨ Ajouter [description de votre feature]"
git push origin feature/nouvelle-fonctionnalite

# Créer une Pull Request sur GitHub
```

## 📋 Standards de Code

### HTML
- Utiliser HTML5 sémantique
- Attributs `alt` pour les images
- Meta tags appropriés

### CSS
- Utiliser les CSS Variables (`var(--primary-color)`)
- Mobile-first responsive design
- Préfixes vendor si nécessaire

### JavaScript
- ES6+ moderne
- Fonctions pures quand possible
- Gestion d'erreurs appropriée
- Console.log pour debugging uniquement

### Commits
```bash
# Format recommandé
✨ feat: nouvelle fonctionnalité
🐛 fix: correction de bug
📖 docs: mise à jour documentation
🎨 style: changements visuels
♻️ refactor: refactoring code
⚡ perf: amélioration performance
✅ test: ajout/modification tests
🔧 chore: maintenance
```

## 🔐 Sécurité

### Identifiants Admin
- ⚠️ **NE JAMAIS** commiter de vrais identifiants
- Utiliser les valeurs par défaut pour les exemples
- Documenter où changer les identifiants

### Firebase
- ⚠️ **NE JAMAIS** commiter de vraies clés API
- Utiliser des placeholders (`VOTRE_API_KEY`)
- Documenter la configuration

### Données Sensibles
- Pas de données clients réelles
- Pas de numéros de téléphone réels
- Utiliser des données de démonstration

## 🌍 Contexte Congo/Brazzaville

### Localisation
- Prix en FCFA
- Noms congolais pour les exemples
- Format téléphone: +242 XX XXX XXXX
- Quartiers de Brazzaville réels

### Culture
- Respecter la culture locale
- Boissons traditionnelles (bissap, etc.)
- Habitudes alimentaires locales

## 🛠️ Structure du Projet

```
victory-restaurant/
├── 📄 index.html              # Site public
├── 🔐 admin.html              # Interface admin
├── 🎨 styles.css              # Styles unifiés
├── ⚡ script.js               # Logique principale
├── 🚀 enhanced.js             # Features avancées
├── 🔐 auth.js                 # Authentification
├── 📊 admin-dashboard.js      # Dashboard admin
├── 🔥 firebase-db.js          # Base de données
├── 📱 manifest.json           # Configuration PWA
├── 🔧 sw.js                   # Service Worker
├── 📖 README.md               # Documentation
├── .github/                   # Configuration GitHub
│   ├── workflows/             # Actions automatiques
│   └── ISSUE_TEMPLATE/        # Templates issues
└── docs/                      # Documentation détaillée
```

## 🔄 Workflow de Développement

### Branches
- `main` : Version production stable
- `develop` : Développement en cours
- `feature/nom` : Nouvelles fonctionnalités
- `fix/nom` : Corrections de bugs
- `docs/nom` : Améliorations documentation

### Pull Requests
1. **Titre clair** avec émoji approprié
2. **Description détaillée** des changements
3. **Screenshots** pour les changements visuels
4. **Tests** effectués et validés
5. **Breaking changes** documentés

### Review Process
- Code review par maintainers
- Tests automatiques via GitHub Actions
- Validation sur GitHub Pages
- Merge après approbation

## 🎯 Roadmap & Priorités

### 🔥 Priorité Haute
- Stabilité et performance
- Sécurité admin
- Expérience mobile

### 🟡 Priorité Moyenne  
- Nouvelles fonctionnalités
- Intégrations tierces
- Analytics

### 🟢 Priorité Basse
- Thèmes additionnels
- Optimisations avancées
- Features expérimentales

## 💬 Communication

### Discussions
- [GitHub Discussions](https://github.com/VOTRE-USERNAME/victory-restaurant/discussions) pour les questions générales
- [Issues](https://github.com/VOTRE-USERNAME/victory-restaurant/issues) pour bugs et features
- Pull Requests pour proposer du code

### Code de Conduite
- Respectueux et inclusif
- Constructif dans les critiques
- Focus sur l'amélioration du produit
- Aide aux nouveaux contributeurs

## 🏆 Reconnaissance

### Contributors
Tous les contributeurs sont listés dans le README.md et reçoivent :
- Mention dans les release notes
- Badge de contributeur
- Reconnaissance publique

### Types de Contributions Reconnues
- Code (développement)
- Documentation
- Design & UX
- Tests & QA
- Traductions
- Support communauté

## 🆘 Aide

### Questions ?
- Consultez d'abord la [documentation](../README.md)
- Cherchez dans les [issues existantes](https://github.com/VOTRE-USERNAME/victory-restaurant/issues)
- Créez une nouvelle issue avec le tag `question`

### Mentoring
- Les maintainers aident les nouveaux contributeurs
- Pair programming disponible pour features complexes
- Revue de code bienveillante et éducative

---

## 🙏 Merci !

Chaque contribution, petite ou grande, aide Victory Restaurant à devenir meilleur pour la communauté de Brazzaville et au-delà !

**Ensemble, construisons le futur du fast-food digital au Congo ! 🏆**
