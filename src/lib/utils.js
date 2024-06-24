import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import { writable } from 'svelte/store';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA, scaleA, scaleB) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style) => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function storable(key, data) {
	const store = writable(data);
	const _defaults = data;
	const { subscribe, set, update } = store;
	const isBrowser = typeof window !== 'undefined';

	if (isBrowser) {
		localStorage[key] && set(JSON.parse(localStorage[key]));

		if (!localStorage[key]) {
			localStorage[key] = JSON.stringify(_defaults);
		}
	}

	return {
		subscribe,
		set: (newValue) => {
			isBrowser && (localStorage[key] = JSON.stringify(newValue));
			set(newValue);
		},
		update: (callback) => {
			const updatedStore = callback(get(store));
			isBrowser && (localStorage[key] = JSON.stringify(updatedStore));
			update(updatedStore);
		},
		reset: () => {
			isBrowser && (localStorage[key] = JSON.stringify(_defaults));
			set({ ..._defaults });
		}
	};
}
