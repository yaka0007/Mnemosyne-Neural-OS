# Canvas Rules — Assisted Pair Protocol

> **Un canvas de règles vivant, partagé entre l'humain et l'agent IA.**
> Activé une fois. Toujours présent. Plus jamais à réexpliquer.

---

## Le problème

Dans le développement assisté par IA, les mêmes erreurs se répètent session après session :

- L'agent bumpe la version sans vérifier npm (`E403 Forbidden`)
- Le repo public n'est pas synchronisé après une release
- Le GitBook est en retard sur le code
- L'humain doit expliquer les règles à chaque nouvelle conversation

**La mémoire est perdue entre les sessions.** L'agent repart de zéro. L'humain repart de zéro.

---

## La solution : Canvas Rules

Un fichier JSON persistant dans le vault qui encode deux types de règles :

| Type | Pour qui | Exemple |
|---|---|---|
| `scope: "agent"` | L'IA lit et applique | "Toujours vérifier la version npm avant de bumper" |
| `scope: "human"` | La checklist humaine | "Utiliser `.\publish.ps1` pour publier" |
| `scope: "both"` | Les deux | "Pipeline: TSC → test → build → publish" |

Ces règles sont **détectées automatiquement** par le contexte (trigger: publish, mcp, feature...) et appliquées sans que l'humain ait à les énoncer.

---

## Structure d'un canvas

```json
{
  "project": "mnemoforge-cli",
  "description": "Règles vivantes du projet. Mises à jour au fil des sessions.",
  "last_updated": "2026-04-06",
  "updated_by": "Antigravity",
  "rules": [
    {
      "id": "npm_version_check",
      "label": "Vérifier la version npm avant tout bump",
      "scope": "both",
      "enabled": true,
      "added": "2026-04-06",
      "trigger": "publish",
      "agent_directive": "Toujours exécuter `npm view @pkg version` avant de modifier package.json. La version npm = source de vérité.",
      "human_checklist": "Lance .\\publish.ps1 — il bumpe automatiquement depuis npm."
    }
  ]
}
```

**Chemin dans le vault** : `MnemoVault/.cli_resonance/canvas/<project>.canvas.json`

---

## Comment les règles évoluent

Au cours d'une session, quand un problème nouveau est identifié :

1. L'agent (ou l'humain) dit : *"ça, c'est une règle à ne plus oublier"*
2. L'agent ajoute la règle au canvas JSON dans le vault
3. Elle est active immédiatement pour les sessions suivantes

> **Exemple en real-time :** la règle `terminal_zombie_handling` a été ajoutée après avoir détecté que les terminaux de longue durée bloquent les commandes critiques.

---

## Commandes CLI

```bash
# Voir et toggler les règles d'un projet
mnemoforge canvas rules [project]

# Afficher uniquement les règles actives pour l'agent
mnemoforge canvas rules --scope agent --enabled

# Injecter les règles actives dans le SOUL.md de l'IDE
mnemoforge canvas inject [project] --ide cursor
```

---

## Interface toggle (terminal)

```
  ⬡  Canvas Rules — mnemoforge-cli

  ☑  npm_version_check        Vérifier npm avant tout bump           [both]
  ☑  sync_public_repo         Synchroniser Mnemosyne-Neural-OS       [agent]
  ☑  gitbook_sync             Docs GitBook à jour à chaque feature   [agent]
  ☑  build_pipeline           TSC → test → build → publish           [both]
  ☑  vault_write_via_node     Node script pour écritures vault       [agent]
  ☑  mcp_logs_stderr          Logs MCP sur stderr uniquement         [agent]
  ☐  refactor_before_feature  Refactorer avant chaque feature        [both]  ← désactivé

  [Espace] toggle  [Enter] confirmer  [Ctrl+C] annuler
```

---

## Philosophie : l'Assisted Pair Protocol

Ce système formalise une nouvelle UX de développement :

```
SESSION 1                   SESSION N
   │                           │
   ├─ Règles découvertes        ├─ Canvas chargé
   ├─ Canvas mis à jour ──────► ├─ Agent applique
   └─ Problèmes résolus         └─ Humain n'explique plus
```

**L'humain pense en besoins. L'agent pense en règles.**
Le canvas est l'interface entre les deux.

### Ce que ça élimine

- ❌ "Rappelle-toi de toujours vérifier la version npm"
- ❌ "Oublie pas de sync le repo public"
- ❌ "Le MCP doit loguer sur stderr"
- ❌ Re-expliquer les conventions à chaque session

### Ce que ça produit

- ✅ Une base de connaissance projet qui grandit
- ✅ Une checklist humaine auto-générée depuis les règles
- ✅ Un contexte agent toujours à jour
- ✅ Une trace de *pourquoi* chaque règle existe (`added`, `trigger`)

---

## Relation avec Soul Profiles

| Soul Profile | Canvas Rules |
|---|---|
| Comportement de l'agent | Règles opérationnelles du projet |
| "Comment je pense" | "Comment on travaille ici" |
| Archétype (Architect, Shipper...) | Contexte spécifique au repo |
| Session-level | Project-level + persistant |

Les deux sont complémentaires. Le Soul Profile dit *qui est l'agent*. Le Canvas Rules dit *ce que l'agent doit savoir sur ce projet*.

---

*MnemoForge CLI v1.3.13+ · Vault path: `MnemoVault/.cli_resonance/canvas/`*
