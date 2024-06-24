const colors = {
	meat: 'red-600',
	vega: 'green-500',
	vegan: 'purple-500'
};

const meat = { color: colors.meat, name: 'meat', label: 'vlees' };
const vega = { color: colors.vega, name: 'vega', label: 'vega' };
const vegan = { color: colors.vegan, name: 'vegan', label: 'vegan' };

export const sauce = {
	samurai: {
		label: 'samurai',
		url: 'https://www.ah.nl/producten/product/wi226237/gouda-s-glorie-red-hot-samurai-saus'
	},
	curry: {
		label: 'curry',
		url: 'https://www.ah.nl/producten/product/wi441050/hela-kruiden-ketchup-curry-original'
	},
	chili: {
		label: 'chili',
		url: 'https://www.ah.nl/producten/product/wi439402/go-tan-chilisaus-sweet-original'
	},
	mayo: {
		label: 'mayo',
		url: 'https://www.ah.nl/producten/product/wi496580/van-wijngaarden-s-zaanse-mayonaise'
	},
	mustard: {
		label: 'mosterd',
		url: 'https://www.ah.nl/producten/product/wi226236/kuhne-franse-mosterd'
	}
};

export const snacks = [
	{
		rating: 9,
		url: 'https://www.ah.nl/producten/product/wi492526/mora-chili-cheese',
		name: 'Chili cheese',
		sauces: [sauce.mayo, sauce.chili, sauce.samurai],
		tags: [vega],
		brand: 'mora'
	},
	{
		rating: 6,
		url: 'https://www.ah.nl/producten/product/wi189411/mora-kip-fingers-mini-s',
		name: 'Kip vingers',
		sauces: [sauce.samurai, sauce.curry, sauce.chili, sauce.mayo],
		tags: [meat],
		brand: 'mora'
	},
	{
		rating: 9,
		url: 'https://www.ah.nl/producten/product/wi492754/kaastengels-old-amsterdam',
		name: 'Kaas stengels',
		sauces: [sauce.chili],
		tags: [vega],
		brand: 'ah huismerk'
	},
	{
		rating: 7,
		url: 'https://www.ah.nl/producten/product/wi183228/ah-mini-loempia-met-groente',
		name: 'Loempia',
		sauces: [sauce.samurai, sauce.chili, sauce.curry, sauce.mayo],
		tags: [vega, vegan],
		brand: 'ah huismerk'
	},
	{
		rating: 8,
		url: 'https://www.ah.nl/producten/product/wi388894/mora-oven-mini-frikandellen',
		name: 'Frikandel',
		sauces: [sauce.samurai, sauce.chili, sauce.curry, sauce.mayo],
		tags: [meat],
		brand: 'mora'
	},
	{
		rating: 9,
		url: 'https://www.ah.nl/producten/product/wi185420/mora-carrero',
		name: 'Carrero',
		sauces: [sauce.samurai, sauce.curry],
		tags: [meat],
		brand: 'mora'
	},
	{
		rating: 7,
		url: 'https://www.ah.nl/producten/product/wi486328/mora-oven-mini-kaassouffle',
		name: 'Kaassoufflé',
		sauces: [sauce.mayo, sauce.chili],
		tags: [vega],
		brand: 'mora'
	},
	{
		rating: 6.5,
		url: 'https://www.ah.nl/producten/product/wi459524/mora-oven-hapjesmix',
		name: 'Oven mix',
		sauces: [sauce.curry, sauce.chili],
		tags: [meat, vega, vegan],
		brand: 'mora'
	},
	{
		rating: 2,
		url: 'https://www.ah.nl/producten/product/wi383539/kwekkeboom-oven-borrelsnacks-bamihapjes',
		name: 'Bami',
		sauces: [sauce.curry, sauce.chili],
		tags: [vega],
		brand: 'kwekkeboom'
	},
	{
		rating: 8,
		url: 'https://www.ah.nl/producten/product/wi232374/kwekkeboom-oven-bitterballen',
		name: 'Bitterbal',
		sauces: [sauce.mayo, sauce.mustard],
		tags: [meat],
		brand: 'kwekkeboom'
	},
	{
		rating: 6,
		url: 'https://www.ah.nl/producten/product/wi232378/kwekkeboom-oven-kiphapjes',
		name: 'Kipnuggets',
		sauces: [sauce.samurai, sauce.chili, sauce.curry, sauce.mayo],
		tags: [meat],
		brand: 'kwekkeboom'
	},
	{
		rating: 8.5,
		url: 'https://www.ah.nl/producten/product/wi440444/kwekkeboom-old-amsterdam-bitterballen',
		name: 'Kaas bal',
		sauces: [sauce.mustard, sauce.chili],
		tags: [vega],
		brand: 'kwekkeboom'
	},
	// Note: can't find the ah:link
	// {
	// 	rating: 7,
	// 	url: '',
	// 	name: 'Groentebal (mora)',
	// 	sauces: [sauce.chili, sauce.curry],
	// 	tags: [vegan]
	// },
	{
		rating: 9,
		url: 'https://www.ah.nl/producten/product/wi516198/mora-cheese-onion',
		name: 'Kaas ui ring',
		sauces: [sauce.chili, sauce.mustard, sauce.mayo],
		tags: [vega],
		brand: 'mora'
	},
	{
		rating: 8,
		url: 'https://www.ah.nl/producten/product/wi56602/topking-vlammetjes',
		name: 'Vlammetjes',
		sauces: [sauce.samurai, sauce.curry, sauce.chili, sauce.mayo],
		tags: [meat],
		brand: 'topking'
	},
	// Note: can't find the ah:link
	// {
	// 	rating: 7,
	// 	url: 'https://www.ah.nl/producten/product/wi444420/kaassticks',
	// 	name: 'Kaas sticks',
	// 	sauces: [sauce.mayo, sauce.chili],
	// 	tags: [vega]
	// },
	{
		rating: 9,
		url: 'https://www.ah.nl/producten/product/wi451463/mora-crispy-chicken-original',
		name: 'Crispy Chicken',
		sauces: [sauce.samurai, sauce.chili, sauce.curry, sauce.mayo],
		tags: [meat],
		brand: 'mora'
	},
	{
		rating: 9,
		url: 'https://www.ah.nl/producten/product/wi451479/mora-crispy-chicken-spicy',
		name: 'Crispy Chicken pittig',
		sauces: [sauce.samurai, sauce.chili, sauce.curry, sauce.mayo],
		tags: [meat],
		brand: 'mora'
	},
	// No longer available
	// {
	//   rating: 10,
	//   url: "",
	//   name: "Roosterz Mix",
	//   sauces: ["Samoerai", "chili", "curry", "mayo"],
	// tags: [{color: colors.meat, name: 'vlees'}]
	// },
	{
		rating: 7,
		url: 'https://www.ah.nl/producten/product/wi516205/dr-oetker-pizza-bitterballen-salami',
		name: 'Pizza Bitterbal',
		sauces: [sauce.samurai, sauce.chili],
		tags: [meat],
		brand: 'dr Oetker'
	},
	{
		rating: 8,
		url: 'https://www.ah.nl/producten/product/wi232376/kwekkeboom-oven-kaashapjes',
		name: 'Kaashapjes',
		sauces: [sauce.mayo, sauce.chili],
		tags: [vega],
		brand: 'kwekkeboom'
	},
	{
		rating: 8,
		url: 'https://www.ah.nl/producten/product/wi185421/mora-pikanto',
		name: 'Pikanto',
		sauces: [sauce.samurai, sauce.chili, sauce.curry, sauce.mayo],
		tags: [meat],
		brand: 'mora'
	},
	{
		rating: 6,
		url: 'https://www.ah.nl/producten/product/wi238825/chio-borrel-bites-mix-paprika-sweet-chili',
		name: 'Borrel bites',
		sauces: [],
		tags: [vegan],
		brand: 'chio'
	},
	{
		rating: 6,
		url: 'https://www.ah.nl/producten/product/wi140746/ah-katjang-pedis-gezouten',
		name: 'Katjang pedis',
		sauces: [],
		tags: [vegan]
	},
	{
		rating: 6,
		url: 'https://www.ah.nl/producten/product/wi477621/duyvis-borrelnootjes-provencale',
		name: 'Duyvis Provencaals',
		sauces: [],
		tags: [vegan]
	}
];

export const sorted = {
	bisnacksueel: snacks,
	meat: snacks.filter((snack) => {
		return snack.tags.includes(meat);
	}),
	vega: snacks.filter((snack) => {
		return snack.tags.includes(vega);
	}),
	vegan: snacks.filter((snack) => {
		return snack.tags.includes(vegan);
	})
};
