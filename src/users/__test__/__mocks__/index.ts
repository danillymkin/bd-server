import { RegisterUserDto } from '../../../auth/dto/register-user.dto';
import { User } from '../../entities/user.entity';
import { Role } from '../../../auth/enums/role.enum';
import { getRepositoryToken } from '@nestjs/typeorm';

export const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

export const mockRegisterUserDto: RegisterUserDto = {
  email: 'user@mail.ru',
  firstName: 'user',
  lastName: 'user',
  password: '123',
  activationLink: '7dnf83nfd8',
};

const now = new Date();

export const mockUser: User = {
  id: 1,
  email: 'user@mail.ru',
  firstName: 'user',
  lastName: 'user',
  patronymic: '',
  password: 'hash123',
  activationLink: '7dnf83nfd8',
  roles: [Role.USER],
  account: '',
  address: '',
  fax: '',
  isActivated: false,
  phone: '',
  createdAt: now,
  updatedAt: now,
};
