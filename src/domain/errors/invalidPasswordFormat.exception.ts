import { DomainFormatException } from '@domain/errors/domainFormat.exception.ts';

export class InvalidPasswordFormatException extends DomainFormatException {
  constructor() {
    super('Invalid Password Format');
  }
}
