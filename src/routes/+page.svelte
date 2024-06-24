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
		const newSnack = event.detail;

		selectedSnacks.update((snacks) => {
			const existingSnack = snacks.find((s) => s.snack.name === newSnack.name);

			if (existingSnack) {
				existingSnack.count += 1;
			} else {
				snacks.push({ snack: newSnack, count: 1 });
			}
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
				class="bg-muted text-muted-foreground rounded border px-4 py-2"
			>
				<option value="bisnacksueel">Bisnacksueel</option>
				<option value="meat">Vlees</option>
				<option value="vega">Vega</option>
				<option value="vegan">Vegan</option>
			</select>
			<Button on:click={addSnackWheel} class="rounded  px-4 py-2">Add Snack Wheel</Button>
		</div>

		<!-- Horizontal Scroll Area for Snack Wheels -->
		<ScrollArea orientation="horizontal" class="bg-secondary h-[520px] w-full">
			<div class="flex space-x-4 px-4">
				{#each $snackWheels as wheel, index}
					<SnackWheel
						snackCategory={wheel.snackCategory}
						on:selected={(event) => handleSnackSelected(event, index)}
					/>
				{/each}
			</div>
		</ScrollArea>
	</main>
	<aside class="flex w-1/3 flex-col p-4">
		<h2 class="mb-4 text-lg font-semibold">Selected Snacks:</h2>
		<ul class="list-disc space-y-2 pl-5">
			{#each $selectedSnacks as { snack, count }}
				{#if snack}
					<li>
						{count}x
						<Button variant="ghost" href={snack.url} target="_BLANK">
							{snack.name}
						</Button>
					</li>
				{/if}
			{/each}
		</ul>
	</aside>
</div>

<svelte:head>
	<title>Snacko's</title>
</svelte:head>
