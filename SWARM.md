# Lynexa Swarm: the Living Build System

A swarm of tiny cursors rests in the bottom-left corner of every page. When a section scrolls into view, some of them fly out and build it: they sweep headings along their baselines, trace card outlines while the surface is drawn in, unmask images behind a construction grid, draw illustration strokes, and run connectors through process steps. Then they fly home and resume orbiting.

The swarm is an enhancement only. Every page is complete, readable and usable without it.

## Files

| File | Role |
| --- | --- |
| `src/scripts/swarm.js` | The whole system: overlay, cursors, orbit, controller, construction library, section registry. No dependencies. |
| `src/scripts/site.js` | Motion preference (Full / Reduced / Off), and lazy-loading `swarm.js` after the page has loaded. |
| `src/styles/site.css` | "Living Build System" block: the hidden and revealed states (`sw-*` classes), the hero wireframe failsafe, the process rail and the motion control. |
| `src/lib.mjs` | `HEAD_SCRIPT` (runs before paint), `data-swarm-src` on `<html>`, `data-swarm` on `<body>`, the footer motion control. |
| `build.mjs` | Fingerprints `swarm.<hash>.js` and adds `HEAD_SCRIPT`'s SHA-256 to the Content-Security-Policy automatically. |

## How it works

**Responsibilities.** The single `swarm.js` module contains each of these:

- **Overlay.** One `<canvas class="swarm">`: fixed, `pointer-events: none`, `aria-hidden`.
- **Cursors.** Each colour's cursor sprite is pre-rendered once, then drawn with `drawImage`. There is no DOM node per cursor.
- **Orbit.** The idle formation is three counter-rotating rings.
- **Controller.** A state machine: `idle`, `deploying`, `constructing`, `returning`, `paused`. When the swarm is removed (reduced motion or Off), the page simply has no swarm.
- **Construction library.** One planner per kind of work:
  - `planHeading`
  - `planText`
  - `planCard`
  - `planMedia`
  - `planFrame` (phones and browsers)
  - `planSvg` (illustrations)
  - `planRow`
  - `planButton`
  - plus the `steps`, `phase`, `duo`, `faq` and closing `ctas` scenes.
- **Registry.** `collect()` turns each `main > section` into units: a heading block, a row of cards, a device row, an image, a list.

**Lifecycle of a unit**

1. **Prime.** At start-up, units that begin below the fold get their hidden classes. Anything already on screen is left alone.
2. **Detect.** Unit tops are cached in document coordinates, so scrolling only compares numbers. IntersectionObserver isn't used because Chrome treats a fully clipped element as never intersecting.
3. **Release and travel.** Free cursors leave the formation in a staggered order and fly curved Bézier paths to their first job.
4. **Construct.** Each job is a path for one cursor. When the cursor starts the path, the matching DOM reveal starts with the same duration, so the cursor and the reveal stay in sync.
5. **Return.** The cursors fly back to their own orbit slot and the unit's classes are removed, so the original CSS fully applies again.

**Reveals never create or destroy content.**

- Headings: slanted `clip-path` wipe.
- Text: opacity plus `translate`.
- Cards: corner-out `clip-path`, then the children settle.
- Images: edge wipe plus a small `scale`.
- Illustrations: `stroke-dashoffset` with `pathLength=1`.

None of these properties trigger layout shift. All hidden states sit behind `html.sw-on`, and any runtime error calls `fail()`, which shows everything and removes the swarm.

## Every text is built

`textLeaves()` finds every text block in a section: headings, paragraphs, list items, definition terms, captions, FAQ questions and status labels. It skips forms, navigation, buttons and anything hidden from assistive tech. Each block is primed (hidden) and then written by a cursor. Card text is written after the card's surface is drawn, row text after its rule is drawn, and anything left over goes to "loose text" units with up to three writing lanes.

When the header is being built (`html.sw-intro`), content already on screen is hidden before first paint and built straight after the header. If the visitor scrolls away from the header, the header finishes at once and the page carries on.

A watchdog finishes any section that runs past twice its time budget. When a section completes, every element it hid is settled, so nothing can be left invisible.

## Behaviour rules

- **Fast scrolling.** Above 2.4 px/ms, or when jumping past a section, sections appear instantly. Nothing queues.
- **Reverse scrolling.** Completed sections stay completed.
- **Keyboard.** Focusing anything inside an unfinished unit finishes that unit at once.
- **Forms.** Focus inside a form pauses the swarm: active builds finish, cursors return, and the formation dims to 30%. Form fields are never hidden or covered. Contact, Start a project and the thank-you pages build their text like every other page, but form fields are never hidden or animated.
- **Work filter.** Clicking a filter finishes everything, so filtering never replays effects.
- **Hidden tab.** The render loop stops.
- **Idle.** Painting drops to about 30fps and only repaints the formation's box. After 20 seconds with no input, the orbit freezes until the next scroll, key press or pointer move.
- **Pointer.** Moving the pointer near the formation fades it to 15%. At the very bottom of the page it dims to 25% so the footer stays readable.
- **Menu.** While the mobile menu is open, the overlay is hidden.
- **Navigation.** `pagehide` stops the loop. A back/forward cache restore finishes everything and resumes. There is only ever one overlay.
- **Page headers are built from scratch.** With motion on Full, `HEAD_SCRIPT` adds `html.sw-intro` before first paint, so the header starts empty, and it preloads `swarm.js`. The swarm writes every line of text, draws the buttons, cards and the timeline rule, sketches the wireframe and raises the real screen into the phone. On the homepage this takes about 3s on a first visit and about 2s on return visits (`localStorage lx-sw-seen`). If the swarm has not arrived within 3.5s, CSS and JS failsafes show everything. Keyboard focus inside the header finishes the build at once.
- **Writing.** Headings and paragraphs of up to six lines are written by a cursor: a clip-path staircase follows the cursor tip along each line, with a quick carriage return between lines (`writeJobs`). Longer paragraphs settle in instead.
- **Slow devices.** If `hardwareConcurrency` is 4 or less, or `deviceMemory` is 2 or less, the swarm uses 30% fewer cursors. Sustained slow frames switch off trails, grids and pulses.

