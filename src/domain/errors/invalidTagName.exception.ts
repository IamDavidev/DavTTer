import { DomainFormatException } from '@domain/errors/domainFormat.exception.ts';

export class InvalidTagNameException extends DomainFormatException {
  constructor() {
    super('Invalid Tag Name');
  }
}
