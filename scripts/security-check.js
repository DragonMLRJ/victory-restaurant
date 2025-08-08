#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔐 Victory Restaurant - Security Check');
console.log('====================================\n');

let securityIssues = [];
let warnings = [];
let recommendations = [];

// 1. Vérifier les identifiants admin
console.log('🔍 Vérification identifiants admin...');
try {
    const authContent = fs.readFileSync('auth.js', 'utf8');
    
    if (authContent.includes("username: 'admin'") && authContent.includes("password: 'victory2025'")) {
        securityIssues.push({
            level: 'CRITICAL',
            issue: 'Identifiants admin par défaut',
            file: 'auth.js',
            line: '4-5',
            fix: 'Changez username et password avant déploiement'
        });
    } else {
        console.log('✅ Identifiants admin personnalisés');
    }
    
    // Vérifier la force du mot de passe (si personnalisé)
    const passwordMatch = authContent.match(/password:\s*['"`](.+?)['"`]/);
    if (passwordMatch) {
        const password = passwordMatch[1];
        if (password.length < 8) {
            warnings.push({
                level: 'WARNING', 
                issue: 'Mot de passe admin trop court',
                recommendation: 'Utilisez minimum 8 caractères'
            });
        }
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            recommendations.push({
                level: 'RECOMMENDATION',
                issue: 'Mot de passe admin pourrait être plus fort',
                recommendation: 'Mélangez majuscules, minuscules, chiffres et symboles'
            });
        }
    }
    
} catch (error) {
    securityIssues.push({
        level: 'ERROR',
        issue: 'Impossible de lire auth.js',
        fix: 'Vérifiez que le fichier existe'
    });
}

// 2. Vérifier la configuration Firebase
console.log('🔍 Vérification Firebase...');
try {
    const firebaseContent = fs.readFileSync('firebase-db.js', 'utf8');
    
    if (firebaseContent.includes('VOTRE_API_KEY')) {
        console.log('⚠️  Configuration Firebase par défaut (OK pour démo)');
    } else {
        // Vérifier qu'il n'y a pas de vraies clés API commitées
        const apiKeyMatch = firebaseContent.match(/apiKey:\s*['"`]([^'"`]+)['"`]/);
        if (apiKeyMatch && apiKeyMatch[1].length > 10 && !apiKeyMatch[1].includes('VOTRE')) {
            warnings.push({
                level: 'WARNING',
                issue: 'Possible vraie clé API Firebase détectée',
                recommendation: 'Assurez-vous de ne pas commiter de vraies clés API publiques'
            });
        } else {
            console.log('✅ Configuration Firebase sécurisée');
        }
    }
} catch (error) {
    console.log('📝 firebase-db.js non trouvé (optionnel)');
}

// 3. Vérifier les méta-tags de sécurité
console.log('🔍 Vérification méta-tags...');
try {
    const indexContent = fs.readFileSync('index.html', 'utf8');
    const adminContent = fs.readFileSync('admin.html', 'utf8');
    
    if (!adminContent.includes('name="robots"') || !adminContent.includes('noindex')) {
        warnings.push({
            level: 'WARNING',
            issue: 'Page admin indexable par les moteurs de recherche',
            file: 'admin.html',
            recommendation: 'Ajouter <meta name="robots" content="noindex, nofollow">'
        });
    } else {
        console.log('✅ Page admin protégée de l\'indexation');
    }
    
} catch (error) {
    securityIssues.push({
        level: 'ERROR',
        issue: 'Impossible de lire les fichiers HTML',
        fix: 'Vérifiez que index.html et admin.html existent'
    });
}

// 4. Vérifier les permissions des fichiers sensibles
console.log('🔍 Vérification fichiers sensibles...');
const sensitiveFiles = ['.env', 'config.js', 'secrets.js', 'private.key'];
sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
        warnings.push({
            level: 'WARNING',
            issue: `Fichier sensible détecté: ${file}`,
            recommendation: 'Ajoutez ce fichier à .gitignore'
        });
    }
});

// 5. Vérifier le .gitignore
console.log('🔍 Vérification .gitignore...');
try {
    const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
    const protectedPatterns = ['.env', '*.key', 'secrets.js', 'config/private'];
    
    protectedPatterns.forEach(pattern => {
        if (!gitignoreContent.includes(pattern)) {
            recommendations.push({
                level: 'RECOMMENDATION',
                issue: `Pattern manquant dans .gitignore: ${pattern}`,
                recommendation: 'Protégez les fichiers sensibles'
            });
        }
    });
    
    console.log('✅ .gitignore vérifié');
} catch (error) {
    recommendations.push({
        level: 'RECOMMENDATION',
        issue: '.gitignore manquant',
        recommendation: 'Créez un .gitignore pour protéger les fichiers sensibles'
    });
}

// Affichage des résultats
console.log('\n📊 RAPPORT DE SÉCURITÉ');
console.log('======================\n');

if (securityIssues.length > 0) {
    console.log('🚨 PROBLÈMES CRITIQUES:');
    securityIssues.forEach((issue, index) => {
        console.log(`${index + 1}. [${issue.level}] ${issue.issue}`);
        if (issue.file) console.log(`   📁 Fichier: ${issue.file}`);
        if (issue.line) console.log(`   📍 Ligne: ${issue.line}`);
        console.log(`   🔧 Solution: ${issue.fix}`);
        console.log('');
    });
}

if (warnings.length > 0) {
    console.log('⚠️  AVERTISSEMENTS:');
    warnings.forEach((warning, index) => {
        console.log(`${index + 1}. [${warning.level}] ${warning.issue}`);
        if (warning.file) console.log(`   📁 Fichier: ${warning.file}`);
        console.log(`   💡 Recommandation: ${warning.recommendation}`);
        console.log('');
    });
}

if (recommendations.length > 0) {
    console.log('💡 RECOMMANDATIONS:');
    recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. [${rec.level}] ${rec.issue}`);
        console.log(`   💡 Suggestion: ${rec.recommendation}`);
        console.log('');
    });
}

// Score de sécurité
const totalIssues = securityIssues.length + warnings.length + recommendations.length;
let securityScore = 100;

securityScore -= securityIssues.length * 30;
securityScore -= warnings.length * 15;
securityScore -= recommendations.length * 5;

securityScore = Math.max(0, securityScore);

console.log(`🛡️  SCORE DE SÉCURITÉ: ${securityScore}/100`);

if (securityScore >= 90) {
    console.log('✅ Excellent niveau de sécurité!');
} else if (securityScore >= 70) {
    console.log('⚠️  Niveau de sécurité correct, améliorations possibles');
} else if (securityScore >= 50) {
    console.log('🔶 Niveau de sécurité moyen, corrections recommandées');
} else {
    console.log('🚨 Niveau de sécurité faible, corrections critiques requises');
}

// Sauvegarder le rapport
const report = {
    date: new Date().toISOString(),
    score: securityScore,
    criticalIssues: securityIssues.length,
    warnings: warnings.length,
    recommendations: recommendations.length,
    issues: { securityIssues, warnings, recommendations }
};

fs.writeFileSync('security-report.json', JSON.stringify(report, null, 2));
console.log('\n📄 Rapport sauvegardé dans security-report.json');

// Code de sortie
if (securityIssues.length > 0) {
    console.log('\n❌ Correction des problèmes critiques requise avant déploiement!');
    process.exit(1);
} else {
    console.log('\n✅ Aucun problème critique détecté. Prêt pour le déploiement!');
    process.exit(0);
}
