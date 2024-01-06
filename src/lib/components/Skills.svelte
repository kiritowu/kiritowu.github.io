<script lang="ts">
	import { onMount } from 'svelte';

	export let skills: Record<string, string[]> = {};

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
		createNeoChart('#graph', {
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
				Docker: 'src/lib/images/icons/docker-svgrepo-com.svg',
				'Google Cloud': 'src/lib/images/icons/google-cloud.svg',
				Firebase: 'src/lib/images/icons/firebase_icon.svg',
				Python: 'src/lib/images/icons/python_icon.svg',
				Typescript: 'src/lib/images/icons/typescript_icon.svg',
				Javascript: 'src/lib/images/icons/javascript_icon.svg',
				'Machine Learning': 'src/lib/images/icons/machine-learning.svg',
				'Computer Vision': 'src/lib/images/icons/image-combiner-svgrepo-com.svg',
				'Natural Language Processing': 'src/lib/images/icons/language-svgrepo-com.svg',
				MLOps: 'src/lib/images/icons/cycle-svgrepo-com.svg',
				'ML Pipeline': 'src/lib/images/icons/pipeline-svgrepo-com.svg'
			}
		});

		d3.select('#neo4jd3-graph').selectAll('.relationship .text').attr('font-size', '2rem');
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/>
</svelte:head>

<section id="skills" class="my-10">
	<h1 class="my-2">Skills</h1>
	<hr class="my-3 text-primary border-primary" />
	<div class="w-full h-[80vh]">
		<div id="graph" style="width: 100%; height:100%; overflow: hidden;"></div>
	</div>
</section>
