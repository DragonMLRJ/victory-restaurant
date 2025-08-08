# 🎨 Guide de Personnalisation du Logo Victory Restaurant

## 📍 Emplacement du Logo

Le logo se trouve dans le fichier `index.html` à la ligne 14-20 environ, dans la section `<div class="logo-placeholder">`.

## 🔄 Comment Remplacer le Logo

### Option 1: Logo Image (Recommandé)
1. **Préparez votre logo** :
   - Format: PNG ou SVG (recommandé)
   - Dimensions: 48x48px minimum, idéalement 96x96px ou plus
   - Fond transparent de préférence

2. **Placez le fichier** dans le dossier `Victory-Restaurant/` avec le nom `logo.png` ou `logo.svg`

3. **Modifiez le code HTML** :
   Remplacez cette ligne :
   ```html
   <img src="data:image/svg+xml,..." alt="Victory Logo" class="logo-img">
   ```
   
   Par :
   ```html
   <img src="logo.png" alt="Victory Restaurant Logo" class="logo-img">
   ```

### Option 2: Logo SVG Intégré
Remplacez le contenu SVG existant par votre propre code SVG :

```html
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
    <!-- Votre code SVG personnalisé ici -->
</svg>" alt="Victory Logo" class="logo-img">
```

### Option 3: Logo avec Texte Seulement
Si vous préférez uniquement du texte, vous pouvez modifier :

```html
<div class="logo-text">
    <span class="brand-name">VOTRE MARQUE</span>
    <span class="brand-tagline">Votre Slogan</span>
</div>
```

## 🎨 Personnalisation des Couleurs du Logo

### Dans le CSS (`styles.css`), vous pouvez modifier :

```css
.logo-img {
    width: 48px;
    height: 48px;
    border-radius: var(--border-radius);
    /* Ajoutez un filtre pour changer les couleurs */
    filter: hue-rotate(0deg) saturate(1) brightness(1);
}

.brand-name {
    color: var(--primary-color); /* Orange par défaut */
    /* Changez la couleur ici */
}
```

## 📐 Dimensions et Styles

### Tailles disponibles :
- **Mobile** : 40x40px
- **Desktop** : 48x48px
- **Hover** : Agrandissement de 5%

### Effets appliqués :
- Ombre portée dynamique
- Animation au survol
- Bordures arrondies
- Transition fluide

## 🔧 Code Actuel (pour référence)

```html
<div class="logo-placeholder">
    <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' rx='20' fill='%23ff6b00'/><circle cx='60' cy='45' r='15' fill='%23000'/><path d='M30 75 L60 60 L90 75 L75 90 L45 90 Z' fill='%23000'/><text x='60' y='105' font-size='12' text-anchor='middle' fill='%23000' font-weight='bold'>VICTORY</text></svg>" alt="Victory Logo" class="logo-img">
    <div class="logo-text">
        <span class="brand-name">VICTORY</span>
        <span class="brand-tagline">Restaurant</span>
    </div>
</div>
```

## 🎯 Conseils de Design

### Pour un logo professionnel :
1. **Simplicité** : Évitez les détails complexes à petite taille
2. **Contraste** : Assurez-vous que le logo est visible en mode sombre et clair
3. **Cohérence** : Le logo doit s'harmoniser avec les couleurs orange/noir
4. **Lisibilité** : Le texte doit rester lisible à 48px

### Couleurs recommandées :
- **Principal** : #ff6b00 (orange Victory)
- **Secondaire** : #000000 (noir)
- **Accent** : #ff8c00 (orange clair)
- **Neutre** : #ffffff (blanc pour contraste)

## 🚀 Après Modification

1. **Sauvegardez** le fichier `index.html`
2. **Actualisez** la page dans votre navigateur (F5)
3. **Testez** en mode sombre et clair
4. **Vérifiez** sur mobile et desktop

## 📱 Logo pour App Mobile (PWA)

Le logo est aussi utilisé pour l'icône de l'application mobile. Pour modifier l'icône PWA, modifiez également le fichier `manifest.json` :

```json
"icons": [
    {
        "src": "logo-192.png",
        "sizes": "192x192",
        "type": "image/png"
    },
    {
        "src": "logo-512.png", 
        "sizes": "512x512",
        "type": "image/png"
    }
]
```

---

**💡 Astuce** : Gardez toujours une copie de sauvegarde avant de modifier le logo !

**🏆 Une fois votre logo en place, Victory Restaurant aura une identité visuelle unique et professionnelle !**