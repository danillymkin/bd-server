import { Test, TestingModule } from '@nestjs/testing';
import { RoleServiceImpl } from '../role.service';
import {
  ROLE_SERVICE,
  RoleService,
} from '../interfaces/role-service.interface';
import { ROLE_REPOSITORY_TOKEN } from './__mocks__/constants';
import { mockRole } from './__mocks__/role.mock';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleName } from '../enums/role-name.enum';

describe('RoleService', () => {
  let service: RoleService;
  let repository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          useClass: RoleServiceImpl,
          provide: ROLE_SERVICE,
        },
        {
          useValue: {
            findOne: jest.fn(() => mockRole),
          },
          provide: ROLE_REPOSITORY_TOKEN,
        },
      ],
    }).compile();

    service = module.get<RoleService>(ROLE_SERVICE);
    repository = module.get<Repository<Role>>(ROLE_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should call roleRepository.findOne with correct params', async () => {
      await service.getById(mockRole.id);

      expect(repository.findOne).toHaveBeenCalledWith(mockRole.id);
    });

    it('should return a role', async () => {
      await service.getById(mockRole.id);

      expect(repository.findOne).toHaveReturnedWith(mockRole);
    });
  });

  describe('getByName', () => {
    it('should call roleRepository.findOne with correct params', async () => {
      await service.getByName(<RoleName>mockRole.name);

      expect(repository.findOne).toHaveBeenCalledWith({ name: mockRole.name });
    });

    it('should return a role', async () => {
      await service.getByName(<RoleName>mockRole.name);

      expect(repository.findOne).toHaveReturnedWith(mockRole);
    });
  });
});
