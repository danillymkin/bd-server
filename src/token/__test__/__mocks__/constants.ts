import { getRepositoryToken } from '@nestjs/typeorm';
import { Token } from '../../entities/token.entity';

export const TOKEN_REPOSITORY_TOKEN = getRepositoryToken(Token);
