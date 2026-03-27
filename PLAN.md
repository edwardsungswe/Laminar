# Laminar Email Application - Implementation Plan

## Context

Build a full-featured, streamlined email application (comparable to Gmail/Outlook) optimized for efficiency and flow. Start as a web app, then port to desktop via Electron. The repo is currently empty.

**Tech stack:** React + Tailwind + TypeScript + Vite (frontend), Golang (backend/SMTP), Redis (cache/queues), S3 (storage), SNS (notifications), Electron (desktop), AWS hosting.

---

## 1. Monorepo Structure

```
Laminar/
├── apps/
│   ├── web/              # React + Vite + Tailwind frontend
│   ├── desktop/          # Electron wrapper
│   └── server/           # Go backend (two binaries: api + smtpd)
├── packages/
│   └── shared-types/     # Shared TypeScript API contract types
├── infra/                # AWS CDK (TypeScript)
├── docker-compose.yml    # Local dev: PostgreSQL, Redis, MinIO, Mailhog
├── turbo.json
├── pnpm-workspace.yaml
└── .github/workflows/    # CI/CD
```

**Key decision:** Two Go binaries (`cmd/api` for REST/WebSocket, `cmd/smtpd` for inbound SMTP) sharing `internal/` packages. A third `cmd/worker` binary runs background jobs via asynq.

---

## 2. Backend Architecture (Go)

### Core Dependencies
| Purpose | Library |
|---|---|
| HTTP router | `go-chi/chi/v5` |
| SMTP server | `flashmob/go-guerrilla` |
| MIME parsing | `emersion/go-message` |
| Email sending | `aws-sdk-go-v2/service/sesv2` |
| S3 | `aws-sdk-go-v2/service/s3` |
| PostgreSQL | `jackc/pgx/v5` |
| Migrations | `golang-migrate/migrate/v4` |
| Redis | `redis/go-redis/v9` |
| Background jobs | `hibiken/asynq` (Redis-backed task queue) |
| JWT | `golang-jwt/jwt/v5` |
| WebSocket | `coder/websocket` |
| HTML sanitize | `microcosm-cc/bluemonday` |
| Config | `caarlos0/env/v10` |
| Validation | `go-playground/validator/v10` |
| Logging | `log/slog` (stdlib) |

### Go Server Structure
```
apps/server/
├── cmd/
│   ├── api/main.go       # REST + WebSocket server
│   ├── smtpd/main.go     # Inbound SMTP daemon
│   └── worker/main.go    # Background job worker
├── internal/
│   ├── api/              # router.go, middleware/, handlers/
│   │   ├── middleware/
│   │   │   ├── auth.go
│   │   │   ├── ratelimit.go
│   │   │   └── cors.go
│   │   └── handlers/
│   │       ├── auth.go
│   │       ├── mail.go
│   │       ├── compose.go
│   │       ├── folders.go
│   │       ├── search.go
│   │       ├── settings.go
│   │       └── contacts.go
│   ├── smtp/
│   │   ├── server.go       # go-guerrilla based inbound SMTP
│   │   ├── processor.go    # Incoming email pipeline
│   │   └── sender.go       # SES-based outbound sending
│   ├── email/
│   │   ├── parser.go       # MIME parsing, attachment extraction
│   │   ├── thread.go       # Threading via References/In-Reply-To
│   │   ├── sanitizer.go    # HTML sanitization (anti-XSS)
│   │   └── models.go       # Email domain types
│   ├── storage/
│   │   ├── s3.go           # S3 raw email and attachment storage
│   │   └── postgres.go     # PostgreSQL data access layer
│   ├── cache/
│   │   ├── redis.go        # Redis client wrapper
│   │   ├── sessions.go     # Session store
│   │   └── mailbox.go      # Mailbox metadata cache
│   ├── queue/
│   │   ├── worker.go       # Background job worker (Redis-backed)
│   │   ├── jobs.go         # Job type definitions
│   │   └── scheduler.go    # Recurring tasks (cleanup, digest)
│   ├── notify/
│   │   ├── sns.go          # SNS publish for new mail
│   │   └── websocket.go    # WebSocket hub for real-time push
│   ├── auth/
│   │   ├── jwt.go          # JWT token issue/verify
│   │   ├── oauth.go        # Google/Microsoft OAuth2 flows
│   │   └── passwords.go    # bcrypt password hashing
│   ├── search/
│   │   └── indexer.go      # Full-text search (PostgreSQL tsvector or OpenSearch)
│   ├── spam/
│   │   ├── filter.go       # rspamd integration
│   │   └── dnsbl.go        # DNS blocklist checks
│   └── config/
│       └── config.go       # Environment-based configuration
├── migrations/
│   ├── 001_users.up.sql
│   ├── 001_users.down.sql
│   ├── 002_emails.up.sql
│   ├── 003_folders.up.sql
│   ├── 004_labels.up.sql
│   ├── 005_attachments.up.sql
│   ├── 006_contacts.up.sql
│   └── 007_settings.up.sql
├── go.mod
├── go.sum
├── Dockerfile
└── Makefile
```

