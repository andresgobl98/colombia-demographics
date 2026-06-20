# CO Demográfica — Claude Code context

Civic data tool for Colombia. React 19 + Vite, Tailwind CSS v4, React Router v7.

## Dev commands

```bash
npm run dev      # start Vite dev server (port 5173)
npm run build    # production build
npm run lint     # ESLint
```

## Project structure

```
src/
  App.jsx                          # router root
  pages/
    DemographicsPage.jsx           # demographics section
    GovernmentPage.jsx             # government section shell
    government/
      LegislativeView.jsx          # congress hemicycle + roster UI
      ExecutiveView.jsx            # president/VP + cabinet
      JudicialView.jsx             # courts & organs of the judicial branch
  components/
    ui/
      Copy.jsx                     # text SSOT (type scale + AA-tuned colors)
      StatCard.jsx / ThemeToggle.jsx
    government/
      SeniorCard.jsx               # president/VP card
      MinistryCard.jsx             # expandable ministry card
      format.js                    # shared formatSince()
    maps/
      ColombiaMap.jsx              # main choropleth map (zoom, tooltip, legend)
      RepresentationMap.jsx        # department-selection map (legislative)
      SanAndresInset.jsx           # San Andrés inset overlay
      DepartmentGeography.jsx      # shared <Geography> w/ selection styling
      geo.js                       # GEO_URL, getDeptCode, useColombiaGeographies()
    charts/
      HemicycleChart.jsx           # parliament seat diagram (SVG)
      DonutChart.jsx
      BarBreakdown.jsx
      PopulationPyramid.jsx
  data/
    congress.js                    # chamber definitions + party metadata
    camara-members.json            # 186 Cámara members (real roster, xlsx-sourced)
    departments.json               # DANE dept codes + names
    metrics.js / selectors.js      # demographics data helpers
  layouts/AppLayout.jsx
public/
  colombia.geojson                 # department boundaries (DANE)
data/
  representantes-2025-2026.xlsx    # source xlsx for Cámara roster
```

## Component organization

**No spaghetti — pages compose, they don't define.** Don't declare main/reusable
components inline inside page files; it bloats them. A component that's a real
building block (cards, list rows, widgets) belongs under `src/components/`, grouped
by domain: `ui/` (generic — `Copy`, `StatCard`), `charts/`, `maps/`, `government/`.
Each folder has an `index.js` barrel — import through it
(`import { SeniorCard } from "../../components/government"`). Only tiny page-local
layout helpers (e.g. a one-off `Connector`/divider) may stay inline. De-duplicate
shared helpers into a module too (e.g. `formatSince` in `components/government/format.js`).

## Data architecture

### Congress (`src/data/congress.js`)

- `PARTY_META` — color + display name for each partyId
- `CONSTITUENCY_META` — human-readable labels for constituency tags
- `CHAMBERS.camara` — 188 seats, `byDepartment: true`, full 186-member roster, `seats` computed via `tallySeats(camaraMembers)`
- `CHAMBERS.senado` — 108 seats, `byDepartment: false`, verified sample roster, hardcoded seat counts
- `partiesForChamber(chamber)` — returns seats-descending array joined with metadata

### Member schema

```js
{
  id, name, partyId, constituency,
  departmentCode?,   // 2-digit DANE string, e.g. "05" = Antioquia, "11" = Bogotá
  commission,        // pipe-separated committee string from camara.gov.co
  email, phone, office
}
```

### Constituency types

| value | description |
|---|---|
| `territorial` | standard departmental seat |
| `nacional` | Senado national constituency |
| `citrep` | CITREP peace seats (16 in Cámara) |
| `comunes` | Comunes guaranteed peace seats (5 Senado, 5 Cámara) |
| `afro` | Afro-Colombian special constituency (2 Cámara) |
| `indigena` | Indigenous special constituency (2 Senado, 1 Cámara) |
| `internacional` | Colombians abroad (1 Cámara) |
| `runnerup` | Presidential runner-up opposition seat (1 each) |

CITREP seats use partyId `"citrep"` (no real party — each seat is a victim/community org).  
Afro seats use partyId `"afro"`. Indigenous seats use the senator's actual party (`mais`, `aico`).

## Maps

