# Dossier de Financement & Stratégie Partenaires — Mnemosyne

*Date de création : 31 Mars 2026*
*Objectif : Réduire les coûts opérationnels (OPEX API & IDE) de Mnemosyne à $0 durant la phase de Bêta/MVP.*

---

## 💡 Le "Hack" Stratégique : Cloud = IA

Beaucoup de développeurs essaient d'obtenir des crédits directement chez OpenAI ou Anthropic, ce qui est extrêmement difficile sans passer par un incubateur (Y-Combinator, etc.).
**La solution :** Les grands clouds hébergent ces modèles en natif. Obtenir des crédits Cloud, c'est obtenir des crédits IA (Inférence API).

- **AWS Activate** = Crédits AWS = **Amazon Bedrock** (Accès à Claude 3.5 Sonnet, Claude 3 Opus, Mistral).
- **Google for Startups** = Crédits GCP = **Google Vertex AI** (Accès à Gemini 1.5 Pro, Claude 3.5 Sonnet).


---

## 1. AWS Activate (Founders Tier) — 🔴 Priorité Absolue

C'est le plus simple, le plus rapide et le plus généreux pour une startup non financée (bootstrapped).

- **Offre** : 1 000 $ à 5 000 $ de crédits valables 2 ans, sans avoir levé de fonds (un profil sole proprietorship ou développeur indépendant suffit souvent).
- **Cible technique** : Appels d'API Claude via Amazon Bedrock (remplace les appels directs et coûteux à l'API Anthropic).
- **Avantage** : Vous pouvez brancher l'API Bedrock dans vos outils (comme Cursor ou des wrappers compatibles OpenAI/Anthropic locaux) pour ne plus débourser un centime.
- **Lien** : [AWS Activate Founders](https://aws.amazon.com/activate/founders/)

## 2. Google for Startups Cloud Program (Bootstrapped Tier)

- **Offre** : Jusqu'à 2 000 $ de crédits GCP gratuits pour les 2 premières années. Couvre tous les services Google Cloud, y compris Vertex AI.
- **Cible technique** : Requêtes Vertex AI pour *Gemini 1.5* ou *Claude 3.5* (disponible sur Vertex). Parfait pour l'agentic coding (Gemini 1.5 Pro a 1M tokens de contexte, idéal pour envoyer toute la codebase Mnemosyne).
- **Lien** : [Google for Startups Cloud](https://cloud.google.com/startup)

## 3. Anthropic (Startup Programs / Dev Relations)

- **Offre** : Anthropic a généralement des deals massifs via des VC ($250k+). Cependant, pour un projet open-source ou un écosystème défendant la **souveraineté des données** et la **vie privée** (comme Mnemosyne), ils ont parfois des "Builder Grants".
- **Action** : Envoyez un email court au support dev Anthropic (`sales@anthropic.com` ou `startups@anthropic.com`) ou contactez leur Developer Relations team sur Twitter (Alex Albert par ex.).
  - *Angle :* Présentez le "Soul Studio". L'aspect "Système Multi-Agent" et "Souveraineté" fascine l'industrie. Montrez une vidéo de votre interface UI/UX luxueuse (Framer Motion, Glassmorphism).

## 4. Cursor (Le partenariat IDE / Bypasser le coût mensuel)

- **Stratégie** : Cursor n'a pas (encore) de programme "startup" officiel public pour avoir le forfait "Pro" gratuit, ils achètent eux-mêmes les tokens à OpenAI/Anthropic.
- **Le Hack (BYOK - Bring Your Own Key)** :
  - **Ne payez pas l'abonnement Cursor Pro indéfiniment.**
  - **Étape 1 :** Obtenez les crédits AWS (5000$).
  - **Étape 2 :** Dans Cursor, activez l'option "Custom API Key" et entrez vos identifiants AWS Bedrock (ou directement une clé Anthropic si vous obtenez un grant Anthropic).
  - Résultat : L'agent (moi/Cursor) tapera dans vos crédits Cloud gratuits ! Votre coût mensuel tombe à 0 $.

---

## 📄 4. Le Pitch Standardisé (Pour postuler aux crédits)

Voici la version optimisée de votre pitch en Anglais (les programmes valident plus vite en anglais). Copiez-collez ceci dans les formulaires AWS Activate ou GCP :

**Company / Project Description (Max 500 characters):**
> Mnemosyne is a sovereign, local-first personal AI operating system. We combine multi-agent AI orchestration with encrypted local storage to give users absolute control over their data, privacy, and AI interactions. We bridge the gap between secure offline models and powerful enterprise-grade cloud AI APIs.

**What problem are you solving?**
> The current tooling ecosystem forces users into vendor lock-in and mandates exchanging absolute data privacy for AI capabilities. Users cannot mix private local knowledge with powerful foundational models without sacrificing sovereignty. Everyday workflows are fragmented across a dozen isolated web wrappers with subpar user experiences.

**How does your product solve this problem?**
> Mnemosyne unifies everything into a production-grade, secure Electron desktop application with granular access controls (FGAC). It enables a multi-model approach where users seamlessly shift tasks between local offline models (Ollama) and the cloud. Our "Soul Studio" injects custom persistent agentic personalities into interactions, while the "MnemoVault" securely indexes user context locally.

**Why do you need AWS / Google Cloud credits?**
> We are entering our internal Beta R&D phase and heavily utilize multi-agent generative systems for complex logic (AST code parsing, UI generation, identity conceptualization). To ensure our "MnemoSync" synchronization protocol is stable, we need cloud credits to offset the intense API token loads during Context-Fusion validation and to scale our testing infrastructure without draining bootstrapped R&D capital.

---

## 📋 Plan d'Action Immédiat (Next Steps)

1. [ ] S'inscrire à **AWS Activate Founders** (Lien : `aws.amazon.com/activate/founders`). Créez un compte AWS si non existant. Remplissez le formulaire avec le pitch ci-dessus. *Réponse sous 1 à 2 semaines.*
2. [ ] Préparer le **Repo GitHub Vitrine public** (comme vu dans le TODO `yaka0007/mnemosyne`) contenant le README.md et ce dossier de certification. Avoir un lien GitHub actif et propre **accélère massivement l'approbation AWS**.
3. [ ] En attendant l'approbation AWS, basculer les appels d'API Cursor/Antigravity sur **Claude 3 Haiku** plutôt que Sonnet pour les tâches basiques d'interface/CSS (divise la facture API par 4 !).
