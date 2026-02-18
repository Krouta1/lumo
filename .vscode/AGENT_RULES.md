# Agent Rules

This file defines rules for AI agents contributing to this repository.

These rules exist to maintain architectural consistency.

---

## General Rules

Agents must:

- Prefer simple solutions over complex ones
- Avoid introducing new frameworks
- Preserve folder structure
- Follow existing patterns
- Write readable code
- Add comments when logic is non-obvious

Agents must NOT:

- Refactor unrelated files
- Rename core abstractions
- Introduce CRDT logic
- Replace editor libraries
- Modify authentication flow

---

## Data Layer Rules

Agents must:

- Use existing query/mutation helpers
- Avoid direct DB access from components
- Respect workspace boundaries
- Respect RLS assumptions

Never:

- Fetch entire workspace trees unnecessarily
- Write full document snapshots on edits

---

## Editor Rules

Agents must treat blocks as independent units.

Allowed:

- update block content
- reorder blocks
- create/delete blocks

Not allowed:

- replacing page content wholesale
- HTML serialization
- editor re-initialization loops

---

## Realtime Rules

Allowed:

- page-scoped subscriptions
- cache patching
- presence updates

Not allowed:

- polling for block updates
- global subscriptions
- refetch-on-every-event

---

## Performance Rules

Agents must prefer:

- debounced mutations
- optimistic updates
- indexed queries
- incremental rendering

Avoid:

- large JSON writes
- unnecessary re-renders
- duplicate subscriptions

---

## Database Rules

Agents must:

- create migrations for schema changes
- add indexes for new foreign keys
- preserve soft-delete capability

Avoid destructive changes.

---

## Code Style Rules

TypeScript:

- strict typing required
- avoid `any`

React:

- server components by default
- client components only when needed

Naming:

- clear and descriptive
- avoid abbreviations

---

## When Unsure

Agents should:

1. Follow existing patterns
2. Choose the simpler implementation
3. Avoid architectural changes
4. Document assumptions

---

## Priority Order

1. Data correctness
2. Permission safety
3. Realtime consistency
4. Performance
5. Developer experience

---
