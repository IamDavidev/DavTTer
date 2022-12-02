import { Context } from '$oak/mod.ts';
import { DomainFormatException } from '@domain/errors/domainFormat.exception.ts';

import { ApplicationConflictExpception } from '@application/errors/applicationConflict.exception.ts';
import { logger } from '@infrastructure/clients/logger.client.ts';
import { InsfrastrutureFormatException } from '@infrastructure/errors/insfrastrutureFormat.exception.ts';

export const HttpStatusCode = {
	OK: 200,
	INTERNAL_SERVER_ERROR: 500,
	NOT_FOUND: 404,
	BAD_REQUEST: 400,
	CONFLICT: 409,
};

export async function errorMiddleware(
	ctx: Context,
	next: () => Promise<unknown>
) {
	try {
		await next();
	} catch (err) {
		// handler error of application
		if (err instanceof InsfrastrutureFormatException) {
			logger.error('InsfrastrutureFormatException : ', err.message);
			ctx.response.status = HttpStatusCode.BAD_REQUEST;
			return (ctx.response.body = {
				message: err.message,
			});
		}

		// handler error of ApplicationConflictExpception
		if (err instanceof ApplicationConflictExpception) {
			logger.error('ApplicationConflictExpception : ', err.message);
			ctx.response.status = HttpStatusCode.CONFLICT;
			return (ctx.response.body = {
				message: err.message,
			});
		}

		// handler error of domain
		if (err instanceof DomainFormatException) {
			logger.error('DomainFormatException : ', err.message);
			ctx.response.status = HttpStatusCode.BAD_REQUEST;
			return (ctx.response.body = {
				message: err.message,
			});
		}

		// handler global error
		ctx.response.status = HttpStatusCode.INTERNAL_SERVER_ERROR;
		logger.error('Internal Error : ', err.message);
		return (ctx.response.body = {
			message: 'Internal server error',
		});
	}
}
