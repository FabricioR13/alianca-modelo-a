/**
 * Jigsaw piece path generator.
 * Edge values: 0 = flat, 1 = tab (outward), -1 = blank (inward)
 */
type Pt = [number, number];

function edge(x0: number, y0: number, x1: number, y1: number, t: number): string {
  const dx = x1 - x0;
  const dy = y1 - y0;
  if (t === 0) return `L ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // outward normal for clockwise traversal
  const nx = uy;
  const ny = -ux;
  const map = ([u, v]: Pt) => {
    const px = x0 + ux * u * len + nx * v * t * len;
    const py = y0 + uy * u * len + ny * v * t * len;
    return `${px.toFixed(2)} ${py.toFixed(2)}`;
  };
  let d = `L ${map([0.34, 0])} `;
  // smooth tab using cubic curves
  d += `C ${map([0.4, 0])} ${map([0.41, 0.05])} ${map([0.38, 0.11])} `;
  d += `C ${map([0.33, 0.21])} ${map([0.42, 0.3])} ${map([0.5, 0.3])} `;
  d += `C ${map([0.58, 0.3])} ${map([0.67, 0.21])} ${map([0.62, 0.11])} `;
  d += `C ${map([0.59, 0.05])} ${map([0.6, 0])} ${map([0.66, 0])} `;
  d += `L ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  return d;
}

export function piecePath(
  x: number,
  y: number,
  w: number,
  h: number,
  top: number,
  right: number,
  bottom: number,
  left: number
): string {
  return [
    `M ${x} ${y}`,
    edge(x, y, x + w, y, top),
    edge(x + w, y, x + w, y + h, right),
    edge(x + w, y + h, x, y + h, bottom),
    edge(x, y + h, x, y, left),
    "Z",
  ].join(" ");
}

/** Deterministic pseudo-random */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export interface Piece {
  r: number;
  c: number;
  d: string;
  cx: number;
  cy: number;
}

export function buildGrid(
  cols: number,
  rows: number,
  width: number,
  height: number,
  seed = 7,
  offsetX = 0,
  offsetY = 0
): Piece[] {
  const rnd = seeded(seed);
  const w = width / cols;
  const h = height / rows;
  // horizontal edges between rows (rows-1 x cols), vertical edges between cols (rows x cols-1)
  const hE: number[][] = Array.from({ length: rows - 1 }, () =>
    Array.from({ length: cols }, () => (rnd() > 0.5 ? 1 : -1))
  );
  const vE: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols - 1 }, () => (rnd() > 0.5 ? 1 : -1))
  );
  const pieces: Piece[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const top = r === 0 ? 0 : -hE[r - 1][c];
      const bottom = r === rows - 1 ? 0 : hE[r][c];
      const left = c === 0 ? 0 : -vE[r][c - 1];
      const right = c === cols - 1 ? 0 : vE[r][c];
      const x = offsetX + c * w;
      const y = offsetY + r * h;
      pieces.push({
        r,
        c,
        d: piecePath(x, y, w, h, top, right, bottom, left),
        cx: x + w / 2,
        cy: y + h / 2,
      });
    }
  }
  return pieces;
}
