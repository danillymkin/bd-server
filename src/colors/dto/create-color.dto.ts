import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ example: 'Черный', name: 'Название цвета' })
  readonly name: string;

  @ApiProperty({ example: '#000000', name: 'HEX код цвета' })
  readonly hex: string;
}
