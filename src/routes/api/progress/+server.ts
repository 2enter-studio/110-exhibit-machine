import type { RequestHandler } from './$types';
import { value } from '$lib/server/progress';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json({ value });
};
