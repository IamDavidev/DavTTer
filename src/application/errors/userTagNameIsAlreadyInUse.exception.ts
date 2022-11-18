import { ApplicationConflictExpception } from '@application/errors/applicationConflict.exception.ts';

export class UserTagNameIsAlreadyInUseException extends ApplicationConflictExpception {
	constructor() {
		super('User Tag Name already in use');
	}
}
