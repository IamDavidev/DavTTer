import { ApplicationConflictExpception } from './applicationConflict.exception.ts';

export class InvalidUpdateException extends ApplicationConflictExpception {
	constructor() {
		super('Invalid update exception');
	}
}
