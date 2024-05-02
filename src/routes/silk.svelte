<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	export class Silk {
		input: AudienceInput;
		constructor(input: AudienceInput) {
			this.input = input;
			console.log(`new silk at ${input.x}`);
		}
	}

	export const silks = writable<Silk[]>([]);
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getDurationFromProgress, progressToDate, videoLength } from '$lib/progress';
	import moment from 'moment';

	export let silk: Silk;

	let dom: HTMLVideoElement;
	let duration: number;
	// const dropNum = Math.floor(Math.random() * 5);
	let top = silk.input.y;

	onMount(() => {
		duration = getDurationFromProgress(silk.input);
		const startAt = videoLength - duration;
		console.log('birthday', silk.input.birthday);
		console.log(
			'progress start date',
			moment(progressToDate(silk.input.progress_start)).format('YYYY MM DD')
		);
		console.log('start at: ', startAt);
		console.log('duration: ', duration);
		dom.currentTime = startAt;
		// dom.style.animation = `drop-0 ${Math.ceil(duration)}s steps(${~~(duration * 3)})`;
		dom.play();

		dom.onended = () => {
			if (dom.src.indexOf('string.webm') !== -1) {
				dom.src = '/silks/webm/dissolve_0.webm';
				console.log('done');
				dom.load();
				clearInterval(interval);
			} else {
				console.log('finished dissolve');
				$silks = $silks.filter((s) => s.input.id !== s.input.id);
			}
		};

		const timeStep = 100;
		const interval = setInterval(() => {
			top += (videoLength / duration) * 0.01;
		}, timeStep);
	});

	onDestroy(() => {
		console.log('bye');
	});
</script>

<video
	bind:this={dom}
	autoplay
	muted
	playsinline
	class="absolute h-screen mix-blend-lighten"
	style="left: {silk.input.x * 85}vw; top: {-100 + top}vh;"
	src="/silks/webm/string.webm"
>
	<!--	<source src="/silks/webm/string.webm" type="video/webm" />-->
</video>
