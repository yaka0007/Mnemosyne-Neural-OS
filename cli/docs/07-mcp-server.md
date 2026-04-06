# MCP Server *(v1.4 — In Development)*

The `mnemoforge serve` command will expose the MnemoForge memory vault as a **Model Context Protocol (MCP) server** — enabling AI agents to read and write chronicles as native tool calls.

## What is MCP?

MCP (Model Context Protocol) is an open standard that lets AI agents call external tools directly without copy-pasting. Instead of you manually telling the agent "here is my chronicle", the agent calls `get_context()` and receives a compressed summary automatically.

## Architecture

```
Agent (Antigravity / Cursor / Claude Code)
    │
    ├── write_chronicle(content, style) ──→ MnemoForge
    │                                           │
    └── get_context(query) ←────────────────────┤
                                                │
                                          Ollama (local)
                                          compresses vault
                                                │
                                          Chronicles on disk
```

## Planned Tools (v1.4)

### `write_chronicle`

```typescript
// Agent calls:
write_chronicle({
  content: "Decided to use Ollama as MCP pre-filter...",
  style: "decision",
  tags: ["architecture", "mcp", "ollama"]
})
```

### `get_context`

```typescript
// Agent calls:
get_context({
  query: "What did we decide about the config system?",
  maxTokens: 2000
})
// → Returns: Ollama-compressed summary of relevant chronicles
```

### `list_chronicles`

```typescript
list_chronicles({ since: "7 days ago", style: "decision" })
// → Returns: array of chronicle metadata
```

## Preview (v1.3.8)

The stub is already registered. Run it to see the feature preview:

```bash
mnemoforge serve
mnemoforge serve --port 4000
```

## Token Safety

The key MCP concern is **token injection**: every active MCP context gets re-injected into every prompt. Without filtering, a large vault = expensive requests.

**Our solution:** Ollama runs locally and compresses the relevant chronicles to a fraction of their size before injection. No external API calls for filtering.

| Without filter | With Ollama filter |
|---|---|
| 50,000 tokens (full vault) | ~3,000 tokens (summary) |
| Expensive | Free (local) |
| Slow | Fast |

## Timeline

- **v1.3.8** — `serve` stub with feature preview ✅
- **v1.4.0** — Live MCP server with `write_chronicle` + `get_context`
- **v1.4.x** — Client extensions for VS Code, Cursor, JetBrains
