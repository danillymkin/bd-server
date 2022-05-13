import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleName } from './enums/role-name.enum';
import { RoleService } from './interfaces/role-service.interface';

@Injectable()
export class RoleServiceImpl implements RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  public async getById(id: number): Promise<Role> {
    return await this.roleRepository.findOne(id);
  }

  public async getByName(name: RoleName): Promise<Role> {
    return await this.roleRepository.findOne({ name });
  }
}
