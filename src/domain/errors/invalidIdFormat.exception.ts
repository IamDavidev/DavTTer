import { DomainFormatException } from '@domain/errors/domainFormat.exception.ts';

export class InvalidIdFormatException extends DomainFormatException {
  constructor() {
    super('Invalid Id Format');
  }
}
