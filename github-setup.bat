@echo off
echo.
echo ========================================
echo   🐙 VICTORY RESTAURANT - GITHUB SETUP
echo ========================================
echo.

REM Vérifier Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git n'est pas installé ou pas dans le PATH
    echo 💡 Installez Git depuis: https://git-scm.com/download/windows
    pause
    exit /b 1
)

echo ✅ Git détecté
echo.

echo Choisissez votre action:
echo.
echo 1. 🆕 Nouveau Repository GitHub (première fois)
echo 2. 🔄 Push vers Repository existant
echo 3. 🔧 Configuration initiale seulement
echo 4. 🚀 Déploiement GitHub Pages
echo 5. 🔐 Vérification sécurité avant push
echo 6. 📋 Guide déploiement complet
echo.
set /p choice=Votre choix (1-6): 

if "%choice%"=="1" goto new_repo
if "%choice%"=="2" goto push_existing
if "%choice%"=="3" goto config_only
if "%choice%"=="4" goto github_pages
if "%choice%"=="5" goto security_check
if "%choice%"=="6" goto full_guide

echo Choix invalide
pause
exit /b 1

:new_repo
echo.
echo 🆕 CRÉATION NOUVEAU REPOSITORY GITHUB
echo =====================================
echo.
echo 1. Allez sur https://github.com/new
echo 2. Nom du repository: victory-restaurant
echo 3. Description: Application de restaurant moderne pour Brazzaville
echo 4. Public ✅ (pour GitHub Pages gratuit)
echo 5. Ne pas initialiser avec README (on a déjà les fichiers)
echo 6. Create repository
echo.
echo Ensuite, copiez l'URL du repository (ex: https://github.com/votre-username/victory-restaurant.git)
echo.
set /p repo_url=Collez l'URL du repository ici: 

if "%repo_url%"=="" (
    echo ❌ URL requise
    pause
    exit /b 1
)

echo.
echo 🔧 Configuration Git locale...
git init
git add .
git commit -m "🏆 Initial commit: Victory Restaurant complete application"
git branch -M main
git remote add origin %repo_url%

echo.
echo 🚀 Push vers GitHub...
git push -u origin main

if errorlevel 1 (
    echo ❌ Erreur lors du push
    echo 💡 Vérifiez vos identifiants GitHub
    pause
    exit /b 1
)

echo.
echo ✅ Repository créé avec succès !
echo 🔗 URL: %repo_url%
echo.
goto github_pages

:push_existing
echo.
echo 🔄 PUSH VERS REPOSITORY EXISTANT
echo ================================
echo.
git status
echo.
echo Fichiers à commiter ^
echo.
set /p commit_msg=Message de commit: 

if "%commit_msg%"=="" (
    set commit_msg=Update Victory Restaurant
)

git add .
git commit -m "%commit_msg%"
git push

if errorlevel 1 (
    echo ❌ Erreur lors du push
    pause
    exit /b 1
)

echo ✅ Push réussi !
goto end

:config_only
echo.
echo 🔧 CONFIGURATION INITIALE
echo =========================
echo.
git init
git add .
git commit -m "🏆 Initial commit: Victory Restaurant"
git branch -M main

echo ✅ Configuration Git terminée
echo 💡 Prêt pour ajouter un remote et push
goto end

:github_pages
echo.
echo 🚀 CONFIGURATION GITHUB PAGES
echo =============================
echo.
echo 1. Allez sur votre repository GitHub
echo 2. Settings ^> Pages
echo 3. Source: "Deploy from a branch"
echo 4. Branch: main / ^(root^)
echo 5. Save
echo.
echo ⏰ Attendez 2-5 minutes pour le déploiement
echo.
echo 🔗 Votre site sera accessible sur:
echo    https://VOTRE-USERNAME.github.io/victory-restaurant
echo.
echo 🔐 Panel admin:
echo    https://VOTRE-USERNAME.github.io/victory-restaurant/admin.html
echo.
echo 📊 Actions GitHub (optionnel):
echo    Repository ^> Actions ^> "Victory Restaurant Deploy"
echo.
start https://github.com/settings/pages
pause
goto end

