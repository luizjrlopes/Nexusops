import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata, createParamDecorator } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Role } from '@prisma/client';
export type Session={userId:string;tenantId:string;name:string;role:Role};
export const Public=()=>SetMetadata('public',true);
export const Permissions=(...items:string[])=>SetMetadata('permissions',items);
export const CurrentSession=createParamDecorator((_d:unknown,ctx:ExecutionContext)=>ctx.switchToHttp().getRequest().session as Session);
const map:Record<Role,string[]>={ADMIN:['read','write','admin','audit','pay'],GESTOR:['read','write','audit','pay'],OPERADOR:['read','task','comment'],AUDITOR:['read','audit']};
@Injectable() export class SessionGuard implements CanActivate{constructor(private jwt:JwtService){} canActivate(ctx:ExecutionContext){const req=ctx.switchToHttp().getRequest(); const auth=String(req.headers.authorization??''); if(!auth.startsWith('Bearer ')) throw new ForbiddenException('Sessão ausente'); try{req.session=this.jwt.verify(auth.slice(7)); return true}catch{throw new ForbiddenException('Sessão inválida')}}}
export function requirePermission(session:Session,permission:string){if(!map[session.role]?.includes(permission)) throw new ForbiddenException('Permissão insuficiente')}
