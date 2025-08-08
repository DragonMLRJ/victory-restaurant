// Victory Restaurant - Système d'Authentification Admin

// Configuration admin
const ADMIN_CONFIG = {
    // IDENTIFIANTS SÉCURISÉS POUR LA PRODUCTION
    username: 'victoryAdmin',
    password: 'VictoryBrazza2025!#Secure',
    sessionDuration: 2 * 60 * 60 * 1000, // 2 heures en millisecondes
    maxAttempts: 3,
    blockDuration: 15 * 60 * 1000 // 15 minutes de blocage
};

// État d'authentification
let authState = {
    isAuthenticated: false,
    loginAttempts: 0,
    blockedUntil: null,
    sessionExpiry: null
};

// Initialiser l'authentification
function initializeAuth() {
    // Vérifier si une session existe
    const savedAuth = localStorage.getItem('victoryAdminAuth');
    if (savedAuth) {
        try {
            const authData = JSON.parse(savedAuth);
            if (authData.sessionExpiry && new Date().getTime() < authData.sessionExpiry) {
                authState.isAuthenticated = true;
                authState.sessionExpiry = authData.sessionExpiry;
                updateAdminVisibility();
            } else {
                // Session expirée
                localStorage.removeItem('victoryAdminAuth');
            }
        } catch (error) {
            localStorage.removeItem('victoryAdminAuth');
        }
    }
    
    // Vérifier les tentatives de connexion bloquées
    const blockData = localStorage.getItem('victoryAdminBlock');
    if (blockData) {
        try {
            const blockInfo = JSON.parse(blockData);
            if (blockInfo.blockedUntil && new Date().getTime() < blockInfo.blockedUntil) {
                authState.blockedUntil = blockInfo.blockedUntil;
                authState.loginAttempts = blockInfo.attempts;
            } else {
                localStorage.removeItem('victoryAdminBlock');
                authState.loginAttempts = 0;
                authState.blockedUntil = null;
            }
        } catch (error) {
            localStorage.removeItem('victoryAdminBlock');
        }
    }
    
    updateAdminVisibility();
}

// Masquer/Afficher l'accès admin (non utilisé dans cette version)
function updateAdminVisibility() {
    // Dans cette version, l'admin est sur une page séparée (admin.html)
    // Cette fonction est conservée pour compatibilité mais n'est plus utilisée
    console.log('🔐 Admin sur page séparée - pas de mise à jour UI nécessaire');
}

// Afficher le modal de connexion
function showLoginModal() {
    // Vérifier si bloqué
    if (authState.blockedUntil && new Date().getTime() < authState.blockedUntil) {
        const remainingTime = Math.ceil((authState.blockedUntil - new Date().getTime()) / 60000);
        showNotification(`Accès bloqué pendant encore ${remainingTime} minutes`, 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'loginModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 300;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--bg-card);
            padding: var(--spacing-xl);
            border-radius: var(--border-radius-xl);
            border: 1px solid var(--border-color);
            box-shadow: 0 20px 40px var(--shadow-dark);
            max-width: 400px;
            width: 90%;
            text-align: center;
        ">
            <h2 style="color: var(--primary-color); margin-bottom: var(--spacing-lg); font-size: 1.5rem;">
                🔐 Accès Administrateur
            </h2>
            
            <div style="margin-bottom: var(--spacing-md);">
                <input type="text" id="adminUsername" placeholder="Nom d'utilisateur" 
                       style="width: 100%; padding: var(--spacing-sm); border: 2px solid var(--border-color); 
                              border-radius: var(--border-radius); background: var(--bg-secondary); 
                              color: var(--text-primary); margin-bottom: var(--spacing-sm);">
                              
                <input type="password" id="adminPassword" placeholder="Mot de passe" 
                       style="width: 100%; padding: var(--spacing-sm); border: 2px solid var(--border-color); 
                              border-radius: var(--border-radius); background: var(--bg-secondary); 
                              color: var(--text-primary);">
            </div>
            
            <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-md);">
                Tentatives restantes: <span id="attemptsRemaining">${ADMIN_CONFIG.maxAttempts - authState.loginAttempts}</span>
            </div>
            
            <div style="display: flex; gap: var(--spacing-sm);">
                <button onclick="closeLoginModal()" style="
                    flex: 1; background: var(--bg-secondary); color: var(--text-primary); 
                    border: 1px solid var(--border-color); padding: var(--spacing-sm); 
                    border-radius: var(--border-radius); cursor: pointer; font-weight: 600;
                ">Annuler</button>
                
                <button onclick="attemptLogin()" style="
                    flex: 2; background: var(--primary-color); color: var(--text-inverse); 
                    border: none; padding: var(--spacing-sm); border-radius: var(--border-radius); 
                    cursor: pointer; font-weight: 600;
                ">Se Connecter</button>
            </div>
            
            <div style="margin-top: var(--spacing-md); font-size: 0.8rem; color: var(--text-muted);">
                💡 Démo: admin / victory2025
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus sur le premier champ
    setTimeout(() => {
        document.getElementById('adminUsername').focus();
    }, 100);
    
    // Écouter Enter pour connexion
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            attemptLogin();
        }
    });
}

