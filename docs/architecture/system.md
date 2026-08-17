# Arquitetura do NexusOps

O produto é um monorepo local-first. `apps/web` preserva a experiência visual do protótipo em Next.js/React. `apps/api` centraliza regras e isolamento multitenant em NestJS. PostgreSQL substitui `localStorage`. Integrações de pagamento e IA são portas locais simuladas. A infraestrutura Azure é demonstrativa e não participa do caminho crítico de execução local.

## Limites funcionais derivados do protótipo

1. Identity/demo authentication: usuários seedados, papel e tenant.
2. Customers: leitura e criação por tenant.
3. Proposals: RASCUNHO → ENVIADA → ACEITA → CONVERTIDA.
4. Contracts: materialização de uma proposta aceita.
5. Tasks: criação geral ou vinculada a contrato.
6. Billing: emissão e resultado aprovado/recusado com idempotência de webhook.
7. AI assistance: resumo, campos ausentes, classificação e fallback determinístico.
8. Audit: timeline por tenant.
9. Users/settings: visibilidade por papel e ferramentas de demonstração.
