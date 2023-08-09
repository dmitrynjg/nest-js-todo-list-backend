import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function MatchesStringOrArrayString(
  regex: RegExp,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'regexStringOrArrayString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [regex],
      options: validationOptions,
      validator: RegexStringConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'regexStringArrayOrString' })
export class RegexStringConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [regex] = args.constraints;
    if (typeof value === 'string') {
      return regex.test(value);
    } else if (Array.isArray(value)) {
      return value.every((text) => regex.test(text));
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: (() => any)[] = args.constraints;
    return `${constraintProperty} and ${args.property} does not match`;
  }
}