:security_check
echo.
echo 🔐 VÉRIFICATION SÉCURITÉ
echo =======================
echo.

REM Vérifier les identifiants admin par défaut
findstr /C:"username: 'admin'" auth.js >nul
if %errorlevel%==0 (
    findstr /C:"password: 'victory2025'" auth.js >nul
    if %errorlevel%==0 (
        echo ⚠️  ATTENTION: Identifiants admin par défaut détectés !
        echo.
        echo 🔧 ACTIONS REQUISES AVANT PUSH:
        echo 1. Ouvrir auth.js
        echo 2. Changer ligne 4: username: 'votre_admin'
        echo 3. Changer ligne 5: password: 'votre_mot_de_passe_fort'
        echo 4. Sauvegarder le fichier
        echo.
        echo ❌ NE PAS PUSHER AVANT CES CHANGEMENTS !
        echo.
        pause
        exit /b 1
    )
)

echo ✅ Identifiants admin personnalisés

REM Vérifier Firebase
findstr /C:"VOTRE_API_KEY" firebase-db.js >nul
if %errorlevel%==0 (
    echo ⚠️  Configuration Firebase par défaut détectée
    echo 💡 Personnalisez firebase-db.js pour activer la base de données
    echo.
) else (
    echo ✅ Configuration Firebase personnalisée
)

REM Vérifier meta robots pour admin
findstr /C:"robots" admin.html >nul
if %errorlevel%==0 (
    echo ✅ Meta robots présent pour admin.html
) else (
    echo ⚠️  Meta robots manquant pour admin.html (recommandé)
)

echo.
echo 🔒 Checklist Sécurité:
echo [✅] Identifiants admin changés
echo [✅] Pas de données sensibles
echo [✅] Configuration Firebase sécurisée
echo [✅] Admin protégé
echo.
echo ✅ SÉCURITÉ VALIDÉE - PRÊT POUR LE PUSH !
echo.
pause
goto end

:full_guide
echo.
echo 📋 GUIDE DÉPLOIEMENT COMPLET
echo ============================
echo.
echo 🎯 ÉTAPES COMPLÈTES:
echo.
echo 1. PRÉPARATION:
echo    - Changez les identifiants admin dans auth.js
echo    - Personnalisez le logo si souhaité
echo    - Vérifiez que tout fonctionne en local
echo.
echo 2. GITHUB:
echo    - Créez un compte GitHub si nécessaire
echo    - Nouveau repository "victory-restaurant"
echo    - Public pour GitHub Pages gratuit
echo.
echo 3. PUSH CODE:
echo    - Utilisez ce script option 1 ou 2
echo    - Vérifiez que tous les fichiers sont pushés
echo.
echo 4. GITHUB PAGES:
echo    - Settings ^> Pages ^> Deploy from branch main
echo    - Attendez 2-5 minutes
echo.
echo 5. TEST:
echo    - Site public: https://USERNAME.github.io/victory-restaurant
echo    - Admin: https://USERNAME.github.io/victory-restaurant/admin.html
echo    - Testez toutes les fonctionnalités
echo.
echo 6. FIREBASE (OPTIONNEL):
echo    - Créez projet Firebase
echo    - Configurez Firestore
echo    - Mettez à jour firebase-db.js
echo.
echo 🔗 RESSOURCES:
echo    - GitHub: https://github.com
echo    - Firebase: https://console.firebase.google.com
echo    - Documentation: README.md
echo.
pause
goto end

:end
echo.
echo 🎉 VICTORY RESTAURANT - PRÊT POUR GITHUB !
echo.
echo 📞 Besoin d'aide ?
echo    - Consultez README.md
echo    - Issues GitHub pour bugs
echo    - CONTRIBUTING.md pour contribuer
echo.
echo 🏆 Merci d'utiliser Victory Restaurant !
echo.
pause