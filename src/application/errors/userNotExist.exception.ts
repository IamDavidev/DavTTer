import { ApplicationConflictExpception } from '@application/errors/applicationConflict.exception.ts';

export class UserNotExistException extends ApplicationConflictExpception {
	constructor() {
		super('User not exist');
	}
}
