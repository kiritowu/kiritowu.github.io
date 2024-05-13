// compile-latex-template.js

import fs from 'fs';
import { Command } from 'commander';
import { default as nunjucks } from 'nunjucks';
// import profile from "../src/lib/profile.json" with { type: "json" };

const main = (templatePath, outputPath, profilePath) => {
	console.log(`Compiling ${templatePath} with ${profilePath}`);
	// Read and parse profile from profilePath
	const profileString = fs.readFileSync(profilePath);
	const profile = JSON.parse(profileString);

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

	// Compile the Template based on profile.json
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
	.option('-p, --profile <path>', 'Path to profile.json', './src/lib/profile.json')
	.action((options) => {
		return main(options.template, options.output, options.profile);
	});

// Parse the command line arguments
program.parse(process.argv);
