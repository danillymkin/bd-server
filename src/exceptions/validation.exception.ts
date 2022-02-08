import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  messages: string[];
  statusCode: number;
  error: string;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
    this.statusCode = HttpStatus.BAD_REQUEST;
    this.error = response.error;
  }
}
