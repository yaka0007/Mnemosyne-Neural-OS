# 🏗️ Architecture de l'Écosystème XPACEGEMS

**Version :** 1.0  
**Dernière mise à jour :** 2025-12-08  
**Architecture :** Monorepo V5 (XPACEGEMS_ECOSYSTEM)

---

## 📋 Table des Matières

1. [Vue d'Ensemble](#vue-densemble)
2. [Architecture Monorepo](#architecture-monorepo)
3. [Structure des Répertoires](#structure-des-répertoires)
4. [Projets Principaux](#projets-principaux)
5. [Prototypes](#prototypes)
6. [Technologies Utilisées](#technologies-utilisées)
7. [Système de Déploiement](#système-de-déploiement)
8. [Gestion des Ports](#gestion-des-ports)
9. [Outils et Scripts](#outils-et-scripts)
10. [Règles et Conventions](#règles-et-conventions)
11. [Dashboard Localhost](#dashboard-localhost)

---

## 🎯 Vue d'Ensemble

XPACEGEMS est un écosystème financier décentralisé basé sur des **Real World Assets (RWA)** :
- **Émeraudes brutes brésiliennes** garanties par des SBLC bancaires
- **Réinvestissement** dans l'économie réelle (Café, Sucre, Or)
- **Token XGEMS** avec mécanisme xNFT
- **Protocoles DeFi** : Trading, Lending, Launchpad

### Philosophie Architecturale

- **Monorepo structuré** : Tous les projets dans un seul dépôt
- **Indépendance des projets** : Chaque projet peut être déployé séparément
- **Réutilisation des assets** : `SHARED_ASSETS/` pour les ressources communes
- **Scalabilité** : Architecture extensible pour nouveaux projets
- **Dark Mode & Luxe** : Design cohérent "Apple meets DeFi"

---

## 🏛️ Architecture Monorepo

### Structure Racine

```
XPACEGEMS ECOSYSTEMS/
├── CORE_WEBSITE/          # Site principal de l'écosystème
├── XLAUNCHPAD_HUB/        # Hub central d'accès aux projets
├── WELCOME/               # Page d'accueil / Welcome page
├── XLENDING/              # Protocole de prêt auto-remboursable
├── PROJECTS/              # Projets de production
│   ├── RAW_TRADING/       # Trading de gemmes brutes
│   ├── GOLDIGGER_CLUB/    # Club privé de banque
│   ├── THE_MANDATE/       # Plateforme complète
│   └── RAA_PROTOCOL/      # Protocole RAA
├── _VIBE_LAB_ARCHIVE/      # Prototypes et expérimentations
│   ├── RAA1/              # Simulateur RAA v1
│   ├── RAA-W/             # Simulateur RAA amélioré
│   ├── Elis/              # Portail Elis
│   ├── living-asset/      # Guide xNFT interactif
│   ├── xNFT_mint/         # Laboratoire de minting
│   ├── welcome_test/      # Tests page d'accueil
│   └── .resume/           # Dashboard localhost
├── MARKETPLACES/          # Marketplaces P2P
│   ├── P2P_EXCHANGE/      # Échange peer-to-peer
│   └── XMARKET_PUBLIC/    # Marketplace publique
├── SHARED_ASSETS/         # Assets partagés
│   ├── fonts/             # Polices communes
│   └── logos/             # Logos et icônes
├── localhost/             # Scripts de démarrage
├── CURSOR_RULES/          # Règles de développement
├── _GENESIS_LOG/          # Journal de bord
└── assets/                # Assets généraux
```

---

## 📁 Structure des Répertoires

### CORE_WEBSITE
**Rôle :** Site principal de l'écosystème XPACEGEMS  
**Port :** 5173  
**URL Vercel :** https://xpacegems-ecosystem.vercel.app  
**Version :** v0.616

**Technologies :**
- React + Vite
- Three.js (Fiber) pour la 3D
- Tailwind CSS
- Framer Motion pour les animations
- React Router pour la navigation
- Multilingue (EN/FR/ES)

**Structure :**
```
CORE_WEBSITE/
├── src/
│   ├── App.jsx           # Composant principal
│   ├── components/       # Composants React
│   ├── pages/            # Pages (Collections, Tokenomics, xNFTMechanism)
│   └── translations.js  # Traductions multilingues
├── public/               # Assets statiques
├── dist/                 # Build de production
├── vite.config.js        # Configuration Vite
└── vercel.json           # Configuration Vercel
```

### XLAUNCHPAD_HUB
**Rôle :** Hub central pour accéder aux projets  
**Port :** 5178  
**URL Vercel :** https://xlaunchpad-hub.vercel.app  
**Version :** v1.0

**Technologies :**
- React + Vite
- Tailwind CSS
- Dashboard financier

### WELCOME
**Rôle :** Page d'accueil / Welcome page  
**Port :** 5174  
**URL Vercel :** https://welcome.xpacegems.vercel.app  
**Version :** v1.0

**Technologies :**
- React + Vite
- Tailwind CSS

### XLENDING
**Rôle :** Protocole de prêt auto-remboursable  
**Port :** 5200  
**URL Vercel :** https://xlending.vercel.app  
**Version :** v0.1.0

**Fonctionnalités :**
- Prêts garantis par xNFT Genesis
- Remboursement automatique via rendement écosystème
- Calculateur de liberté interactif
- Multilingue (EN/FR/ES/CN/AR)

---

## 🚀 Projets Principaux

### RAW_TRADING
**Port :** 5177  
**URL Vercel :** https://raw-trading.vercel.app  
**Version :** v0.126

**Fonctionnalités :**
- Trading de gemmes brutes brésiliennes
- Système de batches avec SBLC
- Page Profits détaillée
- Navigation complète (Home, Process, Batches, Profits, Ecosystem)
- Footer XPACEGEMS professionnel
- Multilingue (EN/FR)

**Technologies :**
- React + Vite
- React Router
- Tailwind CSS

### GOLDIGGER_CLUB
**Port :** 5182  
**URL Vercel :** https://goldigger.vercel.app  
**Version :** ALPHA

**Rôle :** Landing page exclusive pour membres du club privé

### THE_MANDATE
**Port :** 5183  
**URL Vercel :** https://the-mandate.vercel.app  
**Version :** v1.0

**Rôle :** Plateforme complète dans l'écosystème

---

## 🧪 Prototypes

### RAA1 (Port 5175)
**Version :** v0.5  
**Rôle :** Simulateur RAA avec géolocalisation et API météo

**Fonctionnalités :**
- Calcul de rendement café
- Intégration Google Elevation API
- Intégration Open-Meteo API
- Géofencing actif

### RAA-W (Port 5179)
**Version :** v0.2  
**Rôle :** Version améliorée du simulateur RAA

### Elis (Port 5176)
**Version :** v0.3  
**Rôle :** Portail Elis - Prototype

**Pages :**
- AboutElis
- HowItWorks
- Vaults

### living-asset (Port 5186)
**Version :** v0.1  
**Rôle :** Mécanisme xNFT - Guide interactif

**Composants :**
- Step1Obtain
- Step2Connect
- Step3View
- Step4Claim

### xNFT_mint (Port 5190)
**Version :** v0.2  
**Rôle :** Laboratoire prototype - Expériences de minting xNFT

**Composants :**
- CollectionDetail
- Matrix
- Monolith
- Reveal

### welcome_test (Port 5180)
**Version :** v0.1  
**Rôle :** Prototype de test pour la page d'accueil

### .elements (Port 5181)
**Version :** v0.4  
**Rôle :** Éléments UI et backgrounds

---

## 🛠️ Technologies Utilisées

### Stack Principal
- **React** : Framework UI
- **Vite** : Build tool et dev server
- **Tailwind CSS** : Framework CSS utility-first
- **PostCSS** : Traitement CSS
- **React Router** : Navigation SPA

### Bibliothèques Spécialisées
- **Three.js / React Three Fiber** : Rendu 3D (CORE_WEBSITE)
- **Framer Motion** : Animations fluides
- **Lucide React** : Icônes
- **Express** : Serveur API (Dashboard localhost)

### Outils de Déploiement
- **Vercel CLI** : Déploiement cloud
- **PowerShell** : Scripts d'automatisation Windows
- **Batch (.bat)** : Scripts de démarrage rapide

---

## 🚢 Système de Déploiement

### Configuration Vercel

Chaque projet a son propre `vercel.json` :

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

### Scripts de Déploiement

**PowerShell :**
- `scripts/deploy-to-vercel.ps1` : Déploiement général
- `scripts/deploy-all.ps1` : Déploiement de tous les projets
- `PROJECTS/*/deploy-vercel.ps1` : Déploiement individuel

**Commandes :**
```powershell
# Déploiement individuel
cd PROJECTS/RAW_TRADING
vercel --prod

# Déploiement depuis dashboard
# Utiliser le bouton "🚀 Déployer" sur chaque carte
```

---

## 🔌 Gestion des Ports

### Ports Alloués

| Projet | Port | Catégorie | Vercel |
|--------|------|-----------|--------|
| CORE_WEBSITE | 5173 | Principal | ✅ |
| WELCOME | 5174 | Autre | ✅ |
| RAA1 | 5175 | Prototype | ❌ |
| Elis | 5176 | Prototype | ❌ |
| RAW_TRADING | 5177 | Projet | ✅ |
| XLAUNCHPAD_HUB | 5178 | Autre | ✅ |
| RAA-W | 5179 | Prototype | ❌ |
| welcome_test | 5180 | Prototype | ❌ |
| .elements | 5181 | Prototype | ❌ |
| GOLDIGGER_CLUB | 5182 | Projet | ✅ |
| THE_MANDATE | 5183 | Projet | ✅ |
| AI_FACTORY | 5185 | Projet | ❌ |
| LIVING_ASSET | 5186 | Prototype | ❌ |
| xNFT_MINT | 5190 | Prototype | ❌ |
| XLENDING | 5200 | Projet | ✅ |
| Dashboard Localhost | 5184 | Outil | ❌ |

### Configuration des Ports

Chaque projet configure son port dans `vite.config.js` :

```javascript
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    host: true
  }
})
```

---

## 🎛️ Outils et Scripts

### Scripts de Démarrage (localhost/)

**Fichiers .bat :**
- `START-CORE-WEBSITE.bat` : Démarre CORE_WEBSITE sur port 5173
- `START-WELCOME.bat` : Démarre WELCOME sur port 5174
- `START-RAW-TRADING.bat` : Démarre RAW_TRADING sur port 5177
- `START-XLAUNCHPAD-HUB.bat` : Démarre XLAUNCHPAD_HUB sur port 5178
- `START-GOLDIGGER-CLUB.bat` : Démarre GOLDIGGER_CLUB sur port 5182
- `START-THE-MANDATE.bat` : Démarre THE_MANDATE sur port 5183
- `START-XLENDING.bat` : Démarre XLENDING sur port 5200
- `START-ALL.bat` : Démarre tous les serveurs
- `START-SELECTED.bat` : Démarre les serveurs sélectionnés

**Structure d'un script .bat :**
```batch
@echo off
cd /d "C:\Users\crypt\Documents\TRAVAIL\xspace\XPACEGEMS ECOSYSTEMS\CORE_WEBSITE"
if not exist "node_modules" call npm install
call npm run dev
pause
```

### Dashboard Localhost (.resume/)

**Port :** 5184  
**Rôle :** Interface de gestion des serveurs locaux

**Fonctionnalités :**
- Vue d'ensemble de tous les projets
- Vérification du statut (en ligne/hors ligne)
- Démarrage/arrêt des serveurs
- Déploiement Vercel individuel
- Filtres par type, statut, déploiement
- Recherche de projets
- Indicateur de version avec code couleur

**Technologies :**
- Express.js (API backend)
- Vite (dev server)
- Vanilla JavaScript
- CSS custom

**API Endpoints :**
- `GET /api/status` : Statut de l'API
- `POST /api/open-powershell` : Ouvrir PowerShell
- `POST /api/deploy-vercel` : Déployer sur Vercel

---

## 📐 Règles et Conventions

### CURSOR_RULES/

Règles de développement appliquées à tout l'écosystème :

1. **00_MAIN_RULES.md** : Vue d'ensemble
2. **01_ANIMATIONS_OPTIMIZATION.md** : Optimisation animations
3. **02_VERCEL_DEPLOYMENT.md** : Déploiement Vercel
4. **03_TROUBLESHOOTING.md** : Résolution problèmes
5. **04_PERFORMANCE_GUIDE.md** : Guide performance
6. **05_NAVIGATION_MENU_PATTERNS.md** : Patterns navigation
7. **06_SCROLL_TO_TOP_PATTERNS.md** : Gestion scroll
8. **07_LANGUAGE_DEFAULT_PATTERNS.md** : Langues par défaut
9. **08_FOOTER_STANDARD.md** : Footer standard
10. **09_VERSIONING_RULES.md** : Règles de versioning
11. **10_BROWSER_EXTENSIONS_CONFLICTS.md** : Conflits navigateur
12. **11_UX_OPTIMIZATION.md** : Optimisation UX
13. **12_STEP_BLOCK_PATTERN.md** : Pattern bloc d'étape

### Conventions de Nommage

- **Projets** : `UPPERCASE_WITH_UNDERSCORES` (ex: `RAW_TRADING`)
- **Prototypes** : `lowercase-with-dashes` (ex: `living-asset`)
- **Fichiers** : `camelCase.jsx` ou `kebab-case.js`
- **Composants React** : `PascalCase.jsx`

### Structure de Projet Standard

```
PROJECT_NAME/
├── src/
│   ├── App.jsx           # Composant principal
│   ├── main.jsx          # Point d'entrée
│   ├── index.css         # Styles globaux
│   ├── components/       # Composants réutilisables
│   ├── pages/            # Pages de l'application
│   └── translations.js   # Traductions (si multilingue)
├── public/               # Assets statiques
├── dist/                 # Build de production
├── index.html            # HTML d'entrée
├── package.json          # Dépendances
├── vite.config.js        # Configuration Vite
├── tailwind.config.js    # Configuration Tailwind
├── vercel.json           # Configuration Vercel
└── README.md             # Documentation
```

---

## 🎨 Design System

### Palette de Couleurs

**Thème Dark :**
- Background primaire : `#0a0a0f`
- Background secondaire : `#151520`
- Background carte : `#1a1a2e`
- Texte primaire : `#ffffff`
- Texte secondaire : `#a0a0b0`
- Accent primaire : `#6366f1` (Indigo)
- Accent secondaire : `#8b5cf6` (Violet)
- Succès : `#10b981` (Vert)
- Erreur : `#ef4444` (Rouge)
- Warning : `#f59e0b` (Orange)

### Typographie

- **Police principale** : System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Police monospace** : 'Courier New' (pour ports, versions, code)

### Composants Standards

- **Badges** : Arrondis, avec bordures et fonds colorés
- **Boutons** : Dégradés purple/blue, effets hover
- **Cartes** : Fond sombre, bordures subtiles, ombres au hover
- **Footer** : Standard XPACEGEMS avec colonnes et liens

---

## 🔄 Workflow de Développement

### Développement Local

1. **Démarrer un projet :**
   ```batch
   # Via script .bat
   START-CORE-WEBSITE.bat

   # Ou manuellement
   cd CORE_WEBSITE
   npm install
   npm run dev
   ```

2. **Dashboard Localhost :**
   ```batch
   cd _VIBE_LAB_ARCHIVE\.resume
   npm run dev
   # Accès sur http://localhost:5184
   ```

### Déploiement

1. **Build :**
   ```bash
   npm run build
   ```

2. **Déploiement Vercel :**
   ```bash
   vercel --prod
   ```

3. **Via Dashboard :**
   - Cliquer sur "🚀 Déployer" sur la carte du projet
   - La commande est exécutée automatiquement

---

## 📊 État des Projets

### Production (Vercel)

| Projet | Version | Statut | URL |
|--------|---------|--------|-----|
| CORE_WEBSITE | v0.616 | ✅ | https://xpacegems-ecosystem.vercel.app |
| WELCOME | v1.0 | ✅ | https://welcome.xpacegems.vercel.app |
| RAW_TRADING | v0.126 | ✅ | https://raw-trading.vercel.app |
| XLAUNCHPAD_HUB | v1.0 | ✅ | https://xlaunchpad-hub.vercel.app |
| GOLDIGGER_CLUB | ALPHA | ✅ | https://goldigger.vercel.app |
| THE_MANDATE | v1.0 | ✅ | https://the-mandate.vercel.app |
| XLENDING | v0.1.0 | ✅ | https://xlending.vercel.app |

### Prototypes (Local uniquement)

| Projet | Version | Port | Statut |
|--------|---------|------|--------|
| RAA1 | v0.5 | 5175 | 🧪 |
| Elis | v0.3 | 5176 | 🧪 |
| RAA-W | v0.2 | 5179 | 🧪 |
| welcome_test | v0.1 | 5180 | 🧪 |
| .elements | v0.4 | 5181 | 🧪 |
| LIVING_ASSET | v0.1 | 5186 | 🧪 |
| xNFT_MINT | v0.2 | 5190 | 🧪 |
| AI_FACTORY | v0.8 | 5185 | 🧪 |

---

## 🔐 Sécurité et Configuration

### Variables d'Environnement

Les projets utilisent des fichiers `.env` pour les configurations sensibles :
- `AI_FACTORY/env_token.txt` : Tokens API
- `env.example` : Template de configuration

### Headers de Sécurité (Vercel)

Tous les projets incluent des headers de sécurité :
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`

---

## 📚 Documentation

### Fichiers de Documentation

- `CURRENT_STATE.md` : État actuel du projet
- `ARCHITECTURE.md` : Ce fichier
- `DEPLOY_AUTOMATION.md` : Automatisation déploiement
- `_GENESIS_LOG/` : Journal de bord du projet
- `CURSOR_RULES/README.md` : Guide des règles

### README par Projet

Chaque projet a son propre `README.md` avec :
- Description du projet
- Instructions d'installation
- Commandes de développement
- Instructions de déploiement
- URLs de production

---

## 🚀 Roadmap Architecture

### Améliorations Futures

- [ ] Système de monitoring unifié
- [ ] CI/CD automatisé
- [ ] Tests automatisés
- [ ] Documentation API
- [ ] Système de cache partagé
- [ ] CDN pour assets statiques

---

## 📞 Support et Maintenance

### Problèmes Connus

Consulter `CURSOR_RULES/03_TROUBLESHOOTING.md` pour les problèmes courants et leurs solutions.

### Logs et Debugging

- **Logs de développement** : Console navigateur (F12)
- **Logs serveur** : Terminal où `npm run dev` est exécuté
- **Logs Vercel** : Dashboard Vercel → Deployments → Logs

---

**Document créé le :** 2025-12-08  
**Dernière mise à jour :** 2025-12-08  
**Maintenu par :** Équipe XPACEGEMS

