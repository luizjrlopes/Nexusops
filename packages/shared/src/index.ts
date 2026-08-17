export type Role = 'ADMIN' | 'GESTOR' | 'OPERADOR' | 'AUDITOR';
export type Permission = 'read' | 'write' | 'admin' | 'audit' | 'pay' | 'task' | 'comment';
export type ProposalStatus = 'RASCUNHO' | 'ENVIADA' | 'ACEITA' | 'CONVERTIDA';
export type InvoiceStatus = 'ABERTO' | 'PAGO' | 'RECUSADO';
export type TaskStatus = 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA';
export type Priority = 'BAIXA' | 'NORMAL' | 'ALTA';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: ['read','write','admin','audit','pay'],
  GESTOR: ['read','write','audit','pay'],
  OPERADOR: ['read','task','comment'],
  AUDITOR: ['read','audit'],
};

export const PROPOSAL_TRANSITIONS: Record<ProposalStatus, ProposalStatus[]> = {
  RASCUNHO: ['ENVIADA'], ENVIADA: ['ACEITA'], ACEITA: ['CONVERTIDA'], CONVERTIDA: []
};
