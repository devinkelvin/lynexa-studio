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

// ---- Venture cover art -----------------------------------------------------
const cover = (inner) => `<svg class="cover-art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;

export const VENTURE_ART = {
  // LandLink: land parcels on a grid, one verified with a pin
  landlink: cover(`
    <rect width="400" height="250" fill="#163428"/>
    <g fill="none" stroke="#2f6b52" stroke-width="1">${Array.from({ length: 11 }, (_, i) => `<path d="M${i * 40} 0v250"/>`).join('')}${Array.from({ length: 7 }, (_, i) => `<path d="M0 ${i * 40}h400"/>`).join('')}</g>
    <g fill="#1f4a39" stroke="#6fbf97" stroke-width="2" stroke-linejoin="round">
      <path d="M60 70l70-20 40 46-64 30z"/><path d="M170 96l70-26 30 60-76 20z"/><path d="M106 126l64-30 24 54-70 18z"/>
      <path d="M250 64l70-14 18 58-62 22z"/><path d="M276 130l62-22 12 66-58 8z"/>
    </g>
    <path d="M170 96l70-26 30 60-76 20z" fill="#e8962a" fill-opacity=".9" stroke="#ffd29a" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M220 58c-14 0-24 10-24 24 0 18 24 40 24 40s24-22 24-40c0-14-10-24-24-24z" fill="#f1eee8"/>
    <circle cx="220" cy="82" r="8" fill="#163428"/>
    <g transform="translate(300 176)"><circle r="20" fill="#f1eee8"/><path d="M-9 0l6 6 12-13" fill="none" stroke="#163428" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></g>
    <path d="M220 122c30 20 50 34 62 46" fill="none" stroke="#f1eee8" stroke-width="2" stroke-dasharray="4 6"/>
  `),
  // SparkHive: honeycomb of collaborators around a spark
  sparkhive: cover(`
    <rect width="400" height="250" fill="#2b1f0c"/>
    ${(() => {
      const hex = (cx, cy, r) => Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 180 * (60 * k - 30); return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(' ');
      const r = 30, w = Math.sqrt(3) * r, cells = [];
      for (let row = -1; row < 6; row++) for (let col = -1; col < 10; col++) {
        const cx = col * w + (row % 2 ? w / 2 : 0) + 20, cy = row * r * 1.5 + 20;
        const d = Math.hypot(cx - 200, cy - 125);
        const fill = d < 40 ? '#e8962a' : d < 95 && (col + row) % 3 === 0 ? '#5a3d12' : 'none';
        cells.push(`<polygon points="${hex(cx, cy, r - 3)}" fill="${fill}" stroke="${d < 120 ? '#c98a2e' : '#4a3512'}" stroke-width="1.6"/>`);
      }
      return cells.join('');
    })()}
    <path d="M200 92l9 24 25 9-25 9-9 25-9-25-25-9 25-9z" fill="#fff4dc"/>
    <g fill="#f1eee8"><circle cx="122" cy="98" r="7"/><circle cx="278" cy="72" r="7"/><circle cx="292" cy="170" r="7"/><circle cx="110" cy="178" r="7"/></g>
    <g fill="none" stroke="#f1eee8" stroke-width="1.5" stroke-dasharray="3 5"><path d="M129 101l52 18M271 76l-54 36M285 166l-66-28M117 174l66-38"/></g>
  `),
  // LexForum: classical columns and conversation, with an AI spark
  lexforum: cover(`
    <rect width="400" height="250" fill="#1b1d3a"/>
    <circle cx="300" cy="40" r="120" fill="#262a55"/>
    <g fill="none" stroke="#a898ff" stroke-width="2" stroke-linejoin="round">
      <path d="M70 92l70-36 70 36z"/><path d="M76 92h128M80 186h120M72 198h136"/>
      <path d="M92 100v80M118 100v80M162 100v80M188 100v80"/>
    </g>
    <g fill="#a898ff" fill-opacity=".14"><path d="M70 92l70-36 70 36z"/></g>
    <g>
      <rect x="236" y="74" width="120" height="44" rx="14" fill="#f1eee8"/><path d="M256 118l-6 14 18-14z" fill="#f1eee8"/>
      <path d="M252 90h70M252 102h46" stroke="#1b1d3a" stroke-width="5" stroke-linecap="round"/>
      <rect x="256" y="138" width="110" height="40" rx="14" fill="#5a35fe"/><path d="M346 178l6 12-18-12z" fill="#5a35fe"/>
      <path d="M272 152h60M272 164h36" stroke="#f1eee8" stroke-width="5" stroke-linecap="round"/>
    </g>
    <path d="M350 52l5 13 13 5-13 5-5 13-5-13-13-5 13-5z" fill="#e8962a"/>
  `)
};
