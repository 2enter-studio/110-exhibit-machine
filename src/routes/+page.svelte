<script lang="ts">
	import PB from 'pocketbase';
	import { PUBLIC_DB_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import moment from 'moment';
	import type { PageData } from './$types';

	import config from '$lib/config';
	import { dateToProgress, progressToDate } from '$lib/progress';

	import SilkDOM, { Silk, silks } from './silk.svelte';
	import NameDOM, { displayed } from './name.svelte';

	const client = new PB(PUBLIC_DB_URL);
	const { progress_update_timeout, page_reload_timeout } = config;

	export let data: PageData;
	const { inputs } = data;
	const newInputs: AudienceInput[] = [];

	// Subscribe to audience_inputs collection
	let progress = 0;

	client.collection('audience_inputs').subscribe('*', async (event) => {
		// Create a new silk after receiving a new input
		const item = event.record as unknown as AudienceInput;
		if (event.action !== 'create') return;
		const { id } = item;
		const res = await fetch('/api/assign-progress', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});

		const { progress_start } = await res.json();
		if (!progress_start) return;

		item.progress_start = progress_start;

		if (dateToProgress(new Date(item.birthday)) < progress) {
			newInputs.push(item);
		} else {
			inputs.push(item);
		}

		console.log(inputs.length);
		$silks.push(new Silk(item));
		$silks = $silks;
	});

	onMount(() => {
		setInterval(async () => {
			// Update progress every frame
			const res = await fetch('/api/progress');
			const json = await res.json();
			progress = json.value;

			for (const input of inputs) {
				const deltaTime = dateToProgress(new Date(input.birthday)) - progress;
				if (deltaTime < 0 && !$displayed.includes(input)) {
					$displayed.push(input);
					$displayed = $displayed;
				}
			}

			if (progress > 0.999) {
				inputs.push(...newInputs);
				displayed.set([]);
			}
		}, progress_update_timeout);

		setTimeout(window.location.reload, page_reload_timeout);
	});

	$: currentDate = moment(progressToDate(progress)).format('YYYY MM DD');
</script>

{#each $silks as silk}
	<SilkDOM {silk} />
{/each}

<NameDOM />

{currentDate}
