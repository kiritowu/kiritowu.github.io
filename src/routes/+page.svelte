<script lang="ts">
	import { marked } from 'marked';
	import moment from 'moment';
	import Typewriter from 'svelte-typewriter';
	import { onMount } from 'svelte';
	import { scaleOrdinal } from 'd3-scale';
	import { schemeCategory10 } from 'd3-scale-chromatic';
	import { forceManyBody, forceLink, forceCenter } from 'd3-force-3d';
	import type { NodeObject, LinkObject } from 'force-graph';
	import profile from '$lib/profile.json';
	import profilePic from '$lib/images/profile-pic-cropped.jpg';

	// Icons
	import icon_link from '$lib/images/link-linear.svg';
	import icon_github from '$lib/images/github.svg';
	import icon_linkedin from '$lib/images/linkedin.svg';

	// Change visble section
	let visibleSectionIdx = 0;

	// Load graph data
	interface NodeObjectWithSkills extends NodeObject {
		group?: string;
		color?: string;
		visible?: boolean;
	}
	const colorPicker = scaleOrdinal(schemeCategory10);
	const data: { nodes: NodeObjectWithSkills[]; links: LinkObject[] } = {
		nodes: [{ id: 'me', x: 0, y: 0, group: 'me', color: colorPicker('me') }],
		links: []
	};
	Object.entries(profile.skills).forEach(([topLevelSkills, skills]) => {
		data.nodes.push({
			id: topLevelSkills,
			group: 'tls',
			color: colorPicker('tls')
		});
		data.links.push({
			source: 'me',
			target: topLevelSkills
		});
		skills.forEach((skill) => {
			if (typeof skill === 'string') {
				data.nodes.push({
					id: skill,
					group: 'skill',
					color: colorPicker('skill')
				});
				data.links.push({
					source: topLevelSkills,
					target: skill
				});
			} else if (typeof skill === 'object') {
				Object.entries(skill).forEach(([subSkill, subSkillSkills]) => {
					data.nodes.push({
						id: subSkill,
						group: 'skill',
						color: colorPicker('skill')
					});
					data.links.push({
						source: topLevelSkills,
						target: subSkill
					});
					subSkillSkills.forEach((subSkillSkill) => {
						data.nodes.push({
							id: subSkillSkill,
							group: 'skill',
							color: colorPicker('skill')
						});
						data.links.push({
							source: subSkill,
							target: subSkillSkill
						});
					});
				});
			}
		});
	});
	onMount(async () => {
		const forceGraph = await import('force-graph');
		const skillMapGraph = forceGraph
			.default()(document.getElementById('graph')!)
			.graphData(data)
			.centerAt(-50, -50)
			.nodeId('id')
			.nodeLabel('id')
			.nodeColor('color')
			// Add text label
			.nodeCanvasObjectMode(() => 'after')
			.nodeCanvasObject((node, ctx, globalScale) => {
				const label = node.id as string;
				const fontSize = 8;
				ctx.font = `${fontSize}px Sans-Serif`;
				const textWidth = ctx.measureText(label).width;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'bottom';
				ctx.fillText(label, node.x!, node.y! + 25 / globalScale);
			})
			.linkSource('source')
			.linkTarget('target')
			.maxZoom(5)
			// .autoPauseRedraw(false)
			// D3 Forces
			.d3VelocityDecay(0.01)
			.d3Force('center', forceCenter().strength(1))
			.d3Force('link', forceLink().distance(30).strength(1))
			.d3Force('charge', forceManyBody().strength(-100));
	});
</script>

<svelte:head>
	<meta name="author" content="{profile.profile.firstName} {profile.profile.lastName}" />
	<meta name="description" content="{profile.profile.firstName}'s personal website" />
	<title
		>{profile.profile.nickName}
		{profile.profile.firstName
			.split(' ')
			.map((name) => name.charAt(0))
			.join('')}
		{profile.profile.lastName}</title
	>
</svelte:head>

