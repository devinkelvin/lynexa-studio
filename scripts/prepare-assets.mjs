// Regenerates optimised images and self-hosted fonts into public/.
// Run after adding or replacing source images in assets/:  npm run assets
// Outputs are committed, so the Netlify build itself needs no image tooling.
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const src = (f) => join(root, 'assets', f);
const out = join(root, 'public', 'assets', 'img');
await mkdir(out, { recursive: true });

// [source, output basename, widths, quality]
const jobs = [
  ['zengly-split-bill.png', 'zengly-split-bill', [376], 86],
  ['zengly-home-dark.png', 'zengly-home-dark', [376], 86],
  ['zengly-home-light.png', 'zengly-home-light', [376], 86],
  ['zengly-menu.png', 'zengly-menu', [376], 86],
  ['zengly-vaniti-leaderboard.png', 'zengly-vaniti-leaderboard', [376], 86],
  ['zengly-vaniti-sprayers.png', 'zengly-vaniti-sprayers', [376], 86],
  ['zengly-vaniti-intro.png', 'zengly-vaniti-intro', [340], 86],
  ['zengly-sign.png', 'zengly-sign', [540, 1080], 82],
  ['zengly-podium.png', 'zengly-podium', [540, 1080], 82],
  ['zengly-gift.png', 'zengly-gift', [540, 1080], 82],
  ['zengly-split-bill-group.jpg', 'zengly-friends', [600, 1200], 74],
  ['lagos-professionals.jpg', 'lagos-professionals', [800, 1600], 72],
  ['lagos-collaboration.jpg', 'lagos-collaboration', [800, 1600], 72],
  ['lagos-strategy-session.jpg', 'lagos-strategy-session', [800, 1600], 72],
  ['swiftly-full-logo.png', 'swiftly-logo', [383], 90],
  ['zengly_text_logo.png', 'zengly-logo', [400], 90],
  ['site-zengly-desktop.png', 'site-zengly-desktop', [720, 1440], 78],
  ['site-kelvin-desktop.png', 'site-kelvin-desktop', [720, 1440], 78],
  ['site-cv-desktop.png', 'site-cv-desktop', [720, 1440], 78],
  ['site-zengly-mobile.png', 'site-zengly-mobile', [390], 80],
  ['site-kelvin-mobile.png', 'site-kelvin-mobile', [390], 80],
  ['site-cv-mobile.png', 'site-cv-mobile', [390], 80],
  ['venture-landlink.jpg', 'venture-landlink', [640, 1280], 72],
  ['venture-sparkhive.jpg', 'venture-sparkhive', [640, 1280], 72],
  ['venture-lexforum.jpg', 'venture-lexforum', [640, 1280], 72],
  ['swiftly-danfo.jpg', 'swiftly-danfo', [800, 1600], 72],
  ['about-team-lagos.jpg', 'about-team-lagos', [800, 1600], 74],
  ['about-team-nesa.jpg', 'about-team-nesa', [800, 1600], 74]
];

for (const [file, name, widths, quality] of jobs) {
  for (const w of widths) {
    await sharp(src(file)).resize({ width: w, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(join(out, `${name}-${w}.webp`));
  }
}

// Brand mark: favicons + small header mark
const mark = src('lynexa-mark-official.png');
await sharp(mark).resize(64).png().toFile(join(out, 'lynexa-mark-64.png'));
await sharp(mark).resize(32).png().toFile(join(root, 'public', 'favicon-32.png'));
await sharp(mark).resize(180).flatten({ background: '#18171C' }).png().toFile(join(root, 'public', 'apple-touch-icon.png'));
await sharp(mark).resize(192).png().toFile(join(root, 'public', 'icon-192.png'));
await sharp(mark).resize(512).png().toFile(join(root, 'public', 'icon-512.png'));

// Fonts (Plus Jakarta Sans variable, SIL OFL 1.1)
const fonts = join(root, 'public', 'assets', 'fonts');
await mkdir(fonts, { recursive: true });
const fs = join(root, 'node_modules', '@fontsource-variable', 'plus-jakarta-sans', 'files');
for (const f of ['plus-jakarta-sans-latin-wght-normal.woff2', 'plus-jakarta-sans-latin-ext-wght-normal.woff2']) {
  await copyFile(join(fs, f), join(fonts, f));
}
console.log('Assets prepared.');
