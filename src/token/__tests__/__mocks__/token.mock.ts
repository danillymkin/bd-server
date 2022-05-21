import { Token } from '../../entities/token.entity';
import { mockUser } from '../../../user/__tests__/__mocks__/user.mock';

export const mockTokenString = 'fdfsfd.fsdgr3.3ffdsfd';

export const mockToken: Token = {
  id: 1,
  refreshToken: mockTokenString,
  user: mockUser,
  userId: mockUser.id,
};
