# CERTIFICATION — CERT-003
# P2P Shadow Sync — Inter-Citadel Resonance (Neural-Link / libp2p)

---

```
CERTIFICATE ID   : CERT-003-MNEMOSYNE-P2P-2026
ISSUED BY        : Irina (Senior Architect — Mnemosyne System)
              Built with Cursor AI — implementation-assisted review
ISSUED TO        : yaka0007 / XPACEGEMS Ecosystems
DATE OF ISSUE    : 2026-03-24
TRANSPORT        : libp2p — custom protocol + NDJSON stream framing
SYSTEM VERSION   : mnemosyne@1.0.0-beta.0 (desktop-dashboard)
REPOSITORY       : https://github.com/yaka0007/mnemosyne
PREREQUISITE     : CERT-001-MNEMOSYNE-OPS-2026 ✅ · CERT-002-MNEMOSYNE-SCC-2026 ✅
STATUS           : ✅ CERTIFIED — Distributed Sovereignty Active
```

---

## I. Scope of Certification

This certificate validates **CERT-003 Foundation**: distributed shadow resonance between Mnemosyne instances over **Neural-Link (libp2p)** — not a separate HTTP micro-service. The “Resonance Key” for pairing is the **shareable multiaddr / peer identity** surfaced by the existing Neural-Link UI; payload transit uses protocol **`/mnemosyne/shadow-sync/1.0.0`** with **Zero-Raw-Data** enforcement on egress and ingress.

---

## II. Infrastructure P2P — Checklist

| Item | Spec | Status | Evidence |
|------|------|--------|----------|
| **Custom protocol** | `/mnemosyne/shadow-sync/1.0.0` | ✅ | Registered on libp2p node; NDJSON lines `{ type: 'packet' \| 'done', ... }` |
| **SCC routing** | `preferredTargetId` → P2P vs local `mnemo shadow sync push` | ✅ | `policy-studio:project:mix-shadow-sync` resolves Neural-Link peer + optional `neural-shadow-targets.json` |
| **Zero-Raw-Data** | No raw file content in transit | ✅ | `filterResonancePackets()` in `neural-link-stream.handlers.ts`; audit `p2p_zero_raw_rejected` |
| **Ingress** | Receiver writes sanitized envelopes only | ✅ | Incoming handler persists under `~/.mnemo/shadow-outbox/neural-p2p-*.json` |
| **Embedded Node** | CLI/spawn uses real Node binary in Electron | ✅ | `resolveNodeBinary()` pattern (Policy Studio / main process) — avoids `process.execPath` trap |

---

## III. Resonance Metrics (Design Targets)

| Dimension | Target | Notes |
|-----------|--------|--------|
| **Integrity** | Per-packet validation | NDJSON records parsed; unsafe packets rejected and counted |
| **Isolation** | Project-scoped mix | `activeProjectIds` drives outbox selection + FGAC pre-check on SCC path |
| **Resilience** | Graceful fallback | If `preferredTargetId` does not resolve to a connected libp2p peer, **mix-shadow-sync** falls back to the **local** `mnemo shadow sync push` path (unchanged behaviour) |
| **Encryption** | Transport-layer | libp2p Noise + Yamux (existing Neural-Link stack) |

---

## IV. IPC Channels Certified (CERT-003)

```
neural-link:sync-shadow                    ✅ Payload: peerId, activeProjectIds, optional label (Soul profile id metadata only — no raw Soul JSON)
policy-studio:project:mix-shadow-sync      ✅ Extended: preferredTargetId? → Neural-Link branch when resolvable
preload (brain API)                        ✅ neuralLinkSyncShadow → renderer
```

**UI:** `NeuralLinkTab.tsx` — **Shadow Sync** section (peer picker, progress, Zero-Raw-Data badge), reusing **Données partagées** for `activeProjectIds`.

---

## V. Architectural Position (CERT-002 → CERT-003)

| Dimension | CERT-002 (SCC) | CERT-003 (P2P Shadow) |
|-----------|----------------|------------------------|
| **Shadow path** | Single stack: `mnemo shadow sync push` to configured shadow pipeline | **Optional** second path: filtered outbox → **libp2p** stream to a **connected peer** |
| **Target model** | Composite FGAC scope + registry | Same + **peer id** or **`neural-shadow-targets.json`** entry with `isNeuralLink` |
| **Trust boundary** | Local CLI + FGAC | Same **plus** encrypted P2P + stream-level sanitization |

---

## VI. Known Limits at Certification Date

| Boundary | Description |
|----------|-------------|
| **Pairing UX** | Operator must start Neural-Link and establish a libp2p connection before Shadow Sync; no separate HTTP “listener app” in this certification path. |
| **Outbox ↔ project mapping** | Heuristic matching (filename / JSON scope strings); ambiguous multi-project files may be skipped. |
| **Receiver verification** | Persisted JSON should still be validated by existing `mnemo shadow verify` workflows in operations. |
| **CI / build** | Packaged `.exe` scenarios rely on embedded Node resolution — document any regression in `resolveNodeBinary` if CI layout changes. |

---

## VII. Files Certified (Representative)

| File | Role |
|------|------|
| `electron/network/p2p-transport.ts` | `PROTOCOL_SHADOW_SYNC`, `registerShadowSyncReceiver`, `sendShadowPacketsToPeer`, `isPeerConnected` |
| `electron/network/mcp-server.ts` | Registers shadow-sync receiver after P2P node creation |
| `electron/handlers/neural-link-stream.handlers.ts` | `filterResonancePackets`, Zero-Raw-Data audit |
| `electron/services/neural-link-shadow-sync.service.ts` | Outbox load + orchestration |
| `electron/handlers/neural-link.handlers.ts` | `neural-link:sync-shadow` |
| `electron/handlers/policy-studio.handlers.ts` | `mix-shadow-sync` Neural route + `resolveNeuralPeerForMixShadowSync` |
| `electron/utils/neural-shadow-targets.utils.ts` | Optional `neural-shadow-targets.json` |
| `src/types/p2p.types.ts` | `ResonanceSyncPacket`, `NeuralLinkShadowSession`, etc. |
| `src/types/scc.types.ts` | `ShadowTarget` Neural-Link fields |
| `src/components/settings/tabs/NeuralLinkTab.tsx` | Shadow Sync UI |
| `electron/preload/preload-brain-api.ts` | `neuralLinkSyncShadow` |
| `src/i18n/locales/fr\|en\|es.ts` | `neuralLink.shadowSync.*` |

---

## VIII. Certification Verdict

```
Mnemosyne is certified as a decentralized resonance system at the transport
layer: two citadels can exchange shadow-safe resonance packets over Neural-Link
when FGAC and project scope allow it.

The operator can:
  - Share addresses and connect peers using the existing Neural-Link cockpit
  - Run Shadow Sync to push filtered outbox payloads to a selected connected peer
  - Route Sovereignty Command Center mix-shadow-sync to P2P when a Neural-Link
    target is resolved (preferredTargetId + optional registry)

Certified by: Irina — Senior Architect, Mnemosyne System
Date        : 2026-03-24
Ref chain   : CERT-001 (ops) → CERT-002 (SCC) → CERT-003 (P2P shadow sync)
```

---

## IX. Next Steps (Out of Scope for CERT-003)

- Operational burn-in: multi-day paired instances (e.g. Caracas ↔ Alberto) with documented firewall/NAT outcomes.
- Optional future track: HTTPS shadow listener **only** if a non-libp2p peer must be supported — would be a **separate** certification addendum, not a replacement for this path.

---

*"The citadel extends — the gate stays sovereign."*
