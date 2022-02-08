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

export class CreateCarDto {
  @ApiProperty({ example: 'BMW X5', name: 'Название' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({ example: '6 700 000', name: 'Стоимость' })
  @IsNumber({}, { message: 'Должна быть числом' })
  @Min(0, { message: 'Должна быть больше нуля' })
  readonly price: number;

  @ApiProperty({ name: 'Описание' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly description?: string;

  @ApiProperty({ type: () => CreateSpecificationsDto, name: 'Характеристики' })
  @IsObject({ message: 'Должно быть объектом характеристик' })
  @IsNotEmptyObject(
    {},
    { message: 'Объект характеристик должен быть не пустым' },
  )
  @ValidateNested()
  @Type(() => CreateSpecificationsDto)
  readonly specifications: CreateSpecificationsDto;
}
