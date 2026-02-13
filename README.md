# GSAP Scroll Storytelling Website

I am experimenting with a skill that helps agents build GSAP Scrollytelling websites, and remotion to create visuals (ChatGPT 5.3 Codex used on this).

## Getting Started

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Key Scripts

```bash
npm run dev
npm run lint
npm run build
```

Remotion workflow:

```bash
npm run remotion:studio
npm run remotion:render:loops
```

## Project Notes

- Main page structure: `app/page.tsx`
- Scroll animation logic: `hooks/useScrollStory.ts`
- Story visuals: `components/story/StoryVisuals.tsx`
- Remotion compositions: `remotion/Root.tsx`, `remotion/scenes/StoryLoop.tsx`
