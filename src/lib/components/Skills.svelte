<script lang="ts">
	import { onMount } from 'svelte';
	// Import skill icons
	import docker_icon from '$lib/images/icons/docker-svgrepo-com.svg';
	import google_cloud_icon from '$lib/images/icons/google-cloud.svg';
	import firebase_icon from '$lib/images/icons/firebase_icon.svg';
	import python_icon from '$lib/images/icons/python_icon.svg';
	import typescript_icon from '$lib/images/icons/typescript_icon.svg';
	import javascript_icon from '$lib/images/icons/javascript_icon.svg';
	import machine_learning_icon from '$lib/images/icons/machine-learning.svg';
	import computer_vision_icon from '$lib/images/icons/image-combiner-svgrepo-com.svg';
	import natural_language_processing_icon from '$lib/images/icons/language-svgrepo-com.svg';
	import mlops_icon from '$lib/images/icons/cycle-svgrepo-com.svg';
	import ml_pipeline_icon from '$lib/images/icons/pipeline-svgrepo-com.svg';

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
				Docker: docker_icon,
				'Google Cloud': google_cloud_icon,
				Firebase: firebase_icon,
				Python: python_icon,
				Typescript: typescript_icon,
				Javascript: javascript_icon,
				'Machine Learning': machine_learning_icon,
				'Computer Vision': computer_vision_icon,
				'Natural Language Processing': natural_language_processing_icon,
				MLOps: mlops_icon,
				'ML Pipeline': ml_pipeline_icon
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

<section id="skills" class="bg-sky">
	<div class="container-sm md:container-lg md:mx-auto px-5 max-w-6xl py-16">
		<h1 class="mb-6">Skills</h1>
		<div class="w-full h-[80vh] bg-white rounded-md shadow-lg">
			<div id="graph" style="width: 100%; height:100%; overflow: hidden;"></div>
		</div>
	</div>
</section>
