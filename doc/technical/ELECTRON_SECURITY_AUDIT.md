# Electron security audit — desktop-dashboard

**Date:** 2026-03-03  
**Goal:** Verify contextIsolation, nodeIntegration, preload, IPC channels.

---

## Main window (mainWindow)

| Option | Value | Status |
|--------|--------|--------|
| `contextIsolation` | `true` | OK |
| `nodeIntegration` | `false` | OK |
| `sandbox` | `true` | OK |
| `webviewTag` | `false` | OK |
| `webSecurity` | `true` | OK |
| `allowRunningInsecureContent` | `false` | OK |
| Preload | `dist-electron/preload/index.cjs` | OK (contextBridge only) |

**File:** `electron/services/window-setup.service.ts` → `createMainWindowCore()`

---

## Preload

- **File:** `electron/preload/index.ts`
- Exposure **only** via `contextBridge.exposeInMainWorld('api', ...)`.
- No exposure of `require`, `process`, or `electron` to the renderer.
- **Status:** OK.

---

## Splash window (splashWindow)

| Option | Before | After fix |
|--------|--------|-----------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `sandbox` | `false` | `true` |

**Risk before:** splash had Node access and no context isolation.  
**After:** aligned with the main window. If the splash page needs to send an IPC event (e.g. close), a **dedicated splash preload** exposing only that channel will be needed (to be done if necessary).

---

## Other points

- **eval / remote:** not used in preload/main (recommendation: do not introduce).
- **IPC channels:** registered on the main side via `ipc-registry` and dedicated handlers; no documented centralized whitelist — to be documented if needed (list of allowed channels).
- **Telemetry:** see dedicated task (remove/confirm telemetry).

---

*Audit carried out as part of base stabilization (Task 4).*
