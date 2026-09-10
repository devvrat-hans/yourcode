<div align="center">

<br />

# YourCode

### Terminal-Native Autonomous AI Coding Agent

<p>
  A high-throughput, terminal-based AI coding assistant engineered for local workspace operations.<br />
  Architected on <strong>Bun</strong>, <strong>React 19</strong>, <strong>OpenTUI</strong>, <strong>Hono</strong>, <strong>Prisma ORM</strong>, <strong>Clerk OAuth PKCE</strong>, <strong>Polar usage metering</strong>, and multi-provider <strong>Vercel AI SDK</strong> streaming.
</p>

<br />

<p>
  <a href="https://bun.sh/"><img src="https://img.shields.io/badge/Runtime-Bun-000000?style=flat-square&logo=bun&logoColor=white" alt="Bun" /></a>&nbsp;
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/UI_Engine-React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" /></a>&nbsp;
  <a href="https://github.com/anomaly/opentui"><img src="https://img.shields.io/badge/TUI-OpenTUI-111111?style=flat-square" alt="OpenTUI" /></a>&nbsp;
  <a href="https://hono.dev/"><img src="https://img.shields.io/badge/API-Hono-E36002?style=flat-square&logo=hono&logoColor=white" alt="Hono" /></a>&nbsp;
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/ORM-Prisma_7-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" /></a>&nbsp;
  <a href="https://neon.tech/"><img src="https://img.shields.io/badge/Database-PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>&nbsp;
  <a href="https://clerk.com/"><img src="https://img.shields.io/badge/Auth-Clerk_PKCE-6C47FF?style=flat-square&logo=clerk&logoColor=white" alt="Clerk" /></a>&nbsp;
  <a href="https://polar.sh/"><img src="https://img.shields.io/badge/Billing-Polar_Credits-000000?style=flat-square&logo=polar&logoColor=white" alt="Polar" /></a>
</p>

<p>
  <a href="https://github.com/devvrat-hans/yourcode/stargazers"><img src="https://img.shields.io/github/stars/devvrat-hans/yourcode?style=flat-square&color=56D6C2" alt="Stars" /></a>&nbsp;
  <a href="https://github.com/devvrat-hans/yourcode/network/members"><img src="https://img.shields.io/github/forks/devvrat-hans/yourcode?style=flat-square&color=89B4FA" alt="Forks" /></a>&nbsp;
  <a href="https://github.com/devvrat-hans/yourcode/issues"><img src="https://img.shields.io/github/issues/devvrat-hans/yourcode?style=flat-square&color=E0AF68" alt="Issues" /></a>&nbsp;
  <a href="https://github.com/devvrat-hans/yourcode/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License" /></a>
</p>

</div>

---

## Table of Contents

