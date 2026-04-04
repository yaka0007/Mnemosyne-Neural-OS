# MnemoHub — The Mnemosyne Module Store

> *Mnemosyne OS is not an application. It is a platform. MnemoHub is proof of that.*

---

## What MnemoHub Is

MnemoHub is the official module store for the Mnemosyne OS ecosystem — a curated marketplace where users install capability extensions, and where developers publish and certify new modules.

It exists in two forms:

**The Web Store** — a standalone browsable catalogue accessible from a browser, where developers and users can discover, explore, and preview available modules before installing.

**The In-App Store** — integrated directly into the Mnemosyne OS desktop application, providing one-click installation, installed module management, and pre-installed module visibility.

Both surfaces share the same catalogue, the same certification system, and the same permission model.

---

## The Module Catalogue

At launch, MnemoHub already ships with **13 modules** across six categories:

| Module | Category | Description |
|---|---|---|
| **Cortex Auditif V3.0** | Utilitaires | Local audio transcription via Whisper + local LLM (Ollama). Archives, batches. |
| **MnemoVision — Vision & OCR** | Créatif | Visual processing — image recognition, OCR, visual data extraction. |
| **Studio vidéo Mnemo** | Créatif | Local video studio — cut, compress, process from the Vault via native FFmpeg. |
| **MnemoLingua — Traduction** | Utilitaires | Multilingual translation and linguistic analysis via local LLM. |
| **Stratège Mnemosyne** | Productivité | AI Roadmap — turns strategic prompts into Kanban with calendar export (ICS) and Brain hooks. |
| **BMAD 2.0** | Productivité | Brief-Mapping-Architecture-Delivery — frames a project in 4 steps with AI support. |
| **MnemoShare — Partage Vault** | Utilitaires | Secure vault content sharing — export, temporary links, collaboration. |
| **Google Drive** | Google | Google Drive integration — sync and access to Drive files from the Vault. |
| **Chronos Legacy** | Créatif | Family archive — local family archiving. *(Coming soon)* |
| **Mnemo-Lingua** | Système | Pre-installed. Text and `.md` file translation via LLM (FR, EN, ES, DE, IT). |
| **Policy Studio** | Système | Pre-installed. FGAC policy editor and access rule manager. |

Modules are filterable by platform type: **Bureau · Mobile · Web · Compagnon**, and by status: **Tous · Installés**.

---

## The Permission Model

Every module in MnemoHub must declare the permissions it requires before a user can install it. These permissions are displayed on the module card and reviewed at install time.

The permission system uses a namespaced scope model:

| Permission | Meaning |
|---|---|
| `mnemoz:resonance-read` | Read access to the Resonance context layer |
| `mnemozui-overlay` | Can render UI elements over the Mnemosyne interface |
| `sandboxfs-read` | Read access to sandboxed filesystem paths |
| `sandboxfs-write-scoped` | Write access, scoped to declared paths only |
| `sandboxboxnetwork` | External network access (flagged, visible to user) |

No module can access host resources outside its declared permissions. The sandbox enforces this at runtime. A module requesting `sandboxboxnetwork` is clearly visible to the user — no hidden exfiltration is architecturally possible.

This permission model is the public-facing expression of the same sovereignty principle that governs the core application: **every access is declared, visible, and user-controlled.**

---

## The Developer Program — Mnemosyne Certified

MnemoHub is not just a distribution channel. It includes a **developer certification program** that defines three levels of module quality and integration depth.

### The Three Certifications

**CERT-001 — Stabilité opérationnelle**
Base certification. Validates that the module runs on the hybrid CLI/Electron architecture with full resilience: quality sweeps, auto-healing, and Panic Lockdown compatibility. Required for all published modules.

**CERT-002 — Souveraineté & SCC**
Sovereignty certification. Validates integration with the Sovereignty Command Center. Strict FGAC compliance and multi-project isolation. Required for any module that touches the vault or user identity.

**CERT-003 — Résonance inter-citadelles**
Resonance certification. Validates peer-to-peer capable modules (Neural-Link / libp2p). Shadow Sync compatibility. Zero-Raw-Data in transit — no clear-text user data leaves the device during P2P sync.

### The Mnemosyne Certified Badge

Beyond the three technical tiers, the **Mnemosyne Certified** designation is the top-level badge for modules that have passed:

- Full security audit
- Tier S API compliance
- Complete permission declaration
- MnemoHub visibility boost (featured placement)

> *"Mnemosyne Certified" is the signal that a module has been built to the same sovereignty and security standards as the core application.*

### Developer Tooling

| Tool | Description |
|---|---|
| **Mnemo-SDK** | React / TypeScript SDK for building modules |
| **Sandbox API** | Native FS and IPC access via sandbox, host uncompromised |
| **Skill Pack Builder** | For Cortex Auditif modules and local LLM (Ollama) skill packs |
| **Vector DB integration** | Local vector database access for search-capable modules |
| **manifest.json** | Declarative module definition (schemaVersion, id, version, permissions, entrypoints) |

---

## Why MnemoHub Changes the Product Category

A standalone app has users.
A platform with a certified module store has an **ecosystem**.

The difference matters enormously for how the product is evaluated — by users, by developers, and by investors.

When a new developer publishes a module to MnemoHub, they are extending the capabilities of every Mnemosyne OS installation. The installed base grows more capable without any action from the core team. The value of holding Mnemosyne OS increases with every module published.

This is the **network effect model** applied to a sovereign, local-first AI platform:

> The more modules exist, the more reasons to install Mnemosyne OS.  
> The more Mnemosyne OS is installed, the more reason to build modules.  
> The platform value scales — without the platform needing to centralize user data to do it.

That last point is the differentiation. Most app store ecosystems require the platform operator to be the central intermediary for everything: payments, data, distribution, identity. MnemoHub can function with the user's identity and vault remaining entirely local. The store is a discovery layer. The execution is local.

---

## Current Status

MnemoHub is in active beta. The web store and in-app store are operational. The developer certification program is open for early applications. The catalogue grows as the ecosystem develops.

**Planned additions:**
- Extended language packs (zh-CN, ar, ru) — to be distributed as MnemoHub modules
- Community-published Skill Packs for local LLM workflows
- MnemoForge-built apps (AI-generated modules submitted to the store)

---

*Part of the [Mnemosyne OS Documentation](./README.md)*\
*Related: [MnemoForge →](./20-mnemoforge.md) · [Local-First Sovereignty →](./17-security-sovereignty.md) · [Multilanguage →](./19-multilanguage.md)*
