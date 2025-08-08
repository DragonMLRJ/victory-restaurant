#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏆 Victory Restaurant - Configuration Setup');
console.log('==========================================\n');

// Vérifier les fichiers requis
const requiredFiles = [
    'index.html',
    'admin.html', 
    'styles.css',
    'script.js',
    'auth.js',
    'manifest.json'
];

console.log('📁 Vérification des fichiers...');
let allFilesPresent = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MANQUANT`);
        allFilesPresent = false;
    }
});

if (!allFilesPresent) {
    console.log('\n❌ Des fichiers sont manquants. Veuillez vérifier votre installation.');
    process.exit(1);
}

console.log('\n🔐 Configuration Sécurité...');

// Vérifier la configuration admin
const authFile = fs.readFileSync('auth.js', 'utf8');
if (authFile.includes("username: 'admin'") && authFile.includes("password: 'victory2025'")) {
    console.log('⚠️  ATTENTION: Identifiants admin par défaut détectés!');
    console.log('⚠️  Changez les identifiants dans auth.js avant la production!');
    console.log('⚠️  Ligne 4-5: username et password');
} else {
    console.log('✅ Identifiants admin personnalisés');
}

console.log('\n🔥 Configuration Firebase...');

// Vérifier la configuration Firebase
if (fs.existsSync('firebase-db.js')) {
    const firebaseFile = fs.readFileSync('firebase-db.js', 'utf8');
    if (firebaseFile.includes('VOTRE_API_KEY')) {
        console.log('⚠️  Configuration Firebase par défaut');
        console.log('💡 Personnalisez firebase-db.js pour activer la base de données');
    } else {
        console.log('✅ Configuration Firebase personnalisée');
    }
} else {
    console.log('📝 firebase-db.js non trouvé - créer si nécessaire');
}

console.log('\n📱 Configuration PWA...');

// Vérifier le manifest
try {
    const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    console.log(`✅ PWA: ${manifest.name}`);
    console.log(`✅ Theme: ${manifest.theme_color}`);
} catch (error) {
    console.log('❌ Erreur lecture manifest.json');
}

console.log('\n🌐 Préparation GitHub...');

// Créer un fichier de config local (exemple)
const localConfig = {
    setupDate: new Date().toISOString(),
    version: '1.0.0',
    configured: true,
    warnings: []
};

if (authFile.includes("username: 'admin'")) {
    localConfig.warnings.push('Identifiants admin par défaut');
}

fs.writeFileSync('.victory-config.json', JSON.stringify(localConfig, null, 2));
console.log('✅ Configuration locale sauvegardée');

console.log('\n📋 Prochaines étapes:');
console.log('1. 🔐 Changez les identifiants admin dans auth.js');
console.log('2. 🏷️  Ajoutez votre logo (voir LOGO-GUIDE.md)');
console.log('3. 🔥 Configurez Firebase si nécessaire');
console.log('4. 🚀 Déployez sur GitHub Pages');

console.log('\n🎉 Setup terminé! Victory Restaurant est prêt à être déployé!');
