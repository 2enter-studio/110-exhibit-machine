import { NODE_ENV, OSC_PORT, OSC_TARGET_ADDRESS } from '$env/static/private';
import { Server } from 'node-osc';
import config from '$lib/config';

const { video_length } = config;

let progressValue = 0;

if (NODE_ENV === 'development') {
	const startTime = Date.now();

	setInterval(() => {
		const time = ((Date.now() - startTime) / 1000) % video_length;
		progressValue = time / video_length;
	}, 10);
} else {
	const oscReceiver = new Server(parseInt(OSC_PORT) || 30000, '127.0.0.1', () => {
		console.log('OSC Server is listening on port', OSC_PORT);

		oscReceiver.on('message', (msg) => {
			const channel = msg[0];
			const value = msg[1];
			if (channel === OSC_TARGET_ADDRESS) {
				progressValue = Number(value);
			}
			return;
		});
	});
}

export { progressValue };
