# Bilal N. Nasser Portfolio - GEMINI.md

## Project Overview
This project is a modern, high-performance personal portfolio website built using the **Next.js 16 App Router** and **React 19**. It leverages **Tailwind CSS 4** for styling and a collection of accessible, reusable UI components based on **shadcn/ui** and **Base UI**.

- **Framework:** Next.js 16.2.1 (App Router)
- **Library:** React 19.2.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 with `oklch` color tokens
- **Package Manager:** Bun (primary), though compatible with others.
- **UI Components:** shadcn/ui (customized), Base UI primitives
- **Icons:** Lucide React
- **Animation:** tw-animate-css
- **Forms:** React Hook Form + Zod

## Architecture
- `src/app/`: Contains the application's routes, layouts, and global styles (`globals.css`).
- `src/components/`:
  - `ui/`: Reusable primitive components (e.g., Button, Card, Carousel). These follow the shadcn/ui pattern but are customized to use Tailwind 4 and Base UI.
  - `shared/`: Generic components used across multiple features.
- `src/features/`: Feature-sliced architecture for domain-specific logic.
  - `home/`: Components and common logic specific to the home page.
- `src/core/`: Application-wide core configurations and state.
- `src/lib/`: Core utility functions (`utils.ts`) and global providers (`providers/`).
- `public/`: Static assets such as logos and images.

## Building and Running
The project uses `bun` as the primary package manager.

| Command | Description |
| :--- | :--- |
| `bun dev` | Starts the development server at `http://localhost:3000`. |
| `bun run build` | Compiles the application for production. |
| `bun run start` | Runs the built production server. |
| `bun run lint` | Executes ESLint to check for code quality issues. |

## Development Conventions

### Styling
- **Tailwind CSS 4:** Utilize the new `@theme` block in `src/app/globals.css` for defining design tokens.
- **Color Space:** Theme variables use `oklch()` for better perceptual uniformity and wider gamut support.
- **Class Merging:** Always use the `cn(...)` utility from `@/lib/utils` when combining conditional Tailwind classes.

### Components
- **Client Components:** Use the `"use client"` directive at the top of files that require state, effects, or browser APIs.
- **UI Primitives:** When adding new UI components, place them in `src/components/ui/` and follow the established pattern of separating logic (Base UI) from styling (Tailwind + CVA).
- **Feature Slicing:** Prefer grouping page-specific components in `src/features/[feature]/components/` to keep `src/components/ui/` clean.

### TypeScript & Linting
- Strict typing is encouraged for all components and utilities.
- Run `bun run lint` before committing to ensure adherence to established code standards.

### Routing
- Follow the Next.js App Router conventions: use `page.tsx` for routes and `layout.tsx` for shared structures.
