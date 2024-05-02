import { PUBLIC_DB_URL } from '$env/static/public';
import { DB_USER, DB_PASS } from '$env/static/private';
import { value as progress } from '$lib/progress';

import pb from 'pocketbase';

export const client = new pb(PUBLIC_DB_URL);

await client.admins.authWithPassword(DB_USER, DB_PASS);

export async function assignProgress(id: string) {
	const progress_start = progress;
	try {
		await client.collection('audience_inputs').update(id, { progress_start });
		return progress_start;
	} catch (e) {
		throw new Error(e as string);
	}
}
