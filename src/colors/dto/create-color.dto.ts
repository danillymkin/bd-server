import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: 'Черный', description: 'Название цвета' })
  readonly name: string;

  @ApiProperty({ example: '#000000', description: 'HEX код цвета' })
  readonly hex: string;
}
