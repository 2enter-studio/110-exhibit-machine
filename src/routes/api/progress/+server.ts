import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { Server } from 'node-osc';
import { OSC_PORT, OSC_TARGET_ADDRESS } from '$env/static/private';

let progressValue = 0

const oscReceiver = new Server(parseInt(OSC_PORT) || 30000, '127.0.0.1', () => {
	console.log('OSC Server is listening on port', OSC_PORT);

	oscReceiver.on('message', (msg) => {
		const channel = msg[0]
		const value = msg[1]
		if (channel === OSC_TARGET_ADDRESS) {
			progressValue = Number(value);
		} else {
			return
		}
	});
});



export const GET: RequestHandler = async () => {
	return json({ value: progressValue });
};
