import { ApplicationConflictExpception } from '@application/errors/applicationConflict.exception.ts';

export class InvalidLoginException extends ApplicationConflictExpception {
	constructor() {
		super('Invalid login with data provided');
	}
}
