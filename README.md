# Kavo Private Limited — corporate website

A static, dependency-free site for Kavo Private Limited (Male', Republic of Maldives):
import & export, construction, and real estate.

Built to the **Kavo Brand Kit v1.0** imported from Claude Design
(`Kavo Brand Kit.dc.html`).

## Running it

Any static server will do:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>. There is no build step and no dependencies —
just HTML, one stylesheet and one script.

## Structure

```
index.html            Home — the chain, the three businesses, recent work
import-export.html    Sourcing, freight, clearance, warehousing, export
construction.html     What we build, how we contract, project list
real-estate.html      Portfolio, services, tenant and owner commitments
about.html            Story, commitments, governance
contact.html          Details and enquiry form
css/kavo.css          All styling. Brand tokens are at the top in :root
js/kavo.js            Mobile nav, scroll reveals, the stage rail, form handoff
assets/               Logo files and generated favicons
```

## Design notes

The brand palette is a depth ramp — Reef, Lagoon, Channel, Deep, Abyss — so the
site uses it as a **sequence** rather than as decoration. The five-stage chain
(land → store → build → hand over → manage) runs through the hero diagram and
again as the sticky rail beside the three business sections. That chain is also
the commercial argument: Kavo imports what it builds with, and manages what it
builds.

Brand rules observed:

- **Gradient-first.** No flat brand-colour fills anywhere.
- **60 / 25 / 15.** Light ground dominates; the lagoon gradient carries emphasis;
  abyss anchors the footer and the calls to action.
- **Legibility.** White text only from Lagoon Aqua downward in value; Abyss on mint.
- **Type.** Poppins for display, IBM Plex Sans for text, IBM Plex Mono for labels
  and figures.

## Logo assets

Two of the five brand files could not be retrieved in full — `kavo-logo.png`
(full-colour lockup) and `kavo-mark.png` (full-colour mark) both exceeded the
256 KiB read limit and came back truncated. Rather than fabricate the artwork,
the site uses only the complete, approved variants:

| File | Used for |
| --- | --- |
| `assets/kavo-logo-white.png` | source for the white-knockout lockup |
| `assets/kavo-logo-deep.png` | source for the one-colour deep-teal lockup |
| `assets/kavo-mark-white.png` | source for the mark |
| `assets/kavo-lockup-deep.png` | header, on light ground (trimmed, no artwork change) |
| `assets/kavo-lockup-white.png` | footer, on the depth gradient (trimmed) |
| `assets/kavo-avatar.png` + favicons | mark knocked out of the lagoon gradient, per the kit's avatar rule |

**To do:** supply `kavo-logo.png` and `kavo-mark.png` (or, better, the vector
masters) and the full-colour lockup can go into the header where the brand
intends it.

## Content that still needs your input

Everything below is a **placeholder written to be replaced**. None of it is drawn
from company records.

| Where | What to replace |
| --- | --- |
| All pages, footer | `info@kavo.mv` — still the brand kit's placeholder address |
| `contact.html` | Office street address, warehouse address, opening hours |
| `index.html` | The four figures: 2009, 140, 6, 24 |
| `index.html` | "Recent work" table — five rows |
| `import-export.html` | Product lines, source markets and transit times |
| `construction.html` | Project table — eight rows |
| `real-estate.html` | Portfolio counts, unit sizes, terms |
| `real-estate.html` | Tenant and owner service commitments (these are promises — check them) |
| `about.html` | Founding year and story, headcount, governance claims |
| All pages | Photography slots (hatched panels) — drop real images in |

The governance and insurance statements on `about.html`, and the response-time
commitments on `real-estate.html` and `contact.html`, are the ones to check
first — they read as commitments to a customer.

## The enquiry form

`contact.html` has no backend. On submit it composes a `mailto:` to
`info@kavo.mv` with the fields filled in, and says so on the page, so nothing is
silently dropped. To take submissions server-side, replace the `data-mailto`
handler in `js/kavo.js` with a POST to your endpoint.

## Browser support

Modern evergreen browsers. Scroll reveals degrade gracefully: without
JavaScript, a `<noscript>` rule shows all content immediately. Reduced-motion
preferences are respected throughout.
