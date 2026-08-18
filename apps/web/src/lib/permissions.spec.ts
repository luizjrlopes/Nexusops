import { describe, expect, it } from 'vitest';
import { can } from './permissions';

describe('permissions', () => {
  it('permite administração apenas para ADMIN', () => {
    expect(can('ADMIN', 'admin')).toBe(true);
    expect(can('GESTOR', 'admin')).toBe(false);
    expect(can('OPERADOR', 'admin')).toBe(false);
    expect(can('AUDITOR', 'admin')).toBe(false);
  });

  it('mantém acesso de auditoria para os papéis autorizados', () => {
    expect(can('ADMIN', 'audit')).toBe(true);
    expect(can('GESTOR', 'audit')).toBe(true);
    expect(can('AUDITOR', 'audit')).toBe(true);
    expect(can('OPERADOR', 'audit')).toBe(false);
  });
});
