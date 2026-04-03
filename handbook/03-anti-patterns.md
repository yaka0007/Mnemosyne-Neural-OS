# 03 — Anti-Patterns

> *"Here is where Neural Coding goes wrong. Most failures are predictable."*

---

The following are the most common failure modes observed in Neural Coding practice. Each can be avoided by understanding it before you encounter it.

---

## Anti-Pattern 1: The Happy Path Trap

**What it looks like:**  
You describe what should happen when everything works. The AI builds exactly that. It works in testing. It fails in production when the first edge case appears.

**Why it happens:**  
Describing the happy path is natural. It's what you want to happen. Describing failure paths requires deliberately thinking about things going wrong — which runs against the optimism that usually drives ambitious projects.

**How to avoid it:**  
For every requirement, explicitly describe at least two failure scenarios and their expected behavior. Make it a rule: no description is complete without failure paths.

**The tell:**  
You find yourself writing "and if that fails, just return null." That sentence should trigger a full stop and a real failure design.

---

## Anti-Pattern 2: Context Amnesia

**What it looks like:**  
You start a new AI conversation without re-establishing the system context. The AI produces something that is locally correct but contradicts patterns established in previous sessions.

**Why it happens:**  
AI systems don't maintain long-term memory across conversations by default. Every new session starts fresh. The practitioner assumes the AI "knows" the established patterns. It doesn't.

**How to avoid it:**  
Begin each new conversation with a context brief. At minimum: the current state of the system, the established patterns relevant to this session, and the constraints that are non-negotiable.

Some practitioners maintain a `CONTEXT.md` file in their project that they paste at the start of each session.

**The tell:**  
The AI produces something that would have been rejected three weeks ago, and you accept it because you've forgotten why it was rejected.

---

## Anti-Pattern 3: The Complexity Acceptance

**What it looks like:**  
The AI produces a solution that is significantly more complex than you expected. You accept it because "the AI must know something you don't."

**Why it happens:**  
Respect for technical expertise (which the AI appears to have) can create deference on questions where domain judgment matters more.

**How to avoid it:**  
Treat unexpected complexity as a signal, not a fact of life. Ask: "Is there a simpler approach?" "Why is this as complex as it is?" "What constraint makes this complexity necessary?"

Sometimes the complexity is justified. More often, it reveals that the AI misunderstood the problem, or is solving a more general case than you need.

**The tell:**  
You can't explain to someone else why the solution is designed the way it is.

---

## Anti-Pattern 4: The Abstraction Premature

**What it looks like:**  
Early in the project, you ask the AI to build "flexible," "extensible," "generic" systems. The AI obliges with layers of abstraction that make simple things complicated and hard things invisible.

**Why it happens:**  
Software culture values extensibility. When you ask for an extensible system, you get one — often at the cost of immediate clarity.

**How to avoid it:**  
Build for the current requirements, not the imagined future requirements. Premature abstraction in a Neural Coding project is especially costly because you don't have the implementation knowledge to cut through it later.

Build the specific thing. Extract the abstraction when you have two or three concrete instances that demand it.

**The tell:**  
You have interfaces with one implementation. You have factories that produce one type.

---

## Anti-Pattern 5: The Silent Failure Acceptance

**What it looks like:**  
A handler, service, or function fails and returns `null`, `undefined`, `false`, or an empty object. The caller doesn't know what happened. The user sees nothing. The log says nothing.

**Why it happens:**  
The AI often produces optimistic error handling. Silent failures are technically "handled" (no uncaught exception) while being operationally invisible.

**How to avoid it:**  
Establish a non-negotiable rule: **every failure must be observable.** Either through a typed error response the caller can act on, a log entry the operator can find, or a user-facing message that explains what went wrong.

Review every `catch` block. If it swallows the error without doing one of these three things, it is wrong.

**The tell:**  
Something breaks in production and you have no idea why because there are no logs and no errors — just wrong behavior.

---

## Anti-Pattern 6: The Scope Creep Session

**What it looks like:**  
You start a session to fix a specific bug. Midway through, you also add a feature. Then refactor something. Then fix another bug. The session ends without having clearly completed any of the three things.

**Why it happens:**  
AI collaboration is fast and encourages exploration. It's easy to follow a thread of interest without completing the original task.

**How to avoid it:**  
Define one clear goal per AI session. When adjacent issues appear, note them for a future session. Resist the pull of "as long as we're here."

**The tell:**  
Your git commit messages say "various fixes and improvements."

---

## Anti-Pattern 7: The Unverified Handoff

**What it looks like:**  
The AI produces code for a module. You accept it and move on to the next thing. Six weeks later, you discover the module doesn't handle the one case that actually matters.

**Why it happens:**  
Testing in Neural Coding requires deliberate effort because you can't read the code fluently. It's tempting to trust that if it compiles and runs in the demo scenario, it's correct.

**How to avoid it:**  
Every AI-produced module should be verified against its stated requirements before moving on. Describe the verification criteria in your original intention. Ask the AI to write tests that capture the failure paths you described.

**The tell:**  
You trust the happy path but never saw what happens in the failure scenarios.

---

## Anti-Pattern 8: The Pattern Drift

**What it looks like:**  
Early in the project, you established that errors are returned as `{ ok: false, error: 'CODE' }`. Three months later, some handlers return `null`, some throw, some return `{ success: false }`. Nobody noticed the drift.

**Why it happens:**  
AI systems produce code that is locally consistent (consistent with the session context) but may not match patterns established in earlier sessions. Without a pattern registry, drift is invisible.

**How to avoid it:**  
Maintain a short "established patterns" document. Include it in context briefs. When the AI produces something that deviates, veto it immediately and re-establish the pattern.

**The tell:**  
Callers have to check for three different error shapes before they know whether something failed.

---

*Previous: [The Veto ←](./02-the-three-pillars/03-the-veto.md)*  
*Next: [AI Collaboration →](./04-ai-collaboration.md)*
