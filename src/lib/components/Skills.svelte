<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores';

	// Import skill icons
	import * as icons from 'simple-icons';
	import loading_gif from '$lib/images/Ripple-1s-200px.gif';

	export let skills: Record<string, string[]> = {};

	// Variables for showing component on Intersected
	let container: HTMLDivElement;
	let intersecting = false;

	// Variables for textFill
	let textFill = $theme === 'dark' ? '#D4D4D4' : '#171717';

	const convertData = (skills: {}) => {
		// Convert skills to neo4j data format
		const nodes: { id: string; labels: string[]; properties?: Record<string, string> }[] = [];
		const relationships: {
			id: string;
			type: string;
			startNode: string;
			endNode: string;
			properties?: Record<string, any>;
		}[] = [];

		nodes.push({
			id: '0',
			labels: ['User'],
			properties: {
				userId: 'Zhao Wu'
			}
		});

		Object.entries(skills).forEach(([cat, skillArr]) => {
			const catId = nodes.length.toString();
			nodes.push({
				id: catId,
				labels: [cat],
				properties: {}
			});
			relationships.push({
				id: relationships.length.toString(),
				type: cat,
				startNode: '0',
				endNode: catId,
				properties: {}
			});

			(skillArr as string[]).forEach((skill) => {
				const skillId = nodes.length.toString();
				nodes.push({
					id: skillId,
					labels: [skill],
					properties: {}
				});
				relationships.push({
					id: relationships.length.toString(),
					type: skill,
					startNode: catId,
					endNode: skillId,
					properties: {}
				});
			});
		});

		return {
			results: [
				{
					data: [
						{
							graph: {
								nodes,
								relationships
							}
						}
					]
				}
			],
			errors: []
		};
	};

	onMount(async () => {
		// @ts-ignore
		const neo4jd3Ts = await import('neo4jd3-ts');
		// @ts-ignore
		const d3 = await import('d3');

		const createNeoChart = neo4jd3Ts.default;
		const data = convertData(skills);
		const svg2HrefwithFill = (svg: String, fill: String = 'white') =>
			`data:image/svg+xml;utf8, ${svg.replace('/></svg>', ` fill="${fill.replace('#', '%23')}" /></svg>`)}`;
		const options = {
			highlight: [
				{
					class: 'User',
					property: 'userId',
					value: 'Zhao Wu'
				}
			],
			neo4jData: data,
			nodeRadius: 18,
			minCollision: 38.6,
			infoPanel: true,
			zoomFit: true,
			arrowSize: 1,
			icons: {
				User: 'user',
				Leadership: 'users',
				'Software Engineering': 'laptop',
				'Artificial Intelligence': 'android',
				'Event Planning': 'calendar',
				'Project Management': 'tasks',
				'Data Analysis': 'line-chart',
				'Data Visualisation': 'pie-chart',
				'Data Engineering': 'table',
				'Google Cloud': ''
			},
			images: {
				Docker: svg2HrefwithFill(icons.siDocker.svg),
				'Google Cloud': svg2HrefwithFill(icons.siGooglecloud.svg),
				Firebase: svg2HrefwithFill(icons.siFirebase.svg),
				Python: svg2HrefwithFill(icons.siPython.svg),
				Typescript: svg2HrefwithFill(icons.siTypescript.svg),
				Javascript: svg2HrefwithFill(icons.siJavascript.svg),
				'Machine Learning': svg2HrefwithFill(icons.siGooglecolab.svg),
				'Computer Vision': svg2HrefwithFill(icons.siOpencv.svg),
				'Natural Language Processing': svg2HrefwithFill(icons.siHuggingface.svg),
				MLOps: svg2HrefwithFill(icons.siGooglepubsub.svg),
				'ML Pipeline': svg2HrefwithFill(icons.siKubernetes.svg)
			}
		};
		let d3TextSelector = '.neo4jd3-graph .relationships text'; // Select all text in relationships
		let d3ImgTextSelector = '.neo4jd3-graph .node-image text'; // Select text in node-image

		// Change text color based on theme
		theme.subscribe((value) => {
			if (value === 'dark') {
				textFill = '#D4D4D4';
			} else {
				textFill = '#171717';
			}
			if (intersecting) {
				// When graph is created, change text color
				d3.selectAll(d3TextSelector).attr('fill', textFill);
			}
		});

		// Create chart when container is scrolled/intersected
		if (typeof IntersectionObserver !== 'undefined') {
			// Make use of IntersectionObserver when it is available
			const observer = new IntersectionObserver((entries) => {
				intersecting = entries[0].isIntersecting;
				if (intersecting) {
					createNeoChart('#graph', options);
					d3.selectAll(d3TextSelector).attr('fill', textFill); // Change text color
					d3.selectAll(d3ImgTextSelector).remove(); // Remove text in node-image
					observer.unobserve(container);
				}
			});

			observer.observe(container);
			return () => observer.unobserve(container);
		}

		function handler() {
			const bcr = container.getBoundingClientRect();
			intersecting =
				bcr.bottom > 0 &&
				bcr.right > 0 &&
				bcr.top < window.innerHeight &&
				bcr.left < window.innerWidth;

			if (intersecting) {
				console.log('Intersected');
				createNeoChart('#graph', options);
				d3.selectAll(d3TextSelector).attr('fill', textFill);
				window.removeEventListener('scroll', handler);
			}
		}

		window.addEventListener('scroll', handler);
		return () => window.removeEventListener('scroll', handler);
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/>
</svelte:head>

<section id="skills" class="bg-sky dark:bg-sky-dark">
	<div class="container-sm md:container-lg md:mx-auto px-5 max-w-6xl py-16">
		<h1 class="mb-6">Skills</h1>
		<div
			class="w-full h-[80vh] bg-whiteBlue dark:bg-whiteBlue-dark rounded-md shadow-lg dark:shadow-gray-600"
		>
			<div id="graph" style="width: 100%; height:100%; overflow: hidden;">
				{#if !intersecting}
					<div class="flex h-full justify-center items-center">
						<img class="w-25 h-25" alt="Interactive Skill Map" src={loading_gif} />
					</div>
				{/if}
			</div>
			<div bind:this={container}></div>
		</div>
	</div>
</section>
