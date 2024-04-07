// @bun
import { log } from 'console';
import { build_options, env, handler_default } from './build/handler.js';
import './build/mime.conf.js';

// src/index.js
var { serve } = globalThis.Bun;
/*! MIT © Volodymyr Palamar https://github.com/gornostay25/svelte-adapter-bun */
var hostname = env('HOST', '0.0.0.0');
var port = parseInt(env('PORT', 3000));
var { httpserver, websocket } = handler_default(build_options.assets ?? true);
var serverOptions = {
	baseURI: env('ORIGIN', undefined),
	fetch: httpserver,
	hostname,
	port,
	development: env('SERVERDEV', build_options.development ?? false),
	error(error) {
		console.error(error);
		return new Response('Uh oh!!', { status: 500 });
	}
};
websocket && (serverOptions.websocket = websocket);
console.info(`Listening on ${hostname + ':' + port}` + (websocket ? ' (Websocket)' : ''));
serve(serverOptions);

// Start server automatically
const res = await fetch(`http://127.0.0.1:${port}/`);
if (res.ok) console.info('Server started!!!');
