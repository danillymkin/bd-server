import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';
import { UpdateSpecificationsDto } from './update-specifications.dto';

export class UpdateCarDto extends PartialType(
  OmitType(CreateCarDto, ['specifications' as const]),
) {
  readonly specifications?: UpdateSpecificationsDto;
}
