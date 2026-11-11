// Original abstract line illustrations (inline SVG, decorative).
// Colours come from CSS custom properties so they adapt to the surface they sit on.

const wrap = (inner, vb = '0 0 320 220') => `<svg class="art" viewBox="${vb}" aria-hidden="true" focusable="false">${inner}</svg>`;

// ---- "Four things" service cards -------------------------------------------
export const PILLAR_ART = {
  // Understand: scattered notes, one brought into focus by a lens
  understand: wrap(`
    <g class="art-soft">
      <rect x="28" y="40" width="70" height="52" rx="8" transform="rotate(-8 63 66)"/>
      <rect x="112" y="22" width="70" height="52" rx="8" transform="rotate(6 147 48)"/>
      <rect x="40" y="122" width="70" height="52" rx="8" transform="rotate(5 75 148)"/>
      <rect x="214" y="132" width="70" height="52" rx="8" transform="rotate(-6 249 158)"/>
    </g>
    <g class="art-line">
      <path d="M40 58h38M40 68h28M124 36h40M124 46h26M52 140h36M52 150h22M226 150h38M226 160h24"/>
    </g>
    <circle class="art-accent-fill" cx="196" cy="98" r="44"/>
    <circle class="art-strong" cx="196" cy="98" r="44"/>
    <path class="art-strong" d="M228 130l34 34"/>
    <rect class="art-strong" x="176" y="84" width="40" height="28" rx="5"/>
    <path class="art-strong" d="M184 94h24M184 102h14"/>
    <circle class="art-dot" cx="262" cy="164" r="5"/>
  `),
  // Design: stacked artboards, swatches and a pen path
  design: wrap(`
    <rect class="art-soft" x="40" y="42" width="96" height="150" rx="16"/>
    <rect class="art-soft" x="70" y="30" width="96" height="150" rx="16"/>
    <rect class="art-accent-fill" x="100" y="18" width="96" height="150" rx="16"/>
    <rect class="art-strong" x="100" y="18" width="96" height="150" rx="16"/>
    <g class="art-line">
      <rect x="114" y="40" width="44" height="8" rx="4"/><rect x="114" y="58" width="68" height="34" rx="8"/>
      <circle cx="124" cy="110" r="9"/><circle cx="148" cy="110" r="9"/><circle cx="172" cy="110" r="9"/>
      <rect x="114" y="140" width="68" height="14" rx="7"/>
    </g>
    <path class="art-strong" d="M214 160c20-40 40-70 72-84"/>
    <path class="art-strong" d="M276 64l20 8-8 20-20-8z"/>
    <circle class="art-dot" cx="214" cy="160" r="5"/>
    <g><circle class="art-swatch-a" cx="232" cy="190" r="10"/><circle class="art-swatch-b" cx="256" cy="190" r="10"/><circle class="art-swatch-c" cx="280" cy="190" r="10"/></g>
  `),
  // Build: code window wired to services
  build: wrap(`
    <rect class="art-accent-fill" x="26" y="34" width="170" height="122" rx="14"/>
    <rect class="art-strong" x="26" y="34" width="170" height="122" rx="14"/>
    <path class="art-line" d="M26 58h170"/>
    <g class="art-dot"><circle cx="42" cy="46" r="3.5"/><circle cx="54" cy="46" r="3.5"/><circle cx="66" cy="46" r="3.5"/></g>
    <g class="art-line"><path d="M44 78h56M58 92h84M58 106h46M44 120h72M58 134h38"/></g>
    <path class="art-strong" d="M152 88l-12 12 12 12M168 88l12 12-12 12"/>
    <g class="art-soft-stroke"><path d="M196 74c30 0 30-34 58-34M196 112h58M196 140c30 0 30 34 58 34"/></g>
    <g class="art-node"><rect x="254" y="26" width="44" height="28" rx="8"/><rect x="254" y="98" width="44" height="28" rx="8"/><rect x="254" y="160" width="44" height="28" rx="8"/></g>
    <g class="art-strong"><ellipse cx="276" cy="106" rx="12" ry="4"/></g>
    <circle class="art-dot" cx="196" cy="112" r="5"/>
  `),
  // Launch: a rising path through milestones
  launch: wrap(`
    <g class="art-soft"><rect x="36" y="150" width="26" height="40" rx="6"/><rect x="74" y="128" width="26" height="62" rx="6"/><rect x="112" y="104" width="26" height="86" rx="6"/><rect x="150" y="76" width="26" height="114" rx="6"/></g>
    <path class="art-strong" d="M30 172C96 168 150 140 196 98s70-56 96-62"/>
    <g class="art-milestone"><circle cx="96" cy="160" r="7"/><circle cx="160" cy="128" r="7"/><circle cx="214" cy="82" r="7"/></g>
    <path class="art-accent-fill" d="M262 22l34 10-10 34-8-14-18 18-10-10 18-18z"/>
    <path class="art-strong" d="M262 22l34 10-10 34-8-14-18 18-10-10 18-18z"/>
    <path class="art-line" d="M236 190h56M248 200h32"/>
  `)
};
