import { User } from '../../entities/user.entity';
import { RoleName } from '../../../role/enums/role-name.enum';
import { now } from './constants';

export const mockUser: User = {
  id: 1,
  email: 'user@mail.ru',
  firstName: 'user',
  lastName: 'user',
  patronymic: '',
  password: 'hash123',
  activationLink: '7dnf83nfd8',
  roles: [
    {
      id: 1,
      name: RoleName.USER,
    },
  ],
  account: '',
  address: '',
  fax: '',
  isActivated: false,
  phone: '',
  createdAt: now,
  updatedAt: now,
};
