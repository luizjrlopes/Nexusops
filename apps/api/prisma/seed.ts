import { PrismaClient, Role, ProposalStatus, Priority, TaskStatus } from '@prisma/client';
const db = new PrismaClient();
async function main() {
  await db.processedWebhook.deleteMany(); await db.auditEvent.deleteMany(); await db.invoice.deleteMany();
  await db.task.deleteMany(); await db.contract.deleteMany(); await db.proposal.deleteMany(); await db.customer.deleteMany(); await db.user.deleteMany(); await db.tenant.deleteMany();
  await db.tenant.createMany({data:[{id:'t1',name:'Nexus Tecnologia'},{id:'t2',name:'Acme Serviços'}]});
  await db.user.createMany({data:[
    {id:'u1',tenantId:'t1',name:'Ana Martins',email:'ana@nexus.local',role:Role.ADMIN},
    {id:'u2',tenantId:'t1',name:'Bruno Costa',email:'bruno@nexus.local',role:Role.GESTOR},
    {id:'u3',tenantId:'t1',name:'Carla Souza',email:'carla@nexus.local',role:Role.OPERADOR},
    {id:'u4',tenantId:'t1',name:'Diego Lima',email:'diego@nexus.local',role:Role.AUDITOR},
    {id:'u5',tenantId:'t2',name:'Eva Ramos',email:'eva@acme.local',role:Role.ADMIN},
    {id:'u6',tenantId:'t2',name:'Felipe Nunes',email:'felipe@acme.local',role:Role.GESTOR}]});
  await db.customer.createMany({data:[
    {id:'c1',tenantId:'t1',name:'Orbe Design',email:'contato@orbe.local',status:'ATIVO'},
    {id:'c2',tenantId:'t1',name:'Delta Works',email:'financeiro@delta.local',status:'ATIVO'},
    {id:'c3',tenantId:'t2',name:'Helix Comércio',email:'oi@helix.local',status:'ATIVO'}]});
  await db.proposal.createMany({data:[
    {id:'p1',tenantId:'t1',customerId:'c1',title:'Implantação CRM',value:18000,status:ProposalStatus.ENVIADA,missing:['prazo de entrega']},
    {id:'p2',tenantId:'t1',customerId:'c2',title:'Portal de atendimento',value:9500,status:ProposalStatus.RASCUNHO,missing:['condição de pagamento','escopo final']},
    {id:'p3',tenantId:'t2',customerId:'c3',title:'Automação comercial',value:12200,status:ProposalStatus.ACEITA,missing:[]}]});
  await db.task.create({data:{id:'tk1',tenantId:'t1',title:'Revisar proposta Orbe',owner:'Carla Souza',priority:Priority.ALTA,due:new Date('2026-08-12T12:00:00Z'),status:TaskStatus.EM_ANDAMENTO}});
}
main().finally(()=>db.$disconnect());
