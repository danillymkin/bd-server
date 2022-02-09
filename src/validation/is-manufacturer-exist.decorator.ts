import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { Manufacturer } from '../manufacturers/entities/manufacturer.entity';

@ValidatorConstraint({ async: true })
export class IsManufacturerExistConstraint
  implements ValidatorConstraintInterface
{
  validate(manufacturerId: any) {
    const manufacturerRepository = getRepository(Manufacturer);
    return manufacturerRepository
      .findOne(manufacturerId)
      .then((manufacturer) => {
        return !!manufacturer;
      })
      .catch(() => {
        return false;
      });
  }
}

export function IsManufacturerExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsManufacturerExistConstraint,
    });
  };
}
