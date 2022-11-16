import { DomainFormatException } from '@domain/errors/domainFormat.exception.ts';

export class InvalidEmailFormatException extends DomainFormatException {
  constructor() {
    super('Invalid Email Format');
  }
}
