# NexusOps

[English](README.md) | [Português](README.pt-BR.md)

**NexusOps** é uma plataforma SaaS B2B multitenant para centralizar operações comerciais e administrativas em um único fluxo: clientes, propostas, contratos, tarefas, cobranças, auditoria e recursos assistidos por IA.

O projeto foi estruturado como uma aplicação full stack moderna, com separação clara entre interface, API, persistência, integrações e infraestrutura. O ambiente local é autocontido e pode ser executado sem dependências externas pagas.

## Visão geral

O NexusOps conecta etapas que normalmente ficam distribuídas entre diferentes ferramentas e transforma essas informações em um fluxo operacional contínuo.

Principais capacidades:

- gestão de clientes;
- criação e acompanhamento de propostas;
- controle de estados e conversão de propostas em contratos;
- gestão de contratos;
- organização e acompanhamento de tarefas;
- geração e acompanhamento de cobranças;
- processamento idempotente de webhooks;
- controle de acesso baseado em papéis;
- isolamento de dados por tenant;
- trilha de auditoria das ações do sistema;
- integração com serviços de IA com fallback determinístico;
- observabilidade e infraestrutura como código.

## Arquitetura

O repositório utiliza uma organização **monorepo com pnpm workspaces**.

```text
NexusOps/
├── apps/
│   ├── web/              # Aplicação web
│   └── api/              # API e regras de negócio
├── packages/             # Código compartilhado
├── mocks/                # Serviços locais para integrações externas
├── infrastructure/       # Infrastructure as Code
├── observability/        # Configuração de observabilidade
├── docs/                 # Documentação técnica e de domínio
├── scripts/              # Automação e validações
└── tests/                # Testes de integração e E2E
```

### Fluxo principal

```text
Web
  │
  ▼
API NestJS
  │
  ├── Autenticação e autorização
  ├── Regras de negócio
  ├── Auditoria
  ├── Integrações
  └── IA
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
- API HTTP
- JWT

### Dados
- PostgreSQL
- modelagem multitenant
- seed automatizado para ambiente local

### Qualidade
- Vitest
- Playwright
- ESLint
- validação estática do repositório
- GitHub Actions

### Infraestrutura e operação
- Docker
- Docker Compose
- Azure Bicep
- OpenTelemetry
- configuração de observabilidade

## Multitenancy e segurança

O domínio foi modelado para operar com múltiplas organizações na mesma aplicação. Os principais recursos de negócio são associados a um `tenantId`, permitindo que clientes, propostas, contratos, tarefas, cobranças, usuários e eventos de auditoria permaneçam vinculados à organização correta.

A aplicação também implementa controle de acesso por papéis, com perfis como **ADMIN**, **GESTOR**, **OPERADOR** e **AUDITOR**. As permissões são verificadas na API de acordo com o contexto da sessão e a operação solicitada.

## Domínio

```text
Cliente
   ↓
Proposta
   ↓
Contrato
   ↓
Tarefas
   ↓
Cobranças
   ↓
Indicadores e Auditoria
```

Essa estrutura permite acompanhar o ciclo operacional desde a entrada de uma oportunidade até a execução e o controle financeiro associado ao contrato.

## Inteligência Artificial

O NexusOps possui uma camada de integração com IA desacoplada da regra principal da aplicação. No ambiente local, um provider controlável permite validar cenários de sucesso e falha sem depender de serviços externos. A aplicação mantém fallback determinístico para que indisponibilidade do provider não interrompa funções essenciais.

## Integrações e idempotência

O projeto inclui uma integração de pagamentos executável localmente. O processamento de webhooks utiliza controle de eventos já processados, evitando que uma mesma notificação seja aplicada mais de uma vez.

## Auditoria

Ações relevantes do sistema podem gerar eventos de auditoria contendo tenant, usuário, papel, ação, entidade afetada, detalhes da operação e data/hora.

## Executando localmente

### Pré-requisitos
- Docker
- Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

- Aplicação web: `http://localhost:3000`
- API: `http://localhost:3001`

O ambiente local inicializa PostgreSQL e os serviços necessários para executar o fluxo completo.

## Desenvolvimento sem Docker

O projeto utiliza **pnpm 10**.

```bash
corepack enable
pnpm install
pnpm dev
```

Comandos disponíveis:

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

## Validação

```bash
python scripts/validate/static_validate.py
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

## CI

O GitHub Actions executa verificações automáticas de qualidade em pushes e pull requests, incluindo instalação de dependências, lint, testes e build.

## Objetivos de engenharia

- **isolamento multitenant** como requisito de domínio;
- **regras de negócio centralizadas na API**;
- **integrações desacopladas** das funções essenciais;
- **idempotência** em operações externas sensíveis;
- **auditoria** como parte da arquitetura;
- **ambiente local reproduzível**;
- **infraestrutura versionada como código**;
- **testabilidade** das principais camadas;
- **observabilidade** preparada desde a arquitetura;
- **evolução incremental** sem acoplamento a fornecedores externos.

---

**NexusOps** — operações comerciais e administrativas conectadas em uma única plataforma.
