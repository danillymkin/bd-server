import { IsNumberString } from 'class-validator';

export class FindOneParamsDto {
  @IsNumberString({}, { message: 'Должен быть числом' })
  id: number;
}
