import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';
import { flattenDeep } from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = {
        statusCode: HttpStatus.BAD_REQUEST,
        messages: this.getMessages(errors),
        error: 'Bad Request',
      };
      throw new ValidationException(messages);
    }

    return value;
  }

  private getMessages(errors: ValidationError[]) {
    return flattenDeep(
      errors.map((error) => {
        if (error.children.length > 0) {
          return this.getMessages(error.children);
        } else {
          return `${error.property} - ${Object.values(error.constraints).join(
            ', ',
          )}`;
        }
      }),
    );
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