`RepresentationMap.jsx` uses `react-simple-maps` 3.0 with `geoMercator`:
```jsx
projectionConfig={{ center: [-74.3, 4.7], scale: 1950 }}
width={520} height={620}
```
Do not change `center`/`scale` without re-verifying the full map fits — San Andrés (top-left) is the constraint.

DANE department codes are 2-digit strings (`"05"`, `"11"`, not numbers). GeoJSON property read via `getDeptCode()` which tries multiple property names.

**Shared zoom/pan lives in one place** — both maps get identical wheel/drag/pinch
behaviour, animated tweening and +/- controls from `useMapZoom.js` (hook) and
`MapZoomControls.jsx` (the +/- and "Centrar mapa" buttons). A map just calls
`useMapZoom({ center, zoom })`, spreads `zoomableGroupProps` onto `<ZoomableGroup>`,
and renders `<MapZoomControls .../>`. Put any new shared map behaviour there, not in
the individual maps. `center` must be a stable (module-level) reference.
`ColombiaMap` additionally auto-zooms to the selected department via the hook's
`animateTo`; `RepresentationMap` is manual-zoom only (it's a picker).

## UI notes

- Mobile-first; Tailwind v4 (no config file — CSS-based)
- Dark mode via `dark:` variants
- Source data pills: `whitespace-nowrap` required inside flex-wrap parents or they wrap mid-word
- Commission strings from camara.gov.co are long; `shortCommission()` condenses them
- `HemicycleChart` SVG center label: `fontSize: 32` for total, `fontSize: 12` for "curules"

## Accessibility & readability (applies to all UI work)

- **Readability is a hard requirement.** Strive for accessible, legible UIs by default.
- **Contrast must pass WCAG AA** (≥4.5:1 normal text, ≥3:1 for large/bold text and
  actionable icons), in **both** light and dark. The `Copy` variants are tuned for
  this against Tailwind v4's oklch palette — measure, don't eyeball: on the
  `slate-100` page bg, slate-500 fails (~4.35) so muted page-bg text needs ≥slate-600;
  on `slate-800` cards, slate-500 fails (~3.07) so muted dark text needs ≤slate-400.
- **Render text through `<Copy>`** (`src/components/ui/Copy.jsx`) — the single source
  of truth for the type scale. Pick a semantic `variant` (`title`/`body`/`prose`/
  `strong`/`annotation`/`detail`/`eyebrow`); size comes from the variant, tone/weight
  can be nudged via `className`. Don't hand-roll `text-base`/`text-sm` on bare
  `<p>`/`<span>` for new UI. The one deliberate exception is the **San Andrés map inset
  name** (`SanAndresInset.jsx`) — leave it as-is.
- **Font-size policy (encoded in `Copy`): 16px (`text-base`) is the standard for real
  content; 14px (`text-sm`) is reserved for annotative/secondary text.** Reserve 12px
  (`text-xs`) for uppercase eyebrow/badge labels only. Never `text-[10px]`/`text-[11px]`.
- **Touch targets:** make the whole card/row tappable rather than a tiny inline link,
  and keep a visible affordance (e.g. a chevron) so the interaction is discoverable.
- Light-mode page background is `slate-100` (`#f1f5f9`, set in both `index.css` and
  `AppLayout`) so white containers (`bg-white`) read as raised surfaces. Card borders
  use `border-slate-200` (not `-100`) for the same contrast reason.

## Icons

Use **`@heroicons/react/24/outline`** — tree-shakeable, matches the app's stroke style
(the old hand-rolled SVGs were Heroicons paths). Import the named icon and pass a
`className` for sizing (`w-5 h-5`). Don't hand-author new icon `<path>` markup.
The GitHub logo and the brand pin are the only intentionally hand-rolled SVGs (brand marks).

## Data refresh

To update Cámara roster from a new xlsx:
1. Put xlsx in `data/`
2. Run a Python script with `openpyxl` — columns: number, name, party, commission, conscription, email, phone, office, url
3. Map conscription → constituency type (see logic in congress.js comments)
4. Map party name → partyId (Liberal → liberal, etc.; unmapped → otros)
5. Output to `src/data/camara-members.json`

## Commit style

Short one-line messages. No "Co-Authored-By" trailers.
