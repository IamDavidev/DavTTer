import { InsfrastrutureFormatException } from '@infrastructure/errors/insfrastrutureFormat.exception.ts';

export class UnnecesaryFieldsException extends InsfrastrutureFormatException {
	constructor() {
		super('Unnecesary fields');
	}
}
