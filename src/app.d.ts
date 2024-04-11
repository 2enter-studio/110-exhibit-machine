// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	type AudienceInput = {
		id: string;
		name: string;
		birthday: string;
		x: number;
		y: number;
		progress_start: number;
	};
}

export {};
