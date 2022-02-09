import { ApiProperty } from '@nestjs/swagger';
import { CarBody, CarDrive, CarFuel, CarTransmission } from '../utils/enums';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { THIS_YEAR } from '../../utils/constants';
import {
  MAX_MILEAGE,
  MAX_POWER,
  MAX_TAX,
  MAX_VOLUME,
  MIN_YEAR,
} from '../utils/constants';

export class CreateSpecificationsDto {
  @ApiProperty({ example: '2017', description: 'Год выпуска' })
  @IsNumber({}, { message: 'Должно быть числом' })
  @Min(MIN_YEAR, { message: `Должно быть не менее ${MIN_YEAR}` })
  @Max(THIS_YEAR, { message: `Должно быть не более ${THIS_YEAR}` })
  readonly releaseYear: number;

  @ApiProperty({ example: '32 000', default: 0, description: 'Пробег' })
  @IsNumber({}, { message: 'Должен быть числом' })
  @Min(0, { message: 'Должна быть больше нуля' })
  @Max(MAX_MILEAGE, { message: `Должен быть не более ${MAX_MILEAGE}` })
  readonly mileage: number = 0;

  @ApiProperty({ enum: CarBody, example: 'Седан', description: 'Кузов' })
  @IsEnum(CarBody, { message: 'Недопустимое значение' })
  readonly body: CarBody;

  @ApiProperty({ example: '18 700', description: 'Налог' })
  @IsOptional()
  @IsNumber({}, { message: 'Должно быть числом' })
  @Min(0, { message: 'Должна быть больше нуля' })
  @Max(MAX_TAX, { message: `Должно быть не более ${MAX_TAX}` })
  readonly tax?: number;

  @ApiProperty({ example: 'Автоматическая', description: 'Коробка передач' })
  @IsEnum(CarTransmission, { message: 'Недопустимое значение' })
  readonly transmission: CarTransmission;

  @ApiProperty({ enum: CarDrive, example: 'Задний', description: 'Привод' })
  @IsEnum(CarDrive, { message: 'Недопустимое значение' })
  readonly drive: CarDrive;

  @ApiProperty({ enum: CarFuel, example: 'Дизель', description: 'Тип топлива' })
  @IsEnum(CarFuel, { message: 'Недопустимое значение' })
  readonly fuel: CarFuel;

  @ApiProperty({ example: '250', description: 'Мощность л/с' })
  @IsNumber({}, { message: 'Должно быть числом' })
  @IsPositive({ message: 'Должен быть не менее нуля' })
  @Max(MAX_POWER, { message: `Должно быть не более ${MAX_POWER}` })
  readonly power: number;

  @ApiProperty({
    example: '2.0',
    type: 'float',
    description: 'Объем двигателя',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  @IsPositive({ message: 'Должен быть не менее нуля' })
  @Max(MAX_VOLUME, { message: `Должно быть не более ${MAX_VOLUME}` })
  readonly volume: number;
}
