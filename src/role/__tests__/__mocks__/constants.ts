import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';

export const ROLE_REPOSITORY_TOKEN = getRepositoryToken(Role);
