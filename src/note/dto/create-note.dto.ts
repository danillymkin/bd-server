import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Краткая заметка', description: 'Текст заметки' })
  @IsString({ message: 'Должно быть строкой' })
  text: string;

  @ApiProperty({ example: '1', description: 'Id клиента' })
  @IsNumber({}, { message: 'Должно быть числом' })
  clientId: number;
}
