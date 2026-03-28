# Bilal N. Nasser Portfolio - GEMINI.md

## Project Overview
This project is a modern, high-performance personal portfolio website built using the **Next.js 16 App Router** and **React 19**. It features a "Brutalist System" aesthetic with a dark technical theme, monospace typography, and high-interactivity.

- **Framework:** Next.js 16.2.1 (App Router)
- **Library:** React 19.2.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 with `oklch` color tokens
- **Animations:** 
  - **GSAP:** For high-performance imperative animations, complex transitions, and scroll-triggered effects.
- **UI Components:** shadcn/ui (customized), Base UI primitives (v1.3.0+)
- **Icons:** Lucide React
- **Design:** Brutalist, Dark Navy (`#08090f`), Accent Cyan (`#89b4fa`), Grid overlays.

## Documentation References
- **Base UI:** [https://base-ui.com/llms.txt](https://base-ui.com/llms.txt) (Mandatory for component implementation)
- **Next.js:** Official App Router documentation.
- **Tailwind 4:** CSS-first configuration.

## Architecture
- `src/app/`: Application routes, layouts, and global `globals.css`.
- `src/components/`:
  - `ui/`: Reusable primitive components. Follows shadcn/ui pattern but uses **Base UI** logic.
  - `shared/`: Generic components (Navbar, Footer, CustomCursor).
- `src/features/`: Feature-sliced architecture.
  - `home/`: Page-specific sections (Hero, TechTicker, ProjectMatrix, etc.).
- `src/lib/`: Core utilities (`cn` helper) and providers.

## Building and Running
| Command | Description |
| :--- | :--- |
| `bun dev` | Starts development server. |
| `bun run build` | Production build. |
| `bun run typecheck` | Runs type checking and linting. |

## Development Conventions

### Styling & Theme
- **Color:** Primary background is `#08090f`. Accent is `#89b4fa` (Cyan).
- **Typography:** Sans-serif for headings, Monospace for technical data/subtitles.
- **Grid:** Use `bg-grid-pattern` for the blueprint/matrix look.

### Base UI Integration
- **Polymorphism:** Use the `render` prop for element composition instead of `asChild` (which is Radix-specific).
- **Example:** `<Button render={<a href="..." />} />`

### Animations
- **GSAP Context:** Always use `gsap.context()` inside `useEffect` or `useLayoutEffect` for proper cleanup in React.
- **ScrollTrigger:** Utilize GSAP's ScrollTrigger for viewport-dependent reveals and parallax effects.

### Quality Control
- **Typecheck:** Run `bun run typecheck` regularly to verify `tsc` and `eslint`.
- **Naming:** Uppercase for "system-level" identifiers (e.g., `PROJECT_MATRIX`, `ESTABLISH_COMM`).
