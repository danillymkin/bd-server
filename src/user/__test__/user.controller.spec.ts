import { UserController } from '../user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { mockUser, USER_REPOSITORY_TOKEN } from './__mocks__';
import { UserServiceImpl } from '../user.service';
import { USER_SERVICE } from '../interfaces/user-service.interface';

describe('UsersController', () => {
  let controller: UserController;
  let service: UserServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [UserController],
      providers: [
        {
          provide: USER_SERVICE,
          useValue: {
            getById: jest.fn(() => mockUser),
            activate: jest.fn(),
          },
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserServiceImpl>('USERS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('usersService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should call usersService.getById with correct params', async () => {
      await controller.getById({ id: mockUser.id });

      expect(service.getById).toHaveBeenCalledWith(mockUser.id);
    });

    it('should return an user', async () => {
      const response = await controller.getById({ id: mockUser.id });

      expect(response).toEqual(mockUser);
    });
  });

  describe('activate', () => {
    const response = {} as unknown as any;
    const link = 'feel4f8d9f32fd';

    it('should call usersService.activate with correct params', async () => {
      await controller.activate(link, response);

      expect(service.activate).toHaveBeenCalledWith(link, response);
    });
  });
});
