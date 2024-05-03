export const ssr = false;
import { loadInputs } from '$lib/server/db';

export const load = async () => {
	const inputs = await loadInputs();
	return {
		inputs
	};
};
