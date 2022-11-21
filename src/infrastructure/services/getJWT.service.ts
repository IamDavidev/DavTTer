import {
	create,
	type Payload,
	type Header,
} from 'https://deno.land/x/djwt@v2.8/mod.ts';
import { key } from '@infrastructure/constants/key.const.ts';

export async function getJWT(
	options: Header,
	payload: Payload
): Promise<string> {
	const jwt = await create(options, payload, key);

	return jwt;
}