- [System Architecture](#system-architecture)
- [Design Decisions and Technical Trade-offs](#design-decisions-and-technical-trade-offs)
  - [Client-Side Distributed Tool Execution](#client-side-distributed-tool-execution)
  - [Terminal UI Rendering Pipeline](#terminal-ui-rendering-pipeline)
  - [Cryptographic Authentication Flow (OAuth 2.0 PKCE)](#cryptographic-authentication-flow-oauth-20-pkce)
  - [Token Metering and Credit Settlement Engine](#token-metering-and-credit-settlement-engine)
- [Operational Agent Modes](#operational-agent-modes)
- [Tool Execution Runtime and Security Boundaries](#tool-execution-runtime-and-security-boundaries)
- [Model Registry and Pricing Schema](#model-registry-and-pricing-schema)
- [CLI Interface and Keybinding Architecture](#cli-interface-and-keybinding-architecture)
- [Monorepo Structure](#monorepo-structure)
- [Getting Started](#getting-started)
  - [System Requirements](#system-requirements)
  - [1. Installation and Dependency Resolution](#1-installation-and-dependency-resolution)
  - [2. Environment Variable Configuration](#2-environment-variable-configuration)
  - [3. Clerk OAuth 2.0 Identity Provider Configuration](#3-clerk-oauth-20-identity-provider-configuration)
  - [4. Polar Usage Metering and Credit Setup](#4-polar-usage-metering-and-credit-setup)
  - [5. Database Provisioning and Schema Sync](#5-database-provisioning-and-schema-sync)
  - [6. Running the API Gateway Server](#6-running-the-api-gateway-server)
  - [7. CLI Compilation and Global Binary Linking](#7-cli-compilation-and-global-binary-linking)
- [Engineering Milestones and Branch Architecture](#engineering-milestones-and-branch-architecture)
- [Future Roadmap: Enterprise AI Governance and Cryptography](#future-roadmap-enterprise-ai-governance-and-cryptography)
  - [1. AI Governance, DLP, and Security Guardrails](#1-ai-governance-dlp-and-security-guardrails)
  - [2. End-to-End Cryptographic Storage and Credential Enclaves](#2-end-to-end-cryptographic-storage-and-credential-enclaves)
  - [3. Advanced Code Intelligence and Extensibility](#3-advanced-code-intelligence-and-extensibility)
- [Contributing](#contributing)
- [License](#license)

---

## System Architecture

YourCode utilizes a decoupled **Client-Server-Agent** architecture. Heavy model orchestration, token metering, and state management are isolated in a centralized backend service, while code analysis, filesystem mutations, and shell operations execute strictly on the client host within sandboxed workspace boundaries.

```mermaid
flowchart TB
    subgraph ClientHost ["Client Tier (packages/cli)"]
        UI["OpenTUI + React 19 Render Engine\nCustom Hooks · Keyboard Layers · Terminal Viewport"]
        ChatTransport["AI SDK Chat Transport\nSSE Stream Processing · Message State Reconciliation"]
        ToolExecutor["Local Tool Execution Runtime\nStrict CWD Path Sanitization · Subprocess Management"]
        PKCEService["Loopback Auth Listener\nRFC 7636 PKCE Challenge Generation"]
        Workspace[("Local Host Filesystem\nProject Root (process.cwd())")]
    end

    subgraph ServerTier ["Server Tier (packages/server)"]
        Gateway["Hono API Gateway Router\n/chat · /sessions · /auth · /billing"]
        AuthMiddleware["Clerk JWT Authentication Guard\nHeader Verification · Identity Resolution"]
        BalanceGuard["Polar Credit Balance Guard\nPre-Flight Rate & Credit Authorization"]
        SystemPromptEngine["Context & System Prompt Engine\nMode-Aware Behavioral Constraints"]
        InferenceEngine["Vercel AI SDK Core\nstreamText Multi-Provider Dispatcher"]
    end

    subgraph UpstreamServices ["Upstream Infrastructure"]
        ClerkService["Clerk Identity Platform\nOAuth 2.0 Auth Code with PKCE"]
        PolarBilling["Polar.sh Billing Infrastructure\nAggregated Meter Ingestion · Customer Portal"]
        Database[("PostgreSQL via Prisma 7\nJSONB Session Store · Indexed Queries")]
        ModelProviders["Foundation Model APIs\nGoogle AI Studio · Anthropic · OpenAI"]
    end

    UI --> ChatTransport
    ChatTransport <-->|Server-Sent Events / HTTP POST| Gateway
    Gateway --> AuthMiddleware
    AuthMiddleware --> BalanceGuard
    BalanceGuard --> SystemPromptEngine
    SystemPromptEngine --> InferenceEngine

    InferenceEngine <-->|Prompt / Completion Protocol| ModelProviders
    InferenceEngine -->|Streaming Tool Call Specs| ChatTransport
    ChatTransport -->|Dispatch Local Action| ToolExecutor
    ToolExecutor <-->|Constrained I/O & Shell Exec| Workspace
    ToolExecutor -->|Structured Tool Output| ChatTransport

    Gateway <-->|Persist Session & Message Graph| Database
    AuthMiddleware <-->|Verify Bearer JWT| ClerkService
    PKCEService <-->|Authorize / Token Exchange| ClerkService
    BalanceGuard <-->|Check Balance & Record Event| PolarBilling
```

---

## Design Decisions and Technical Trade-offs

### Client-Side Distributed Tool Execution

Most cloud-based coding platforms require developers to synchronize their entire source tree with a remote server, introducing significant latency, high storage costs, and severe security/compliance liabilities. 

YourCode solves this by shifting **tool execution entirely to the client**:
- **Zero Remote Code Exposure**: Proprietary codebase files are never transmitted to or cached on the application backend. Only contextual snippets explicitly queried by the LLM are exchanged.
- **Autonomous Multi-Step Loop**: When the model decides to invoke a tool (e.g., `readFile`, `grep`, `editFile`), the backend streams a structured tool execution frame. The CLI intercepts the frame, executes the command against the local filesystem, and returns the result via an automated message continuation without requiring manual user dispatch.
- **Path Confinement Guards**: All file operations validate canonical path targets against `process.cwd()`. Path traversal attacks (`../`, symlink attacks, absolute root access) are caught and rejected prior to filesystem invocation.

### Terminal UI Rendering Pipeline

Terminal applications typically suffer from visual tearing and clunky synchronous rendering loops. YourCode builds on **OpenTUI** and **React 19**:
- **Declarative Layouts**: Utilizes Flexbox-style viewport partitioning (`box`, `scrollbox`, `text`) driven by terminal cell coordinates.
- **Multi-Layer Responder Stack**: A custom `KeyboardLayerProvider` manages keyboard event delegation across base inputs, floating command palettes, context autocompletion menus, and modal dialogs with strict modal capture semantics.
- **Streaming State Synchronization**: As token chunks stream over SSE, the UI incrementally reconciles assistant responses, dynamic tool progress indicators, and native reasoning/thinking traces (`reasoning` message parts) with minimal layout jitter.

### Cryptographic Authentication Flow (OAuth 2.0 PKCE)

Command-line interfaces cannot securely store client secrets. YourCode implements **RFC 7636 (Proof Key for Code Exchange by OAuth Public Clients)**:
1. The CLI generates a cryptographically random 32-byte `code_verifier` using `crypto.getRandomValues`.
2. Computes the SHA-256 digest of the verifier to produce the `code_challenge` (base64url-encoded).
3. The CLI starts an ephemeral HTTP server on a random high-order loopback port (`port: 0`) and launches the default system browser to Clerk's authorization endpoint with the challenge and state payload.
4. Clerk redirects through the backend relay (`/auth/callback`), which forwards the authorization code to the CLI loopback listener.
5. The CLI exchanges the authorization code alongside the original unhashed `code_verifier` directly for a secure session JWT.

### Token Metering and Credit Settlement Engine

To support sustainable multi-model usage without exposing provider-level API keys to end users:
- **Rate Base Normalization**: 1 internal Credit is pegged to `$0.01 USD`.
- **Pre-Flight Authorization**: The server validates that the authenticated account maintains an active credit balance (`> 0`) before initiating inference streams.
- **Post-Stream Micro-Accounting**: Upon response completion (`onFinish`), the server extracts exact token counts (`inputTokens`, `outputTokens`) from `LanguageModelUsage`. The cost is calculated using exact provider pricing vectors and converted into an integer credit charge (`ceil(cost / 0.01)`).
- **Asynchronous Ingestion**: Billable usage events (`yourcode_usage`) are ingested into Polar's metering API with unique message event IDs (`chat-message:<id>`), ensuring strict idempotency and zero duplicate charges.

---

## Operational Agent Modes

The runtime provides two distinct operational postures enforcing strict functional boundaries:

| Mode | Trigger | Tool Whitelist | Purpose and Behavioral Profile |
|---|---|---|---|
| **`PLAN`** | <kbd>Tab</kbd> or `/agents` | `readFile`, `listDirectory`, `glob`, `grep` | **Read-only architectural analysis.** The model explores the codebase, maps call hierarchies, reads configurations, and designs implementation blueprints. All filesystem mutation tools and shell capabilities are structurally withheld from the model prompt schema. |
| **`BUILD`** | <kbd>Tab</kbd> or `/agents` | `readFile`, `writeFile`, `editFile`, `listDirectory`, `glob`, `grep`, `bash` | **Full implementation runtime.** The agent actively generates code, writes new modules, performs atomic surgical string replacements, and executes shell scripts, test suites, and build commands within configurable execution timeouts. |

---

## Tool Execution Runtime and Security Boundaries

All local tool invocations are executed by `packages/cli/src/lib/local-tools.ts` using strict path normalization and bounded system resources.

### Path Confinement Validation
Every path parameter undergoes canonical resolution against the current working directory:

```ts
function resolveInsideCwd(path: string) {
  const cwd = process.cwd();
  const resolved = resolve(cwd, path);
  const rel = relative(cwd, resolved);

  if (rel.startsWith("..") || isAbsolute(rel)) {
    throw new Error("Path is outside the project directory");
  }

  return { cwd, resolved };
}
```

### Local Tool Specifications

- **`readFile`**: Reads file content with an upper-bound chunk limit of 10,000 characters. Content exceeding this threshold is safely truncated with length annotations to prevent terminal buffer overflows.
- **`writeFile`**: Writes full file payloads to disk. Automatically resolves directory hierarchy and creates missing parent paths recursively.
- **`editFile`**: Performs atomic in-place edits. Requires an exact, unique `oldString` match. If 0 occurrences or $>1$ ambiguous matches are found, the transaction is aborted with an error to prevent file corruption.
- **`listDirectory`**: Scans directory structures, explicitly ignoring `.git`, `node_modules`, and hidden dot-directories. Sorts directories ahead of files alphabetically.
- **`glob`**: Fast filesystem traversal using `Bun.Glob` with match caps (max 200 entries) and exclusion filters.
- **`grep`**: Spawns an optimized `grep` subprocess (`-rn -E`) excluding `.git` and `node_modules`, returning structured matches containing relative file paths, line numbers, and line content (capped at 50 results).
- **`bash`**: Spawns shell processes via `Bun.spawn` with an isolated environment (`TERM=dumb`), 30-second default execution timeout watchdog, and maximum stdout/stderr capture buffers (20,000 characters).

---

## Model Registry and Pricing Schema

Supported models and their associated token rate cards defined in `@yourcode/shared`:

| Model Identifier | Provider | Input Cost ($ / 1M tokens) | Output Cost ($ / 1M tokens) | Status |
|---|---|---|---|---|
| `gemini-3.1-flash-lite` | **Google** | $0.25 | $1.50 | **Default Model** |
| `claude-sonnet-4-6` | **Anthropic** | $3.00 | $15.00 | Supported |
| `claude-haiku-4-5` | **Anthropic** | $1.00 | $5.00 | Supported |
| `claude-opus-4-6` | **Anthropic** | $5.00 | $25.00 | Supported |
| `gpt-5.4` | **OpenAI** | $2.50 | $15.00 | Supported |
| `gpt-5.4-mini` | **OpenAI** | $0.75 | $4.50 | Supported |
| `gpt-5.4-nano` | **OpenAI** | $0.20 | $1.25 | Supported |

---

## CLI Interface and Keybinding Architecture

### Slash Commands

The command menu is accessible by entering `/` in the input buffer:

| Command | Category | Description | Technical Action |
|---|---|---|---|
| `/new` | Session | Reset active session | Navigates to root `/` route |
| `/agents` | Agent Mode | Toggle agent persona | Opens modal dialog to select `PLAN` or `BUILD` |
| `/models` | LLM Config | Switch active model | Opens model selection dialog linked to `SUPPORTED_CHAT_MODELS` |
| `/sessions` | Persistence | Browse session history | Fetches session records via Hono client; restores message tree |
| `/theme` | Interface | Switch color palette | Updates active theme context (Nightfox, Catppuccin, Dracula, etc.) |
| `/login` | Identity | Authenticate CLI | Initializes ephemeral loopback server and launches OAuth PKCE |
| `/logout` | Identity | De-authenticate | Purges cached access tokens from local state |
| `/upgrade` | Billing | Purchase credits | Resolves checkout URL via Polar SDK; triggers browser redirection |
| `/usage` | Billing | Inspect meter usage | Retrieves Polar customer portal session URL and opens browser |
| `/exit` | Application | Terminate process | Invokes terminal teardown handlers and exits process |

### Keyboard Navigation Layer

- <kbd>Tab</kbd>: Toggles runtime mode between `PLAN` and `BUILD`.
- <kbd>Enter</kbd> / <kbd>Return</kbd>: Submits the input buffer or selects active menu candidate.
- <kbd>Shift</kbd> + <kbd>Enter</kbd>: Appends an unescaped newline into the multiline editor.
- <kbd>@</kbd>: Opens fuzzy filesystem autocomplete popup, querying files and subdirectories recursively.
- <kbd>Esc</kbd>: Dismisses open dialogs/menus, or aborts active streaming inference requests via `AbortController`.
- <kbd>Ctrl</kbd> + <kbd>C</kbd>: Clears the current input buffer, or terminates the application if buffer is empty.
- <kbd>↑</kbd> / <kbd>↓</kbd>: Navigates selection indexes within dialog pickers and autocomplete dropdowns.

---

## Monorepo Structure

The project is configured as a high-performance **Bun Workspace**:

```
yourcode/
├── packages/
│   ├── cli/                         # Terminal client application (OpenTUI + React 19)
│   │   ├── bin/                     # Global binary execution shim
│   │   └── src/
│   │       ├── components/          # Viewport primitives, input bars, dialogs, status monitors
│   │       │   ├── command-menu/    # Command palette state machine and filter logic
│   │       │   ├── dialogs/         # Modal components (Agents, Models, Sessions, Themes)
│   │       │   └── messages/        # Token stream renderers, reasoning traces, tool indicators
│   │       ├── hooks/               # useChat AI stream lifecycle bindings and tool output relays
│   │       ├── layouts/             # Responsive terminal viewport scaffoldings
│   │       ├── lib/                 # OAuth loopback engine, local tool runtime, API client
│   │       ├── providers/           # React Context providers (Keyboard, Theme, Dialog, Toast)
│   │       ├── screens/             # Route handlers (Home, NewSession, SessionView)
│   │       └── theme.ts             # 12-bit hex palette schemas and styling tokens
│   ├── database/                    # Database access layer and Prisma schema
│   │   ├── prisma/
│   │   │   └── schema.prisma        # Postgres models (Session, Message JSON payload)
│   │   ├── generated/               # Generated Prisma Client artifacts
│   │   └── src/                     # Connection pool abstraction and database client export
│   ├── server/                      # Hono API backend gateway
│   │   └── src/
│   │       ├── lib/                 # Pricing arithmetic, Polar SDK bindings, model resolvers
│   │       ├── middleware/          # Clerk JWT validation and Polar credit balance gate
│   │       ├── routes/              # HTTP Route endpoints (/chat, /sessions, /auth, /billing)
│   │       ├── system-prompt.ts     # Prompt compiler injecting mode constraints and tool protocols
│   │       └── index.ts             # Gateway entrypoint configured with high idle timeouts
│   └── shared/                      # Isomorphic TypeScript module contracts
│       └── src/
│           ├── index.ts             # Shared module namespace export
│           ├── models.ts            # Supported model registry, provider types, and pricing definitions
│           └── schemas.ts           # Zod validation schemas and tool calling contract specifications
├── dev-files/                       # Internal PR specifications and architecture logs
├── .env.example                     # Environment configuration reference
├── package.json                     # Monorepo root manifest and workspace commands
├── tsconfig.base.json               # Shared strict TypeScript configuration
└── bun.lock                         # Deterministic Bun dependency lockfile
```

---

## Getting Started

### System Requirements

- **Runtime**: [Bun](https://bun.sh/) (v1.1.0 or higher)
- **Database**: PostgreSQL 14+ (or serverless instances such as [Neon](https://neon.tech/))
- **Identity Provider**: Active [Clerk](https://clerk.com/) account
- **Billing Infrastructure**: [Polar.sh](https://polar.sh/) account
- **Foundation Model API Keys**: At least one key from Google AI Studio, Anthropic, or OpenAI

---

### 1. Installation and Dependency Resolution

Clone the repository and install workspace dependencies using Bun:

```bash
git clone https://github.com/devvrat-hans/yourcode.git
cd yourcode
bun install
```

---

### 2. Environment Variable Configuration

Create a root `.env` configuration file based on `.env.example`:

```bash
cp .env.example .env
```

Populate the required configuration variables:

```bash
# Gateway Configuration
API_URL=http://localhost:3000

# PostgreSQL Connection String
DATABASE_URL=postgresql://user:password@localhost:5432/yourcode_db

# Foundation Model Providers (Provide at least one)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
OPENAI_API_KEY=your_openai_api_key

# Clerk Authentication (OAuth PKCE Client)
CLERK_FRONTEND_API=your_instance.clerk.accounts.dev
CLERK_OAUTH_CLIENT_ID=your_clerk_oauth_client_id
CLERK_OAUTH_CLIENT_SECRET=your_clerk_oauth_client_secret
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
JWT_SECRET=your_signing_jwt_secret

# Polar Billing Integration
POLAR_ACCESS_TOKEN=polar_at_...
POLAR_PRODUCT_ID=your_polar_product_id
POLAR_SERVER=sandbox   # 'sandbox' for staging, 'production' for live billing
POLAR_CREDITS_METER_ID=your_polar_credits_meter_id
```

---

### 3. Clerk OAuth 2.0 Identity Provider Configuration

To support browser-based CLI PKCE login:
1. Access the **Clerk Dashboard** > **Configure** > **Developers** > **OAuth applications**.
2. Create a new OAuth application named `YourCode`.
3. Enable the required authorization scopes: `openid`, `email`, `profile`, `offline_access`.
4. Toggle **Public** to `ON` (enables the Authorization Code with PKCE grant type).
5. Toggle **Consent screen** to `ON`.
6. Configure the authorized redirect URIs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://<your-api-domain>/auth/callback`
7. Copy the client credentials into `CLERK_OAUTH_CLIENT_ID` and `CLERK_OAUTH_CLIENT_SECRET`.

---

### 4. Polar Usage Metering and Credit Setup

1. Open your **Polar Dashboard** (ensure **Sandbox Mode** is toggled for development).
2. Navigate to **Meters** and configure an aggregated credit meter:
   - **Meter Name**: `yourcode_credits`
   - **Filter Clause**: Name equals `yourcode_usage`
   - **Aggregation Function**: `Sum`
   - **Target Property**: `credits`
3. Navigate to **Benefits** > Create a benefit attached to the `yourcode_credits` meter (e.g., granting 1,000 units).
4. Navigate to **Products** > Create a one-time payment product (e.g., $10 for 1,000 credits), link the credit benefit, and set Customer Portal visibility to private.
5. Export the resulting Product ID and Meter ID to your `.env` configuration.

---

### 5. Database Provisioning and Schema Sync

Generate the Prisma Client artifacts and apply the schema to your PostgreSQL database:

```bash
# Generate Prisma Client
bun run --cwd packages/database db:generate

# Synchronize schema directly with database
bunx --cwd packages/database prisma db push
```

---

### 6. Running the API Gateway Server

Start the Hono backend server in development mode:

```bash
bun run dev:server
```

The server binds to port `3000` with hot code reloading and an extended `idleTimeout` (255 seconds) to accommodate sustained LLM tool execution streams.

---

### 7. CLI Compilation and Global Binary Linking

To run the terminal client in watch mode during development:

```bash
bun run dev:cli
```

To build and install the `yourcode` binary globally into your system path:

```bash
bun run link:cli
```

Once linked, execute the agent inside any project workspace on your machine:

```bash
yourcode
```

---

## Engineering Milestones and Branch Architecture

The repository was engineered via modular, reviewable pull requests merged into `main`:

| Branch Identifier | Architectural Deliverables |
|---|---|
| `feature/monorepo-scaffolding` | Bun workspaces setup, multi-package TSConfig inheritance, dependency resolution |
| `feature/cli-ui-components` | OpenTUI runtime integration, declarative text components, header ASCII rendering |
| `feature/cli-routing-screens` | React Router terminal layout abstraction, dynamic route views (`/`, `/sessions/:id`) |
| `feature/session-api-integration`| Hono session CRUD endpoints, Prisma schema definitions, JSON message serialization |
| `feature/chat-streaming-integration`| Vercel AI SDK SSE protocol bridge, multi-provider model routing, stream lifecycle hooks |
| `feature/cli-theming` | Dynamic theme state provider, ANSI color mappings, theme selector modal |
| `feature/auth-file-mentions-cli` | RFC 7636 PKCE browser authentication, `@` context mention tokenization and autocomplete |
| `feature/billing-cli` | Pre-flight credit authorization middleware, token-to-USD pricing vectors, Polar event sync |
| `feat/client-side-tool-execution`| Decoupled local tool executor, CWD directory boundary guards, subprocess runners |
| `feature/cli-command` | Bun binary entrypoint (`bin/yourcode`), bundle output generation, global linking script |

---

## Future Roadmap: Enterprise AI Governance and Cryptography

To support enterprise deployment, regulatory compliance (SOC2, ISO 27001, HIPAA), and zero-trust engineering environments, the following technical milestones are currently planned:

### 1. AI Governance, DLP, and Security Guardrails

```mermaid
flowchart LR
    InboundPrompt["Developer Prompt & Filesystem Data"] --> DLPScanner["Client-Side DLP & PII Scanner\nRegex + Local NER Engine"]
    DLPScanner --> SanitizedPayload["Sanitized Token Stream"]
    SanitizedPayload --> InjectionFilter["Indirect Prompt Injection Classifier\nHeuristic Boundary Verification"]
    InjectionFilter --> RemoteLLM["External Foundation Model\n(Inference Processing)"]
    RemoteLLM --> ToolValidator["Tool Invocation Authority\nBlast-Radius & Permissions Filter"]
    ToolValidator --> NamespaceSandbox["Isolated Subprocess Runner\nLinux Namespaces / Container Jail"]
```

#### Client-Side PII and Secret Redaction Engine
- **Pre-Flight DLP Sanitization**: Implement a client-side scanning phase before prompts or file contents leave the local host.
- **Automated High-Entropy Token Redaction**: Scans for RSA/ECDSA private keys, AWS/GCP access tokens, JWT strings, environment passwords, and database connection strings using Shannon entropy evaluation and deterministic regular expressions.
- **Named Entity Recognition (NER)**: Integration with local tokenizers (such as Microsoft Presidio or ONNX-compiled NER models) to redact personally identifiable information (emails, phone numbers, government identification numbers) and replace them with reversible pseudonymized tokens.
- **Workspace Exclusions (`.aiignore`)**: Support for root-level `.aiignore` rule files adhering to glob specifications, guaranteeing designated directories or sensitive credential files are never accessible to read tools.

#### Prompt Injection and Indirect Threat Defense
- **Indirect Jailbreak Protection**: Unchecked code ingestion from external open-source repositories can contain malicious instructions embedded within comments or documentation files.
- **Structured Boundary Framing**: Wrap all external file contents in strict XML/Markdown boundary encapsulations with prompt directives that instruct the model to treat external code as data rather than instructions.
- **Tool Argument Sanitization**: Enforce schema validation and AST verification on generated shell arguments prior to handing execution over to system subprocesses.

#### Blast-Radius Mitigation and Process Sandboxing
- **Containerized Process Jailing**: Migrate arbitrary `bash` commands into ephemeral Linux container namespaces (`unshare`, `cgroups v2`, `chroot`) or lightweight virtualization environments (e.g., Docker, Podman, or Apple `sandbox-exec` profiles on macOS).
- **Interactive Human-In-The-Loop (HITL) Authorizations**: Require explicit terminal approval whenever the agent attempts to run irreversible system actions (e.g., destructive file removals `rm -rf`, Git force pushes, package publishing, or unauthorized network calls).
- **Cryptographic Audit Logging**: Generate an append-only, tamper-evident audit log of all generated prompts, tool invocations, shell executions, and diff outputs, secured with local HMAC signatures for enterprise governance.

---

### 2. End-to-End Cryptographic Storage and Credential Enclaves

#### Zero-Knowledge Conversation State Encryption
- Currently, conversation histories are persisted as JSON objects in PostgreSQL (`Session.messages`).
- **Client-Side Envelope Encryption**: Transition to client-side authenticated encryption using **AES-256-GCM** or **ChaCha20-Poly1305**.
- **Key Derivation via Argon2id**: Session encryption keys are derived on the client from a user-supplied master passphrase using memory-hard key derivation (Argon2id). The server stores only the encrypted ciphertext and nonce. Database breaches yield zero plaintext access to proprietary codebase logic or architectural discussions.

#### OS Native Keyring Enclave Integration
- Deprecate plaintext token caching in favor of operating system cryptographic credential vaults:
  - **macOS**: Keychain Services API via native bindings
  - **Linux**: Secret Service API / `libsecret` over D-Bus
  - **Windows**: Windows Credential Manager DPAPI

---

### 3. Advanced Code Intelligence and Extensibility

- **Embedded Vector Search Engine**: Local semantic codebase indexing using embedded vector stores (e.g., SQLite-VSS or LanceDB). Code chunk embeddings generated locally using compact embedding models to eliminate cloud-dependent vector synchronization.
- **Language Server Protocol (LSP) Bridge**: Direct RPC bridge into language servers (`typescript-language-server`, `gopls`, `pyright`, `rust-analyzer`). Equips the AI agent with compiler-grade diagnostic trees, exact go-to-definition references, and type-safe refactoring verification before committing diffs.
- **Model Context Protocol (MCP) Client**: Full implementation of Anthropic's Model Context Protocol, enabling engineers to connect external tool providers, enterprise SQL databases, issue trackers (Jira, Linear), and GitHub pull request automation into the YourCode agentic loop.
- **Autonomous Multi-Agent Coordination**: Hierarchical agent orchestration: a primary *Architect Agent* breaks user requests into validated technical specifications and delegates sub-tasks to concurrent *Implementation Agents*, while a dedicated *Verification Agent* compiles code and executes test suites to ensure zero regressions.

---

## Contributing

1. Fork the repository.
2. Create a targeted feature branch (`git checkout -b feature/targeted-enhancement`).
3. Commit deterministic, atomic changes (`git commit -m 'feat: implement targeted enhancement'`).
4. Push the branch upstream (`git push origin feature/targeted-enhancement`).
5. Submit a pull request detailing the technical implementation, architectural impact, and verification steps.

---

## License

Distributed under the [MIT License](LICENSE).
