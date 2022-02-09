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
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsBicCodeConstraint,
    });
  };
}
