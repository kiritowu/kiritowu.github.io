import fs from 'fs';
import { default as nunjucks } from 'nunjucks';
import profile from "../src/lib/profile.json" with { type: "json" };

var env = nunjucks.configure({
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


var result = env.render("template.tex", profile);

fs.writeFileSync("output.tex", result);
console.log(result)