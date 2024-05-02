<script lang="ts">
	import PB from 'pocketbase';
	import { PUBLIC_DB_URL } from '$env/static/public';
	import SilkDOM, { Silk, silks } from './silk.svelte';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { progressToDate } from '$lib/progress';
	import moment from 'moment';

	// Declare silk

	// Subscribe to audience_inputs collection
	const client = new PB(PUBLIC_DB_URL);
	client.collection('audience_inputs').subscribe('*', async (event) => {
		// Create a new silk after receiving a new input
		const item = event.record as unknown as AudienceInput;
		if (item.progress_start !== 0) return;
		const { id } = item;
		const res = await fetch('/api/assign-progress', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});
		const { progress_start } = await res.json();
		item.progress_start = progress_start;

		$silks.push(new Silk(item));
		$silks = $silks;
	});

	let progress = 0;
	onMount(() => {
		setInterval(async () => {
			const res = await fetch('/api/progress');
			const json = await res.json();
			progress = json.value;
		});
	});

	$: currentDate = moment(progressToDate(progress)).format('YYYY MM DD');
</script>

{#each $silks as silk}
	<SilkDOM {silk} />
{/each}

{currentDate}
