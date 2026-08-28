<script lang="ts">
	import type { SimpleIcon as Icon } from 'simple-icons';

	let className = '';
	export let icon: Icon;
	export let size = 24;
	export { className as class };
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	fill="currentColor"
	viewBox="0 0 24 24"
	class={className}
	aria-hidden="true"
>
	<title>{icon.title}</title>
	<path d={icon.path} />
</svg>
