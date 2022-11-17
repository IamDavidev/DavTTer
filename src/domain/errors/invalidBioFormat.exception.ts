import { DomainFormatException } from '@domain/errors/domainFormat.exception.ts';

export class InvalidBioFormatException extends DomainFormatException {
	constructor() {
		super('Invalid Bio Format');
	}
}
