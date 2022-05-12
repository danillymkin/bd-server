import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../users/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  public async getById(id: number) {
    return await this.roleRepository.findOne(id);
  }

  public async getByName(name: string) {
    return await this.roleRepository.findOne({ name });
  }
}
