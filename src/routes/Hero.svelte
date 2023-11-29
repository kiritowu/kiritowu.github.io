<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import Typewriter from 'svelte-typewriter';

	// Props for Name Typewriter
	export let firstName = '';
	export let lastName = '';
	export let nickName = '';
	export let ign = '';

	// Skill Globe with D3
	let el: SVGElement;

	const data: { x: number; y: number; z: number; id: string }[] = [];

	onMount(async () => {
		// @ts-ignore
		const _3d = (await import('d3-3d'))._3d;

		const origin = [780, 500],
			startAngle = Math.PI;

		let alpha = 0,
			beta = 0,
			scale = 20,
			mx: number,
			my: number,
			mouseX: number,
			mouseY: number;

		const point3d = _3d()
			.shape('POINT')
			.x((d: any) => d.x)
			.y((d: any) => d.y)
			.z((d: any) => d.z)
			.origin(origin)
			.rotateY(startAngle)
			.rotateX(-startAngle)
			.scale(scale);

		const svg = d3
			.select(el)
			// @ts-ignore
			.call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd))
			// @ts-ignore
			.call(d3.zoom().on('zoom', zoomed))
			.append('g');
		const color = d3.scaleOrdinal(d3.schemeCategory10);
		const scatterData: typeof data = [];

		let j = 5,
			cnt = 0;
		for (var z = -j; z < j; z++) {
			for (var x = -j; x < j; x++) {
				scatterData.push({ x: x, y: d3.randomNormal(5, 2)(), z: z, id: 'point_' + cnt++ });
			}
		}

		/* Functions to modify all element on changes */
		const key = (d: any) => d.id;
		// Helper function to retrieve x and y value after projection to 2D space
		const posPointX = (d: any) => d.projected.x;
		const posPointY = (d: any) => d.projected.y;

		function processData(data: typeof point3d, tt: number) {
			/* ----------- POINTS ----------- */
			let points = svg.selectAll('circle').data(data, key);

			points
				.enter()
				.append('circle')
				.attr('class', '_3d')
				.attr('opacity', 0)
				.attr('cx', posPointX)
				.attr('cy', posPointY)
				// @ts-ignore
				.merge(points)
				.transition()
				.duration(tt)
				.attr('r', 3)
				.attr('stroke', (d: any) => color(d.id))
				.attr('fill', (d: any) => color(d.id))
				.attr('opacity', 1)
				.attr('cx', posPointX)
				.attr('cy', posPointY);

			points.exit().remove();

			/* ----------- TEXT ----------- */
			let texts = svg.selectAll('text').data(data, key);

			texts
				.enter()
				.append('text')
				.text((d: any) => d.id)
				.attr('class', '_3d')
				.attr('opacity', 0)
				.attr('x', posPointX)
				.attr('y', posPointY)
				// @ts-ignore
				.merge(texts)
				.transition()
				.duration(tt)
				.attr('opacity', 1)
				.attr('x', posPointX)
				.attr('y', posPointY);

			texts.exit().remove();

			// Sorts the elements accordingly to the z coordinate of the calculated centroid
			d3.selectAll('._3d').sort(_3d().sort);
		}

		function init() {
			let data = point3d(scatterData);
			processData(data, 1000);
		}

		/* Functions to modify Drag behavior */
		function dragStart(e: any) {
			mx = e.x;
			my = e.y;
		}

		function dragged(e: any) {
			mouseX = mouseX || 0;
			mouseY = mouseY || 0;
			beta = ((e.x - mx + mouseX) * Math.PI) / 230;
			alpha = (((e.y - my + mouseY) * Math.PI) / 230) * -1;
			let data = point3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(scatterData);
			processData(data, 0);
		}

		function dragEnd(e: any) {
			mouseX = e.x - mx + mouseX;
			mouseY = e.y - my + mouseY;
		}

		/* Functions to modify Zoom behavior */
		function zoomed(e: any) {
			let wheel: WheelEvent = e.sourceEvent;
			scale = Math.min(Math.max(10, scale - wheel.deltaY), 50);

			let data = point3d.scale(scale)(scatterData);
			processData(data, 0);
		}

		function rotateInterval(angleX: number, angleY: number, tt: number) {
			return setInterval(() => {
				beta += (angleY / 180) * Math.PI;
				alpha += (angleX / 180) * Math.PI;
				let data = point3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(scatterData);
				processData(data, 0);
			}, tt);
		}

		init();

		// Allow rotation animation
		let rotate = rotateInterval(0, 3, 50);

		// TODO: Display color based on group
		// TODO: Change origin and initial based on screensize?
		// TODO: Data Science Portion
	});
</script>

<section id="hero" class="text-xl font-primary">
	<header class="flex items-center min-h-screen max-w-6xl">
		<div class="">
			<h3 class="my-3 font-mono text-secondary text-lg md:text-xl">Hi, my name is</h3>
			<Typewriter mode="loopOnce" keepCursorOnFinish={true} wordInterval={700}>
				{#each [`${firstName}`, `${ign}`, `${nickName} ${lastName}`, `${nickName} ${lastName} ${firstName}`] as text}
					<h1 class="my-3 text-5xl md:text-6xl text-left">{text}</h1>
				{/each}
			</Typewriter>
			<h1 class="my-5 text-xl md:text-4xl text-left font-extrabold font-heading text-secondary">
				NUSC w/ CS @ 2029
			</h1>
			<h3 class="my-2 text-lg md:text-xl">
				💡 Conscientiously Driven | 💻 Aspiring ML Engineer | 🏞️ Outdoor Enthusiasts
			</h3>
		</div>
	</header>
	<svg bind:this={el} id="graph" class="absolute my-auto top-0 right-0 w-4/5 h-4/5 z-10"></svg>
</section>
