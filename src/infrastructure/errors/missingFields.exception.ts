import { InsfrastrutureFormatException } from '@infrastructure/errors/insfrastrutureFormat.exception.ts';

export class MissignFieldsException extends InsfrastrutureFormatException {
	constructor() {
		super('Missign fields');
	}
}
