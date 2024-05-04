<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import config from '$lib/config';

	export class Silk {
		input: AudienceInput;
		constructor(input: AudienceInput) {
			this.input = input;
			console.log(`new silk at ${input.x}`);
		}
	}

	export const silks = writable<Silk[]>([]);

	const {
		video_length,
		string_update_timeout,
		spider_fade_out_duration,
		spider_update_timeout,
		spider_image_amount,
		spider_y_offset_range,
		spider_filename_digit,
		string_dissolve_image_amount
	} = config;
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getDurationFromProgress, videoLength } from '$lib/progress';

	export let silk: Silk;

	let video: HTMLVideoElement;
	let duration: number;
	let top = -100;
	let spiderImg = '0001.webp';
	let spiderYOffset = 0;
	let finished = false;

	onMount(() => {
		duration = getDurationFromProgress(silk.input);
		const startAt = video_length - duration;
		video.currentTime = startAt;
		console.table(silk.input);

		video.play();

		video.onended = () => {
			if (video.src.indexOf('string.webm') !== -1) {
				video.src = `/silks/webm/dissolve_${Math.floor(Math.random() * string_dissolve_image_amount)}.webm`;
				console.log('done');
				video.load();
				// video.play();
				finished = true;
				clearInterval(interval);
				clearInterval(spiderInterval);
			} else {
				console.log('finished dissolve');
			}
		};

		// video.onpause = (e) => {
		// 	console.log('paused: ', e);
		// };
		//
		// video.onplay = (e) => {
		// 	console.log('played: ', e);
		// };

		const timeStep = 100;

		const interval = setInterval(() => {
			if (video.currentTime) {
				top = ((video.currentTime - startAt) / duration) * (1 - silk.input.y) - 1;
			}
		}, string_update_timeout);

		const spiderInterval = setInterval(() => {
			const num = Math.ceil(Math.random() * spider_image_amount);
			let imgUrl = num.toString();
			while (imgUrl.length < spider_filename_digit) {
				imgUrl = `0${imgUrl}`;
			}
			spiderImg = `${imgUrl}.webp`;
			spiderYOffset = Math.random() * 100 * spider_y_offset_range;
			console.log(video.currentTime);
		}, spider_update_timeout);
	});

	onDestroy(() => {
		console.log('bye');
	});
</script>

<div
	class="absolute h-screen flex justify-center items-end w-fit"
	style="left: {silk.input.x * 85}vw; top: {top * 100}vh;"
>
	<video
		bind:this={video}
		autoplay
		muted
		playsinline
		class="mix-blend-lighten h-full"
		src="/silks/webm/string.webm"
	/>
	{#if !finished}
		{#key spiderImg}
			<img
				out:fade={{ duration: 2500 }}
				in:fade={{ duration: 500 }}
				src="/spiders/webp/1/{spiderImg}"
				alt=""
				class="z-20 invert h-[10vh] w-auto absolute"
				style="margin-bottom: {spiderYOffset}vh;"
			/>
		{/key}
	{/if}
</div>
