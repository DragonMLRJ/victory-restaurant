@echo off
echo.
echo ========================================
echo   🚀 VICTORY RESTAURANT - DEPLOYMENT
echo ========================================
echo.

REM Vérifier que tous les fichiers sont présents
echo ✓ Vérification des fichiers...
if not exist "index.html" (
    echo ❌ Erreur: index.html manquant
    pause
    exit /b 1
)
if not exist "styles.css" (
    echo ❌ Erreur: styles.css manquant
    pause
    exit /b 1
)
if not exist "script.js" (
    echo ❌ Erreur: script.js manquant
    pause
    exit /b 1
)

echo ✓ Tous les fichiers sont présents
echo.

echo Choisissez votre plateforme de déploiement:
echo.
echo 1. 🟢 Netlify (Recommandé - Drag & Drop)
echo 2. 🔵 Vercel (GitHub requis)
echo 3. 🟡 GitHub Pages (GitHub requis)
echo 4. 🔴 Firebase (Installation Node.js requise)
echo 5. 📋 Checklist pré-déploiement
echo 6. 🔐 Configuration sécurité admin
echo.
set /p choice=Votre choix (1-6): 

if "%choice%"=="1" goto netlify
if "%choice%"=="2" goto vercel
if "%choice%"=="3" goto github
if "%choice%"=="4" goto firebase
if "%choice%"=="5" goto checklist
if "%choice%"=="6" goto security

echo Choix invalide
pause
exit /b 1

:netlify
echo.
echo 🟢 DÉPLOIEMENT NETLIFY
echo ==================
echo.
echo 1. Allez sur https://netlify.com
echo 2. Créez un compte gratuit
echo 3. Glissez-déposez ce dossier sur la zone de drop
echo 4. Votre site sera en ligne en 30 secondes !
echo.
echo 💡 Pour un nom personnalisé:
echo    - Site settings ^> Change site name
echo    - victory-restaurant-brazzaville.netlify.app
echo.
echo 🎯 URL exemple: https://victory-restaurant.netlify.app
echo.
start https://netlify.com
pause
goto end

:vercel
echo.
echo 🔵 DÉPLOIEMENT VERCEL
echo ==================
echo.
echo 1. Allez sur https://vercel.com
echo 2. Connectez votre compte GitHub
echo 3. Uploadez ce projet sur GitHub d'abord
echo 4. Import Git Repository sur Vercel
echo 5. Deploy !
echo.
echo 💡 Plus rapide si vous avez déjà GitHub
echo.
start https://vercel.com
pause
goto end

:github
echo.
echo 🟡 GITHUB PAGES
echo ================
echo.
echo 1. Allez sur https://github.com
echo 2. New Repository: victory-restaurant
echo 3. Uploadez tous les fichiers
echo 4. Settings ^> Pages ^> Deploy from branch main
echo 5. URL: https://votre-username.github.io/victory-restaurant
echo.
echo 💡 Gratuit mais plus lent à configurer
echo.
start https://github.com
pause
goto end

:firebase
echo.
echo 🔴 FIREBASE HOSTING
echo ===================
echo.
echo Prérequis: Node.js installé
echo.
echo Commandes à exécuter:
echo.
echo npm install -g firebase-tools
echo firebase login
echo firebase init hosting
echo firebase deploy
echo.
echo 💡 Plus technique mais très performant
echo.
pause
goto end

:checklist
echo.
echo 📋 CHECKLIST PRÉ-DÉPLOIEMENT
echo =============================
echo.
echo 🔐 SÉCURITÉ:
echo [ ] Identifiants admin changés dans auth.js
echo [ ] Test connexion admin en local
echo.
echo 🏷️ CONTENU:
echo [ ] Logo personnalisé ajouté
echo [ ] Informations restaurant mises à jour
echo [ ] Numéros de téléphone réels
echo [ ] Adresse et zones de livraison
echo.
echo 📱 TESTS:
echo [ ] Toutes les pages fonctionnent
echo [ ] Panier opérationnel
echo [ ] Mode sombre/clair
echo [ ] Test mobile (redimensionner fenêtre)
echo [ ] Pas d'erreurs console (F12)
echo.
echo 💡 Consultez DEPLOY-GUIDE.md pour plus de détails
echo.
pause
goto end

:security
echo.
echo 🔐 CONFIGURATION SÉCURITÉ ADMIN
echo ===============================
echo.
echo ⚠️  IMPORTANT: Changez les identifiants par défaut !
echo.
echo 1. Ouvrez le fichier: auth.js
echo 2. Ligne 4-5, changez:
echo    username: 'votre_admin'
echo    password: 'votre_mot_de_passe_fort'
echo.
echo 🛡️  Recommandations mot de passe:
echo   - Minimum 8 caractères
echo   - Majuscules + minuscules + chiffres + symboles
echo   - Exemple: VictoryAdmin2025!
echo.
echo 3. Sauvegardez le fichier
echo 4. Testez la connexion en local
echo.
echo 💡 Par défaut: admin / victory2025
echo.
pause
goto end

:end
echo.
echo 🎉 Merci d'avoir utilisé Victory Restaurant !
echo 📞 Besoin d'aide? Consultez DEPLOY-GUIDE.md
echo.
pause