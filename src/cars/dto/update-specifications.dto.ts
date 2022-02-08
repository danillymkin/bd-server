import { PartialType } from '@nestjs/swagger';
import { CreateSpecificationsDto } from './create-specifications.dto';

export class UpdateSpecificationsDto extends PartialType(
  CreateSpecificationsDto,
) {}
