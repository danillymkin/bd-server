import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsBankAccount } from '../../validation/decorators/is-bank-account.decorator';
import { IsBicCode } from '../../validation/decorators/is-bic-code.decorator';

export class CreateManufacturerDto {
  @ApiProperty({ example: 'BMW', description: 'Название' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({ example: 'BMW', description: 'Адрес' })
  @IsString({ message: 'Должно быть строкой' })
  readonly address: string;

  @ApiProperty({ example: 'Иванов В. В.', description: 'Директор' })
  @IsString({ message: 'Должно быть строкой' })
  readonly director: string;

  @ApiProperty({ example: 'Иванов В. В.', description: 'Главный бухгалтер' })
  @IsString({ message: 'Должно быть строкой' })
  readonly accountant: string;

  @ApiProperty({ description: 'Номер счета' })
  @IsString({ message: 'Должно быть строкой' })
  @IsBankAccount({
    message: 'Должно быть номером банковского счета',
  })
  readonly account: string;

  @ApiProperty({ description: 'БИК' })
  @IsString({ message: 'Должно быть строкой' })
  @IsBicCode({ message: 'Должно быть БИК' })
  readonly bic: string;
}
