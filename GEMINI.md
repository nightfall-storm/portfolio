# Bilal Nnasser Portfolio - GEMINI.md

## Project Overview
This project is a high-performance personal portfolio built with **Next.js 16 (App Router)** and **React 19**. It implements a **"Command Center" / "Precise Editorial"** aesthetic, characterized by a dark technical theme, monospace typography, and ultra-high-density data visualization.

- **Developer:** Bilal Nnasser
- **Role:** Software Engineer (3+ Years Experience)
- **Framework:** Next.js 16.2.1
- **Styling:** Tailwind CSS 4 (OKLCH tokens)
- **Animations:** 
  - **GSAP:** Primary for high-performance scroll-triggered reveals and staggers.
  - **motion/react:** For micro-interactions, layout transitions, and interactive components.
- **UI Architecture:** Brutalist technical layout with industrial precision.

## Core Architectural Mandates

### 1. "Command Center" Aesthetics
- **Visual Baseline:** Dark background (`#08090f`), accent cyan (`#89b4fa`).
- **Typography:** **Geist Sans** for primary display headings; **Geist Mono** for all technical metadata, logs, and system identifiers.
- **UI Density:** Fixed top-bar HUD, real-time clock, coordinate markers, and grid overlays (`bg-grid-24`).
- **Mechanical Feel:** Use ultra-thin borders and sharp `rounded-none` border-radii.

### 2. Implementation Conventions
- **Polymorphism:** Use Base UI's `render` prop for component composition.
- **System Naming:** Use uppercase for system-level identifiers (e.g., `SYSTEM_MANIFEST.JSON`, `PRJ_01`, `ESTABLISH_COMM`).
- **Color Discipline:** Inherit visual styling strictly from variables defined in `globals.css`. Avoid hardcoded hex codes.

### 3. Animation Protocol
- **GSAP Context:** Always use `gsap.context()` inside `useLayoutEffect` for proper cleanup in React components.
- **Scroll Effects:** Utilize `gsap.fromTo` with `stagger` for section reveals. 
- **Easings:** Prefer precise, mechanical easings like `expo.out`, `circ.out`, or `[0.16, 1, 0.3, 1]`. Avoid bouncy "spring" animations.
- **Hydration Safety:** Use `suppressHydrationWarning` for dynamic data components (e.g., real-time clock).

## Architecture
- `src/features/home/components/`:
  - `Hero.tsx`: The Manifest (Role, Stack, OS: Linux/Fedora/Ubuntu).
  - `ExperienceSection.tsx`: Professional Log (Logiciel Lab, MediaCaris, ECI).
  - `ProjectMatrix.tsx`: The Matrix (SavorScan, Fasgo, Postuly, Mobile Apps).
  - `AcademySection.tsx`: Academic Credentials (ENSI, FEDE, ISMONTIC).
  - `TechTicker.tsx`: Horizontal tech registry marquee.
  - `ContactSection.tsx`: Uplink Protocol (Freelance/Opportunity focus).

## Building and Running
| Command | Description |
| :--- | :--- |
| `bun dev` | Starts development server. |
| `bun run build` | Production build. |
| `bun run typecheck` | Comprehensive TypeScript and ESLint verification. |

## Quality Control
- **Responsiveness:** Components must be fluid and mobile-first. Disable erratic tilt effects on touch devices using pointer media queries.
- **Technical Precision:** All project descriptions must be engaging for non-developers while maintaining technical depth in the "log" sections.
