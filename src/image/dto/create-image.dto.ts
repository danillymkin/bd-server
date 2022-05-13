import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ example: 'car.jpg', description: 'Название файла' })
  @IsString({ message: 'Должно быть строкой' })
  fileName: string;

  @ApiProperty({ example: '1', description: 'Id автомобиля' })
  @IsNumber({}, { message: '' })
  carId: number;
}
