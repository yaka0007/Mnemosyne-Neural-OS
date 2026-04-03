# 07 — Glossary

> *Precise language produces precise systems. This glossary defines the terms used in Neural Coding with the specificity the discipline requires.*

---

## A

**Architectural Judgment**  
The ability to evaluate whether an AI proposal is correct for the entire system, not just for the immediate problem. One of the Three Pillars of Neural Coding. See [02 — Pillar 2](./02-the-three-pillars/02-architectural-judgment.md).

**Anti-Pattern**  
A recurring failure mode in Neural Coding practice. An approach that seems reasonable in isolation but produces consistent negative outcomes. See [03 — Anti-Patterns](./03-anti-patterns.md).

---

## C

**Constraint**  
A non-negotiable boundary that a solution must respect. Constraints may cover security, privacy, performance, cost, compatibility, or user experience. Unstated constraints are the primary source of incorrect AI proposals.

**Context Brief**  
A structured summary of the current system state, established patterns, and non-negotiable constraints provided to the AI at the start of a session. Prevents context amnesia.

**Context Amnesia**  
The failure mode where the AI's lack of cross-session memory causes it to produce proposals inconsistent with previously established patterns. Prevented by context briefs.

---

## D

**Domain Expert**  
A person with deep knowledge of a specific field (medicine, finance, logistics, etc.) but without implementation-level programming skills. In Neural Coding, domain expertise is the primary qualification — not programming knowledge.

**Domain Judgment**  
Knowledge-based evaluation of whether a solution is correct for a specific problem domain, independent of implementation correctness. The primary form of judgment exercised in using The Veto.

---

## F

**Failure Path**  
A description of what should happen when a dependency fails, input is invalid, a resource is unavailable, or an expected condition is not met. Explicitly describing failure paths is fundamental to Intention Articulation.

---

## H

**Happy Path**  
A description of what should happen when all conditions are normal and no errors occur. The starting point for requirements, but insufficient on its own. A complete Neural Coding description always includes failure paths alongside the happy path.

---

## I

**Intention**  
The complete description of what a piece of software should do — including its happy path, failure paths, constraints, and observable success criteria. Not a request, not a prompt: a specification.

**Intention Articulation**  
The ability to translate a complex goal into a precise, constraint-aware description that minimizes meaningful ambiguity. The foundational pillar of Neural Coding. See [02 — Pillar 1](./02-the-three-pillars/01-intention-articulation.md).

---

## L

**Local-Only Mode**  
A sovereignty setting in which no AI processing is routed to external cloud services. All embedding, inference, and data handling occurs on the user's device. A concrete implementation of the privacy constraint in Mnemosyne Neural OS.

---

## M

**Mental Model**  
The practitioner's internal representation of how their entire system works — its components, data flows, trust boundaries, and failure dependencies. The foundation of Architectural Judgment.

---

## N

**Neural Coding**  
A discipline for building production software through structured, iterative collaboration with AI, where the practitioner's primary skills are systems thinking and domain expertise rather than programming language knowledge.

**Neural Coder**  
A practitioner of Neural Coding. A person who builds software systems primarily through intent articulation, architectural judgment, and AI collaboration rather than direct implementation.

---

## O

**Observable Failure**  
A failure mode that produces a log entry, a typed error response, or a user-facing message that explains what went wrong. The non-negotiable baseline for error handling in Neural Coding.

---

## P

**Pattern**  
An established approach in a codebase that should be applied consistently. Examples: how errors are typed, how IPC handlers are registered, how async operations are wrapped. Pattern consistency is actively managed in Neural Coding.

**Pattern Drift**  
The gradual accumulation of inconsistent implementations of the same concept across a codebase, typically caused by AI sessions not having access to previously established patterns.

**Pattern Registry**  
A document (often `PATTERNS.md` or similar) that records established patterns so they can be included in session context briefs.

---

## S

**Session**  
A single continuous conversation with an AI system focused on a specific goal. Neural Coding sessions have a defined structure: context establishment, intention articulation, proposal evaluation, verification.

**Session Journal**  
A brief log of what was built, decided, and deferred in each Neural Coding session. Provides project history and prevents context amnesia.

**Silent Failure**  
A failure mode where an error is caught but produces no observable output — no log, no typed error, no user message. A canonical anti-pattern in Neural Coding.

**Systemic Correctness**  
The property of a solution being right for the whole system — not just for the isolated problem it was asked to solve. Evaluated through Architectural Judgment.

---

## T

**Technical Correctness**  
The property of a solution that compiles, runs, and produces the requested output in the stated conditions. Necessary but not sufficient. Systemic correctness is also required.

**The Veto**  
The ability and willingness to reject a technically correct AI proposal because it is systemically wrong. One of the Three Pillars of Neural Coding. See [02 — Pillar 3](./02-the-three-pillars/03-the-veto.md).

**The Three Pillars**  
The three foundational skills of Neural Coding: Intention Articulation, Architectural Judgment, and The Veto.

---

## V

**Vibe Coding**  
A related practice where developers use AI to accelerate implementation of problems they already know how to solve. Distinct from Neural Coding in that vibe coding amplifies existing technical skill; Neural Coding substitutes it with domain expertise and systems thinking.

---

*Part of the [Neural Coding Handbook](./README.md)*
