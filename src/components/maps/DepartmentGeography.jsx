import { Geography } from "react-simple-maps";

// A single department path with the shared selection styling used by both
// department maps: the selected one is fully opaque with a soft drop-shadow,
// the rest sit at 0.85 and brighten on hover. Callers supply the fill and the
// interaction handlers; everything visual lives here so the maps stay in sync.
export default function DepartmentGeography({
  geography,
  fill,
  selected = false,
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
}) {
  return (
    <Geography
      geography={geography}
      fill={fill}
      stroke="var(--map-stroke)"
      strokeWidth={0.5}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        default: {
          outline: "none",
          opacity: selected ? 1 : 0.85,
          filter: selected ? "drop-shadow(0 0 4px rgba(0,0,0,0.3))" : "none",
        },
        hover: {
          outline: "none",
          opacity: 1,
          cursor: "pointer",
          // Thicker stroke on hover gives a clearer "this region is clickable"
          // cue than the opacity lift alone.
          stroke: "var(--map-stroke)",
          strokeWidth: 1.25,
        },
        pressed: { outline: "none" },
      }}
    />
  );
}
