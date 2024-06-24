<script>
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import SnackWheel from '$lib/components/snack-wheel.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { writable } from 'svelte/store';

	let snackCategory = 'bisnacksueel';
	let snackWheels = writable([]);
	let selectedSnacks = writable([]);
	let incrementedId = 7; // why not 7

	function addSnackWheel() {
		snackWheels.update((wheels) => [
			...wheels,
			{
				id: incrementedId,
				snackCategory: snackCategory,
				snack: null
			}
		]);
		incrementedId++;
	}

	function handleSnackSelected(event, index) {
		const newSnack = event.detail;

		selectedSnacks.update((snacks) => {
			snacks[index] = newSnack;
			return snacks;
		});
	}

	function removeSnackWheel(index) {
		snackWheels.update((wheels) => {
			wheels.splice(index, 1);
			return wheels;
		});
		selectedSnacks.update((snacks) => {
			snacks.splice(index, 1);
			return snacks;
		});
	}

	// Utility function to group snacks by name and count occurrences
	function groupSnacks(snacksArray) {
		const grouped = snacksArray.reduce((acc, snack) => {
			if (snack) {
				const existing = acc.find((item) => item.snack.url === snack.url);
				if (existing) {
					existing.count += 1;
				} else {
					acc.push({ snack, count: 1 });
				}
			}
			return acc;
		}, []);
		return grouped;
	}
</script>

<div class="flex w-full">
	<main class="flex min-h-screen w-2/3 flex-col items-center">
		<!-- Snack Category Selector -->
		<div class="mb-4 mt-8 flex items-center space-x-4">
			<label for="category" class="text-lg font-semibold">Select Snack Category:</label>
			<select
				bind:value={snackCategory}
				class="rounded border bg-muted px-4 py-2 text-muted-foreground"
			>
				<option value="bisnacksueel">Bisnacksueel</option>
				<option value="meat">Vlees</option>
				<option value="vega">Vega</option>
				<option value="vegan">Vegan</option>
			</select>
			<Button on:click={addSnackWheel} class="rounded px-4 py-2">Add Snack Wheel</Button>
		</div>

		<!-- Horizontal Scroll Area for Snack Wheels -->
		<ScrollArea orientation="horizontal" class="h-[520px] w-full bg-secondary">
			<div class="flex space-x-4 px-4">
				{#each $snackWheels as wheel, index (wheel.id)}
					<div class="relative">
						<SnackWheel
							snackCategory={wheel.snackCategory}
							on:selected={(event) => handleSnackSelected(event, index)}
						/>
						<Button
							variant="destructive"
							class="absolute right-2 top-2 text-white"
							on:click={() => removeSnackWheel(index)}
						>
							x
						</Button>
					</div>
				{/each}
			</div>
		</ScrollArea>
	</main>
	<aside class="flex w-1/3 flex-col p-4">
		<h2 class="mb-4 text-lg font-semibold">Selected Snacks:</h2>
		<ul class="list-disc space-y-2 pl-5">
			{#each groupSnacks($selectedSnacks) as { snack, count }}
				<li>
					{count}x
					<Button variant="ghost" href={snack.url} target="_BLANK">
						{snack.name}
					</Button>
					{#each snack.tags as tag}
						<Badge class="ml-2 text-foreground bg-{tag.color} hover:bg-{tag.color}"
							>{tag.label}</Badge
						>
					{/each}
				</li>
			{/each}
		</ul>
	</aside>
</div>

<svelte:head>
	<title>Snacko's</title>
</svelte:head>
