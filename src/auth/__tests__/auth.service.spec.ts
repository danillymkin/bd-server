import {
  AUTH_SERVICE,
  AuthService,
} from '../interfaces/auth-service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceImpl } from '../auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { GoogleStrategy } from '../strategies/google.strategy';
import {
  MAIL_SERVICE,
  MailService,
} from '../../mail/interfaces/mail-service.interface';
import {
  TOKEN_SERVICE,
  TokenService,
} from '../../token/interfaces/token-service.interface';
import {
  USER_SERVICE,
  UserService,
} from '../../user/interfaces/user-service.interface';
import { ROLE_SERVICE } from '../../role/interfaces/role-service.interface';
import { mockUser } from '../../user/__tests__/__mocks__/user.mock';
import {
  mockToken,
  mockTokenString,
} from '../../token/__tests__/__mocks__/token.mock';
import { ACTIVATE_URL, REFRESH_TOKEN_COOKIE_NAME } from '../utils/constants';
import { mockTokenPayload } from '../../token/__tests__/__mocks__/token-payload.mock';
import { mockRegisterUserDto } from '../../user/__tests__/__mocks__/register-user-dto.mock';
import { BadRequestException } from '@nestjs/common';
import { mockUserAndToken } from './__mocks__/user-and-token.mock';
import { Request, Response } from 'express';
import anything = jasmine.anything;

