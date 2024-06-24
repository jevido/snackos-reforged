const storable = localStorage.getItem('preferences');

if (storable) {
	const preferences = JSON.parse(storable);

	if (preferences.theme) {
		document.documentElement.classList.add(preferences.theme);
	}
} else {
	/*
	 * Doing this here adds 2 locations of theme definitions
	 * and is against my principles.
	 * But damn is it great at preventing the first Flash of Unstyled Content for SSR
	 */
	document.documentElement.classList.add(
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'bright'
	);
}
