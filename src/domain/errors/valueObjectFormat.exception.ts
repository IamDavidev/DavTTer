import { DomainFormatException } from './domainFormat.exception.ts';

export class ValueObjectFormatException extends DomainFormatException {
	constructor(ValueObjectName: string, value: unknown) {
		super(`${ValueObjectName} is not valid: ${JSON.stringify(value)}`);
	}
}
