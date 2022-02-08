import { ApiProperty } from '@nestjs/swagger';
import { CreateSpecificationsDto } from './create-specifications.dto';

export class CreateCarDto {
  @ApiProperty({ example: 'BMW X5', name: 'Название' })
  readonly name: string;

  @ApiProperty({ example: '6 700 000', name: 'Стоимость' })
  readonly price: number;

  @ApiProperty({ name: 'Описание' })
  readonly description: string;

  @ApiProperty({ type: () => CreateSpecificationsDto, name: 'Характеристики' })
  readonly specifications: CreateSpecificationsDto;
}
