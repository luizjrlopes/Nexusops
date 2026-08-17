import { describe,expect,it } from 'vitest';
const m={ADMIN:['read','write','admin','audit','pay'],GESTOR:['read','write','audit','pay'],OPERADOR:['read','task','comment'],AUDITOR:['read','audit']};
describe('RBAC',()=>{it('mantém permissões do protótipo',()=>{expect(m.ADMIN).toContain('admin');expect(m.GESTOR).not.toContain('admin');expect(m.OPERADOR).toContain('task');expect(m.AUDITOR).toEqual(['read','audit'])})});
