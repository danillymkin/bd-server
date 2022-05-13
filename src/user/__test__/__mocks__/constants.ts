import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

export const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

export const now = new Date();
