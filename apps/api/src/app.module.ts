import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './common/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { AuditModule } from './modules/audit/audit.module';
import { AiModule } from './modules/ai/ai.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DemoModule } from './modules/demo/demo.module';
@Module({imports:[JwtModule.register({global:true,secret:process.env.JWT_SECRET??'nexusops-local-development-secret',signOptions:{expiresIn:'8h'}}),AuthModule,CustomersModule,ProposalsModule,ContractsModule,TasksModule,InvoicesModule,AuditModule,AiModule,UsersModule,DashboardModule,DemoModule],providers:[PrismaService],exports:[PrismaService]})
export class AppModule{}
