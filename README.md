# BigBrotr Deck

The presentation deck for [BigBrotr](https://github.com/BigBrotr/bigbrotr) — a modular
Nostr data archiving and monitoring system.

It is a self-contained, single-page slide deck built with **React** and **Vite**:
fifteen slides that walk through the problem BigBrotr solves, its architecture, and its
roadmap, navigable entirely from the keyboard.

## Development

```bash
npm install
npm run dev       # start the Vite dev server with hot reload
npm run build     # type-check and build the static site into dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

Move between slides with the arrow keys, `Space`, or `PageUp` / `PageDown`.

## Deployment

The build output is a static SPA. Deployment to [Vercel](https://vercel.com/) is
configured in `vercel.json` and runs automatically on push to `main`.

## License

MIT
