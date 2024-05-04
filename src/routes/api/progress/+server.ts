import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { progressValue } from '$lib/server/oscProgress';

export const GET: RequestHandler = async () => {
	return json({ value: progressValue });
};