### API Routes
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/oauth/google
POST   /api/v1/auth/oauth/microsoft
DELETE /api/v1/auth/logout

GET    /api/v1/mail/inbox?page=&limit=&before=         # paginated, cursor-based
GET    /api/v1/mail/folder/:folderId?page=&limit=
GET    /api/v1/mail/thread/:threadId                    # full thread with all messages
GET    /api/v1/mail/message/:messageId                  # single email with HTML body
GET    /api/v1/mail/message/:messageId/raw              # raw .eml download from S3
GET    /api/v1/mail/message/:messageId/attachment/:id   # presigned S3 URL for attachment

POST   /api/v1/mail/send                                # compose and send
POST   /api/v1/mail/draft                               # save draft
PUT    /api/v1/mail/draft/:draftId                      # update draft

PATCH  /api/v1/mail/messages                            # bulk: move, label, read/unread, archive, delete
DELETE /api/v1/mail/messages                             # bulk permanent delete

GET    /api/v1/folders
POST   /api/v1/folders
PUT    /api/v1/folders/:id
DELETE /api/v1/folders/:id

GET    /api/v1/labels
POST   /api/v1/labels
PUT    /api/v1/labels/:id
DELETE /api/v1/labels/:id

GET    /api/v1/search?q=&folder=&from=&to=&after=&before=&has=attachment

GET    /api/v1/contacts?q=                              # autocomplete
POST   /api/v1/contacts

GET    /api/v1/settings
PUT    /api/v1/settings

