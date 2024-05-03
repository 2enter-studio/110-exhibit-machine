import { PUBLIC_DB_URL } from '$env/static/public';
import { DB_USER, DB_PASS } from '$env/static/private';
import { value as progress } from '$lib/progress';

import pb from 'pocketbase';

const client = new pb(PUBLIC_DB_URL);

await client.admins.authWithPassword(DB_USER, DB_PASS);

async function assignProgress(id: string) {
	const progress_start = progress;
	try {
		await client.collection('audience_inputs').update(id, { progress_start });
		return progress_start;
	} catch (e) {
		console.error(e);
		throw new Error(e as string);
	}
}

async function loadInputs() {
	try {
		const inputs = await client.collection('audience_inputs').getFullList();
		return inputs as unknown as AudienceInput[];
	} catch (e) {
		throw new Error(e as string);
	}
}

export { assignProgress, loadInputs, client };
