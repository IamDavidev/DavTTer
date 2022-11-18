import { ApplicationConflictExpception } from '@application/errors/applicationConflict.exception.ts';

export class UserIdIsAlreadyInUseException extends ApplicationConflictExpception {
	constructor() {
		super('User Id already in use');
	}
}