<section id="hero" class="text-xl font-primary">
	<header class="flex items-center min-h-screen max-w-6xl">
		<div class="">
			<h3 class="my-3 font-mono text-secondary text-lg md:text-xl">Hi, my name is</h3>
			<Typewriter mode="loopOnce" keepCursorOnFinish={true} wordInterval={700}>
				{#each [`${profile.profile.firstName}`, `${profile.profile.ign}`, `${profile.profile.nickName} ${profile.profile.lastName}`, `${profile.profile.nickName} ${profile.profile.lastName} ${profile.profile.firstName}`] as text}
					<h1 class="my-3 text-5xl md:text-6xl text-left">{text}</h1>
				{/each}
			</Typewriter>
			<h1 class="my-5 text-xl md:text-4xl text-left font-extrabold font-heading text-secondary">
				NUSC w/ CS @ 2029
			</h1>
			<h3 class="my-2 text-lg md:text-xl">
				💡 Conscientiously Driven | 💻 Aspiring ML Engineer | 🏞️ Outdoor Adventurer
			</h3>
		</div>
	</header>
	<div id="graph" class="absolute my-auto top-0 right-0 w-4/5 h-4/5 -z-10"></div>
</section>

<section id="about" class="my-10">
	<h1 class="my-5">About Me</h1>
	<div class="flex md:flex-row flex-col justify-between">
		<div class="md:basis-1/3 px-10 mb-7">
			<img class="rounded-full shadow-lg shadow-slate-800" src={profilePic} alt="profile" />
		</div>
		<div class="md:basis-3/5">
			{#each profile.profile.descriptions as description}
				<p class="mb-2 text-lg">{@html marked(description)}</p>
			{/each}
		</div>
	</div>
</section>

<section id="skills" class="my-10">
	<h1 class="my-5">Skills</h1>
</section>

<section id="experience" class="my-10">
	<h1 class="my-5">Experience</h1>
	<section
		class="flex flex-col md:flex-row"
		on:wheel|preventDefault={(e) => {
			let bb = document
				.getElementById(profile.experience[visibleSectionIdx].org)
				?.getBoundingClientRect();
			if (bb && e.deltaY > 0) {
				visibleSectionIdx = Math.min(profile.experience.length - 1, visibleSectionIdx + 1);
			} else if (bb && e.deltaY < 0) {
				visibleSectionIdx = Math.max(0, visibleSectionIdx - 1);
			}
		}}
	>
		<div class="md:basis-1/4 pr-5">
			{#each profile.experience as experience, idx}
				<button
					class="w-full text-left text-lg mb-3 hover:text-secondary {visibleSectionIdx === idx
						? 'text-secondary'
						: 'opacity-80'}"
					aria-expanded={visibleSectionIdx === idx}
					on:click={() => {
						visibleSectionIdx = idx;
					}}>{experience.org}</button
				>
			{/each}
		</div>
		<div class="md:basis-3/4">
			{#each profile.experience as experience, idx}
				<article class="mb-5 {visibleSectionIdx === idx ? '' : 'hidden'}">
					<div class="flex md:flex-row flex-col justify-between mb-2">
						<h3 class="text-primary font-semibold text-xl">{experience.title}</h3>
						<p class="text-base mt-auto">
							{experience.startDate
								? moment(experience.startDate, 'MM/YYYY').format('MMM YYYY') + ' - '
								: ''}{experience.endDate
								? moment(experience.endDate, 'MM/YYYY').format('MMM YYYY')
								: 'Present'}
						</p>
					</div>
					<ul class="list-disc text-lg pl-5">
						{#each experience.descriptions as description}
							<li>{@html marked(description)}</li>
						{/each}
					</ul>
					<div class="flex justify-end">
						{#each experience.externalLinks as link}
							<a class="text-secondary mx-1" href={link} target="_blank">
								<img class="object-content w-8 h-8" src={icon_link} alt={link} />
							</a>
						{/each}
						{#if experience.linkedInLink}
							<a class="text-secondary mx-1" href={experience.linkedInLink} target="_blank">
								<img
									class="object-content w-8 h-8"
									src={icon_linkedin}
									alt={experience.linkedInLink}
								/>
							</a>
						{/if}
						{#if experience.githubLink}
							<a class="text-secondary mx-1" href={experience.githubLink} target="_blank">
								<img class="object-content w-8 h-8" src={icon_github} alt={experience.githubLink} />
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>
</section>

<section id="projects" class="my-10">
	<h1 class="my-5">Projects</h1>
</section>
