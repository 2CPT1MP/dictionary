import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('USER', context.switchToHttp().getRequest().user);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    if (!request.user || !request.user.roles) return false;

    const { user } = request;
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
