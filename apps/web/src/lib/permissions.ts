import type { Role } from './types';
const map:Record<Role,string[]>={ADMIN:['read','write','admin','audit','pay'],GESTOR:['read','write','audit','pay'],OPERADOR:['read','task','comment'],AUDITOR:['read','audit']};
export const can=(role:Role,permission:string)=>map[role]?.includes(permission)??false;
