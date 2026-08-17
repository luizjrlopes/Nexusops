# RBAC

| Papel | Permissões |
|---|---|
| ADMIN | read, write, admin, audit, pay |
| GESTOR | read, write, audit, pay |
| OPERADOR | read, task, comment |
| AUDITOR | read, audit |

A API aplica o tenant vindo do JWT em todas as queries de domínio. IDs fornecidos pelo cliente nunca autorizam acesso cruzado: a busca sempre combina `id + tenantId` quando o recurso é tenant-scoped.
