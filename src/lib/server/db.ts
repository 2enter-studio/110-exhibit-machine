import { PUBLIC_DB_URL } from '$env/static/public';
import { DB_USER, DB_PASS } from '$env/static/private';

import pb from 'pocketbase';

export const client = new pb(PUBLIC_DB_URL);

await client.admins.authWithPassword(DB_USER, DB_PASS);
