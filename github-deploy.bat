@echo off
echo.
echo ========================================
echo   🐙 VICTORY RESTAURANT - GITHUB DEPLOY
echo ========================================
echo.

REM Vérifier Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git n'est pas installé
    echo 📥 Installez Git: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✓ Git détecté
echo.

echo Choisissez votre action:
echo.
echo 1. 🐙 Premier déploiement GitHub (nouveau repository)
echo 2. 🔄 Mise à jour repository existant
echo 3. 🔧 Configuration Firebase
echo 4. 🔐 Sécurité - Changer identifiants admin
echo 5. 📋 Checklist pré-déploiement
echo 6. 🎯 Cloner un repository existant
echo.
set /p choice=Votre choix (1-6): 

if "%choice%"=="1" goto first_deploy
if "%choice%"=="2" goto update_deploy
if "%choice%"=="3" goto firebase_config
if "%choice%"=="4" goto security_config
if "%choice%"=="5" goto checklist
if "%choice%"=="6" goto clone_repo

echo Choix invalide
pause
exit /b 1

:first_deploy
echo.
echo 🐙 PREMIER DÉPLOIEMENT GITHUB
echo =============================
echo.

echo Étape 1: Créer le repository sur GitHub
echo 1. Allez sur https://github.com
echo 2. Cliquez "New repository" (bouton vert)
echo 3. Nom: victory-restaurant
echo 4. Description: Application web pour restaurant Victory - Brazzaville
echo 5. Public ✓ (recommandé pour GitHub Pages gratuit)
echo 6. Add README file: ❌ (nous avons déjà le nôtre)
echo 7. Cliquez "Create repository"
echo.
pause

echo Étape 2: Configuration Git locale
echo.
set /p username=Votre nom d'utilisateur GitHub: 
set /p email=Votre email GitHub: 

git config --global user.name "%username%"
git config --global user.email "%email%"

echo ✓ Configuration Git terminée
echo.

echo Étape 3: Initialisation repository local
git init
git add .
git commit -m "🏆 Initial commit - Victory Restaurant"

echo.
echo Étape 4: Connexion au repository GitHub
echo.
echo Copiez l'URL de votre repository GitHub (ex: https://github.com/%username%/victory-restaurant.git)
set /p repo_url=URL du repository: 

git branch -M main
git remote add origin %repo_url%
git push -u origin main

echo.
echo 🎉 Code envoyé sur GitHub !
echo.

echo Étape 5: Activer GitHub Pages
echo 1. Allez sur votre repository GitHub
echo 2. Settings ^> Pages
echo 3. Source: Deploy from a branch
echo 4. Branch: main / (root)
echo 5. Save
echo.
echo 🌐 Votre site sera disponible sur:
echo https://%username%.github.io/victory-restaurant
echo 🔐 Admin: https://%username%.github.io/victory-restaurant/admin.html
echo.
start https://github.com/%username%/victory-restaurant/settings/pages
pause
goto end

:update_deploy
echo.
echo 🔄 MISE À JOUR REPOSITORY
echo =========================
echo.

echo Vérification des changements...
git status

echo.
echo Ajout des nouveaux fichiers...
git add .

echo.
set /p commit_msg=Message de commit (ex: Ajouter nouvelle fonctionnalité): 
if "%commit_msg%"=="" set commit_msg=Mise à jour Victory Restaurant

git commit -m "🔄 %commit_msg%"
git push

echo.
echo ✅ Mise à jour déployée !
echo 🔄 GitHub Pages se mettra à jour dans 1-2 minutes
echo.
pause
goto end

