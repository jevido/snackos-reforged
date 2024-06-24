<script>
	import '../app.css';
	import { preferences } from '$lib/stores/preferences';

	function swapTheme() {
		if ($preferences.theme === 'dark') {
			$preferences.theme = 'bright';
		} else {
			$preferences.theme = 'dark';
		}
	}
</script>

<button
	on:click={swapTheme}
	class="absolute right-4 top-4 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-700 dark:text-gray-200"
>
	<svg
		data-v-88732935=""
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-sun lucide-icon customizable"
		><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path
			d="m4.93 4.93 1.41 1.41"
		></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"
		></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg
	>
</button>
<slot></slot>
