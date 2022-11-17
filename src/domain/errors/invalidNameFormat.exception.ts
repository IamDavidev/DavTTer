import { DomainFormatException } from '@domain/errors/domainFormat.exception.ts';

export class InvalidNameFormatException extends DomainFormatException {
	constructor() {
		super('Invalid Name Format');
	}
}