:firebase_config
echo.
echo 🔥 CONFIGURATION FIREBASE
echo ==========================
echo.
echo 1. Allez sur https://console.firebase.google.com/
echo 2. Créez un nouveau projet: "victory-restaurant"
echo 3. Activez Firestore Database
echo 4. Copiez la configuration (Project Settings ^> General ^> Your apps)
echo.
echo 5. Modifiez le fichier firebase-db.js:
echo    - Remplacez VOTRE_API_KEY par votre vraie clé
echo    - Remplacez les XXXXX par vos vraies valeurs
echo.
echo 6. Décommentez les scripts Firebase dans index.html et admin.html
echo    (Supprimez les ^<^!^-^- et ^-^-^> autour des scripts Firebase)
echo.
echo 7. Redéployez avec l'option 2
echo.
start https://console.firebase.google.com/
pause
goto end

:security_config
echo.
echo 🔐 CONFIGURATION SÉCURITÉ ADMIN
echo ===============================
echo.
echo ⚠️  OBLIGATOIRE avant mise en production !
echo.
echo 1. Ouvrez le fichier: auth.js
echo 2. Ligne 4-5, changez:
echo.
echo    AVANT:
echo    username: 'admin',
echo    password: 'victory2025',
echo.
echo    APRÈS:
echo    username: 'VOTRE_NOUVEAU_ADMIN',
echo    password: 'VOTRE_MOT_DE_PASSE_TRÈS_FORT',
echo.
echo 💡 Conseils mot de passe fort:
echo   - Minimum 12 caractères
echo   - Mélange de majuscules, minuscules, chiffres, symboles
echo   - Exemple: VictoryAdmin2025#Brazza!
echo.
echo 3. Sauvegardez le fichier
echo 4. Testez en local (start.bat)
echo 5. Redéployez (option 2)
echo.
notepad auth.js
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
echo [ ] Pas de données sensibles dans le code
echo.
echo 🎨 PERSONNALISATION:
echo [ ] Logo restaurant ajouté/personnalisé
echo [ ] Informations restaurant mises à jour
echo [ ] Numéros de téléphone et adresse réels
echo [ ] Prix et menu adaptés
echo.
echo 📱 TESTS FONCTIONNELS:
echo [ ] Toutes les pages se chargent (Accueil, Menu, Suivi)
echo [ ] Panier fonctionnel (ajout, suppression, quantités)
echo [ ] Mode sombre/clair fonctionne
echo [ ] Responsive mobile (redimensionner fenêtre)
echo [ ] Admin accessible avec bons identifiants
echo [ ] Pas d'erreurs console (F12)
echo.
echo 🔥 FIREBASE (si utilisé):
echo [ ] Configuration Firebase personnalisée
echo [ ] Scripts Firebase décommentés
echo [ ] Test synchronisation admin
echo.
echo 🌐 DÉPLOIEMENT:
echo [ ] Repository GitHub créé
echo [ ] GitHub Pages activé
echo [ ] URL fonctionne en ligne
echo [ ] Test mobile en ligne
echo.
echo 💡 Une fois tout validé, utilisez l'option 1 ou 2 pour déployer
echo.
pause
goto end

:clone_repo
echo.
echo 🎯 CLONER REPOSITORY EXISTANT
echo =============================
echo.
echo Si vous voulez récupérer Victory Restaurant depuis GitHub:
echo.
set /p clone_url=URL du repository à cloner: 

echo.
echo Clonage en cours...
cd ..
git clone %clone_url%

echo.
echo ✅ Repository cloné !
echo 💡 Ouvrez le dossier dans VS Code et utilisez start.bat
echo.
pause
goto end

:end
echo.
echo 🏆 VICTORY RESTAURANT - GITHUB READY !
echo =====================================
echo.
echo 🎯 Prochaines étapes recommandées:
echo.
echo 1. 🔐 Sécurisez l'admin (option 4 si pas fait)
echo 2. 🎨 Personnalisez le logo et infos restaurant
echo 3. 🔥 Configurez Firebase pour la base de données (option 3)
echo 4. 📱 Testez sur mobile et desktop
echo 5. 🌐 Partagez l'URL avec votre équipe !
echo.
echo 📖 Documentation complète: README.md
echo 🆘 Problèmes? Créez une issue sur GitHub
echo.
echo 🎉 Bon lancement avec Victory Restaurant !
echo.
pause