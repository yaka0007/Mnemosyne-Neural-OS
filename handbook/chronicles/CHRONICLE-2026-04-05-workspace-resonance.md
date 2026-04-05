---
date: 2026-04-05
session: "Le Workspace Resonance — Règles persistantes par projet"
ide: Antigravity
provider: Anthropic
style: decision
source: agent-memory
conversation_id: e44d4df8-df97-4e19-971d-c1e1eaba8eef
---

# Chronicle — Le Workspace Resonance

## Le problème

Pendant cette session, j'ai créé un package npm `mnemoforge` alors que
`@mnemosyne_os/forge` existait déjà depuis 2 jours.

**Pourquoi ?** Parce que j'ai supposé que la règle n'existait pas, au lieu de la lire.

Un agent — même entraîné — peut oublier des décisions architecturales d'une session
à l'autre. La mémoire de session n'est pas persistante. Les chronicles le sont.

## La solution : WORKSPACE.json

Chaque projet géré par MnemoForge doit avoir un `WORKSPACE.json` dans `.cli_resonance/`.
Ce fichier contient les règles impératives du projet, lisibles par n'importe quel agent
au démarrage d'une session.

```json
{
  "project": "mnemoforge-cli",
  "scope": "@mnemosyne_os",
  "rules": [
    "Ne jamais créer un nouveau package npm sans vérifier le scope @mnemosyne_os",
    "Le package s'appelle @mnemosyne_os/forge — ne pas créer de doublons",
    "Les chronicles sont écrites par l'agent, jamais par l'humain",
    "Toujours vérifier dist/ avec grep après un refactor TypeScript"
  ]
}
```

## Ce que ça change architecturalement

```
Session démarre
  ↓
Agent lit .cli_resonance/WORKSPACE.json
  ↓
Règles chargées en contexte → impossible d'oublier
  ↓
Agent exécute en respectant les décisions précédentes
```

Les chronicles deviennent la **mémoire long-terme du projet**.
Le WORKSPACE.json en est la **distillation exécutable**.

## La règle de mise à jour

Quand un agent fait une erreur → une règle s'ajoute au WORKSPACE.json.
Neural Coding = le système apprend de ses propres erreurs en temps réel.

---
*Chronicle rédigée par Antigravity · Insight "workspace persistant" · 2026-04-05*
