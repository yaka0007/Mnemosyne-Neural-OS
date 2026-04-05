# LinkedIn Post — Neural Coding

---

**Hook (première ligne visible avant "voir plus") :**

> I haven't written code since 1990. Last week I shipped a 290,000-line production system.

---

**Corps du post :**

I want to be precise about what happened, because "vibe coding" doesn't cover it.

Thirty years ago I wrote some PHP. Before that, I patched ASCII game files on a 386SX-33 as a teenager. That's my entire coding background.

What I just shipped: a production Electron + React desktop application. 290,000 lines of TypeScript. 1,372 source files. 379 explicit API methods. A 5-provider AI embedding engine. A fine-grained access control system. A CI pipeline with 1,126 passing tests and zero TypeScript errors.

One person. Eighteen months. No dev team.

---

Here's what I learned about how this is actually possible:

**It's not about prompting AI to write code.**

That's vibe coding. Useful. Has a ceiling.

What I did is something different. I'm calling it **Neural Coding**.

The difference:

→ Vibe coding: "build me a search engine"
→ Neural Coding: "the search must work offline via Ollama first, then cascade through 4 cloud providers. If the index was built with a different embedding model than the query, detect the dimension mismatch and fall back to text scoring. Never fail silently. Track which provider was used."

One produces a demo. The other produces a system that still works when things go wrong.

---

Neural Coding has three pillars:

**1. Intention Articulation** — knowing how to describe a problem with all its constraints, not just its happy path

**2. Architectural Judgment** — being able to evaluate whether an AI proposal is correct for the whole system, not just the immediate question

**3. The Veto** — knowing when something compiles and is still wrong

None of these require knowing TypeScript. They require knowing your domain, your users, and your constraints — deeply.

---

My background before this? I managed a large-scale technical project as a non-developer. That gave me systems thinking, operational judgment, and the discipline to hold a complex vision together under pressure.

Turns out those skills transfer directly to directing AI toward good software.

---

The platform I built — Mnemosyne Neural OS — is itself about augmenting human intelligence through AI.

So the project and its creation methodology are the same argument:

*A platform built on the belief that non-developers can build serious software with AI — was built by a non-developer building serious software with AI.*

I didn't plan for that symmetry. It just turned out to be literally true.

---

Full article on Medium → [link]

Architecture & source documentation → github.com/yaka0007/Mnemosyne-Neural-OS

#NeuralCoding #AI #BuildInPublic #Mnemosyne #NoCode #AITools

---

**NOTE : Remplace [link] par ton lien Medium après publication.**