// Fermer le modal de connexion
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

// Tentative de connexion
function attemptLogin() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    
    if (!username || !password) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    // Vérifier les identifiants
    if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
        // Connexion réussie
        authState.isAuthenticated = true;
        authState.loginAttempts = 0;
        authState.sessionExpiry = new Date().getTime() + ADMIN_CONFIG.sessionDuration;
        
        // Sauvegarder la session
        localStorage.setItem('victoryAdminAuth', JSON.stringify({
            sessionExpiry: authState.sessionExpiry
        }));
        
        // Nettoyer les blocages
        localStorage.removeItem('victoryAdminBlock');
        
        closeLoginModal();
        updateAdminVisibility();
        showSection('admin');
        showNotification('Connexion administrateur réussie! 🎉', 'success');
        
    } else {
        // Connexion échouée
        authState.loginAttempts++;
        
        if (authState.loginAttempts >= ADMIN_CONFIG.maxAttempts) {
            // Bloquer l'accès
            authState.blockedUntil = new Date().getTime() + ADMIN_CONFIG.blockDuration;
            
            localStorage.setItem('victoryAdminBlock', JSON.stringify({
                attempts: authState.loginAttempts,
                blockedUntil: authState.blockedUntil
            }));
            
            closeLoginModal();
            showNotification(`Accès bloqué pour ${ADMIN_CONFIG.blockDuration / 60000} minutes`, 'error');
        } else {
            const remaining = ADMIN_CONFIG.maxAttempts - authState.loginAttempts;
            document.getElementById('attemptsRemaining').textContent = remaining;
            showNotification(`Identifiants incorrects. ${remaining} tentative(s) restante(s)`, 'error');
            
            // Vider les champs
            document.getElementById('adminPassword').value = '';
            document.getElementById('adminPassword').focus();
        }
    }
}

// Déconnexion admin
function logoutAdmin() {
    authState.isAuthenticated = false;
    authState.sessionExpiry = null;
    localStorage.removeItem('victoryAdminAuth');
    
    updateAdminVisibility();
    showSection('home');
    showNotification('Déconnexion réussie', 'info');
}

// Vérifier la session périodiquement
function checkSession() {
    if (authState.isAuthenticated && authState.sessionExpiry) {
        if (new Date().getTime() >= authState.sessionExpiry) {
            // Session expirée
            logoutAdmin();
            showNotification('Session expirée. Veuillez vous reconnecter.', 'warning');
        }
    }
}

// Intercepter l'accès à la section admin (non utilisé dans cette version)
const originalShowSection = window.showSection;
window.showSection = function(sectionName) {
    // Dans cette version, l'admin est sur admin.html séparément
    if (sectionName === 'admin') {
        // Rediriger vers la page admin
        window.location.href = 'admin.html';
        return;
    }
    
    // Pour les autres sections, utiliser la fonction normale
    if (originalShowSection) {
        originalShowSection(sectionName);
    }
};

// Fonction addLogoutButton supprimée car l'admin est sur une page séparée
// Le bouton de déconnexion est maintenant géré dans admin.html directement

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAuth, 1000);
    
    // Vérifier la session toutes les minutes
    setInterval(checkSession, 60000);
});

// Ajouter CSS pour les animations
const authCSS = `
@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes fadeOut {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.9); }
}

#loginModal {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.logout-btn:hover {
    transform: translateY(-1px);
}
`;

const authStyleSheet = document.createElement('style');
authStyleSheet.textContent = authCSS;
document.head.appendChild(authStyleSheet);

console.log('🔐 Système d\'authentification admin activé!');