GET    /ws                                               # WebSocket upgrade for real-time
```

**Middleware stack** (chi middleware chain):
1. Request ID injection
2. Structured logging (slog)
3. Recovery (panic handler)
4. CORS (configurable origins)
5. Rate limiting (token bucket per user via Redis sliding window)
6. JWT authentication (skipped for `/auth/*` routes)
7. Request body size limit (25MB max for email send with attachments)

### Inbound Email Pipeline (processor.go - most critical path)
1. SMTP connection accepted via go-guerrilla with TLS (STARTTLS mandatory on 587, opportunistic on 25)
2. Raw bytes written to Redis stream (fast, in-memory) -> return 250 OK immediately
3. Worker picks up from stream:
   a. Spam check (DNSBL at connection time + rspamd content scoring)
   b. SPF/DKIM/DMARC verification (`emersion/go-msgauth`)
   c. MIME parsing via go-message (handles multipart/mixed, alternative, related, nested)
   d. Character encoding detection and conversion to UTF-8 (`golang.org/x/text/encoding`)
   e. Store raw `.eml` to S3
   f. Store each attachment separately to S3 (content-addressed for dedup)
   g. HTML sanitization via bluemonday
   h. Insert metadata row to PostgreSQL `emails` table
   i. Thread detection (References/In-Reply-To headers, JWZ algorithm)
   j. Enqueue notification job
   k. Update search index (tsvector)

**Critical:** The two-phase approach (Redis stream first, then process) ensures the SMTP 250 response is fast and emails aren't lost if the worker fails.

### Outbound Email (sender.go)
- **Strategy A (MVP):** Use AWS SES `SendRawEmail` - offloads IP reputation to AWS
- **Strategy B (later):** Direct SMTP sending for high volume (requires dedicated IPs, warmup)
- Construct full MIME message with go-message (multipart with attachments)
- Send via asynq background job - compose endpoint returns immediately

### Database Schema (PostgreSQL)

```sql
-- 001_users.up.sql
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) UNIQUE NOT NULL,   -- their @laminar address
    password    VARCHAR(255),                    -- nullable if OAuth-only
    name        VARCHAR(255) NOT NULL,
    avatar_url  VARCHAR(512),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE oauth_accounts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider    VARCHAR(50) NOT NULL,            -- 'google', 'microsoft'
    provider_id VARCHAR(255) NOT NULL,
    access_token  TEXT,
    refresh_token TEXT,
    expires_at    TIMESTAMPTZ,
    UNIQUE(provider, provider_id)
);

-- 002_emails.up.sql
CREATE TABLE emails (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message_id      VARCHAR(512) NOT NULL,       -- RFC 5322 Message-ID header
    thread_id       VARCHAR(512) NOT NULL,        -- root Message-ID of thread
    folder_id       UUID NOT NULL REFERENCES folders(id),
    from_address    VARCHAR(255) NOT NULL,
    from_name       VARCHAR(255),
    to_addresses    JSONB NOT NULL,               -- [{email, name}]
    cc_addresses    JSONB DEFAULT '[]',
    bcc_addresses   JSONB DEFAULT '[]',
    subject         VARCHAR(1000) NOT NULL DEFAULT '',
    snippet         VARCHAR(500),                 -- first ~200 chars of plain text
    has_attachments BOOLEAN NOT NULL DEFAULT false,
    is_read         BOOLEAN NOT NULL DEFAULT false,
    is_starred      BOOLEAN NOT NULL DEFAULT false,
    is_draft        BOOLEAN NOT NULL DEFAULT false,
    s3_raw_key      VARCHAR(512) NOT NULL,        -- S3 key for raw .eml
    s3_html_key     VARCHAR(512),                 -- S3 key for sanitized HTML
    size_bytes      INTEGER NOT NULL DEFAULT 0,
    received_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    search_vector   TSVECTOR
);

CREATE INDEX idx_emails_user_folder ON emails(user_id, folder_id, received_at DESC);
CREATE INDEX idx_emails_user_thread ON emails(user_id, thread_id);
CREATE INDEX idx_emails_message_id ON emails(message_id);
CREATE INDEX idx_emails_search ON emails USING GIN(search_vector);

-- Full-text search trigger
CREATE FUNCTION emails_search_vector_update() RETURNS trigger AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', coalesce(NEW.subject, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(NEW.snippet, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(NEW.from_address, '')), 'C') ||
        setweight(to_tsvector('english', coalesce(NEW.from_name, '')), 'C');
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER emails_search_update
    BEFORE INSERT OR UPDATE ON emails
    FOR EACH ROW EXECUTE FUNCTION emails_search_vector_update();

-- 003_folders.up.sql
CREATE TABLE folders (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    type        VARCHAR(50) NOT NULL DEFAULT 'custom',
    -- type: 'inbox', 'sent', 'drafts', 'trash', 'spam', 'archive', 'custom'
    position    INTEGER NOT NULL DEFAULT 0,
    parent_id   UUID REFERENCES folders(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, name, parent_id)
);

-- 004_labels.up.sql
CREATE TABLE labels (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    color       VARCHAR(7) NOT NULL DEFAULT '#6B7280',
    UNIQUE(user_id, name)
);

CREATE TABLE email_labels (
    email_id    UUID NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
    label_id    UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
    PRIMARY KEY (email_id, label_id)
);

-- 005_attachments.up.sql
CREATE TABLE attachments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_id        UUID NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
    filename        VARCHAR(512) NOT NULL,
    content_type    VARCHAR(255) NOT NULL,
    size_bytes      INTEGER NOT NULL,
    s3_key          VARCHAR(512) NOT NULL,
    content_id      VARCHAR(255),                 -- for inline images (cid:)
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 006_contacts.up.sql
CREATE TABLE contacts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email       VARCHAR(255) NOT NULL,
    name        VARCHAR(255),
    frequency   INTEGER NOT NULL DEFAULT 1,       -- for autocomplete ranking
    UNIQUE(user_id, email)
);

-- 007_settings.up.sql
CREATE TABLE user_settings (
    user_id             UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    signature           TEXT DEFAULT '',
    theme               VARCHAR(20) DEFAULT 'system',
    notifications       BOOLEAN DEFAULT true,
    auto_advance        VARCHAR(20) DEFAULT 'next',
    undo_send_seconds   INTEGER DEFAULT 5,
    default_reply_all   BOOLEAN DEFAULT false
);
```

### S3 Storage Layout
```
laminar-mail-{env}/
├── raw/{userId}/{YYYY}/{MM}/{messageId}.eml      # Full raw RFC 5322 message
├── attachments/{userId}/{messageId}/{hash}_{filename}
└── avatars/{userId}/profile.jpg
```
- Content-addressed attachment dedup (hash content, store once if identical)
- Lifecycle policies: S3 Standard -> IA after 90 days -> Glacier after 365 days
- All reads via presigned URLs (15-minute expiry)
- SSE-S3 encryption at rest
- No public access on bucket

### Redis Usage
- **Sessions:** `session:{userId}:{tokenHash}` with TTL for refresh tokens
- **Email body cache:** Recent/unread email HTML bodies cached in Redis to avoid S3 round-trips on read. Key: `body:{messageId}`, TTL: 24h, evict LRU when memory limit reached. Populated on inbound processing and on first read (read-through). ~50-100KB per email, budget ~100 emails per user = ~10MB per active user.
- **Metadata cache:** Inbox first page per user (60s TTL), unread counts per folder (atomically inc/dec), contact autocomplete (5min TTL)
- **Job queue (asynq):** `email:send`, `email:process`, `email:notify`, `email:index`, `email:spam-check`, `cleanup:expired-drafts`
- **Pub/Sub:** `notify:{userId}` for cross-instance WebSocket fanout

### Real-Time Push (WebSocket + Redis Pub/Sub)
- In-memory hub per API instance: `userId -> []*websocket.Conn`
- All API instances subscribe to Redis Pub/Sub pattern `notify:*`
- When `email:notify` job fires, publishes to Redis channel `notify:{userId}`
- Each instance checks for local connections for that user and pushes
- WebSocket message types (JSON):
  - `{"type": "new_email", "threadId": "...", "preview": {...}}`
  - `{"type": "email_updated", "messageId": "...", "changes": {...}}`
  - `{"type": "unread_count", "folderId": "...", "count": 42}`

### Authentication
- **Access tokens:** RS256-signed JWT, 15-minute expiry. Claims: `sub`, `email`, `iat`, `exp`
- **Refresh tokens:** Opaque random string in Redis (30-day TTL), returned as HttpOnly cookie
- **Token rotation:** Refresh endpoint rotates both tokens
- **OAuth2:** Google + Microsoft for SSO and optional email import (via Gmail API / Microsoft Graph)
- **Passwords:** bcrypt with cost factor 12

---

## 3. Frontend Architecture (React + TS + Tailwind + Vite)

### Key Libraries
| Concern | Library | Rationale |
|---|---|---|
| State management | `zustand` 5.x | Minimal boilerplate, great TS support |
| Data fetching | `@tanstack/react-query` 5.x | Caching, pagination, optimistic updates |
| Routing | `react-router` 7.x | Standard, supports layouts |
| Rich text editor | `@tiptap/react` 2.x | ProseMirror-based, extensible |
| Virtual scrolling | `@tanstack/react-virtual` 3.x | Performant list virtualization |
| Date formatting | `date-fns` 4.x | Tree-shakeable |
| Icons | `lucide-react` | Clean, consistent |
| Forms | `react-hook-form` + `zod` | Performant with schema validation |
| Keyboard shortcuts | `react-hotkeys-hook` 4.x | Declarative shortcut binding |
| Toasts | `sonner` 2.x | Lightweight, good defaults |

### Frontend Structure
```
apps/web/src/
├── main.tsx                          # ReactDOM.createRoot, providers
├── App.tsx                           # Root layout, router setup
├── routes/
│   ├── index.tsx                     # Redirect to /inbox
│   ├── auth/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── oauth-callback.tsx
│   ├── mail/
│   │   ├── layout.tsx                # Sidebar + main area layout
│   │   ├── inbox.tsx
│   │   ├── folder.tsx                # Generic folder view
│   │   ├── thread.tsx                # Thread/conversation view
│   │   ├── compose.tsx               # Full-page compose
│   │   └── search.tsx
│   └── settings/
│       ├── layout.tsx
│       ├── general.tsx
│       ├── accounts.tsx
│       └── labels.tsx
├── components/
│   ├── ui/                           # Button, Input, Dialog, DropdownMenu, Avatar, Badge, Skeleton, Tooltip
│   ├── mail/
│   │   ├── EmailList.tsx             # Virtualized email list
│   │   ├── EmailListItem.tsx         # Single row in the list
│   │   ├── ThreadView.tsx            # Expanded thread with all messages
│   │   ├── MessageView.tsx           # Single email message display
│   │   ├── ComposeEditor.tsx         # TipTap-based rich text compose
│   │   ├── ComposeDialog.tsx         # Floating compose window (Gmail-style)
│   │   ├── RecipientInput.tsx        # To/Cc/Bcc with autocomplete
│   │   ├── AttachmentList.tsx        # File attachment display/upload
│   │   ├── EmailToolbar.tsx          # Bulk actions toolbar
│   │   └── HtmlEmailRenderer.tsx     # Sandboxed iframe for HTML emails
│   ├── layout/
│   │   ├── Sidebar.tsx               # Folder list, labels, compose button
│   │   ├── Header.tsx                # Search bar, user menu
│   │   ├── CommandPalette.tsx        # Cmd+K search/command palette
│   │   └── MobileNav.tsx
│   └── common/
│       ├── LoadingSpinner.tsx
│       ├── EmptyState.tsx
│       └── ErrorBoundary.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useWebSocket.ts              # Auto-reconnect with exponential backoff
│   ├── useEmails.ts                 # react-query hooks for email CRUD
│   ├── useThreads.ts
│   ├── useFolders.ts
│   ├── usePrefetch.ts              # Tier 2 prefetch: next email bodies, adjacent folders
│   ├── useSearch.ts                 # Debounced search
│   ├── useKeyboardShortcuts.ts
│   ├── useMediaQuery.ts
│   └── useUndoSend.ts
├── stores/
│   ├── authStore.ts                 # JWT tokens, user profile
│   ├── uiStore.ts                   # Sidebar collapsed, compose open, selected emails
│   └── settingsStore.ts
├── services/
│   ├── api.ts                       # Fetch wrapper with JWT interceptor
│   ├── auth.ts
│   ├── mail.ts
│   ├── folders.ts
│   ├── search.ts
│   └── websocket.ts
├── utils/
│   ├── formatDate.ts               # "2 hours ago", "Mar 15", etc.
│   ├── emailUtils.ts
│   ├── sanitizeHtml.ts             # Defense-in-depth client-side sanitization
│   └── constants.ts                # Keyboard shortcut mappings, folder types
└── types/
    └── index.ts
```

### Key Frontend Patterns

**Tiered caching strategy (sub-100ms latency target):**
All user actions must feel instant. Rather than syncing the entire mailbox client-side (which breaks on large mailboxes, mobile browsers, and multi-tab scenarios), use a three-tier approach:

- **Tier 1 — In-memory (react-query + Zustand), ~0ms:** Current folder's emails (1-2 pages, ~50-100 records). All mutations (mark read, star, archive, move) apply optimistically here first. This is the source of truth for what the user sees.
- **Tier 2 — Prefetch buffer, ~0ms:** Next 3-5 email bodies for the current view (fetched in background via `queryClient.prefetchQuery()`). Adjacent folders the user is likely to click. Evict aggressively. Budget: ~2-5MB.
- **Tier 3 — Server with Redis cache, ~30-60ms:** Everything else. Redis serves cached email bodies and folder pages in 5-15ms. With API behind CloudFront or in the same region, total round-trip stays under 100ms. S3 is only hit for old/archived emails not in Redis.

The prefetch hook (`usePrefetch.ts`) triggers on: email list render (prefetch next N bodies), folder hover (prefetch first page), and thread open (prefetch all messages in thread). The goal is that by the time the user clicks, Tier 1 or 2 already has the data.

**Virtual scrolling + infinite pagination:**
`EmailList.tsx` uses `@tanstack/react-virtual` for visible-row-only rendering, combined with `useInfiniteQuery` for cursor-based pagination. Next page fetched automatically on scroll.

**Real-time via WebSocket:**
`useWebSocket.ts` maintains persistent `/ws` connection. On `new_email` message, invalidates react-query cache -> background refetch -> automatic UI update.

**Optimistic updates:**
Mark-read, star, move-to-trash update cache immediately, fire API call, roll back on error. The user never waits for the server to confirm a mutation — the UI updates in the same frame as the keypress/click.

**HTML email rendering:**
Sandboxed `<iframe>` with `sandbox="allow-popups allow-popups-to-escape-sandbox"`. `srcdoc` set to server-sanitized HTML. No `allow-scripts`. External images proxied through backend (tracking pixel prevention) with user toggle.

**Compose flow:**
Gmail-style floating panel (minimize/maximize/pop-out). TipTap editor supports: bold, italic, underline, strikethrough, lists, links, inline images, blockquote for replies. Attachments uploaded directly to S3 via presigned URL with progress tracking.

**Keyboard shortcuts:**
| Key | Action |
|---|---|
| `c` | Compose new email |
| `r` | Reply |
| `a` | Reply all |
| `f` | Forward |
| `e` | Archive |
| `#` | Delete |
| `j` / `k` | Next / previous email |
| `o` / `Enter` | Open email/thread |
| `u` | Back to list |
| `s` | Star/unstar |
| `Shift+I` | Mark as read |
| `Shift+U` | Mark as unread |
| `/` | Focus search |
| `Cmd+K` | Command palette |

**Responsive design (Tailwind breakpoints):**
- Desktop (>=1024px): 3-column (sidebar + email list + reading pane)
- Tablet (>=768px): 2-column (sidebar + list), thread opens in overlay
- Mobile (<768px): single column, bottom nav, full-screen views

### Vite Configuration
```typescript
// apps/web/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
      '/ws': { target: 'ws://localhost:8080', ws: true },
    },
  },
  build: { target: 'esnext', sourcemap: true },
})
```

---

## 4. Electron Desktop App

### Strategy
Wrap the React web app. Dev mode loads `http://localhost:3000`. Production loads bundled `apps/web/dist/` from the asar archive.

### Structure
```
apps/desktop/
├── src/
│   ├── main.ts            # BrowserWindow, deep links, mailto: handler
│   ├── preload.ts          # contextBridge API
│   └── tray.ts             # System tray with unread badge
├── electron-builder.yml
├── tsconfig.json
└── package.json
```

### Key Features
- **Security:** `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`
- **Preload API:** Expose minimal bridge: `setBadgeCount`, `showNotification`, `getVersion`, `platform`
- **System tray:** Unread count badge overlay, right-click menu (Open, Compose, Check Updates, Quit)
- **macOS dock badge:** Update unread count
- **Deep links:** Register `laminar://` protocol and `mailto:` handler
- **Native notifications:** Triggered by WebSocket messages in main process
- **Auto-update:** `electron-updater` with S3-hosted releases
- **Builds:** macOS (dmg, universal), Windows (NSIS), Linux (AppImage, deb)
- **Code signing:** macOS notarization, Windows Authenticode

### Build Pipeline
Turbo pipeline ensures desktop build depends on web build:
```json
{
  "pipeline": {
    "web#build": { "outputs": ["dist/**"] },
    "desktop#build": { "dependsOn": ["web#build"], "outputs": ["dist/**"] }
  }
}
```

---

## 5. Email Protocol & Deliverability

### No IMAP Server
Use REST API + S3/PostgreSQL storage. IMAP is complex (RFC 3501 + extensions) and our clients use our API exclusively. Can be added later as a separate service reading from the same store.

For importing existing email, use vendor APIs (Gmail API, Microsoft Graph) rather than IMAP.

### SPF, DKIM, DMARC (all mandatory from day one)
- **SPF:** DNS TXT record: `v=spf1 include:amazonses.com -all`
- **DKIM:** SES-managed keys, three CNAME records (SES provides during domain verification)
- **DMARC:** `_dmarc.laminar.email` -> `v=DMARC1; p=quarantine; rua=mailto:dmarc@laminar.email; fo=1` (start with `p=none` during testing)

### MX Record Setup
Route 53 MX records pointing to NLB fronting ECS smtpd tasks:
```
10 inbound-smtp-1.laminar.email
20 inbound-smtp-2.laminar.email
```

### Email Threading
- JWZ algorithm (References/In-Reply-To headers)
- Subject-based fallback (strip Re:/Fwd:, match within 7-day window)
- `thread_id` denormalized on `emails` table for fast retrieval
- Thread view sorted by `received_at ASC`

### Spam Filtering (multi-layer)
1. **DNSBL check** at SMTP connection time (Spamhaus ZEN)
2. **SPF/DKIM/DMARC verification** of incoming emails (`emersion/go-msgauth`)
3. **rspamd** content-based scoring (sidecar container, HTTP API)
4. **User-trainable:** "Report Spam" / "Not Spam" buttons update rspamd Bayes classifier
5. **Rate limiting:** per-IP connection limits (10 concurrent, 100/hour default)

---

## 6. AWS Infrastructure

### Architecture
```
                    ┌─────────────┐
                    │  Route 53   │
                    │  DNS / MX   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
     ┌────────▼──────┐  ┌─▼──────┐  ┌──▼──────────┐
     │   CloudFront  │  │  NLB   │  │    ALB       │
     │  (Frontend)   │  │(SMTP)  │  │  (API)       │
     └────────┬──────┘  └───┬────┘  └──────┬───────┘
              │             │              │
     ┌────────▼──────┐  ┌──▼────────┐  ┌──▼────────┐
     │   S3 Bucket   │  │  ECS      │  │  ECS      │
     │  (Static)     │  │  smtpd    │  │  api       │
     └───────────────┘  └──┬────────┘  └──┬────────┘
                           │              │
                    ┌──────▼──────────────▼──────┐
                    │         VPC                 │
                    │  ┌──────────┐ ┌──────────┐ │
                    │  │   RDS    │ │ElastiCache│ │
                    │  │ Postgres │ │  Redis    │ │
                    │  └──────────┘ └──────────┘ │
                    │  ┌──────────┐ ┌──────────┐ │
                    │  │    S3    │ │   SES     │ │
                    │  │ (Mail)   │ │ (Send)    │ │
                    │  └──────────┘ └──────────┘ │
                    │  ┌──────────┐              │
                    │  │   SNS    │              │
                    │  │(Notify)  │              │
                    │  └──────────┘              │
                    └────────────────────────────┘
```

### Service Details
- **SES:** Verify domain, request production access (exit sandbox), configure bounce/complaint notifications -> SNS -> SQS
- **S3 Buckets:** `laminar-mail-{env}` (email storage), `laminar-frontend-{env}` (static), `laminar-releases-{env}` (Electron updates)
- **SNS Topics:** `laminar-new-email-{env}`, `laminar-ses-bounces-{env}`
- **CloudFront:** S3 origin for web app, custom domain `app.laminar.email`, ACM SSL cert, `index.html` no-cache, assets 1-year cache
- **ECS Fargate:**
  - `api` service: 2-4 tasks (autoscale CPU/memory), behind ALB, port 8080
  - `smtpd` service: 2 tasks (fixed), behind NLB, ports 25 + 587
  - `worker` service: 1-3 tasks (autoscale on queue depth), no load balancer
  - All three run same Docker image with different CMD entrypoints
- **RDS PostgreSQL:** Multi-AZ production, automated backups (7-day retention), `pg_trgm` enabled
- **ElastiCache Redis:** Single node, used for sessions, cache, asynq, pub/sub
- **Route 53:** A records for app/api, MX records for SMTP, TXT for SPF/DMARC, CNAME for DKIM

### Infrastructure as Code
AWS CDK (TypeScript) in `infra/` directory with stacks for VPC, ECS, S3, SES, SNS, RDS, Redis, CloudFront, Route 53.

---

## 7. Development Phases

### Phase 1: Scaffolding + Auth + Basic UI (Weeks 1-3)

**Goal:** Working monorepo, register/login, see empty inbox.

**Backend:**
1. Initialize Go module, set up chi router in `cmd/api/main.go`
2. `docker-compose.yml` with PostgreSQL 16, Redis 7, Mailhog
3. Write all DB migrations (001-007)
4. Implement config, postgres connection pool
5. Implement auth: bcrypt passwords, JWT issue/verify
6. Auth handlers: register, login, refresh, logout
7. Middleware: CORS, auth, logging, recovery
8. `GET /mail/inbox` returning empty list
9. Integration tests for auth flow

**Frontend:**
1. Scaffold with `create vite` (React + TS + SWC), configure Tailwind 4
2. Set up react-router with route structure
3. Build UI primitives: Button, Input, Dialog, Avatar
4. Build Sidebar with hardcoded folders
5. Build login/register pages with react-hook-form + zod
6. Set up zustand auth store, react-query, API service with JWT interceptor
7. Build EmailList (empty state) + mail layout

**Infra:**
1. Init pnpm workspace + turbo.json
2. `packages/shared-types/` with initial interfaces
3. GitHub Actions CI (lint + test + build)
4. `.env.example`, `.gitignore`

### Phase 2: Email Send/Receive Pipeline (Weeks 4-7)

**Goal:** Users can send and receive actual emails.

**Backend:**
1. Verify domain in SES, add DNS records (SPF/DKIM/DMARC/MX)
2. MIME message builder + SES sender (`sender.go`)
3. MIME parser (`parser.go`) with full multipart support
4. S3 storage: upload raw email, attachments, presigned URLs
5. `POST /mail/send` + asynq send job
6. asynq worker binary (`cmd/worker/main.go`)
7. go-guerrilla SMTP server + inbound processor pipeline
8. All mail CRUD endpoints with real data
9. Threading algorithm
10. HTML sanitization
11. Draft save/update endpoints

**Frontend:**
1. ComposeDialog with TipTap editor
2. RecipientInput with chip UI
3. AttachmentList with drag-drop + S3 presigned upload
4. EmailListItem with virtual scrolling + infinite query
5. ThreadView + MessageView + HtmlEmailRenderer (sandboxed iframe)
6. Reply/reply-all/forward with quoted text
7. Bulk actions toolbar
8. Implement `usePrefetch.ts` — on email list render, prefetch next 3-5 email bodies via `queryClient.prefetchQuery()`. On folder hover, prefetch first page. On thread open, prefetch all thread messages.

### Phase 3: Real-Time + Search + Polish (Weeks 8-11)

**Goal:** Real-time updates, working search, polished UX.

**Backend:**
1. WebSocket hub with Redis Pub/Sub fanout
2. SNS integration for new email notifications
3. `email:notify` asynq job -> WebSocket push
4. Full-text search (`ts_query`) + advanced filters
5. Contact autocomplete (ranked by frequency)
6. Auto-create contacts on send (upsert + increment frequency)
7. Redis caching: inbox first page, unread counts, and email body read-through cache (populate on inbound processing + first read, 24h TTL, ~100 recent bodies per user)
8. rspamd spam filter integration
9. DNSBL checks on inbound SMTP
10. SPF/DKIM/DMARC verification for inbound
11. Rate limiting middleware (Redis sliding window)
12. OAuth2 login (Google + Microsoft)

**Frontend:**
1. WebSocket hook with auto-reconnect, cache invalidation on events
2. Search UI: header search bar + results page
3. Cmd+K command palette
4. All keyboard shortcuts
5. Label management (create, edit, delete, apply)
6. Settings page (signature, theme, notifications)
7. Undo-send (toast with timer, cancel asynq job)
8. Dark mode (Tailwind `dark:` variant)
9. Contact autocomplete in compose
10. Responsive polish for tablet + mobile

### Phase 4: Electron Desktop App (Weeks 12-14)

**Goal:** Downloadable desktop application with native features.

1. Scaffold `apps/desktop/` with electron-builder
2. BrowserWindow + preload + contextBridge
3. System tray with unread badge
4. Native notifications via Electron Notification API
5. Deep links: `laminar://` protocol + `mailto:` handler
6. Auto-update via electron-updater + S3
7. Platform builds: macOS (dmg), Windows (NSIS), Linux (AppImage)
8. Code signing: macOS notarization, Windows Authenticode
9. CI pipeline: build + publish on release tag

### Phase 5: Advanced Features (Weeks 15-20+)

1. Email filters/rules (if from X, move to Y, label Z)
2. Snooze emails (hide until specified time, asynq scheduled job)
3. Scheduled send
4. Email templates / canned responses
5. Multi-account support
6. Import from Gmail/Outlook via their APIs
7. Vacation auto-responder
8. ClamAV attachment scanning (sidecar container)
9. End-to-end encryption (PGP via OpenPGP.js)
10. Monitoring: CloudWatch, Grafana dashboards, PagerDuty
11. GDPR: data export/deletion, CAN-SPAM unsubscribe handling
12. Performance tuning: CDN for attachments, query optimization, connection pooling

---

## 8. Key Risks & Mitigations

### Email Deliverability is Hard
- Use SES shared IPs (established reputation) for MVP
- Mandatory SPF/DKIM/DMARC from day one
- Implement bounce handling: auto-suppress hard-bounced addresses
- Implement complaint handling: auto-unsubscribe on spam reports
- Monitor via SES reputation dashboard + `postmaster.google.com`
- IP warmup schedule if moving to dedicated IPs (200/day, ramp over 4-6 weeks)

### SES Sandbox Blocks Development
- Use Mailhog locally (`SMTP_BACKEND=mailhog` env var)
- Request SES production access early in Phase 2 (24-48h approval)

### MIME Parsing Edge Cases
- Real emails are messy: malformed MIME, wrong encodings, nested forwards, winmail.dat, calendar invites
- Always store raw `.eml` to S3 first, parse after (never lose data)
- Build test corpus from Gmail, Outlook, Apple Mail, Thunderbird, mobile clients
- Graceful degradation: HTML fails -> show plain text, encoding fails -> try UTF-8 -> Latin-1 -> raw bytes

### Security: XSS in HTML Emails
- Server-side whitelist sanitization (bluemonday) before storage
- Client-side sandboxed iframe (`sandbox` attribute, no `allow-scripts`)
- CSP headers on main application
- External images blocked by default (tracking pixel prevention)
- Never render email HTML in main document context

### Attachment Security
- Serve via presigned URLs with `Content-Disposition: attachment` (force download)
- 25MB per email limit (matching Gmail/SES)
- ClamAV scanning in Phase 5

### Rate Limiting & Abuse Prevention
- SMTP: require auth for outbound (port 587), no open relay
- Inbound: per-IP rate limiting, DNSBL rejection
- API: per-user rate limiting (100 req/min normal, 10/min send, 5/min auth)
- Account send limits: free 50/day, paid 500/day
- CAPTCHA on registration
- Alert on unusual sending patterns

### Data Integrity
- Write raw email to Redis stream first, then SMTP 250 OK
- S3 provides 11 nines of durability, enable versioning
- PostgreSQL Multi-AZ + WAL + point-in-time recovery
- asynq at-least-once delivery with retry + dead letter queue
- Message-ID deduplication (skip if already in database)

### Cost Estimates (10K users, 100K emails/day)
| Service | Monthly Cost |
|---|---|
| ECS Fargate (3 services) | ~$400 |
| RDS PostgreSQL (Multi-AZ) | ~$500 |
| ElastiCache Redis | ~$250 |
| S3 (1TB stored) | ~$25 |
| SES (100K/day outbound) | ~$30 |
| CloudFront | ~$20 |
| NLB + ALB | ~$50 |
| Route 53 | ~$5 |
| **Total** | **~$1,300** |

For early MVP: single EC2 instance running all services behind Caddy reverse proxy costs ~$30/month.

---

## 9. Local Development Setup

### docker-compose.yml services
- **PostgreSQL 16** on port 5432
- **Redis 7** on port 6379
- **MinIO** (S3-compatible) on port 9000
- **Mailhog** (fake SMTP + web UI) on ports 1025 (SMTP) + 8025 (web)

### Dev workflow
1. `docker-compose up -d` (start local services)
2. `cd apps/server && go run cmd/api/main.go` (start API)
3. `cd apps/web && pnpm dev` (start frontend at localhost:3000)
4. Vite proxy forwards `/api` and `/ws` to Go API at localhost:8080

---

## 10. Verification Plan

1. **Phase 1:** Register account -> login -> see empty inbox -> JWT refresh works -> logout
2. **Phase 2:** Send email from Laminar -> arrives at external mailbox. Send from external -> arrives in Laminar inbox. Open thread, view attachments, HTML renders safely in sandboxed iframe
3. **Phase 3:** New inbound email triggers real-time UI update via WebSocket. Search finds emails by subject/body/sender. Keyboard shortcuts navigate and act. Spam goes to spam folder
4. **Phase 4:** Electron app launches, loads web UI, tray icon shows unread count, native notification fires on new email, auto-update works
5. **End-to-end:** Full email round-trip (send from Laminar -> reply from external client -> see thread in Laminar) with attachments, HTML content, and real-time notifications

---

## Critical Files (implement first)
- `apps/server/internal/smtp/processor.go` — Inbound email pipeline (most complex, orchestrates everything)
- `apps/server/internal/api/router.go` — API contract between frontend and backend
- `apps/server/internal/email/parser.go` — MIME parsing (most edge cases)
- `apps/server/migrations/002_emails.up.sql` — Email table schema (data model foundation)
- `apps/web/src/components/mail/EmailList.tsx` — Primary UI surface (virtual scroll + infinite pagination + real-time)
