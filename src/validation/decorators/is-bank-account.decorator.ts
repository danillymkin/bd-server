import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsBankAccountConstraint implements ValidatorConstraintInterface {
  validate(account: any) {
    return account?.length === 20 && !isNaN(+account);
  }
}

export function IsBankAccount(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsBankAccountConstraint,
    });
  };
}
