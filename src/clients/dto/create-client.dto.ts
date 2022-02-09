import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';
import { IsBankAccount } from '../../validation/decorators/is-bank-account.decorator';

export class CreateClientDto {
  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @IsString({ message: 'Должно быть строкой' })
  lastName: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество' })
  @IsString({ message: 'Должно быть строкой' })
  patronymic: string;

  @ApiProperty({
    example: 'Москва, Ленинградское шоссе, 39а ст1',
    description: 'Адрес',
  })
  @IsString({ message: 'Должно быть строкой' })
  address: string;

  @ApiProperty({
    example: '+7 (800) 222-33-44',
    description: 'Телефон',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsPhoneNumber('RU', { message: 'Должно быть номером телефона' })
  phone: string;

  @ApiProperty({
    example: '+7 (800) 222-33-44',
    description: 'Факс',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsPhoneNumber('RU', { message: 'Должно быть номером факса' })
  fax: string;

  @ApiProperty({ description: 'Номер счета' })
  @IsString({ message: 'Должно быть строкой' })
  @IsBankAccount({
    message: 'Должно быть номером банковского счета',
  })
  account: string;
}
