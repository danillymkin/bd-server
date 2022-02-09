import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsBicCodeConstraint implements ValidatorConstraintInterface {
  validate(bic: any) {
    return bic?.length === 9 && !isNaN(+bic);
  }
}

export function IsBicCode(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsBicCodeConstraint,
    });
  };
}
