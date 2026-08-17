from pathlib import Path
import re, sys
root=Path(__file__).resolve().parents[2]
required=[
'apps/web/src/app/login/page.tsx','apps/web/src/app/(app)/dashboard/page.tsx','apps/web/src/app/(app)/clientes/page.tsx','apps/web/src/app/(app)/propostas/page.tsx','apps/web/src/app/(app)/contratos/page.tsx','apps/web/src/app/(app)/tarefas/page.tsx','apps/web/src/app/(app)/cobrancas/page.tsx','apps/web/src/app/(app)/auditoria/page.tsx','apps/web/src/app/(app)/usuarios/page.tsx','apps/web/src/app/(app)/configuracoes/page.tsx',
'apps/api/src/modules/auth/auth.controller.ts','apps/api/src/modules/customers/customers.controller.ts','apps/api/src/modules/proposals/proposals.controller.ts','apps/api/src/modules/contracts/contracts.controller.ts','apps/api/src/modules/tasks/tasks.controller.ts','apps/api/src/modules/invoices/invoices.controller.ts','apps/api/src/modules/ai/ai.controller.ts','apps/api/src/modules/audit/audit.controller.ts','apps/api/prisma/schema.prisma','docker-compose.yml']
errors=[]
for p in required:
    if not (root/p).is_file(): errors.append(f'missing: {p}')
for p in root.rglob('*'):
    if not p.is_file() or any(x in p.parts for x in ['.git','node_modules']): continue
    if p.suffix.lower() in {'.ts','.tsx','.js','.mjs','.md','.prisma','.yml','.yaml','.json','.bicep','.css'}:
        text=p.read_text(encoding='utf-8',errors='ignore')
        if re.search(r'\b(TODO|FIXME|implement later|para preencher depois)\b',text,re.I): errors.append(f'placeholder marker: {p.relative_to(root)}')
checks={
'proposal state machine':['RASCUNHO','ENVIADA','ACEITA','CONVERTIDA'],
'roles':['ADMIN','GESTOR','OPERADOR','AUDITOR'],
'webhook idempotency':['ProcessedWebhook','WEBHOOK_DUPLICATE_IGNORED'],
'ai fallback':['AI_FALLBACK_USED','deterministic-fallback'],
'tenants':['tenantId','t1','t2']}
corpus='\n'.join(p.read_text(encoding='utf-8',errors='ignore') for p in root.rglob('*') if p.is_file() and p.stat().st_size<500_000)
for label,terms in checks.items():
    for term in terms:
        if term not in corpus: errors.append(f'{label}: missing term {term}')
# local relative imports
for p in list((root/'apps').rglob('*.ts'))+list((root/'apps').rglob('*.tsx')):
    text=p.read_text(encoding='utf-8')
    for spec in re.findall(r"from ['\"](\.[^'\"]+)['\"]",text):
        base=(p.parent/spec)
        candidates=[Path(str(base)+'.ts'),Path(str(base)+'.tsx'),base/'index.ts',base/'index.tsx']
        if not any(c.exists() for c in candidates): errors.append(f'unresolved local import: {p.relative_to(root)} -> {spec}')
if errors:
    print('STATIC_VALIDATION: FAIL')
    print('\n'.join('- '+e for e in errors)); sys.exit(1)
print('STATIC_VALIDATION: PASS')
print(f'files={sum(1 for p in root.rglob("*") if p.is_file())}')
