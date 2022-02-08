import { ApiProperty } from '@nestjs/swagger';
import { CarBody, CarDrive, CarFuel, CarTransmission } from '../utils/enums';
import { Color } from '../../colors/entities/color.entity';

export class CreateSpecificationsDto {
  @ApiProperty({ example: '2017', name: 'Год выпуска' })
  readonly releaseYear: number;

  @ApiProperty({ example: '32 000', default: 0, name: 'Пробег' })
  readonly mileage: number = 0;

  @ApiProperty({ enum: CarBody, example: 'Седан', name: 'Кузов' })
  readonly body: CarBody;

  @ApiProperty({ type: () => Color, name: 'Цвет' })
  readonly color: Color;

  @ApiProperty({ example: '18 700', name: 'Налог' })
  readonly tax?: number;

  @ApiProperty({ example: 'Автоматическая', name: 'Коробка передач' })
  readonly transmission: CarTransmission;

  @ApiProperty({ enum: CarDrive, example: 'Задний', name: 'Привод' })
  readonly drive: CarDrive;

  @ApiProperty({ enum: CarFuel, example: 'Дизель', name: 'Тип топлива' })
  readonly fuel: CarFuel;

  @ApiProperty({ example: '250', name: 'Мощность л/с' })
  readonly power: number;

  @ApiProperty({ example: '2.0', type: 'float', name: 'Объем двигателя' })
  readonly volume: number;
}
