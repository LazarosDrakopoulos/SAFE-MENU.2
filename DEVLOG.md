# 📓 Safe Menu — Developer Log

> A personal log of how Safe Menu was built, decisions made, and lessons learned.
> Written for anyone curious about the project — technical or not.

---

## What is Safe Menu?

Safe Menu is a web application that helps people with food allergies eat safely at restaurants.

Instead of asking staff about every ingredient, you open the app, tell it your allergies once, pick a venue — and it shows you only the dishes that are safe for you. Everything unsafe is hidden or clearly marked.

The idea came from real life: working in a professional kitchen, seeing how stressful it is for guests with allergies to navigate a menu — and how easy it is for mistakes to happen.

---

## Version 1 — The Beginning

**Tech used:** HTML, CSS, JavaScript (no frameworks)

The first version was built as a learning project. Pure fundamentals — no libraries, no build tools, no frameworks. Just files in a folder.

### What it did
- Let users select allergens from an icon grid
- Filtered a hardcoded menu list based on selections
- Saved preferences in the browser (localStorage)
- Had a basic splash screen, navbar, and First Aid page

### What was good about it
- Fast to build
- Easy to understand
- Proved the concept worked

### What were the problems
- All menu data was hardcoded — adding a new dish meant editing JavaScript manually
- No real structure — one giant CSS file, logic scattered across files
- Not mobile-first — felt like a website, not an app
- No navigation that felt like a real mobile app
- Hard to scale or add features

---

## Version 2 — The Rebuild

**Tech used:** React 19, TypeScript, Vite, React Router, CSS Modules, TheMealDB API

After V1 proved the concept, V2 was built from scratch as a proper application.

### Why a full rebuild instead of improving V1?

V1 had structural problems that couldn't be patched. The code wasn't organised in a way that could grow. A rebuild with the right foundation was faster than fixing the wrong one.

### Key decisions

**React + TypeScript**
React handles the UI as components — reusable, isolated pieces. TypeScript adds type safety, which catches bugs before the app even runs. For example, if an allergen ID is misspelled anywhere in the code, TypeScript catches it immediately.

**CSS Modules instead of one big CSS file**
Each component has its own CSS file. Styles can't accidentally affect other parts of the app. The entire visual design is driven by CSS custom properties (variables) defined once in `tokens.css` — change the primary color in one place and it updates everywhere.

**Service layer abstraction**
All data fetching goes through service files (`productService.ts`, `shopService.ts`). The rest of the app never talks to the API directly. This means connecting a real restaurant API later requires changing one file — nothing else.

**TheMealDB API**
Free, stable, no API key required. Provides real dish names, descriptions, images, and ingredient lists. Safe Menu's allergen detection reads these ingredient lists and automatically flags which allergens each dish contains.

**Context API for state**
Three global states: guest profile (name + allergies), selected shop, and auth mode. All persisted to localStorage so the app remembers you between visits.

---

## The User Journey (Phase 1)

```
Open app
  → Splash screen (logo animation)
  → Auth screen (Continue as Guest — Login coming soon)
  → Onboarding form (name, emergency contact, allergies)
  → Shop selection (5 venues)
  → Safe Menu (filtered by your allergies)
  → Product detail (ingredients + allergen breakdown)

Bottom navigation:
  Menu | Allergies | Profile | First Aid
```

---

## Deployment

The app is deployed on GitHub Pages, automatically rebuilt and redeployed every time code is pushed to the `main` branch via GitHub Actions.

**Live:** https://lazarosdrakopoulos.github.io/SAFE-MENU.2/

The CI/CD pipeline (`.github/workflows/deploy.yml`):
1. Checks out the code
2. Installs dependencies with `npm ci`
3. Builds the app with `npx vite build`
4. Uploads the built files as a GitHub Pages artifact
5. Deploys automatically

---

## Challenges & Lessons Learned

### 1. GitHub Pages + React Router
GitHub Pages serves static files. When a user refreshes on `/menu`, GitHub looks for a `menu/index.html` file — which doesn't exist — and returns 404. This is a known limitation. The fix involves a `404.html` redirect trick. Planned for implementation before Phase 2.

### 2. Asset paths with a base URL
Vite needs to know the base path (`/SAFE-MENU.2/`) to prefix all asset URLs correctly. However, plain string references in JSX (`src="/smlogo.png"`) are NOT processed by Vite — only imported assets are. The fix: use template literals with `import.meta.env.BASE_URL`.

```tsx
// ❌ Wrong — hardcoded, breaks on GitHub Pages
<img src="/smlogo.png" />

// ✅ Correct — Vite injects the correct base path
<img src={`${import.meta.env.BASE_URL}smlogo.png`} />
```

### 3. node_modules in Git
Early in the project, `node_modules` (thousands of dependency files) was accidentally tracked by Git. This caused slow commits, push failures, and path-length errors on Windows. Fixed by adding `node_modules/` to `.gitignore` and removing it from Git tracking with `git rm -r --cached`.

### 4. Allergen detection from ingredients
TheMealDB returns ingredient names like `"plain flour"`, `"whole milk"`, `"free range eggs"`. Safe Menu detects allergens by checking if any known keyword appears as a substring of each ingredient. Example: `"plain flour"` contains `"flour"` → flagged as Gluten. This approach works well but isn't perfect — it can miss unusual ingredient names. A curated keyword list in `data/allergens.ts` is the single place to improve accuracy.

---

## Project Structure

```
safe-menu-v2/
├── public/              # Static assets (logo, favicon)
├── src/
│   ├── styles/          # Design tokens, reset, global, animations
│   ├── types/           # TypeScript interfaces
│   ├── data/            # In-memory data (allergens, shops)
│   ├── services/        # API abstraction layer
│   ├── context/         # Global state (Auth, Guest, Shop)
│   ├── hooks/           # Custom React hooks
│   ├── components/      # Reusable UI components
│   └── pages/           # Screen-level components
├── .github/workflows/   # GitHub Actions CI/CD
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Tech Stack Summary

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| React Router v7 | Client-side navigation |
| CSS Modules | Scoped component styles |
| CSS Custom Properties | Design token system |
| Context API + useReducer | Global state management |
| localStorage | Persistent user preferences |
| TheMealDB API | Real menu data + images |
| GitHub Actions | Automated deployment |
| GitHub Pages | Hosting |

---

*Last updated: July 2025*
