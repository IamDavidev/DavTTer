import { Context } from '$oak/mod.ts';
import { DomainFormatException } from '@domain/errors/domainFormat.exception.ts';

import { ApplicationConflictExpception } from '@application/errors/applicationConflict.exception.ts';
import Logger from 'https://deno.land/x/logger@v1.0.2/logger.ts';

export async function errorMiddleware(
	ctx: Context,
	next: () => Promise<unknown>
) {
	console.log('errorMiddleware');
	try {
		await next();
	} catch (err) {
		const logger: Logger = new Logger();

		// handler error of domain
		if (err instanceof DomainFormatException) {
			logger.error('DomainFormatException');
			ctx.response.status = 400;
			return (ctx.response.body = {
				message: err.message,
			});
		}
		// handler error of infrastructure
		if (err instanceof ApplicationConflictExpception) {
			logger.error('ApplicationConflictExpception');
			ctx.response.status = 409;
			return (ctx.response.body = {
				message: err.message,
			});
		}

		// handler global error
		ctx.response.status = 500;
		return (ctx.response.body = {
			message: 'Internal server error',
		});
	}
}
