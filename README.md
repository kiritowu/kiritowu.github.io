# Zhao Wu's Personal Website

My personal website built with [SvelteKit](https://kit.svelte.dev/) and [TailwindCSS](https://tailwindcss.com/).

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev --open
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

## Deploying to GitHub Pages

To deploy the production build to GitHub Pages, simply commit and push the changes to `main` branch.

A Github Action(`.github/workflows/deploy.yml`) is provided to deploy the built state static website to [Github Pages](https://pages.github.com/).
