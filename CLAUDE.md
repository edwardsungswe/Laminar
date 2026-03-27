# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Laminar is a streamlined email application (Gmail/Outlook alternative) built web-first with an Electron desktop port. This is a pnpm + Turborepo monorepo.

## Architecture

Three applications share a monorepo:

- **`apps/web/`** — React + TypeScript + Vite + Tailwind CSS frontend
- **`apps/server/`** — Go backend with three binaries sharing `internal/` packages:
  - `cmd/api/` — REST API (chi router) + WebSocket server on port 8080
  - `cmd/smtpd/` — Inbound SMTP daemon (go-guerrilla) on ports 25/587
  - `cmd/worker/` — Background job processor (asynq, Redis-backed)
- **`apps/desktop/`** — Electron wrapper that loads the web app

Supporting packages:
- **`packages/shared-types/`** — TypeScript interfaces for API contracts between frontend and backend
- **`infra/`** — AWS CDK (TypeScript) infrastructure stacks

## Common Commands

### Local Development
```bash
docker-compose up -d                          # Start PostgreSQL, Redis, MinIO (S3), Mailhog
cd apps/server && go run cmd/api/main.go      # Start API server
cd apps/server && go run cmd/smtpd/main.go    # Start SMTP server
cd apps/server && go run cmd/worker/main.go   # Start background worker
cd apps/web && pnpm dev                       # Start frontend (localhost:3000, proxies /api and /ws to :8080)
```

### Build
```bash
pnpm build                                    # Build all packages via Turborepo
cd apps/server && go build ./cmd/api          # Build API binary
cd apps/server && go build ./cmd/smtpd        # Build SMTP binary
cd apps/server && go build ./cmd/worker       # Build worker binary
```

### Test
```bash
cd apps/server && go test ./...               # Run all Go tests
cd apps/server && go test ./internal/email/   # Run tests for a single package
cd apps/web && pnpm test                      # Run frontend tests
```

### Database Migrations
Migrations live in `apps/server/migrations/` using golang-migrate. Files follow the pattern `{NNN}_{name}.up.sql` / `{NNN}_{name}.down.sql`.

### Lint
```bash
cd apps/server && golangci-lint run ./...     # Go linting
cd apps/web && pnpm lint                      # Frontend linting (ESLint)
```

## Key Backend Patterns

- **Inbound email pipeline** (`internal/smtp/processor.go`): Raw email bytes are written to a Redis stream first for fast SMTP 250 response, then a worker asynchronously parses MIME, stores to S3, inserts metadata into PostgreSQL, detects threads, and enqueues notifications.
- **Outbound email** (`internal/smtp/sender.go`): Uses AWS SES `SendRawEmail`. Emails are sent via asynq background jobs, not inline with the API request.
- **Real-time push**: WebSocket hub per API instance with Redis Pub/Sub (`notify:{userId}` channels) for cross-instance fanout.
- **Email storage**: Raw `.eml` files and attachments go to S3. PostgreSQL stores metadata, threading info, and full-text search vectors (tsvector). Redis caches sessions, inbox pages, unread counts, and recent email HTML bodies (read-through cache, 24h TTL) to avoid S3 round-trips.
- **Threading**: JWZ algorithm using References/In-Reply-To headers, with subject-based fallback within 7-day window.
- **Auth**: RS256 JWT access tokens (15min) + opaque refresh tokens in Redis (30 days). OAuth2 for Google/Microsoft.
- **HTML email safety**: Server-side whitelist sanitization (bluemonday), client-side rendering in sandboxed iframe with no `allow-scripts`.

## Key Frontend Patterns

- **Tiered caching for sub-100ms latency**: Three tiers drive all data access:
  - **Tier 1 (in-memory, ~0ms):** react-query + Zustand hold the current folder's emails (1-2 pages). All mutations (read, star, archive) apply optimistically here first.
  - **Tier 2 (prefetch buffer, ~0ms):** `usePrefetch.ts` eagerly loads the next 3-5 email bodies, adjacent folders on hover, and all thread messages on open via `queryClient.prefetchQuery()`. Budget ~2-5MB, evict aggressively.
  - **Tier 3 (server + Redis, ~30-60ms):** Everything not prefetched. Redis serves cached bodies/pages in 5-15ms; S3 is only hit for old/archived emails.
- **State**: Zustand for UI/auth state, @tanstack/react-query for server state with optimistic updates
- **Email list**: Virtual scrolling (@tanstack/react-virtual) + cursor-based infinite pagination
- **Compose**: Gmail-style floating dialog with TipTap rich text editor, S3 presigned URL attachment uploads
- **Real-time**: WebSocket connection invalidates react-query caches on new email events
- **Routing**: react-router with nested layouts under `routes/mail/` and `routes/settings/`
- **API calls**: All go through `services/api.ts` which handles JWT interceptor and token refresh

## Environment

Configuration is environment-variable based (`caarlos0/env`). Local dev uses `SMTP_BACKEND=mailhog` to route outbound email to Mailhog instead of SES. See `.env.example` for required variables.

## API Convention

All REST endpoints are prefixed `/api/v1/`. WebSocket upgrade is at `/ws`. The Vite dev server proxies both `/api` and `/ws` to the Go API at localhost:8080.
