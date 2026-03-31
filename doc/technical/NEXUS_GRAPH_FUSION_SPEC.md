# 🌐 NEURAL FUSION: Multi-Zone Nexus Graph Indexing

**Document Type**: Technical Specification  
**Status**: Stable  
**Context**: Path-Security & Neural Indexing

---

## 1. 🎯 Objectives & Design Philosophy

Currently, the localized Nexus Graph topology processes relationships by indexing:
- **Active Projects**: Local directories where valid `RESONANCE_INDEX.json` artifacts reside.
- **Neural Bridges**: Explicit external index pointers.
- **System Fallback**: Localized Vault settings acting as primary base paths.

This specification unifies the **Multi-Zone Fusion Protocol**: a method for merging multi-directory Knowledge Vaults across independent path trees strictly in **read-only mode**, deeply integrated with the application's strict `Path-Security` layer.

---

## 2. 🧩 The "Zone" Construct

A **Zone** is a root directory containing distributed `RESONANCE_INDEX.json` traces. Nodes and topological links discovered here are merged into the main Knowledge Graph purely non-destructively.

| Criterion | Zone | Active Project | Neural Bridge |
|--------|------|----------------|-------------|
| **Unit Type** | Root Directoty | Config + Root | Target Index File |
| **Discovery Logic** | Recursive `findDistillerIndexFiles(zonePath)` | BasePath scanning | Exact Path Match |
| **Write Permission**| **Never** | Allowed (Re-index) | **Never** |
| **Path Security** | Mandatory recursive check | Pre-validated | Pre-validated |

### Enterprise Use-Cases:
- Importing decoupled offline Vaults seamlessly.
- Indexing external backup drives holding Knowledge databases.

---

## 3. 🛡️ Path-Security Implementations

Security is paramount. Zero arbitrary directory injection is permitted.

- All Zone paths must be resolved and mathematically approved via the **`validateAbsolutePath(zonePath)`** IPC handler.
- The Engine enforces the same strict whitelist constraints: specific UserData folders, restricted Document folders, etc.
- **Failure Matrix**: If validation fails for a given Zone, the entire branch is silently aborted (logged for audit, completely discarded from Graph rendering).
- **Read-Only Enforced**: Complete lock on Write permissions for Zone entities. No config or index mutations are permitted on `zonePath` directories.

---

## 4. 🔄 IPC Data Flow Architecture

### Backend Filter Extension
- `resonance-get-graph-data` payload is extended with optional `zonePaths: string[]`.

### Graph Mapping Procedure
1. Standard Project base paths are tokenized and processed.
2. If `zonePaths` array is populated:
   - For every `zonePath`:
      - Execute `validateAbsolutePath`. Abort if compromised.
      - Execute asynchronous `findDistillerIndexFiles(zonePath)` fetching all internal data nodes.
   - For each valid indexed chunk: re-validate the immediate parent directory ensuring no symlink attacks, then pipe through `graphDataFromDistillerIndex(...)` strictly in volatile memory.
3. Merge mathematical nodes and relational links using unified `nodeMap` and `tagMap` algorithms.

*Zero new IPC pipelines are exposed. Attack surface remains constrained to a single validated payload mechanism.*

---

## 5. 🗄️ Persistence Strategies

The unified architecture relies on a global registry mapping for multi-zone connectivity:

**Global Registry (`userData/resonance.zones.json`)**:
- Secure array `paths: string[]`.
- Read asynchronously upon OS startup.
- Injected natively into the Context Bridge on UI rendering.
- Deeply decoupled from singular project states ensuring universal knowledge graphs across the entire operating system interface.

---

## 6. 📝 Execution Contracts

| Component | Engineering Contract |
|--------|--------|
| **Zone Definition** | Root directory. Pure Read-Only. |
| **Path Audits** | 100% adherence to `validateAbsolutePath(zonePath)` over the system whitelist. |
| **Channel Config** | Payload payload modification only: `resonance-get-graph-data` ← `zonePaths`. |
| **Node Resolution** | Distributed paths are registered as valid resolution bases during File Read calls. |
