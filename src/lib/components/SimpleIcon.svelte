<script lang="ts">
	import * as icons from 'simple-icons';

	let className = '';
	export let baseName: keyof typeof icons;
	export let color = 'currentColor';
	export let size = 24;
	export let title = '${baseName}';
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
	<title>{title}</title>
	<path d={icons[baseName].path} />
</svg>
