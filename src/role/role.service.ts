import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleName } from './enum/role-name.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  public async getById(id: number) {
    return await this.roleRepository.findOne(id);
  }

  public async getByName(name: RoleName) {
    return await this.roleRepository.findOne({ name });
  }
}
