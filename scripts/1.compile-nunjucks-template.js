// compile-nunjucks-template.js

import fs from 'fs';
import YAML from 'yaml';
import { Command } from 'commander';
import { default as nunjucks } from 'nunjucks';
import { default as nunjucksDate } from 'nunjucks-date';

const DEFAULT_PROFILE_PATH = './src/lib/profile.yaml';

const main = (templatePath, outputPath, { profilePath, profileYaml }) => {
	const effectiveProfilePath = profilePath ?? DEFAULT_PROFILE_PATH;
	const profileSourceLabel =
		typeof profileYaml === 'string' ? 'YAML string (CLI)' : effectiveProfilePath;

	console.log(`Compiling ${templatePath} with ${profileSourceLabel}`);

	// Read and parse profile from either a yaml string or a yaml file
	const profileString =
		typeof profileYaml === 'string'
			? profileYaml
			: fs.readFileSync(effectiveProfilePath, 'utf8');
	const profile = YAML.parse(profileString);

	// Configure Nunjucks with Custom Tags for LaTeX
	const env = nunjucks.configure({
		autoescape: false,
		tags: {
			blockStart: '<%',
			blockEnd: '%>',
			variableStart: '<$',
			variableEnd: '$>',
			commentStart: '<#',
			commentEnd: '#>'
		}
	});

	// Add the nunjucks-date extension
	nunjucksDate.setDefaultFormat('MMM YYYY');
	nunjucksDate.install(env);

	// The Typst basic-resume package hardcodes a "https://" prefix when
	// building hyperlinks for the github/linkedin/personal-site fields
	// (link("https://" + value)). If profile.yaml already stores the full
	// URL (e.g. "https://github.com/foo"), the generated link becomes
	// "https://https://github.com/foo", which is an invalid URI and renders
	// as unclickable/broken text in the exported PDF. This filter strips any
	// existing protocol so the template can safely prepend its own
	// "https://" regardless of whether profile.yaml includes it.
	env.addFilter('stripProtocol', (value) => {
		if (typeof value !== 'string') return value;
		return value.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//, '');
	});

	// Compile the Template based on profile.yaml
	const result = env.render(templatePath, profile);

	// Write the result to a file
	fs.writeFileSync(outputPath, result);

	console.log(`${outputPath} has been generated!`);
};

const program = new Command();
program
	.version('0.1.0')
	.description('Compile nunjucks template to default output path')
	.option('-t, --template <path>', 'Path to template.typ', './typst/template.typ')
	.option('-o, --output <path>', 'Path to output.typ', './typst/out/WongZhaoWu-resume.typ')
	.option(
		'-p, --profile <path>',
		`Path to profile.yaml (mutually exclusive with --profile-yaml). Defaults to ${DEFAULT_PROFILE_PATH} if neither is provided.`
	)
	.option(
		'--profile-yaml <yaml>',
		'YAML content as a string (mutually exclusive with --profile)'
	)
	.action((options) => {
		if (options.profile && options.profileYaml) {
			console.warn(
				'Warning: --profile and --profile-yaml are mutually exclusive. Provide only one.'
			);
			process.exitCode = 1;
			return;
		}

		return main(options.template, options.output, {
			profilePath: options.profile,
			profileYaml: options.profileYaml
		});
	});

// Parse the command line arguments
program.parse(process.argv);
