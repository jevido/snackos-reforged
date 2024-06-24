import { browser } from '$app/environment';
import { storable } from '$lib/utils';

let darkMode = false;

if (typeof window !== 'undefined') {
	darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const preferences = storable('preferences', {
	theme: darkMode ? 'dark' : 'bright'
});

let oldTheme = darkMode ? 'dark' : 'bright';

preferences.subscribe((value) => {
	if (!browser) {
		return;
	}
	document.documentElement.classList.remove(oldTheme);
	document.documentElement.classList.add(value.theme);
	oldTheme = value.theme;
});

export { preferences };
