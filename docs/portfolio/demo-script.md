# Roteiro de demonstração

1. Entrar como Ana Martins (ADMIN, Nexus Tecnologia).
2. Confirmar KPIs do dashboard e isolamento do tenant.
3. Criar um cliente.
4. Criar proposta em RASCUNHO, enviar e aceitar.
5. Executar IA mock; opcionalmente reiniciar o mock com `AI_FORCE_FAILURE=true` para observar o fallback.
6. Gerar contrato a partir da proposta aceita.
7. Criar tarefa vinculada ao contrato.
8. Emitir cobrança, aprovar ou recusar, e reenviar o mesmo webhook para demonstrar idempotência.
9. Abrir Auditoria e verificar os eventos.
10. Sair e entrar no tenant Acme para demonstrar isolamento.
