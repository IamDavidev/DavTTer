import { ApplicationConflictExpception } from '@application/errors/applicationConflict.exception.ts';

export class UserEmailIsAlreadyInUseException extends ApplicationConflictExpception {
	constructor() {
		super('User email is already in use');
	}
}
