import { it } from '$testing/bdd.ts';
import { fail } from 'https://deno.land/std@0.152.0/testing/asserts.ts';
const formData = new FormData();

it('create publication test ', async () => {
	const abortController: AbortController = new AbortController();
	try {
		formData.append('title', '');
		const res = await fetch('http://localhost:8080/api/publication/create/', {
			method: 'POST',
			body: JSON.stringify({
				title: 'title',
				body: 'body',
			}),
			signal: abortController.signal,
		});
		console.info(
			'🚀 ~>  file: publicationCreate.test.ts:18 ~>  it ~>  res',
			res
		);
		await res.text();
	} catch (err) {
		abortController.abort();
		fail(err);
	}
});
