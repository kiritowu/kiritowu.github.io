<script lang="ts">
	import * as simpleIcons from 'simple-icons';

	let className = '';
	export let baseName: keyof typeof simpleIcons;
	export let color = 'currentColor';
	export let size = 24;
	export { className as class };

	$: defaultAttrs = {
		xmlns: 'http://www.w3.org/2000/svg',
		width: size,
		height: size,
		fill: color,
		viewBox: '0 0 24 24'
	};
</script>

<svg {...defaultAttrs} class={className}>
	<title>{baseName}</title>
	<path d={simpleIcons[baseName].path} />
</svg>
