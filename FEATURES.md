# 💡 Safe Menu — Feature Suggestions

> A realistic, prioritised list of features to build next.
> Organised by skill level — from things you can build now to things that will push you forward.

---

## 🟢 Level 1 — You Can Build These Now
*Uses only what you already know: React, TypeScript, CSS, browser APIs*

### 1. PWA — "Add to Home Screen"
**What:** Users can install Safe Menu on their phone like a real app — icon on home screen, fullscreen mode, no browser chrome.
**How:** Add a `manifest.json` file and a service worker. Vite has a plugin for this (`vite-plugin-pwa`).
**Impact:** Makes the app feel like a real product instantly. Free.
**Effort:** Half a day.

---

### 2. Allergy Card Export
**What:** A button that generates a printable/shareable card showing the user's allergies. Like a medical card they can show restaurant staff.
**How:** Use the browser's `window.print()` or generate a styled HTML page that prints cleanly.
**Impact:** Genuinely useful in real life — especially for severe allergies.
**Effort:** 1 day.

---

### 3. Favourites
**What:** Heart button on each dish — save favourites across visits.
**How:** localStorage array of product IDs. Already have the architecture for it (FavoritesContext was planned in the original roadmap).
**Impact:** Better UX, users come back to their saved dishes.
**Effort:** Half a day.

---

### 4. Search
**What:** Search bar on the menu screen — filter dishes by name in real time.
**How:** TheMealDB has a search endpoint (`/search.php?s=query`). Or filter the already-loaded products client-side.
**Impact:** Essential for menus with many dishes.
**Effort:** Half a day.

---

### 5. Contact Page
**What:** Migrate the contact form from V1 into V2.
**How:** Simple form, no backend needed — just `mailto:` link or a free service like Formspree.
**Impact:** Completes the app.
**Effort:** 2 hours.

---

## 🟡 Level 2 — Small Step Up
*Introduces one new concept at a time*

### 6. Supabase Auth (Real Login)
**What:** Real email + password accounts. Allergies saved to a database, available on any device.
**How:** Supabase is a free hosted database + auth service. You write JavaScript to call their API — no server needed. It's the easiest possible introduction to backend concepts.
**What you'll learn:** API calls with authentication, database basics, environment variables.
**Effort:** 2-3 days of learning + building.
**Cost:** Free tier is generous (50,000 monthly active users).

---

### 7. QR Code Generation
**What:** Each venue gets a QR code. Guests scan it and go directly to that venue's safe menu — no need to select from the list.
**How:** `qrcode` npm package generates QR codes in the browser. No backend needed for generation.
**What you'll learn:** npm packages, file/image generation in the browser.
**Effort:** 1 day.

---

### 8. Allergy Severity Levels
**What:** Instead of just "I have this allergy", users can set severity: Intolerance / Allergy / Severe (EpiPen).
**How:** Extend the GuestProfile type with a severity map. Show different warning levels on product cards.
**Impact:** More medically accurate and useful.
**Effort:** 1 day.

---

### 9. Multi-language Support (Greek + English)
**What:** Toggle between Greek and English UI.
**How:** `i18next` library — the most popular solution. You create a JSON file for each language with all UI text strings.
**What you'll learn:** Internationalisation (i18n), working with a popular library.
**Effort:** 2 days.

---

### 10. Allergen Validation via Open Food Facts API
**What:** When a dish is detected as containing an allergen, cross-reference with the Open Food Facts database to confirm ingredient data.
**How:** Open Food Facts is a free, open database of food products and their allergens. No API key required.
**API:** `https://world.openfoodfacts.org/api/v2/product/{barcode}.json`
**What you'll learn:** Working with multiple APIs, data normalisation.
**Note:** Works best for packaged food products (has barcode lookup), less useful for restaurant dishes.
**Effort:** 2 days.

---

## 🔴 Level 3 — Stretch Goals
*These push you into backend and full-stack territory*

### 11. Restaurant Dashboard
**What:** A separate login for restaurant owners. They log in, upload their own menu (dish names + ingredients), and their customers scan a QR code to see that specific menu filtered for their allergies.
**How:** Supabase database + React admin panel. Two types of users: guests and restaurant owners.
**What you'll learn:** Database design, role-based access, file uploads.
**Effort:** 1-2 weeks.
**Impact:** This is the actual product — the thing that makes Safe Menu a real business.

---

### 12. AI Menu Photo Scanner
**What:** User takes a photo of a paper menu → AI reads it → Safe Menu extracts dishes and detects allergens automatically.
**How:** Anthropic's Claude API or OpenAI Vision API. Send the image, receive structured JSON back.
**What you'll learn:** AI APIs, image handling, prompt engineering.
**Cost:** Small per-request cost (fractions of a cent per scan).
**Effort:** 3-4 days once you have auth set up.
**Impact:** This is Phase 2's killer feature — no QR needed, works with any restaurant.

---

### 13. Map & Discovery
**What:** A map showing nearby restaurants that use Safe Menu. Tap a pin, see their safe menu.
**How:** Leaflet.js (free, open source map library) + restaurant location data in Supabase.
**What you'll learn:** Maps, geolocation, combining multiple data sources.
**Effort:** 1 week.

---

## Recommended Learning Path

If you want to build all of this step by step:

```
Now          → PWA + Favourites + Search (pure React)
Month 1      → Supabase Auth (first backend experience)
Month 2      → Restaurant dashboard (full-stack)
Month 3      → AI menu scanner (APIs)
Month 4      → Map & discovery (launch-ready product)
```

Each step teaches exactly what you need for the next one. No gaps, no jumping into the deep end.

---

## Can We Add API Validation?

Yes — and here are the realistic options:

| Validation Type | API | Free? | Difficulty |
|---|---|---|---|
| Food allergen data | Open Food Facts | ✅ Yes | Medium |
| Ingredient lookup | Spoonacular | ⚠️ Limited free | Medium |
| Menu text from photo | Claude API / OpenAI | ⚠️ Pay per use | Medium |
| Address/location | OpenStreetMap Nominatim | ✅ Yes | Medium |
| Email validation (auth) | Supabase built-in | ✅ Yes | Low |

The most impactful one to add **right now** is **Open Food Facts** — it's completely free, no key needed, and directly relevant to allergen detection.

