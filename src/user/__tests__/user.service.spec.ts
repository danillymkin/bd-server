import { UserServiceImpl } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { mockUser } from './__mocks__/user.mock';
import {
  USER_SERVICE,
  UserService,
} from '../interfaces/user-service.interface';
import { mockRegisterUserDto } from './__mocks__/register-user-dto.mock';
import { USER_REPOSITORY_TOKEN } from './__mocks__/constants';
import { mockRole } from '../../role/__tests__/__mocks__/role.mock';
import { ROLE_SERVICE } from '../../role/interfaces/role-service.interface';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        {
          useClass: UserServiceImpl,
          provide: USER_SERVICE,
        },
        {
          useValue: {
            getByName: jest.fn(() => Promise.resolve(mockRole)),
          },
          provide: ROLE_SERVICE,
        },
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(() => mockUser),
            findOneOrFail: jest.fn(() => mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(USER_SERVICE);
    configService = module.get<ConfigService>(ConfigService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('usersRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('getById', () => {
    it('should call usersRepository.findOne with correct params', async () => {
      await service.getById(mockUser.id);

      expect(userRepository.findOne).toHaveBeenCalledWith(mockUser.id);
    });

    it('should return an user', async () => {
      await service.getById(mockUser.id);

      expect(userRepository.findOne).toHaveReturnedWith(mockUser);
    });
  });

  describe('getByEmail', () => {
    it('should call usersRepository.findOne with correct params', async () => {
      await service.getByEmail(mockUser.email);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        email: mockUser.email,
      });
    });

    it('should return an user', async () => {
      await service.getByEmail(mockUser.email);

      expect(userRepository.findOne).toHaveReturnedWith(mockUser);
    });
  });

  describe('create', () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve('hash123'));

    it('should encode password correctly', async () => {
      await service.create(mockRegisterUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('123', expect.anything());
    });

    it('should call usersRepository.create with correct params', async () => {
      await service.create(mockRegisterUserDto);

      expect(userRepository.create).toHaveBeenCalledWith({
        ...mockRegisterUserDto,
        roles: [mockRole],
        password: 'hash123',
      });
    });

    it('should call usersRepository.save return correct a new user', async () => {
      jest.spyOn(userRepository, 'create').mockReturnValueOnce(mockUser);

      await service.create(mockRegisterUserDto);

      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('validate', () => {
    it('should search user by email', async () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => Promise.resolve(true));

      await service.validate(
        mockRegisterUserDto.email,
        mockRegisterUserDto.password,
      );

      expect(userRepository.findOne).toHaveBeenCalledWith({
        email: mockUser.email,
      });
    });

    it('should compare passwords success if password equals', async () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => Promise.resolve(true));
      await service.validate(
        mockRegisterUserDto.email,
        mockRegisterUserDto.password,
      );

      expect(bcrypt.compare).toHaveBeenLastCalledWith(
        mockRegisterUserDto.password,
        mockUser.password,
      );
    });

    it('should return BadRequestException if user not found', async () => {
      jest.spyOn(service, 'getByEmail').mockImplementationOnce(() => undefined);

      await expect(
        service.validate(
          mockRegisterUserDto.email,
          mockRegisterUserDto.password,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return BadRequestException if password not equals', async () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => Promise.resolve(false));

      await expect(
        service.validate(
          mockRegisterUserDto.email,
          mockRegisterUserDto.password,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('activate', () => {
    const responseMock = {
      status: jest.fn(),
      redirect: jest.fn(),
    } as any;

    it('should search an user by activation link with correctly params', async () => {
      await service.activate(mockUser.activationLink, responseMock);

      expect(userRepository.findOneOrFail).toHaveBeenCalledWith({
        activationLink: mockUser.activationLink,
      });
    });

    it('should search an user by activation link successfully', async () => {
      await service.activate(mockUser.activationLink, responseMock);

      expect(userRepository.findOneOrFail).toReturnWith(mockUser);
    });

    it('should search an user by activation link failed', async () => {
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockImplementationOnce(() => Promise.reject(mockUser));

      await expect(
        service.activate(mockUser.activationLink, responseMock),
      ).rejects.toThrow(BadRequestException);
    });

    it('should usersRepository.save update isActivated property', async () => {
      await service.activate(mockUser.activationLink, responseMock);

      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        isActivated: true,
      });
    });

    it('should redirect to client', async () => {
      const CLIENT_URL = configService.get<string>('CLIENT_URL');
      await service.activate(mockUser.activationLink, responseMock);

      expect(responseMock.redirect).toHaveBeenCalledWith(CLIENT_URL);
    });
  });
});
