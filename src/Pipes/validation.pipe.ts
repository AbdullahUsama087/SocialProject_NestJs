import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodObject } from 'zod';

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log({ value, metadata });

    try {
      this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return value;
  }
}

export { ZodValidationPipe };
