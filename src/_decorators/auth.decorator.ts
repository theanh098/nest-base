import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '_guards/roles.guard';
import { JwtAuthGuard } from '_guards/jwtAuth.guard';
import { Roles } from 'types/role.type';

export function Auth(role = Roles.User) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
}
