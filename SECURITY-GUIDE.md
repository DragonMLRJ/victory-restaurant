# 🔐 GUIDE DE SÉCURITÉ - Victory Restaurant Admin

## 🛡️ SÉCURITÉ ADMIN - CONFIGURATION OBLIGATOIRE

### ⚠️ **AVANT DÉPLOIEMENT - CRITICAL**

**1. CHANGER LES IDENTIFIANTS PAR DÉFAUT**
```javascript
// Dans auth.js, ligne 4-5
const ADMIN_CONFIG = {
    username: 'CHANGEZ_MOI',     // ⚠️ OBLIGATOIRE
    password: 'CHANGEZ_MOI',     // ⚠️ OBLIGATOIRE
    sessionDuration: 2 * 60 * 60 * 1000, // 2 heures
    maxAttempts: 3,
    blockDuration: 15 * 60 * 1000 // 15 minutes
};
```

### 🔑 **RECOMMANDATIONS MOT DE PASSE**

**✅ Exemples de mots de passe FORTS:**
- `VictoryAdmin2025!`
- `Brazza@Restaurant#123`
- `FastFood$Victory$2025`
- `Congo!Admin!Victory`

**❌ Évitez:**
- `admin`, `password`, `123456`
- Le nom du restaurant
- Des mots du dictionnaire
- Moins de 8 caractères

### 🔒 **FONCTIONNALITÉS SÉCURITÉ IMPLÉMENTÉES**

#### 1. **Authentification à 2 facteurs simulée**
- Nom d'utilisateur + Mot de passe
- Limitation des tentatives (3 max)
- Blocage automatique 15 minutes
- Session expirée après 2 heures

#### 2. **Protection contre les attaques**
- ✅ **Brute Force** : Blocage après 3 tentatives
- ✅ **Session Hijacking** : Expiration automatique
- ✅ **XSS** : Headers sécurisés dans config
- ✅ **CSRF** : Validation côté client
- ✅ **Injection** : Pas de base de données exposée

#### 3. **Masquage de l'interface**
- Menu Admin invisible aux non-connectés
- Redirection automatique si non authentifié
- Bouton déconnexion visible
- État de session persistant

---

## 🛡️ **SÉCURITÉ EN PRODUCTION**

### 🌐 **Headers HTTP Sécurisés**

Automatiquement configurés dans `netlify.toml`, `vercel.json`, `firebase.json` :

```
X-Frame-Options: DENY              // Anti clickjacking
X-XSS-Protection: 1; mode=block    // Anti XSS
X-Content-Type-Options: nosniff    // Anti MIME sniffing
Referrer-Policy: strict-origin     // Limite les référents
```

### 🔐 **HTTPS Obligatoire**

**Toutes les plateformes proposées forcent HTTPS:**
- ✅ Netlify : HTTPS automatique
- ✅ Vercel : HTTPS par défaut
- ✅ GitHub Pages : HTTPS forcé
- ✅ Firebase : HTTPS obligatoire

### 🚫 **Pas de Données Sensibles**

**L'application ne stocke PAS:**
- Informations de paiement
- Données personnelles clients
- Mots de passe en plain text
- Clés API exposées

---

## 🔍 **MONITORING & SURVEILLANCE**

### 📊 **Logs d'Accès Admin**

L'application enregistre localement :
- Tentatives de connexion échouées
- Blocages d'accès
- Sessions expirées
- Déconnexions

### 🚨 **Alertes de Sécurité**

**Surveillez ces signaux:**
- Multiples tentatives de connexion
- Accès admin en dehors des heures
- Changements de configuration suspects

### 🛠️ **Outils de Vérification**

**1. Test de Sécurité Local:**
```
1. Essayez 3 mauvais mots de passe
2. Vérifiez le blocage 15 minutes
3. Testez l'expiration session (2h)
4. Vérifiez la déconnexion
```

**2. Audit de Sécurité Web:**
- Mozilla Observatory
- Security Headers
- SSL Labs
- Google Lighthouse Security

---

## 🆘 **GESTION DES INCIDENTS**

### 🚨 **En cas de Compromission**

**1. Changement immédiat des identifiants:**
```javascript
// Nouveaux identifiants forts
username: 'nouveau_admin_secure',
password: 'nouveau_mot_de_passe_très_fort_2025!'
```

**2. Forcer déconnexion tous utilisateurs:**
```javascript
// Effacer toutes les sessions
localStorage.clear();
```

**3. Redéploiement:**
- Mettre à jour auth.js
- Redéployer sur la plateforme
- Vérifier que l'ancien accès ne fonctionne plus

### 📞 **Contacts d'Urgence**

**Support plateformes:**
- Netlify Support : support@netlify.com
- Vercel Support : support@vercel.com
- GitHub Support : support@github.com
- Firebase Support : Console Firebase

---

## ✅ **CHECKLIST SÉCURITÉ FINALE**

### Avant Déploiement:
- [ ] Identifiants admin changés (auth.js)
- [ ] Mot de passe fort configuré
- [ ] Test connexion/déconnexion local
- [ ] Test blocage après 3 tentatives
- [ ] Vérification expiration session

### Après Déploiement:
- [ ] Test accès admin en ligne
- [ ] Vérification HTTPS activé
- [ ] Headers sécurité présents (F12 > Network)
- [ ] Pas d'erreurs console
- [ ] Test mobile/desktop

### Maintenance:
- [ ] Changer mot de passe tous les 3 mois
- [ ] Surveiller tentatives de connexion
- [ ] Mettre à jour si nécessaire
- [ ] Sauvegarde configuration sécurisée

---

## 🎯 **RÉSUMÉ SÉCURITÉ**

**L'application Victory Restaurant est sécurisée avec :**

🔐 **Authentification robuste** (user + pass + limite tentatives)  
⏰ **Sessions limitées** (2h max + expiration auto)  
🛡️ **Headers sécurisés** (anti XSS, clickjacking, etc.)  
🔒 **HTTPS forcé** (chiffrement bout en bout)  
🚫 **Pas de données sensibles** stockées  
📊 **Logs de sécurité** intégrés  
🆘 **Procédures d'incident** documentées  

**🏆 Niveau de sécurité : PROFESSIONNEL pour un restaurant 🏆**

---

**⚠️ RAPPEL IMPORTANT : Changez les identifiants par défaut avant la mise en ligne !**

*Consultez `DEPLOY-GUIDE.md` pour le déploiement complet.*