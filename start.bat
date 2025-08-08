@echo off
echo.
echo ========================================
echo   🏆 VICTORY RESTAURANT - LAUNCH SCRIPT
echo ========================================
echo.
echo Ouverture de l'application Victory Restaurant...
echo.

REM Recherche de VS Code
if exist "%USERPROFILE%\AppData\Local\Programs\Microsoft VS Code\Code.exe" (
    echo ✓ VS Code trouvé! Ouverture du projet...
    start "" "%USERPROFILE%\AppData\Local\Programs\Microsoft VS Code\Code.exe" "%~dp0"
    timeout /t 3 >nul
    echo.
    echo ✓ Projet ouvert dans VS Code
    echo.
    echo INSTRUCTIONS:
    echo 1. Installer l'extension "Live Server" si pas déjà fait
    echo 2. Clic droit sur "index.html" dans VS Code
    echo 3. Sélectionner "Open with Live Server"
    echo 4. L'application s'ouvrira dans votre navigateur
    echo.
) else (
    echo VS Code non trouvé dans l'emplacement standard.
    echo Ouverture du dossier dans l'explorateur...
    start "" "%~dp0"
    echo.
    echo INSTRUCTIONS MANUELLES:
    echo 1. Ouvrez VS Code manuellement
    echo 2. Faites File > Open Folder et sélectionnez ce dossier
    echo 3. Installez l'extension "Live Server"
    echo 4. Clic droit sur "index.html" > "Open with Live Server"
    echo.
)

REM Alternative: Ouverture directe dans le navigateur
echo Alternative: Voulez-vous ouvrir directement dans le navigateur? (o/n)
set /p choice=Votre choix: 
if /i "%choice%"=="o" (
    echo Ouverture dans le navigateur par défaut...
    start "" "index.html"
    echo.
    echo ✓ Application ouverte!
    echo Note: Certaines fonctionnalités avancées nécessitent un serveur local
)

echo.
echo ========================================
echo   🏆 VICTORY RESTAURANT PRÊT À UTILISER!
echo ========================================
echo.
pause