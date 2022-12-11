import { ApplicationConflictExpception } from '@application/errors/applicationConflict.exception.ts';

export class PublicationIdAlreadyExistException extends ApplicationConflictExpception {
	constructor() {
		super(`Publication Id already exist`);
	}
}
