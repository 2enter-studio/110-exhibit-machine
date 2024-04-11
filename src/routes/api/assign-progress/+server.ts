import type { RequestHandler } from './$types';
import { assignProgress } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { id } = body;
	if (!id) {
		return json({ error: 'missing id' }, { status: 400 });
	}
	await assignProgress(id);

	return json({ id });
};
