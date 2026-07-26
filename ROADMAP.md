# 🗺️ Safe Menu — Roadmap

> What's been built, what's coming next, and the long-term vision.

---

## ✅ Phase 1 — MVP (Complete)

The core experience: a guest can open the app, set their allergies, pick a venue, and see a filtered safe menu.

| Feature | Status |
|---|---|
| Splash screen with animation | ✅ Done |
| Auth screen (guest flow) | ✅ Done |
| Login/Register UI (disabled — Phase 2) | ✅ Done |
| Guest onboarding form | ✅ Done |
| Allergy selection (dropdown multi-select) | ✅ Done |
| Shop selection (5 venues) | ✅ Done |
| QR scan tab (disabled — Phase 2) | ✅ Done |
| Menu with real API data (TheMealDB) | ✅ Done |
| Allergen auto-detection from ingredients | ✅ Done |
| Safe/unsafe product filtering | ✅ Done |
| Category tabs on menu | ✅ Done |
| Product detail screen | ✅ Done |
| Allergen change screen | ✅ Done |
| Profile screen | ✅ Done |
| First Aid screen | ✅ Done |
| Bottom navigation | ✅ Done |
| localStorage persistence | ✅ Done |
| GitHub Pages deployment | ✅ Done |
| Auto CI/CD via GitHub Actions | ✅ Done |

---

## 🔄 Phase 1.5 — Polish (Next)

Small improvements that make the app feel complete and professional.

| Feature | Effort | Notes |
|---|---|---|
| Fix client-side routing 404 | Low | `404.html` redirect trick |
| PWA manifest | Low | "Add to Home Screen" support |
| Contact page | Low | Migrate from V1 |
| Skeleton loading cards | Medium | Better UX while menu loads |
| Page transition animations | Medium | Slide between routes |
| Error boundary | Low | Friendly error if API is down |
| Empty state illustrations | Low | Replace emoji with SVG art |
| Accessibility audit | Medium | ARIA labels, focus management |

---

## 🔐 Phase 2 — Authentication

Real user accounts. Allergies saved to a database, not just the browser.

| Feature | Effort | Notes |
|---|---|---|
| Email + password registration | Medium | Needs backend |
| Login / logout | Medium | JWT or session |
| Save allergen profile to DB | Medium | Per-user, not per-device |
| QR code scanning | Medium | Camera API + QR library |
| Restaurant-specific menus via QR | High | Restaurants upload their own menu |
| "Remember me" across devices | Low | Once auth is in place |

**Recommended backend:** Supabase (free tier, Postgres DB + auth built in, no server to manage)

---

## 🗺️ Phase 3 — Discovery

Finding safe restaurants, not just browsing one.

| Feature | Effort | Notes |
|---|---|---|
| Map view of nearby venues | High | Google Maps or Leaflet.js |
| Location-based filtering | High | Geolocation API |
| Restaurant onboarding portal | Very High | Separate admin dashboard |
| Real restaurant menu integration | Very High | Restaurants manage their own menus |
| Search restaurants by cuisine | Medium | Filter on map |
| "Safe near me" quick action | Medium | One tap from home screen |

---

## 💡 Future Ideas

- **Allergy card PDF export** — generate a printable card with your allergies to show restaurant staff
- **Multi-language support** — Greek + English toggle
- **Notifications** — "New safe dishes at your favourite venue"
- **Social** — share your safe menu picks with friends
- **AI ingredient scanner** — take a photo of a menu, extract text, detect allergens automatically

---

## Version History

| Version | Date | Description |
|---|---|---|
| V1.0 | 2024 | HTML/CSS/JS prototype |
| V2.0 | July 2025 | Full React + TypeScript rebuild |
| V2.1 | TBD | Polish + PWA |
| V3.0 | TBD | Real authentication |

