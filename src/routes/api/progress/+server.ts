import type { RequestHandler } from './$types';
import { Server } from 'node-osc';
import { OSC_PORT } from '$env/static/private';

const oscReceiver = new Server(parseInt(OSC_PORT) || 30000, '127.0.0.1', () => {
	console.log('OSC Server is listening');
});

oscReceiver.on('message', (msg) => {
	console.log(`Message: ${msg}`);
});

import { value } from '$lib/progress';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json({ value });
};