## Sizes, colours and timings

All of these live in `CONFIG` at the top of `swarm.js`:

| Setting | Value |
| --- | --- |
| Cursor count | Desktop 24, tablet 16, mobile 12, under 360px 9 (times 0.7 on low-power devices). About 22% always stay home. |
| Cursor size | About 9–11px tall, randomly sized per cursor; slightly smaller in orbit and on mobile. |
| Formation | Rings of 6, 9 and the rest, at radii 10, 19 and 29px (×0.76 on mobile). Periods 15, 19 and 23s, with alternate rings turning the other way. |
| Corner | `bottom-left` (WhatsApp is bottom-right). Override with `data-swarm-corner="bottom-right"` (or `top-left` / `top-right`) on `<html>`. Safe-area insets are respected. |
| Colours | Violet `#5a35fe`, magenta `#c026d3`, coral `#f0614f`, amber `#e8962a` (the design group); turquoise `#0fb5a6`, sky `#1d9bf0`, emerald `#109a6a`, lime `#6fa514` (the engineering group). Each sprite has a white keyline and a faint dark hairline so it reads on both light and dark sections. |
| Section budget | At most 1.9s per section on desktop and 1.2s on mobile, scaled by tempo: 0.9 standard, 1.15 editorial (founder, case-study chapters, text-only split layouts), 0.7 understated (engagement models, FAQ). |
| Travel | Curved paths at about 1.7 px/ms (2 px/ms on mobile), 140–620ms per trip. Carriage returns take 70–200ms. |
| Writing speed | Hero headline 1.15 px/ms, page headlines 1.25, section headings 1.5, paragraphs about 3.1, all scaled by tempo and device. |

## Adding the swarm to a new page or section

Most new content works with no changes, because `collect()` recognises the site's existing components:

- `h2` headings and their intro paragraphs
- cards: `CARD`, for example `.card`, `.scard`, `.vmodel`, `.showcase__item`, `.reasons > div`
- device and browser frames: `FRAME`
- stand-alone images: `MEDIA`
- rows: `ROW`, for example `.stack > div`, `.svc-row`
- `.steps`, `.phase`, `.faq`, and the section CTAs

To include a new component, add its selector to the matching list near "units" in `swarm.js`. To give a section its own choreography, add a new unit kind in `collect()` and write its `prime` (what to hide) and `plan` (the jobs) cases. Jobs are `job(points, durationMs, { wait, onStart, onEnd, guide, pulse, live })`, and `onStart` is where you call `reveal(element, ms)`.

## Turning it down or off

- **Per page.** Return `swarm: 'light'` (trace only, never hide) or `swarm: 'none'` (orbit only, no construction) from the page object in `src/pages/*.mjs`. The legal pages use `none`.
- **For visitors.** The footer's Motion control stores Full, Reduced or Off in `localStorage`. Reduced removes the swarm and shortens all transitions. Off removes all animation and the custom cursor. The system setting `prefers-reduced-motion` defaults to Reduced, and Save-Data skips the swarm.
- **Site-wide.** Delete the `loadSwarm` call in `site.js`, or remove `data-swarm-src` from `layout()`. The site then behaves exactly as it did before the swarm.

## Testing it locally

`npm run build`, then serve `dist/`. In the console:

- `LynexaSwarm.state` shows the controller state.
- `LynexaSwarm.debug()` lists every unit and its state.
- `LynexaSwarm.finishAll()` shows everything immediately.
- `LynexaSwarm.destroy()` removes the swarm.

## Interactive extras (`src/scripts/wow.js`, appended to `site.js` at build)

- **On-demand builds.** `LynexaSwarm.build(items, { tempo })` builds new content with free cursors. Items are `{ el, type: 'text' | 'box' | 'wire' | 'media' | 'trace', lane, wait, speed, dur }`; items in the same lane are built in order by one cursor.
- **Try it with your idea (home).** The visitor types one sentence; the build strip is rewritten as their concept (category, working name, wireframe, first screen) and the swarm builds it. "Turn this into a brief" opens Start a project with the description prefilled (`?idea=&name=`). Nothing is sent anywhere.
- **The visitor joins the swarm.** A small "You" tag follows a mouse pointer for two seconds after it moves, and hovering a button calls up to three cursors over. Fine pointers on larger screens only; hidden over form fields, dialogs and the prototype.
- **Page transitions.** Internal link clicks send the cursors off the right edge, and they fly in from the left on the next page (`sessionStorage lx-sweep`). Browsers that support cross-document view transitions also cross-fade. Off when motion is Reduced or Off.
- **Zengly click-through** (`/work/zengly/`): the real design screens with hotspot buttons, a screen picker and a light/dark toggle.
- **MVP timeline planner** (`/mvp-planner/`): indicative week ranges per phase. Changing an answer re-runs the swarm over the bars. The model lives in `wow.js` (`BASE`, `FEAT`). It never shows prices.
- **Quick menu.** Ctrl/Cmd+K, or the search button in the header.
- **404.** The swarm traces a dashed ring around a question mark.
- **Footer.** Current time in Lagos and the honest reply time (two working days).
