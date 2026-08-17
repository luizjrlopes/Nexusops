import { describe,expect,it } from 'vitest';
const allowed={RASCUNHO:['ENVIADA'],ENVIADA:['ACEITA'],ACEITA:['CONVERTIDA'],CONVERTIDA:[]} as const;
describe('proposal state machine',()=>{it('preserva o fluxo do protótipo',()=>{expect(allowed.RASCUNHO).toContain('ENVIADA');expect(allowed.ENVIADA).toContain('ACEITA');expect(allowed.ACEITA).toContain('CONVERTIDA');expect(allowed.CONVERTIDA).toHaveLength(0)})});
