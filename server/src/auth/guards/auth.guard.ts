import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../../role/role.enum';
import { ROLES_KEY } from '../../role/roles.decorator';
import { RoleGuard } from '../../role/role.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RoleGuard),
  );
}