describe('AuthService', () => {
  let service: AuthService;
  let configService: ConfigService;
  let jwtService: JwtService;
  let userService: UserService;
  let mailService: MailService;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule, ConfigModule, JwtModule.register({})],
      providers: [
        {
          useClass: AuthServiceImpl,
          provide: AUTH_SERVICE,
        },
        {
          useValue: {
            sendActivationMail: jest.fn(),
          },
          provide: MAIL_SERVICE,
        },
        {
          useValue: {
            remove: jest.fn(),
            validate: jest.fn(() => mockTokenPayload),
            findOne: jest.fn(() => Promise.resolve(mockToken)),
            generate: jest.fn(() => mockTokenString),
            save: jest.fn(),
            createPayload: jest.fn(() => mockTokenPayload),
          },
          provide: TOKEN_SERVICE,
        },
        {
          useValue: {
            getSerializedUserById: jest.fn(() => Promise.resolve(mockUser)),
            getByEmail: jest.fn(() => Promise.resolve(mockUser)),
            create: jest.fn(() => Promise.resolve(mockUser)),
          },
          provide: USER_SERVICE,
        },
        {
          useValue: {
            getByName: jest.fn(),
          },
          provide: ROLE_SERVICE,
        },
        {
          useValue: {
            validate: jest.fn(),
          },
          provide: LocalStrategy,
        },
        {
          useValue: {
            validate: jest.fn(),
          },
          provide: JwtStrategy,
        },
        {
          useValue: {
            validate: jest.fn(),
          },
          provide: GoogleStrategy,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AUTH_SERVICE);
    configService = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(USER_SERVICE);
    mailService = module.get<MailService>(MAIL_SERVICE);
    tokenService = module.get<TokenService>(TOKEN_SERVICE);

    jest.spyOn(configService, 'get').mockImplementation(() => '30s');
    jest.spyOn(jwtService, 'sign').mockImplementation(() => mockTokenString);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const responseMock = {
    cookie: jest.fn(),
  } as any;

  describe('login', () => {
    it('should set refresh token in cookie', async () => {
      await service.login(mockUser, responseMock);

      expect(responseMock.cookie).toHaveBeenCalledWith(
        REFRESH_TOKEN_COOKIE_NAME,
        mockTokenString,
        {
          httpOnly: true,
          maxAge: anything(),
        },
      );
    });

    it('should generate an access token', async () => {
      await service.login(mockUser, responseMock);

      expect(jwtService.sign).toHaveReturnedWith(mockTokenString);
    });

    it('should return the user and an access token', async () => {
      const result = await service.login(mockUser, responseMock);

      expect(result).toEqual(mockUserAndToken);
    });
  });

  describe('register', () => {
    it('should successfully check that the user does not exist', async () => {
      jest
        .spyOn(userService, 'getByEmail')
        .mockImplementationOnce(() => undefined);

      const result = await service.register(mockRegisterUserDto, responseMock);

      expect(result).toEqual(mockUserAndToken);
    });

    it('should unsuccessfully check that the user does not exist', async () => {
      await expect(
        service.register(mockRegisterUserDto, responseMock),
      ).rejects.toThrow(BadRequestException);
    });

    it('should call userService.create with correct params', async () => {
      jest
        .spyOn(userService, 'getByEmail')
        .mockImplementationOnce(() => undefined);
      await service.register(mockRegisterUserDto, responseMock);

      expect(userService.create).toHaveBeenCalledWith({
        email: mockRegisterUserDto.email,
        firstName: mockRegisterUserDto.firstName,
        lastName: mockRegisterUserDto.lastName,
        password: mockRegisterUserDto.password,
        activationLink: anything(),
      });
    });

    it('should send an activation mail', async () => {
      jest
        .spyOn(userService, 'getByEmail')
        .mockImplementationOnce(() => undefined);
      jest.spyOn(configService, 'get').mockImplementationOnce(() => 'url');

      await service.register(mockRegisterUserDto, responseMock);

      const activationLink =
        'url' + ACTIVATE_URL + mockRegisterUserDto.activationLink;

      expect(mailService.sendActivationMail).toHaveBeenCalledWith(
        mockRegisterUserDto.email,
        activationLink,
      );
    });

    it('should login a user', async () => {
      jest
        .spyOn(userService, 'getByEmail')
        .mockImplementationOnce(() => undefined);
      const result = await service.register(mockRegisterUserDto, responseMock);

      expect(result).toEqual(mockUserAndToken);
    });
  });

  describe('refresh', () => {
    beforeEach(() => {
      jest
        .spyOn(service, 'login')
        .mockImplementation(() => Promise.resolve(mockUserAndToken));
      jest
        .spyOn(userService, 'getByEmail')
        .mockImplementationOnce(() => Promise.resolve(mockUser));
    });

    it('should get token payload', async () => {
      await service.refresh(mockTokenString, responseMock);

      expect(tokenService.validate).toHaveBeenCalledWith(mockTokenString);
    });

    it('should call login with correct params', async () => {
      await service.refresh(mockTokenString, responseMock);

      expect(service.login).toHaveBeenCalledWith(mockUser, responseMock);
    });
  });

  describe('logout', () => {
    const mockRequest = {
      logout: jest.fn(),
    } as any as Request;

    it('should call request.logout', async () => {
      await service.logout(mockTokenString, mockRequest);

      expect(mockRequest.logout).toHaveBeenCalled();
    });

    it('should call tokenService.remove with correct params', async () => {
      await service.logout(mockTokenString, mockRequest);

      expect(tokenService.remove).toHaveBeenCalledWith(mockTokenString);
    });
  });

  describe('googleLogin', () => {
    beforeEach(() => {
      jest
        .spyOn(service, 'login')
        .mockImplementation(() => Promise.resolve(mockUserAndToken));
      beforeEach(() => {
        jest
          .spyOn(service, 'register')
          .mockImplementation(() => Promise.resolve(mockUserAndToken));
        jest
          .spyOn(userService, 'getByEmail')
          .mockImplementationOnce(() => Promise.resolve(mockUser));
      });

      const mockRequest = {
        user: mockUser,
      } as any as Request;

      const mockResponse = {
        cookie: jest.fn(),
      } as any as Response;

      it('should successful check user in request', async () => {
        await expect(() =>
          service.googleLogin(mockRequest, mockResponse),
        ).not.toThrow(BadRequestException);
      });

      it('should call userService.getByEmail with correct params', async () => {
        await service.googleLogin(mockRequest, mockResponse);

        expect(userService.getByEmail).toHaveBeenCalledWith(
          mockRequest.user['email'],
        );
      });

      it('should call login if user is registered', async () => {
        await service.googleLogin(mockRequest, mockResponse);

        expect(service.login).toHaveBeenCalled();
      });

      it('should register user if it is not registered', async () => {
        await service.googleLogin(mockRequest, mockResponse);

        expect(service.register).toHaveBeenCalledWith(
          {
            email: mockRequest.user['email'],
            lastName: mockRequest.user['lastName'],
            firstName: mockRequest.user['firstName'],
            password: anything(),
            activationLink: '',
          },
          mockResponse,
        );
      });
    });
  });
});
