import { Role } from '../entities/role.entity';
import { RoleName } from '../enums/role-name.enum';

export const ROLE_SERVICE = 'ROLE_SERVICE';

export interface RoleService {
  getById(id: number): Promise<Role>;

  getByName(name: RoleName): Promise<Role>;
}
