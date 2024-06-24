<script>
	import { Button } from '$lib/components/ui/button';
	import SnackWheel from '$lib/components/snack-wheel.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { writable } from 'svelte/store';

	let snackCategory = 'bisnacksueel';
	let snackWheels = writable([]);
	let selectedSnacks = writable([]);

	function addSnackWheel() {
		snackWheels.update((wheels) => [
			...wheels,
			{
				snackCategory: snackCategory
			}
		]);
	}

	function handleSnackSelected(event, index) {
		selectedSnacks.update((snacks) => {
			snacks[index] = event.detail;
			return snacks;
		});
	}
</script>

<div class="flex w-full">
	<main class="flex min-h-screen w-2/3 flex-col items-center">
		<!-- Snack Category Selector -->
		<div class="mb-4 mt-8 flex items-center space-x-4">
			<label for="category" class="text-lg font-semibold">Select Snack Category:</label>
			<select
				id="category"
				bind:value={snackCategory}
				class="rounded border border-gray-300 bg-white px-4 py-2"
			>
				<option value="bisnacksueel">Bisnacksueel</option>
				<option value="meat">Vlees</option>
				<option value="vega">Vega</option>
				<option value="vegan">Vegan</option>
			</select>
			<Button
				on:click={addSnackWheel}
				class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>
				Add Snack Wheel
			</Button>
		</div>

		<!-- Horizontal Scroll Area for Snack Wheels -->
		<ScrollArea orientation="horizontal" class="bg-secondary h-[520px] w-full">
			<div class="flex space-x-4 px-4">
				{#each $snackWheels as wheel, index}
					<SnackWheel
						snackCategory={wheel.snackCategory}
						on:selected={(event) => {
							handleSnackSelected(event, index);
							console.debug(event, index);
						}}
					/>
				{/each}
			</div>
		</ScrollArea>
	</main>
	<aside class="flex w-1/3 flex-col p-4">
		<h2 class="mb-4 text-lg font-semibold">Selected Snacks:</h2>
		<ul class="list-disc space-y-2 pl-5">
			{#each $selectedSnacks as snack}
				{#if snack}
					<li>
						<a href={snack.url} target="_BLANK" class="text-blue-600 hover:underline">
							{snack.name}
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</aside>
</div>

<svelte:head>
	<title>Snacko's</title>
</svelte:head>
