import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsGtZeroAndPositive(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isGtZeroAndPositive',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsGtZeroAndPositiveConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isGtZeroAndPositive' })
export class IsGtZeroAndPositiveConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string | number) {
    return value ? new RegExp(/^[1-9][0-9]*$/).test(`${value}`) : false;
  }

  defaultMessage() {
    return `вы передали не emoji`;
  }
}
