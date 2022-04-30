import { User } from '../entities/user.entity';

export type UserAndToken = {
  user: Partial<User>;
  accessToken: string;
};
