import type { RequestHandler } from './$types';
import { assignProgress } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { id } = body;
	console.log(`assign-progress id: ${id}`);
	if (!id) {
		return json({ error: 'missing id' }, { status: 400 });
	}
	try {
		const progress_start = await assignProgress(id);
		return json({ id, progress_start });
	} catch (e) {
		console.error(e);
		return json({ error: e }, { status: 500 });
	}
};
