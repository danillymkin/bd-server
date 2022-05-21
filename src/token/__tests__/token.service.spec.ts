import {
  TOKEN_SERVICE,
  TokenService,
} from '../interfaces/token-service.interface';
import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TokenServiceImpl } from '../token.service';
import { TOKEN_REPOSITORY_TOKEN } from './__mocks__/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { mockUser } from '../../user/__tests__/__mocks__/user.mock';
import { mockTokenString } from './__mocks__/token.mock';
import { mockTokenPayload } from './__mocks__/token-payload.mock';
import anything = jasmine.anything;
import { UnauthorizedException } from '@nestjs/common';

describe('TokenService', () => {
  let service: TokenService;
  let configService: ConfigService;
  let jwtService: JwtService;
  let repository: Repository<Token>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, JwtModule.register({})],
      providers: [
        {
          useClass: TokenServiceImpl,
          provide: TOKEN_SERVICE,
        },
        {
          useValue: {
            save: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
          },
          provide: TOKEN_REPOSITORY_TOKEN,
        },
      ],
    }).compile();

    service = module.get<TokenService>(TOKEN_SERVICE);
    repository = module.get<Repository<Token>>(TOKEN_REPOSITORY_TOKEN);
    configService = module.get<ConfigService>(ConfigService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generate', () => {
    it('should call jwtService.sign with correct params', async () => {
      jest
        .spyOn(jwtService, 'sign')
        .mockImplementationOnce(() => mockTokenString);
      jest.spyOn(configService, 'get').mockImplementationOnce(() => '30s');

      await service.generate(mockUser);

      expect(jwtService.sign).toHaveBeenCalledWith(
        mockTokenPayload,
        anything(),
      );
    });
  });

  describe('save', () => {
    it('should call tokenRepository.save', async () => {
      await service.save(mockUser.id, mockTokenString);

      expect(repository.save).toBeCalledTimes(1);
    });

    it('should call tokenRepository.create if token is not found', async () => {
      jest.spyOn(repository, 'findOne').mockImplementationOnce(() => undefined);
      await service.save(mockUser.id, mockTokenString);

      expect(repository.create).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should call tokenRepository.delete with correct params', async () => {
      await service.remove(mockTokenString);

      expect(repository.delete).toHaveBeenCalledWith({
        refreshToken: mockTokenString,
      });
    });
  });

  describe('findOne', () => {
    it('should call tokenRepository.delete with correct params', async () => {
      await service.findOne(mockTokenString);

      expect(repository.findOne).toHaveBeenCalledWith({
        refreshToken: mockTokenString,
      });
    });
  });

  describe('createPayload', () => {
    it('should return correct payload', async () => {
      const payload = await service.createPayload(mockUser);

      expect(payload).toEqual({
        id: mockUser.id,
        email: mockUser.email,
      });
    });
  });

  describe('validate', () => {
    it('should call jwtService.verify with correct params', () => {
      jest
        .spyOn(jwtService, 'verify')
        .mockImplementationOnce(() => mockTokenPayload);

      service.validate(mockTokenString);

      expect(jwtService.verify).toHaveBeenCalledWith(
        mockTokenString,
        anything(),
      );
    });

    it('should return payload', () => {
      jest
        .spyOn(jwtService, 'verify')
        .mockImplementationOnce(() => mockTokenPayload);

      service.validate(mockTokenString);

      expect(jwtService.verify).toReturnWith(mockTokenPayload);
    });

    it('should throw UnauthorizedException if token is invalid', () => {
      expect(() => service.validate(mockTokenString)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
