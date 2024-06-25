<script>
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { sorted as snackos } from '$lib/snacks';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	export let snackCategory = 'bisnacksueel';

	$: snacks = snackos[snackCategory];

	let selectedSnack = writable(null);
	let spinning = writable(false);
	let rotation = writable(0);
	let totalSpin = 10;
	const dispatch = createEventDispatcher();

	export const spinWheel = () => {
		if ($spinning) return;

		spinning.set(true);
		const spinDuration = 3000; // 3 seconds spin time
		const spinCount = (totalSpin = totalSpin + Math.min(Math.round(Math.random() * 15), 6)); // Spin 10 times

		let totalRotation = 360 * spinCount + Math.floor(Math.random() * 360);
		rotation.set(totalRotation);

		setTimeout(() => {
			spinning.set(false);
			const segmentAngle = 360 / snacks.length;
			const finalRotation = totalRotation % 360;
			const selectedIndex = Math.floor(((360 - finalRotation) % 360) / segmentAngle);
			selectedSnack.set(snacks[selectedIndex]);
			dispatch('selected', snacks[selectedIndex]);
		}, spinDuration);
	};

	function getArcPath(startAngle, endAngle) {
		const radius = 50;
		const start = polarToCartesian(radius, startAngle);
		const end = polarToCartesian(radius, endAngle);
		const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

		return [
			'M',
			radius,
			radius,
			'L',
			start.x,
			start.y,
			'A',
			radius,
			radius,
			0,
			largeArcFlag,
			1,
			end.x,
			end.y,
			'Z'
		].join(' ');
	}

	function polarToCartesian(radius, angleInDegrees) {
		const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

		return {
			x: radius + radius * Math.cos(angleInRadians),
			y: radius + radius * Math.sin(angleInRadians)
		};
	}

	function getTextPosition(angleInDegrees) {
		const radius = 35; // Position the text inside the segment
		const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

		return {
			x: 50 + radius * Math.cos(angleInRadians),
			y: 50 + radius * Math.sin(angleInRadians)
		};
	}
</script>

<div class="flex flex-col">
	<div class="relative m-0 size-[400px] overflow-hidden rounded-full">
		<svg
			class="wheel size-full rounded-full"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			style="transform: rotate({$rotation}deg)"
		>
			{#each snacks as snack, i}
				<path
					d={getArcPath(i * (360 / snacks.length), (i + 1) * (360 / snacks.length))}
					fill={i % 2 === 0 ? '#f2f2f2' : '#e6e6e6'}
					stroke="#ccc"
				/>
				<text
					x={getTextPosition((i + 0.5) * (360 / snacks.length)).x}
					y={getTextPosition((i + 0.5) * (360 / snacks.length)).y}
					text-anchor="middle"
					fill="black"
					font-size="3px"
					transform={`rotate(${(i + 0.5) * (360 / snacks.length) + 90}, ${getTextPosition((i + 0.5) * (360 / snacks.length)).x}, ${getTextPosition((i + 0.5) * (360 / snacks.length)).y})`}
				>
					{snack.name}
				</text>
			{/each}
		</svg>
		<div class="marker"></div>
	</div>

	<select
		bind:value={snackCategory}
		class="rounded border bg-muted px-4 py-2 text-muted-foreground"
	>
		<option value="bisnacksueel">Bisnacksueel</option>
		<option value="meat">Vlees</option>
		<option value="vega">Vega</option>
		<option value="vegan">Vegan</option>
	</select>
	<Button on:click={spinWheel} disabled={$spinning}>Spin the Wheel</Button>

	<div class="h-12 text-center text-2xl font-bold">
		{#if $selectedSnack}
			{$selectedSnack.name}
		{/if}
	</div>
</div>

<style>
	.wheel {
		border: 5px solid #ccc;
		transform: rotate(0deg);
		transition: transform 3s cubic-bezier(0.33, 1, 0.68, 1);
	}

	.marker {
		position: absolute;
		top: 0px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 20px solid red;
	}
</style>
