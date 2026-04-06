# Local AI & Ollama Integration

MnemoForge v1.3 introduces native support for **local AI models via [Ollama](https://ollama.com)** — enabling context compression before MCP injection without sending your chronicles to a remote API.

## Why Local AI?

When reading chronicles via MCP, the entire vault content is re-injected into the agent context. This causes **token explosion** — especially over long sessions.

The solution: use a **local model as a pre-filter**:

```
Chronicles in vault
       ↓
Ollama summarizes + compresses (local, free, fast)
       ↓
Compressed context injected via MCP
       ↓
Your cloud agent (Antigravity, Claude, GPT-4...)
```

**Result:** 70–90% fewer tokens consumed for the same memory depth.

---

## Setup

### 1. Install Ollama

Download from [ollama.com](https://ollama.com) and pull a model:

```bash
ollama pull phi3:mini          # fast & lightweight
ollama pull mistral:7b         # good balance
ollama pull llama3.2:latest    # solid general purpose
ollama pull deepseek-r1:latest # best reasoning (slower)
```

### 2. Configure MnemoForge

```bash
mnemoforge config ollama
```

This will:

1. Ping Ollama at `http://localhost:11434`
2. List your available models
3. Let you select the memory filter model
4. Save it to your vault config

---

## Model Recommendations

| Model | Size | Speed | Best For |
|---|---|---|---|
| `phi3:mini` | ~2GB | ⚡ Fast | Quick filtering, low RAM |
| `mistral:7b` | ~4GB | ✅ Good | General compression |
| `llama3.2:latest` | ~4GB | ✅ Good | Balanced reasoning |
| `deepseek-r1:latest` | ~8GB+ | 🐢 Slow | Deep analysis, reasoning |

> **Note:** `deepseek-r1` has a long cold-start time. MnemoForge uses a 90s timeout for heavy models.

---

## Configuration Storage

The selected model is saved in `~/.mnemoforge/vault.json`:

```json
{
  "ide": "Antigravity",
  "provider": "Anthropic",
  "localAI": {
    "enabled": true,
    "endpoint": "http://localhost:11434",
    "model": "llama3.2:latest"
  }
}
```

---

## Usage with MCP *(v1.4)*

Once `mnemoforge serve` is running, the local AI filter is applied automatically when `get_context()` is called by an agent tool.

Manual test (available now):

```bash
mnemoforge config ollama
# Select model → runs a quick hello test
```
