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

## Deploying to cPanel

The repo carries a `.cpanel.yml`, so cPanel's **Git Version Control** can deploy
it. First open `.cpanel.yml` and check `DEPLOYPATH` matches the document root of
the domain — `$HOME/public_html` for a primary domain, `$HOME/kavo.mv` for an
addon domain (cPanel > Domains lists the real path).

### Option A — pull from GitHub (simplest)

1. cPanel > Files > **Git™ Version Control** > **Create**.
2. Turn on **Clone a Repository**.
   - Clone URL: `https://github.com/muxim/kavomaldives.git`
   - Repository Path: `/home/USERNAME/repositories/kavomaldives`
   - Repository Name: `kavomaldives`
3. **Create**. cPanel clones and checks out `main`.
4. To publish: **Manage** > **Pull or Deploy** > **Update from Remote**, then
   **Deploy HEAD Commit**.

Repeat step 4 after every push. If the repo is private, add an SSH key
(cPanel > SSH Access) to GitHub as a deploy key and clone
`git@github.com:muxim/kavomaldives.git` instead.

### Option B — push straight to cPanel (deploys on push)

Needs SSH access enabled on the account.

1. cPanel > **Git™ Version Control** > **Create**, leaving *Clone a Repository*
   **off**. Path `/home/USERNAME/repositories/kavomaldives`.
2. Add it as a second remote locally and push:

```bash
git remote add cpanel ssh://USERNAME@YOUR-SERVER:22/home/USERNAME/repositories/kavomaldives
```

```bash
git push cpanel main
```

cPanel queues a deployment on receipt. If it does not fire, click **Deploy HEAD
Commit** once — after that pushes deploy on their own. You can keep pushing to
GitHub as well: `git push origin main`.

### Things that trip this up

- **The repository must live outside `public_html`.** cPanel refuses to deploy a
  repo that sits in the document root. `~/repositories/` is the convention.
- **Deployment only runs from the checked-out branch**, and only if
  `.cpanel.yml` is present on it.
- **The working tree on the server must be clean.** Never edit files inside the
  repo directory over FTP or File Manager — edit locally, commit, push.
- **Deleted files are not removed from the server.** The tasks copy, they do not
  sync. If you delete a page, remove it from `public_html` by hand.
- Deployment output is in `~/.cpanel/logs/` if something fails silently.

### What gets deployed

The six HTML pages, `assets/`, `css/kavo.css`, `js/kavo.js`, and
`deploy/.htaccess` (which lands as `.htaccess` in the document root).
`README.md`, `.claude/` and the git history are not copied.

`deploy/.htaccess` turns on compression, sets modest cache headers, and lets
`/about` serve `about.html` while existing `.html` links keep working. Delete
the last task in `.cpanel.yml` if your host manages Apache config itself.

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

Kavo was registered in Male' in August 2026 and has no completed projects. The
site is written to say so plainly rather than imply a history it does not have,
so there is no project list, no client logos and no portfolio anywhere on it.

**Every claim on the site is about what Kavo will do, not what it has done.**
Three pages say this outright — the "We are new. The people are not." section on
the home page, "No portfolio yet" on Construction, and "What we have, and what we
do not" on About. If you later ask for a portfolio section, those need revisiting
at the same time.

| Where | What to replace |
| --- | --- |
| All pages, footer | `info@kavo.mv` — still the brand kit's placeholder address |
| `contact.html` | Office street address; opening hours |
| `index.html` | The three figures: 2026 registered, 15+ years, 3 businesses |
| `import-export.html` | Source markets and transit times — currently the lanes your people know, not contracted routes |
| `real-estate.html` | Tenant and owner service commitments (these are promises — check you can hold them) |
| `about.html` | The founding account, and the governance statements |
| `construction.html`, `about.html` | The six photographs — see **Photography** below |

The commitments are the ones to read first, because a new company is judged on
whether it keeps the first promise it makes: "we reply within one working day"
(Contact), "routine repairs completed within 5 days" and "monthly statement"
(Real estate), "a principal on site every week" (Construction), and the
insurance-before-work-starts line on About.

## Photography

The six images in `assets/photos/` were generated with Artlist AI (Seedream 5.0)
to the brand kit's photography direction: bright, high-key midday light, aqua
dominant, candid and unposed, with room for type.

| File | Used on |
| --- | --- |
| `site-structure.jpg` | construction.html |
| `interior-handover.jpg` | construction.html |
| `aerial-hulhumale.jpg` | construction.html |
| `people-at-work.jpg` | about.html |
| `warehouse.jpg` | about.html |
| `aerial-lagoon.jpg` | about.html |

**These are illustrative, not documentary.** They are not photographs of Kavo
projects, Kavo staff or a Kavo warehouse — the company has none yet. Both pages
carry a visible line under the images saying exactly that, and the captions
describe the kind of work rather than claim it. Replace them with your own
photography as jobs complete; the markup takes any 16:9 image at the same paths.
If you would rather not run AI imagery at all, delete the two image sections.

All six are 1400px wide, JPEG q80, progressive, and lazy-loaded. Keep
replacements at a similar size; the whole set is under 1 MB.

## The enquiry form

`contact.html` has no backend. On submit it composes a `mailto:` to
`info@kavo.mv` with the fields filled in, and says so on the page, so nothing is
silently dropped. To take submissions server-side, replace the `data-mailto`
handler in `js/kavo.js` with a POST to your endpoint.

## Browser support

Modern evergreen browsers. Scroll reveals degrade gracefully: without
JavaScript, a `<noscript>` rule shows all content immediately. Reduced-motion
preferences are respected throughout.
