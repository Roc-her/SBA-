import sharp from 'sharp';

const input = 'public/sba-logo-stamp.png';
const output = 'public/sba-logo-transparent.png';
const cleanOutput = 'public/sba-logo-stamp-clean.png';
const appIconOutput = 'public/sba-icon-512.png';

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let minX = info.width;
let minY = info.height;
let maxX = 0;
let maxY = 0;

for (let i = 0; i < data.length; i += 4) {
  const pixelIndex = i / 4;
  const x = pixelIndex % info.width;
  const y = Math.floor(pixelIndex / info.width);
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const avg = (r + g + b) / 3;

  // The provided file has a fake transparency checker baked into the image.
  // It is bright neutral grey/white, while the badge is black and gold.
  const isCheckerBackground = avg > 208 && max - min < 24;

  if (isCheckerBackground) {
    data[i + 3] = 0;
    continue;
  }

  data[i + 3] = 255;
  minX = Math.min(minX, x);
  minY = Math.min(minY, y);
  maxX = Math.max(maxX, x);
  maxY = Math.max(maxY, y);
}

const padding = 28;
const left = Math.max(0, minX - padding);
const top = Math.max(0, minY - padding);
const width = Math.min(info.width - left, maxX - minX + 1 + padding * 2);
const height = Math.min(info.height - top, maxY - minY + 1 + padding * 2);

const image = sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
}).extract({ left, top, width, height }).png();

await image.toFile(output);
await sharp(output).png().toFile(cleanOutput);
await sharp(output).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(appIconOutput);

console.log(`Created ${output} (${width}x${height})`);
