import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'E-Mail' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный E-Mail' })
  readonly email: string;

  @ApiProperty({ example: 'Алексей', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(15, { message: 'Не более 15 знаков' })
  readonly firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(20, { message: 'Не более 20 знаков' })
  readonly lastName: string;

  @ApiProperty({ example: 'qwerty', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @MinLength(6, { message: 'Не менее 6 знаков' })
  @MaxLength(15, { message: 'Не более 15 знаков' })
  readonly password: string;

  @ApiProperty({
    example: 'jd74nd74nfd234',
    description: 'Ссылка активации аккаунта',
  })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly activationLink: string;
}
