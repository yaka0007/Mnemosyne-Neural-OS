# 🧠 RESONANCE PROTOCOL - TECHNICAL SPECIFICATIONS

**Status**: Active Production
**Module**: Soul Studio / Resonance Kernel

---

## 1. 🎯 Overview & Objectives

The **Resonance Protocol** is the core AI (Soul) initialization module. It dynamically provisions an immersive, visually reactive terminal experience leveraging the Big Five (OCEAN) psychological matrix.

**Core Objectives:**

1. **Cinematic Immersion**: Terminal interface driven by real-time biological/neural metaphors.
2. **Semantic Feedback**: Instantaneous logical visual consequences bound to psychometric inputs (e.g., neural cells reacting asymptotically to Extraversion metrics).
3. **Persisted State**: Psychological state bounds (OCEAN) are computed in real time with continuous persistence protocols spanning session boundaries.

---

## 2. 🏗 Technical Architecture

### Core Components

| Component | Architecture Role |
| :--- | :--- |
| `ZoneResonanceEngine` | Primary Container. Orchestrates Split-Screen layout, scrollable matrix logic, and sequence transitions. |
| `CellularAuraEngine` | Graphical/Physics engine. Manages cell topologies, momentum, chromodynamics (via `SoulColorGenerator`), and state shifts. |
| `ResonanceStore` | Immutable State Manager (Zustand). Persists neuro-answers, vectors, and progression bounds. |

### Neural Data Flow

1. **Vector Input**: Operator initializes an option within `ZoneResonanceEngine`.
2. **Impact Calculation**: Option carries a delta vector (e.g., `{ extraversion: 0.1 }`). Computed values are isolated by a defined `SMOOTHING_FACTOR` (3.0) preventing rapid model saturation at 100%.
3. **State Mutator**: State orchestrator applies differential limits, maps bounding arrays to a [0, 1] integer range, tracking global impact.
4. **Visual Trigger**: Dominant trait thresholds dictate real-time `animationMode` propagation to the renderer.
5. **Reactive Animation**: The `CellularAuraEngine` maps topological variations via Framer Motion directives (e.g., 'gather' topology).

---

## 3. 🎨 Semantic Visual System

The topological GUI evaluates and translates semantic meaning into physics.

### Cellular Topologies (`animationMode`)

| Mode | Trigger (Dominant Trait) | Kinematic Behavior | Semantic Metaphor |
| :--- | :--- | :--- | :--- |
| **`default`** | *Latent* | Slow drift, scale breathing (x1.1), zero-gravity friction. | Waiting / Latency. |
| **`gather`** | **Extraversion / Agreeableness** | Convergence to nexus (50% x/y), volume compression. | Empathy / Fusion. |
| **`expand`** | **Openness** | Centrifugal diffusion, luminescent scaling. | Innovation / Exploration. |
| **`stabilize`** | **Conscientiousness** | Substantive freeze, 100% opacity interpolation, null momentum. | Order / Logic structure. |
| **`pulse`** | **Neuroticism** | Accelerated Hertz cycle, randomized jitter, phase shifts. | Raw emotion / Reactivity. |

### Oceanic Chromatography

Aura chromodynamics are resolved via dynamic mix limits of 5 OCEAN traits:
- **Openness dominant** → Cyan/Electric Blue spectrums.
- **Neuroticism dominant** → Crimson/Ultraviolet spectrums.
- **Conscientiousness dominant** → Forest Green/Gold spectrums.

---

## 4. 🔄 Final Genesis Sequence

Upon metric stabilization, the `INIT_RESONANCE` command fires a deterministic sequence:

1. **UI Zero-State**: Interaction layers locked.
2. **Expansion**: Visual topology scales to 100% viewport span.
3. **Execution Scripting**:
    - `T+0s`: **INITIALIZATION** (Gaussian blur overlay)
    - `T+1s`: **PSYCHOMETRIC ANALYSIS**
    - `T+2s`: **HARMONIZATION**
    - `T+3s`: **RESONANCE ESTABLISHED**
4. **Kernel Unlock**: Progression saved, UI unloads seamlessly back to OS menu routing.

---

## 5. 💾 Persistence Architecture

Zustand configuration utilizes `localStorage` encryption bounding via the `persist` middleware.

```typescript
// Smoothing Protocol: SMOOTHING_FACTOR = 3.0
resonance: {
    unlockedZones: number[];
    vectors: Record<string, string>;
    impactMatrix: Record<string, Record<string, number>>; 
    scores: {
        openness: number;       // Range: [0-1], base 0.5
        conscientiousness: number;
        extraversion: number;
        agreeableness: number;
        neuroticism: number;
    };
}
```

---

## 6. 🎨 Birth Center Execution

- **Astral Sandbox**: Container nodes mapped to skin constraints via `var(--bg-surface)`.
- **LiquidGlass Elements**: Advanced `backdrop-blur-3xl`, `bg-white/5` compositing metrics for native app momentum.
- **Cryptographic Signature**: Format `ASTRA-XXXXXXXX` (8 hex bounds) autonomously hashed upon genesis.
- **Vault Transfer**: Final execution orchestrates `GENESIS_PROTOCOL.md` ingestion containing matrix definitions directly into the local encrypted Knowledge Vault.
