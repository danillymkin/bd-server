import { ApiProperty } from '@nestjs/swagger';
import { Contains, IsHexColor, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ example: 'Черный', description: 'Название цвета' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({ example: '#000000', description: 'HEX код цвета' })
  @IsString({ message: 'Должно быть строкой' })
  @IsHexColor({ message: 'Должно быть HEX цветом' })
  @Contains('#', { message: 'Должно начинаться со знака #' })
  readonly hex: string;
}
