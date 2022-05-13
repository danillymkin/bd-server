import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { UserService } from './interfaces/user-service.interface';
import {
  ROLE_SERVICE,
  RoleService,
} from '../role/interfaces/role-service.interface';
import { RoleName } from '../role/enums/role-name.enum';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(ROLE_SERVICE) private roleService: RoleService,
    private configService: ConfigService,
  ) {}

  public async getById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  public async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  public async create(registerUserDto: RegisterUserDto): Promise<User> {
    const hashPassword = await this.getHashedPassword(registerUserDto.password);
    const role = await this.roleService.getByName(RoleName.USER);
    const user = this.userRepository.create({
      ...registerUserDto,
      roles: [role],
      password: hashPassword,
    });
    return await this.userRepository.save(user);
  }

  public async activate(
    activationLink: string,
    response: Response,
  ): Promise<void> {
    await this.activateUserByLink(activationLink);
    return this.redirectToClient(response);
  }

  public async validate(email: string, password: string): Promise<User> {
    const user = await this.getByEmail(email);
    if (!user) {
      throw new BadRequestException({ message: 'Неверный E-Mail или пароль' });
    }
    const passwordsEquals = await bcrypt.compare(password, user.password);
    if (passwordsEquals) {
      return user;
    }
    throw new BadRequestException({ message: 'Неверный E-Mail или пароль' });
  }

  public async getSerializedUserById(id: number): Promise<Partial<User>> {
    const user = await this.getById(id);
    return instanceToPlain<User>(user);
  }

  private async getHashedPassword(password: string): Promise<string> {
    const hashSalt = await bcrypt.genSalt();
    return await bcrypt.hash(password, hashSalt);
  }

  private async activateUserByLink(activationLink: string): Promise<void> {
    try {
      const user = await this.getByActivationLink(activationLink);
      await this.userRepository.save({ ...user, isActivated: true });
    } catch (e) {
      throw new BadRequestException({
        message: 'Некорректная ссылка активации',
      });
    }
  }

  private redirectToClient(response: Response): void {
    const CLIENT_URL = this.configService.get<string>('CLIENT_URL');
    return response.redirect(CLIENT_URL);
  }

  private async getByActivationLink(activationLink: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ activationLink });
  }
}
