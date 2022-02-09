import { ApiProperty } from '@nestjs/swagger';
import { CreateSpecificationsDto } from './create-specifications.dto';
import {
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsManufacturerExist } from '../../validation/decorators/is-manufacturer-exist.decorator';

export class CreateCarDto {
  @ApiProperty({ example: 'BMW X5', description: 'Название' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({ example: '1', description: 'Id производителя' })
  @IsNumber({}, { message: 'Должно быть числом' })
  @IsManufacturerExist({ message: 'Такого производителя не существует' })
  readonly manufacturerId: number;

  @ApiProperty({ example: '6 700 000', description: 'Стоимость' })
  @IsNumber({}, { message: 'Должна быть числом' })
  @Min(0, { message: 'Должна быть больше нуля' })
  readonly price: number;

  @ApiProperty({ description: 'Описание', example: 'Описание автомобиля' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly description?: string;

  @ApiProperty({
    type: () => CreateSpecificationsDto,
    description: 'Характеристики',
  })
  @IsObject({ message: 'Должно быть объектом характеристик' })
  @IsNotEmptyObject(
    {},
    { message: 'Объект характеристик должен быть не пустым' },
  )
  @ValidateNested()
  @Type(() => CreateSpecificationsDto)
  readonly specifications: CreateSpecificationsDto;
}
