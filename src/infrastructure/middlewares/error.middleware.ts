import { Context, isHttpError } from '$oak/mod.ts';
import { DomainFormatException } from '@domain/errors/domainFormat.exception.ts';

import { ApplicationConflictExpception } from '@application/errors/applicationConflict.exception.ts';

export async function errorMiddleware(
	ctx: Context,
	next: () => Promise<unknown>
) {
	try {
		await next();
	} catch (err) {
		if (!isHttpError(err)) return ctx.throw(500, err.message);
		// handler error of domain
		if (err instanceof DomainFormatException) {
			ctx.response.status = 400;
			return (ctx.response.body = {
				message: err.message,
			});
		}
		// handler error of infrastructure
		if (err instanceof ApplicationConflictExpception) {
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
