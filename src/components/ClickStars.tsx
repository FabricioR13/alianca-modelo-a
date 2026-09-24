import { useEffect } from "react";
import { STAR_PATH } from "./Decor";

const COLORS = ["#f0613e", "#d4467c", "#9fe0e6", "#fbd684", "#b377a8", "#f2956a"];

/** Spawns little confetti stars (like the logo) wherever the user clicks. */
export default function ClickStars() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select")) return;
      const n = 7;
      for (let i = 0; i < n; i++) {
        const el = document.createElement("div");
        const ang = (Math.PI * 2 * i) / n + Math.random() * 0.5;
        const dist = 40 + Math.random() * 50;
        const size = 12 + Math.random() * 12;
        el.className = "burst-star";
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
        el.style.setProperty("--dx", `${Math.cos(ang) * dist}px`);
        el.style.setProperty("--dy", `${Math.sin(ang) * dist}px`);
        el.style.setProperty("--rot", `${(Math.random() - 0.5) * 360}deg`);
        el.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path d="${STAR_PATH}" fill="${COLORS[i % COLORS.length]}"/></svg>`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 950);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return null;
}
