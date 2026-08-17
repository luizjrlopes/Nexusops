# NexusOps

NexusOps é um SaaS B2B multitenant de portfólio construído a partir do protótipo navegável original. O fluxo demonstrável local preserva: login por usuários de demonstração e papéis, dois tenants isolados, clientes, propostas e sua máquina de estados, geração de contratos, tarefas, cobranças com webhook idempotente, IA mockada com fallback determinístico e auditoria.

## Executar localmente

```bash
cp .env.example .env
docker compose up --build
```

Acesse `http://localhost:3000`. API: `http://localhost:3001`. Os dados de demonstração são seedados automaticamente no PostgreSQL.

## Credenciais de demonstração

A tela de login apresenta os mesmos usuários/papéis do protótipo; a autenticação local usa `POST /auth/demo-login` e emite JWT para a sessão. Não há dependência de provedor externo.

## Serviços simulados

- Pagamentos: `mocks/payment-gateway`, porta 4010.
- IA: `mocks/ai-provider`, porta 4020, com modo de falha controlável.
- Azure: apenas Infrastructure as Code e documentação demonstrativa; não é necessário provisionar Azure para a demo local.

## Validação leve

```bash
python scripts/validate/static_validate.py
```

A validação checa estrutura, ausência de placeholders, presença das rotas/funcionalidades do protótipo e referências locais essenciais sem instalar `node_modules`.
