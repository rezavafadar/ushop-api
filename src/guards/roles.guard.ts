import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { RoleEnum } from '../enums/role.enum';
import { ROLE_METADATA } from '../constants';
import { IJwtTokenPayload } from '../interfaces/jwt-tokens.interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles: string[] = this.reflector.getAllAndOverride<
      RoleEnum[]
    >(ROLE_METADATA, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) return true;

    const user: IJwtTokenPayload = context.switchToHttp().getRequest().user;

    return requiredRoles.some((role) => user.role === role);
  }
}
