## Backlog — mnemoforge canvas command

**Idée émergée le 2026-04-04 (session Neural Coding live)**

### Vision
Une commande qui bootstrappe n'importe quel projet avec les règles Neural Coding.
Le canvas = un template éditable par l'humain, déployable par le CLI.

### Commandes prévues
\\\ash
mnemoforge canvas init <project-name>   # scaffold un projet avec les règles NC
mnemoforge canvas list                  # lister les canvas disponibles
mnemoforge canvas edit <canvas-name>   # éditer un canvas dans l'éditeur
mnemoforge canvas create <name>        # créer un nouveau canvas personnalisé
\\\

### Ce que canvas init génère
\\\
<project-name>/
  AGENTS.md             ← règles agent (éditables, versionnées)
  NEURAL_CODING.md      ← les 6 principes courants
  .cli_resonance/
    .mnemo-config.json  ← config depuis vault actif
  chronicles/           ← structure prête
  pulse.json            ← état agent initial
\\\

### Canvas par type
- \default\ — projet générique
- \web-app\ — Next.js / Vite avec conventions NC
- \cli\ — CLI TypeScript avec lib/ structure
- \pi\ — REST/GraphQL avec chronicle par endpoint
- \esearch\ — exploration, hypothèses, chronicles de réflexion

### Philosophie
Le canvas n'est pas un générateur de boilerplate.
C'est **Neural Coding comme artefact deployable** —
la méthodologie embarquée dans la structure du projet.

### Priorité
Medium — après stabilisation du core (chronicle commit, sweep, watcher).
Ne pas implémenter avant que init/commit/switch soient 100% stables.
