# NexusOps

[English](README.md) | [Português](README.pt-BR.md)

**NexusOps** is a multi-tenant B2B SaaS platform that centralizes commercial and administrative operations into a single flow: customers, proposals, contracts, tasks, billing, auditing and AI-assisted capabilities.

The project is structured as a modern full stack application with clear separation between interface, API, persistence, integrations and infrastructure. The local environment is self-contained and can run without paid external dependencies.

## Overview

NexusOps connects stages that are usually spread across different tools and turns them into a continuous operational workflow.

Core capabilities include:

- customer management;
- proposal creation and tracking;
- proposal state management and conversion into contracts;
- contract management;
- task organization and tracking;
- billing generation and tracking;
- idempotent webhook processing;
- role-based access control;
- tenant-level data isolation;
- system audit trail;
- AI-service integration with deterministic fallback;
- observability and infrastructure as code.

## Architecture

The repository uses a **monorepo organized with pnpm workspaces**.

```text
NexusOps/
├── apps/
│   ├── web/              # Web application
│   └── api/              # API and business rules
├── packages/             # Shared code
├── mocks/                # Local services for external integrations
├── infrastructure/       # Infrastructure as Code
├── observability/        # Observability configuration
├── docs/                 # Technical and domain documentation
├── scripts/              # Automation and validation
└── tests/                # Integration and E2E tests
```

### Main flow

```text
Web
  │
  ▼
NestJS API
  │
  ├── Authentication and authorization
  ├── Business rules
  ├── Auditing
  ├── Integrations
  └── AI
  │
  ▼
Prisma ORM
  │
  ▼
PostgreSQL
```

## Stack

### Frontend
- Next.js
- React
- TypeScript

### Backend
- Node.js
- NestJS
- TypeScript
- Prisma ORM
- HTTP API
- JWT

### Data
- PostgreSQL
- multi-tenant data modeling
- automated local seed

### Quality
- Vitest
- Playwright
- ESLint
- static repository validation
- GitHub Actions

### Infrastructure and operations
- Docker
- Docker Compose
- Azure Bicep
- OpenTelemetry
- observability configuration

## Multi-tenancy and security

The domain is modeled to support multiple organizations in the same application. Core business resources are associated with a `tenantId`, keeping customers, proposals, contracts, tasks, billing records, users and audit events scoped to the correct organization.

The application also implements role-based access control with profiles such as **ADMIN**, **GESTOR**, **OPERADOR** and **AUDITOR**. Permissions are enforced by the API according to the active session and requested operation.

## Domain flow

```text
Customer
   ↓
Proposal
   ↓
Contract
   ↓
Tasks
   ↓
Billing
   ↓
Metrics and Audit
```

This structure makes it possible to follow the operational lifecycle from opportunity intake through execution and financial control associated with the contract.

## Artificial Intelligence

NexusOps includes an AI-integration layer decoupled from the application's core business rules. In the local environment, a controllable provider makes it possible to validate both success and failure scenarios without relying on external services. Deterministic fallback keeps essential functions available when the AI provider is unavailable.

## Integrations and idempotency

The project includes a payment integration that can run locally. Webhook processing keeps track of already-processed events so the same notification is not applied more than once.

## Auditing

Relevant actions can generate audit events containing information such as tenant, user, role, action, affected entity, operation details and timestamp.

## Running locally

### Prerequisites
- Docker
- Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

- Web application: `http://localhost:3000`
- API: `http://localhost:3001`

The local environment starts PostgreSQL and the services required to run the complete application flow.

## Development without Docker

The project uses **pnpm 10**.

```bash
corepack enable
pnpm install
pnpm dev
```

Available commands:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm test:e2e
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm validate:static
```

## Validation

```bash
python scripts/validate/static_validate.py
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

## CI

GitHub Actions runs automated quality checks on pushes and pull requests, including dependency installation, linting, tests and production builds.

## Engineering goals

- **multi-tenant isolation** as a domain requirement;
- **business rules centralized in the API**;
- **integrations decoupled** from essential functionality;
- **idempotency** for sensitive external operations;
- **auditing** as an architectural concern;
- **reproducible local environment**;
- **versioned infrastructure as code**;
- **testability** across the main layers;
- **observability** considered from the architecture stage;
- **incremental evolution** without unnecessary provider lock-in.

---

**NexusOps** — commercial and administrative operations connected in one platform.
