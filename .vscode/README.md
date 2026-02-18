# Collaborative Workspace (Notion-style)

A realtime collaborative workspace application built with:

- Next.js (App Router)
- Supabase (Postgres + Realtime + Auth)
- TanStack Query
- TipTap editor
- TypeScript

This project is intentionally structured to demonstrate **senior-level backend architecture**, including:

- Block-based document model
- Realtime collaboration
- Optimistic updates
- Row Level Security (RLS)
- Presence system
- Workspace permission model

---

## Project Architecture

High-level flow:

Client → Server Actions / API → Database → Realtime → Cache Sync

The system uses:

- Block-level persistence (not full document updates)
- Debounced writes
- Optimistic UI updates
- Realtime subscriptions per page

---

## Folder Structure

app/
components/
lib/
editor/
blocks/
sidebar/
queries/
mutations/
presence/
supabase/

Agents should preserve this structure.

---

## Core Principles

### 1. Blocks are the source of truth

Documents are composed of blocks stored in the database.

Never store entire documents as a single blob.

---

### 2. Server is authoritative

Client cache is optimistic but temporary.
Database state is always canonical.

---

### 3. Small mutations only

Agents must avoid large document writes.

Update only:

- one block
- one page
- one membership record

---

### 4. Realtime is incremental

Subscriptions should update cache entries, not refetch pages.

---

### 5. Type safety first

Always generate types from the database when possible.

Avoid `any`.

---

## Commands

Install:

npm install

Run dev server:

npm run dev

Lint:

npm run lint

Build:

npm run build

---

## Database Ownership

Supabase schema lives in:

/supabase/migrations

Agents must:

- prefer migrations over manual edits
- avoid destructive schema changes

---

## Realtime Model

Subscriptions exist at:

- page block level
- presence channel per page

Agents must NOT introduce:

- document-wide subscriptions
- polling loops

---

## Editor Rules

The editor is TipTap-based.

Agents must:

- store editor content as JSON
- avoid HTML persistence
- avoid rebuilding the editor

---

## Permissions

All data access must respect RLS policies.

Never bypass permissions in client code.

---

## Performance Guardrails

Agents should avoid:

- updating blocks on every keystroke
- refetching entire pages
- re-rendering full editor trees
- storing large JSON blobs repeatedly

Preferred patterns:

- debounce
- optimistic updates
- cache patching
- partial subscriptions

---

## Goal of This Repository

This project is designed to demonstrate:

- system design maturity
- database modeling skill
- realtime architecture
- collaborative editing patterns
- production-style engineering discipline

Agents should optimize for **clarity, correctness, and maintainability**, not cleverness.

---
