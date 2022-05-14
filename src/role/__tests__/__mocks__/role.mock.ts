import { Role } from '../../entities/role.entity';
import { RoleName } from '../../enums/role-name.enum';

export const mockRole: Role = {
  id: 1,
  name: RoleName.USER,
};
