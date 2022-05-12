import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../utils/constants';
import { Role } from '../../users/entities/role.entity';
import { RoleName } from '../../role/enum/role-name.enum';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }
      const user: User = context.switchToHttp().getRequest().user;
      return user.roles.some((role: Role) =>
        requiredRoles.includes(<RoleName>role.name),
      );
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
