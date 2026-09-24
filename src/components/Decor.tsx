import type { CSSProperties, ReactNode } from "react";

export const STAR_PATH =
  "M12 1.5c1.6 0 2.4 2.6 3.7 3.3 1.4.7 4-.3 4.9 1 .9 1.3-.9 3.4-.8 4.9.1 1.5 2.3 3.1 1.8 4.6-.5 1.5-3.3 1.4-4.5 2.4-1.2 1-1.4 3.8-2.9 4.2-1.5.4-3-1.9-4.6-2-1.6.1-3.1 2.4-4.6 2-1.5-.4-1.7-3.2-2.9-4.2C4 16.7 1.2 16.8.7 15.3.2 13.8 2.4 12.2 2.5 10.7 2.6 9.2.8 7.1 1.7 5.8c.9-1.3 3.5-.3 4.9-1C7.9 4.1 8.7 1.5 10.3 1.5z";

export function Star({
  color = "#f0613e",
  size = 28,
  className = "",
  style,
}: {
  color?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden>
      <path d={STAR_PATH} fill={color} />
      <path d={STAR_PATH} fill="#fff" opacity="0.25" transform="translate(3 3) scale(0.5)" />
    </svg>
  );
}

export function Ring({ size = 14, color = "#5a5170", className = "", style }: { size?: number; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} className={className} style={style} aria-hidden>
      <circle cx="10" cy="10" r="7" fill="none" stroke={color} strokeWidth="2.5" />
    </svg>
  );
}

export function Cross({ size = 14, color = "#f2956a", className = "", style }: { size?: number; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} className={className} style={style} aria-hidden>
      <path d="M4 4l12 12M16 4L4 16" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Triangle({ size = 14, color = "#f2956a", className = "", style }: { size?: number; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} className={className} style={style} aria-hidden>
      <path d="M5 3l12 7-12 7z" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

/** Small single puzzle piece icon */
export function PieceIcon({ color = "#b377a8", size = 32, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden>
      <path
        d="M20 30h14c-6-14 4-22 12-22s18 8 12 22h14c4 0 8 4 8 8v14c14-6 22 4 22 12s-8 18-22 12v14c0 4-4 8-8 8H20c-4 0-8-4-8-8V38c0-4 4-8 8-8z"
        fill={color}
        transform="scale(0.9) translate(0 0)"
      />
    </svg>
  );
}

export function SectionTag({ children, color = "bg-lilac" }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-ink-soft shadow-sm ring-1 ring-ink/5 backdrop-blur">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {children}
    </span>
  );
}

export function WaveDivider({ fill = "#ffffff", flip = false, className = "" }: { fill?: string; flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={`block h-12 w-full md:h-20 ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <path d="M0 50 C 240 100 480 0 720 40 C 960 80 1200 10 1440 50 L1440 90 L0 90 Z" fill={fill} />
    </svg>
  );
}
