import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  public async getById(id: number) {
    return await this.usersRepository.findOne(id);
  }

  public async getByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }

  public async create(registerUserDto: RegisterUserDto): Promise<User> {
    const user = this.usersRepository.create(registerUserDto);
    return await this.usersRepository.save(user);
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

  private async activateUserByLink(activationLink: string) {
    try {
      const user = await this.getByActivationLink(activationLink);
      await this.usersRepository.save({ ...user, isActivated: true });
    } catch (e) {
      console.log(e);
      throw new BadRequestException({
        message: 'Некорректная ссылка активации',
      });
    }
  }

  private redirectToClient(response: Response) {
    const CLIENT_URL = this.configService.get<string>('CLIENT_URL');
    return response.redirect(CLIENT_URL);
  }

  private async getByActivationLink(activationLink: string): Promise<User> {
    return await this.usersRepository.findOneOrFail({ activationLink });
  }
}
