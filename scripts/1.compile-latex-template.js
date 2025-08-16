// compile-latex-template.js

import fs from 'fs';
import YAML from 'yaml';
import { Command } from 'commander';
import { default as nunjucks } from 'nunjucks';
import { default as nunjucksDate } from 'nunjucks-date';

const main = (templatePath, outputPath, profilePath) => {
	console.log(`Compiling ${templatePath} with ${profilePath}`);
	// Read and parse profile from profilePath
	const profileString = fs.readFileSync(profilePath, 'utf8');
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

	// Compile the Template based on profile.yaml
	const result = env.render(templatePath, profile);

	// Write the result to a file
	fs.writeFileSync(outputPath, result);

	console.log(`${outputPath} has been generated!`);
};

const program = new Command();
program
	.version('0.1.0')
	.description('Compile and export LATEX template using nunjucks')
	.option('-t, --template <path>', 'Path to template.tex', './tex/template.tex')
	.option('-o, --output <path>', 'Path to output.tex', './tex/WongZhaoWu-resume.tex')
	.option('-p, --profile <path>', 'Path to profile.yaml', './src/lib/profile.yaml')
	.action((options) => {
		return main(options.template, options.output, options.profile);
	});

// Parse the command line arguments
program.parse(process.argv);
