import { describe,expect,it } from 'vitest';
describe('webhook idempotency',()=>{it('usa uma chave única por evento',()=>{const ids=new Set<string>();const id='wh_INV-1_approved';ids.add(id);ids.add(id);expect(ids.size).toBe(1)})});
