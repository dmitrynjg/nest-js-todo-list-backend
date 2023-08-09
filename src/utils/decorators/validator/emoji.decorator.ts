import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsEmoji(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isEmoji',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEmojiConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isEmoji' })
export class IsEmojiConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return value ? new RegExp(/^\p{Emoji}$/u).test(value) : false;
  }

  defaultMessage() {
    return `вы передали не emoji`;
  }
}
