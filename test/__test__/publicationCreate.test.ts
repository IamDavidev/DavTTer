import { it } from '$testing/testing/bdd.ts';
import { Logger } from 'https://deno.land/std@0.168.0/log/logger.ts';
const logger = new Logger('publication_create_test_ts', 'ERROR');

logger.info('publication create test');
const formData = new FormData();

it('create publication test ', async () => {
	const abortController: AbortController = new AbortController();
	try {
		formData.append('title', '');
		const res = await fetch('http://localhost:8080/api/publication/create/', {
			method: 'POST',
			body: JSON.stringify({
				title: 'title',
			}),
			signal: abortController.signal,
		});
		await res.text();
	} catch (err) {
		abortController.abort();
		logger.error(err);
	}
});
