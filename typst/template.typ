#import "@preview/basic-resume:0.2.9": *

// Put your personal information here, replacing mine
#let name = "<$ profile.lastName $> <$ profile.firstName $>, <$ profile.nickName $>"
#let email = "<$ contact.email $>"
#let github = "<$ contact.github $>"
#let linkedin = "<$ contact.linkedin $>"
#let phone = "+65 xxxx-xxxx"
#let personal-site = "<$ contact.website $>"

#show: resume.with(
  author: name,
  // All the lines below are optional.
  // For example, if you want to to hide your phone number:
  // feel free to comment those lines out and they will not show.
  // location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  phone: phone,
  personal-site: personal-site,
  accent-color: "#26428b",
  font: "New Computer Modern",
  font-size: 9pt,
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

/*
 * Lines that start with == are formatted into section headings
 * You can use the specific formatting functions if needed
 * The following formatting functions are listed below
 * #edu(dates: "", degree: "", gpa: "", institution: "", location: "", consistent: false)
 * #work(company: "", dates: "", location: "", title: "")
 * #project(dates: "", name: "", role: "", url: "")
 * certificates(name: "", issuer: "", url: "", date: "")
 * #extracurriculars(activity: "", dates: "")
 * There are also the following generic functions that don't apply any formatting
 * #generic-two-by-two(top-left: "", top-right: "", bottom-left: "", bottom-right: "")
 * #generic-one-by-two(left: "", right: "")
 */

== Education
<% for edu in education %>
#edu(
  institution: "<$ edu.school $>",
  location: "Singapore", // TODO: customize location per edu
  dates: dates-helper(
    start-date: "<$ edu.startDate $>",
    end-date: "<$ edu.endDate $>",
  ),
  degree: "<$ edu.qualification $>",
  consistent: false,
)<% for d in edu.descriptions %>
- <$ d $><% endfor %><% endfor %>
== Work Experience
<% for exp in experience %>
<% if exp.org in resume.experience %>
<% if exp.isJob %>
#work(
  title: "<$ exp.title $>",
  location: "Singapore",
  company: "<$ exp.org $>",
  dates: dates-helper(
    start-date: "<$ exp.startDate $>",
    end-date: "<$ exp.endDate | default('Present') $>",
  ),
)<% for d in exp.descriptions %>
- <$ d $><% endfor %>
<% endif %>
<% endif %><% endfor %>
== Projects
<% for name, cat in projects %>
<% for project in cat %>
<% if project.title in resume.projects %>
#project(
  name: "<$ project.title $>",
  // Role is optional
  // role: "Maintainer",
  // Dates is optional
  dates: dates-helper(end-date: "<$ project.year $>"),
  // URL is also optional
  // url: "hyperschedule.io",
)<% for d in project.longDescriptions %>
- <$ d $><% endfor %>
<% endif %>
<% endfor %>
<% endfor %>



// == Extracurricular Activities

// #extracurriculars(
//   activity: "Capture The Flag Competitions",
//   dates: dates-helper(start-date: "Jan 2021", end-date: "Present"),
// )
// - Founder of Les Amateurs (#link("https://amateurs.team")[amateurs.team]), currently ranked \#4 US, \#33 global on CTFTime (2023: \#4 US, \#42 global)
// - Organized AmateursCTF 2023 and 2024, with 1000+ teams solving at least one challenge and \$2000+ in cash prizes
//   - Scaled infrastructure using GCP, Digital Ocean with Kubernetes and Docker; deployed custom software on fly.io
// - Qualified for DEFCON CTF 32 and CSAW CTF 2023, two of the most prestigious cybersecurity competitions globally
//
// #extracurriculars(
//   activity: "Science Olympiad Volunteering",
//   dates: "Sep 2023 --- Present"
// )
// - Volunteer and write tests for tournaments, including LA Regionals and SoCal State \@ Caltech

// #certificates(
//   name: "OSCP",
//   issuer: "Offensive Security",
//   // url: "",
//   date: "Oct 2024",
// )
== Skills
- *Programming Languages*: Python, TypeScript, JavaScript, SQL, HTML, CSS, Bash
- *Frameworks and Tools*: Next.js, SvelteKit, FastAPI, NestJS, Fastify, Node.js, Tailwind CSS, PostgreSQL, MySQL, MongoDB, PyTorch, Hugging Face, Scikit-Learn, NumPy, Pandas, Git, LaTeX
- *Deployment Experience*: Google Cloud Platform, Firebase, Supabase, Docker, Kubernetes, Helm, Kubeflow
- *Personal Traits*: Natural Leader, Team Player, Fast Learner, Critical Thinker

// \item \textbf{Programming Language: } Python, Typescript, Javascript, SQL, HTML, CSS, Bash
// \item \textbf{Frameworks and Tools: } NextJS, SvelteKit, FastAPI, NestJS, Fastify, Node.JS, TailwindCSS, PostgreSQL, MySQL, MongoDB, Pytorch, Huggingface, Scikit-Learn, Numpy, Pandas, Git, \LaTeX
// \item \textbf{Deployment Experience: } Google Cloud, Firebase, Supabase, Docker, Kubenetes, Helm, Kubeflow
// \item \textbf{Personal Traits: } Natural Leader, Team Player, Fast Learner, Critical Thinker
//
