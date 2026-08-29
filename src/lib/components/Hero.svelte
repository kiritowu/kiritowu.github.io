<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import trailPhoto from '$lib/images/hero-trail.jpg?enhanced';

	export let lastName = '';
	export let nickName: string | null;
	export let githubLink: string;
	export let linkedinLink: string;
</script>

<section id="about" class="overflow-hidden px-5">
	<div
		class="mx-auto grid min-h-screen max-w-7xl items-center gap-12 pb-12 pt-28 md:grid-cols-[0.95fr_1.05fr] md:gap-14 md:pb-8 md:pt-24 lg:gap-16"
	>
		<div class="md:self-center">
			<h1
				class="m-0 text-[4.25rem] font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-primary dark:text-primary-dark sm:text-7xl md:text-[6.75rem] lg:text-[8rem] xl:text-[9rem]"
			>
				{nickName}<span class="block">{lastName}</span>
			</h1>
			<div class="mt-5 h-1 w-24 bg-primary" aria-hidden="true"></div>
			<p
				class="mt-6 max-w-2xl text-xl leading-relaxed tracking-[-0.015em] text-primary dark:text-primary-dark sm:text-2xl"
			>
				CS undergrad at NUS College '28<br /> Build AI products for People and for Good
			</p>
			<nav
				class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-base font-medium sm:gap-x-12 sm:text-lg"
				aria-label="Featured links"
			>
				<a
					class="group inline-flex items-center gap-2 hover:no-underline"
					href="/WongZhaoWu-resume.pdf"
					target="_blank"
					rel="noreferrer"
				>
					Résumé
					<ArrowUpRight
						size={18}
						strokeWidth={2.25}
						class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
					/>
				</a>
				<a 
				class="group inline-flex items-center gap-2 hover:no-underline"
				href={linkedinLink}
				target="_blank"
				rel="noreferrer"
				>
					Journey
					<ArrowUpRight
						size={18}
						strokeWidth={2.25}
						class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
					/>
				</a>
				<a
					class="group inline-flex items-center gap-2 hover:no-underline"
					href={githubLink}
					target="_blank"
					rel="noreferrer"
				>
					Projects
					<ArrowUpRight
						size={18}
						strokeWidth={2.25}
						class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
					/>
				</a>
			</nav>
		</div>

		<div
			class="aspect-[4/5] w-full max-w-[620px] justify-self-end md:h-[calc(100svh-8rem)] md:w-auto"
		>
			<enhanced:img
				class="h-full w-full rounded-[1.75rem] object-cover object-[52%_center]"
				src={trailPhoto}
				alt="Bryan smiling at the foot of Mount Kinabalu"
			/>
		</div>
	</div>
</section>
