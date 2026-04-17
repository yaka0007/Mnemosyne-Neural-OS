# 02 — Pillar 3: The Veto

> *"It compiles. It passes tests. It is still wrong. Say so."*

---

## Definition

**The Veto is the ability and willingness to reject an AI proposal that is technically correct but systemically wrong — and to articulate why.**

It is the final quality gate in Neural Coding. Without it, the other two pillars degrade over time.

---

## Why The Veto Is Hard

The Veto is psychologically uncomfortable.

The AI produced something. It runs. The tests pass. Rejecting it feels like:
- Wasting the AI's work
- Slowing yourself down
- Being unnecessarily demanding
- Not trusting the AI

None of these are good reasons to accept a wrong proposal.

The Veto is hard because it requires holding your own judgment against the social pressure of "it works." Technical correctness creates a gravitational pull toward acceptance. The Veto resists that pull in service of systemic correctness.

---

## The Two Categories of Wrong

**Category A: Technically Wrong**  
The output doesn't do what was asked. Tests fail. Behavior is incorrect. This is easy to catch and obvious to reject.

**Category B: Systemically Wrong**  
The output does what was asked. It works in isolation. But it violates a constraint, creates a problem downstream, contradicts an established pattern, or solves a symptom rather than the cause.

The Veto is primarily about Category B. Category A catches itself.

---

## Diagnostic Questions for Category B

When something runs and you feel uncertain, ask:

**"Does this match the spirit of the intention, or just the letter?"**  
Sometimes the AI satisfies the stated requirement while missing what you actually needed.

**"Would I be comfortable explaining this to someone else?"**  
If you can't explain why the solution works this way, you may not fully understand it. Partial understanding is a risk.

**"Is this consistent with the patterns we've established elsewhere?"**  
Inconsistency is a design debt. It creates cognitive load for future maintenance.

**"What would this look like in six months if we kept this pattern?"**  
Project the small decision forward. Small architectural inconsistencies compound.

**"Am I accepting this because it's right, or because I'm tired?"**  
Honest answer required.

---

## A Worked Example

**Context:** FGAC (Fine-Grained Access Control) system. The user wants to apply new permissions for a project.

**AI proposal:** Apply the grant directly when requested. If there's a conflict, return an error.

**Technically correct?** Yes. The grant is applied. Errors are returned.

**Systemically wrong?** Yes — because:

> "Returning an error when there's a conflict puts the conflict resolution burden on the caller. The caller is the UI. The UI shouldn't know about conflict rules — that's policy logic. Policy logic belongs in the policy layer.
>
> The right solution is a Conflict Rules Engine that runs *before* the grant is applied, evaluates all rules deterministically, and returns a structured conflict result that the UI can display without understanding the rules themselves.
>
> This also means conflict rules can be added, modified, or removed in one place without touching the UI."

The Veto, in this case, produces the `checkMixConflicts()` function in the [FGAC Policy System](../doc/architecture/FGAC_POLICY_SYSTEM.md) — a pre-grant rules engine that evaluates classification isolation, mix size limits, and path validity before any grant is applied.

The first version worked. The vetoed version was right.

---

## When to Use The Veto Immediately

Some situations warrant an immediate veto, without extended evaluation:

- **The AI put logic in the wrong layer.** UI doing policy. Service doing formatting. Handler doing business logic.
- **The error handling disappears state.** `catch (e) { return null }` hides failures. Always wrong.
- **The solution only works if nothing else changes.** This is a coupling problem.
- **The AI introduced a dependency that doesn't exist elsewhere.** New dependencies need justification.
- **The solution is significantly more complex than expected.** Complexity is a signal. Either the problem is being misunderstood, or the approach is wrong.

---

## The Veto Is Not Rejection — It's Redirection

Using The Veto doesn't mean starting over. It means identifying exactly what is wrong, articulating it precisely, and giving the AI better constraints for the next attempt.

A good Veto sounds like:

> "This works but doesn't belong in this layer. The [component X] should not know about [concern Y]. Instead, [concern Y] should be handled by [component Z], and [component X] should receive a clean result from it. Produce a version that maintains this separation."

A bad Veto sounds like:

> "This isn't right. Try again."

The precision of the Veto feeds back into Intention Articulation. Every Veto is a constraint you failed to articulate up front. Make a note of it. Next time, articulate it earlier.

---

## The Veto and Impostor Syndrome

The hardest part of The Veto for practitioners without traditional development backgrounds is this:

*"Who am I to say this is wrong? I don't even know TypeScript."*

This is the wrong frame.

You don't need to know TypeScript to know that a security check should happen before a permission is granted, not after. You don't need to know React to know that business logic shouldn't live in a display component. You don't need to know Electron to know that a handler that swallows errors without notifying the user is a bad design.

These are **domain judgments**, not **implementation judgments**.

The Veto is domain judgment. That's your territory. Use it.

---

*Previous: [Architectural Judgment ←](./02-architectural-judgment.md)*  
*Next: [Anti-Patterns →](../03-anti-patterns.md)*
