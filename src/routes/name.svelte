<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import moment from 'moment';

	export const displayed = writable<AudienceInput[]>([]);
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import config from '$lib/config';
	let dom: HTMLDivElement;

	const { name_update_timeout, name_fade_duration } = config;

	onMount(() => {
		setInterval(() => {
			const children = dom.querySelectorAll('h1');
			if (!children) return;
			children.forEach((child) => {
				if (Math.random() < 0.08) {
					setTimeout(
						() => {
							child.classList.toggle('blur-md');
						},
						Math.random() * 1000 + 500
					);
					setTimeout(
						() => {
							child.classList.toggle('blur-md');
						},
						Math.random() * 1000 + 500
					);
				}
			});
		}, name_update_timeout);
	});
</script>

<div bind:this={dom}>
	{#each $displayed as input}
		<h1
			transition:fade={{ duration: name_fade_duration }}
			class="absolute text-white transition-all duration-1000 text-right w-fit"
			style="top: {(1 - input.y) * 100}vh; left: {input.x * 90}vw;"
		>
			{moment.utc(input.birthday).format('YYYY MM DD')}
			{input.name}
		</h1>
	{/each}
</div>
