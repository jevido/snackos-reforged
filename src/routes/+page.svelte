<script>
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import SnackWheel from '$lib/components/snack-wheel.svelte';
	import { writable } from 'svelte/store';

	let snackCategory = 'bisnacksueel';
	let snackWheels = writable([]);
	let selectedSnacks = writable([]);
	let incrementedId = 7; // unique ID for each wheel
	let spinAll = writable(false); // Store to manage spinning all wheels

	let snackCounts = {
		bisnacksueel: 3,
		meat: 0,
		vega: 0,
		vegan: 0
	};

	function addSnackWheel(category) {
		snackWheels.update((wheels) => [
			...wheels,
			{
				id: incrementedId,
				element: null,
				snackCategory: category,
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
			const updatedWheels = wheels.filter((_, i) => i !== index);
			return updatedWheels;
		});
		selectedSnacks.update((snacks) => {
			const updatedSnacks = snacks.filter((_, i) => i !== index);
			return updatedSnacks;
		});
	}

	function generateSnacks() {
		snackWheels.set([]);
		Object.keys(snackCounts).forEach((category) => {
			for (let i = 0; i < snackCounts[category]; i++) {
				addSnackWheel(category);
			}
		});
	}

	function spinAllWheels() {
		snackWheels.update((wheels) => {
			wheels.forEach((wheel) => {
				if (wheel.element) {
					wheel.element.spinWheel();
				}
			});
			return wheels;
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

<div class="flex w-full flex-col md:flex-row">
	<main class="flex h-auto w-full flex-col items-center space-y-4 p-4 md:h-screen md:w-2/3 md:p-0">
		<!-- Snack Selector -->
		<form
			on:submit|preventDefault={generateSnacks}
			class="mt-8 flex flex-col items-center space-y-4"
		>
			<h1 class="text-center text-xl font-semibold md:text-2xl">Hoeveel mensen eten er?</h1>
			<div class="flex flex-wrap justify-center space-x-4">
				{#each Object.keys(snackCounts) as category, index}
					<div class="flex flex-col items-center space-y-2">
						<label for="category-{index}" class="text-lg font-semibold">{category}</label>
						<input
							id="category-{index}"
							type="number"
							min="0"
							bind:value={snackCounts[category]}
							class="rounded border bg-muted px-2 py-1 text-muted-foreground"
						/>
					</div>
				{/each}
			</div>
			<div class="flex flex-wrap justify-center gap-4">
				<Button type="submit" class="rounded px-4 py-2">Maak voorstel</Button>
				<Button on:click={() => addSnackWheel('bisnacksueel')} class="rounded px-4 py-2">+ 1</Button
				>
				<Button on:click={spinAllWheels} class="rounded px-4 py-2">Spin All</Button>
			</div>
		</form>

		<!-- Scroll Area for Snack Wheels -->
		<ScrollArea>
			<div class="grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-2 2xl:grid-cols-3">
				{#each $snackWheels as wheel, index (wheel.id)}
					<div class="relative">
						<SnackWheel
							snackCategory={wheel.snackCategory}
							bind:this={wheel.element}
							on:selected={(event) => handleSnackSelected(event, index)}
						/>
						<Button
							class="absolute right-2 top-2 bg-red-600"
							on:click={() => removeSnackWheel(index)}
						>
							X
						</Button>
					</div>
				{/each}
			</div>
		</ScrollArea>
	</main>
	<aside class="flex flex-col rounded bg-secondary p-4 text-secondary-foreground md:w-1/3">
		<h2 class="mb-4 text-lg font-semibold">Boodschappenlijstje:</h2>
		<ul class="list-disc space-y-2 pl-5">
			{#if $selectedSnacks.length > 0}
				{#each groupSnacks($selectedSnacks) as { snack, count }}
					<li>
						{count}x
						<Button variant="ghost" href={snack.url} target="_BLANK">
							{snack.name}
						</Button>
						{#each snack.tags as tag}
							<Badge class="gap-x2 ml-2 text-foreground bg-{tag.color} hover:bg-{tag.color}"
								>{tag.label}</Badge
							>
						{/each}
					</li>
				{/each}
			{:else}
				<li class="list-none">Je mag eerst aan het rad draaien</li>
			{/if}
		</ul>
	</aside>
</div>

<svelte:head>
	<title>Snacko's</title>
</svelte:head>
