import { useCallback, useEffect, useRef, useState } from "react";

// Shared pan/zoom plumbing for the department maps. Both the choropleth
// (ColombiaMap) and the representation picker (RepresentationMap) get identical
// wheel/drag/pinch behaviour, the same animated tweening, and the same zoom
// button handlers from here — so the maps stay in sync.

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 8;
const ZOOM_STEP = 1.6; // multiplicative step for the +/- buttons

// Let a single finger scroll the page instead of panning the map; still allow
// pinch-zoom (2+ touches) and desktop wheel/drag. Maps to d3-zoom .filter().
function filterZoomEvent(event) {
  if (event.type && event.type.startsWith("touch")) {
    return event.touches && event.touches.length > 1;
  }
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}

/**
 * @param {{ center: [number, number], zoom?: number }} initial  default view
 * @returns zoom state + handlers, plus `zoomableGroupProps` to spread onto
 *          <ZoomableGroup> and `isOffDefault` for showing a reset control.
 */
export function useMapZoom({ center, zoom = 1 }) {
  // `center`/`zoom` are expected to be stable (module-level constants in the
  // callers), so they can be used directly as the default view.
  const [position, setPosition] = useState({ coordinates: center, zoom });

  const positionRef = useRef(position);
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const animRef = useRef(null);

  // Tween the view to a target { coordinates, zoom } with an ease-out cubic.
  const animateTo = useCallback((target) => {
    cancelAnimationFrame(animRef.current);
    const start = positionRef.current;
    const startTime = performance.now();
    const duration = 600;
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const k = ease(t);
      setPosition({
        coordinates: [
          start.coordinates[0] + (target.coordinates[0] - start.coordinates[0]) * k,
          start.coordinates[1] + (target.coordinates[1] - start.coordinates[1]) * k,
        ],
        zoom: start.zoom + (target.zoom - start.zoom) * k,
      });
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  // Zoom about the current center by the button step, clamped to the range.
  const zoomBy = useCallback(
    (factor) => {
      const start = positionRef.current;
      const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, start.zoom * factor));
      animateTo({ coordinates: start.coordinates, zoom: next });
    },
    [animateTo]
  );

  const zoomIn = useCallback(() => zoomBy(ZOOM_STEP), [zoomBy]);
  const zoomOut = useCallback(() => zoomBy(1 / ZOOM_STEP), [zoomBy]);

  const reset = useCallback(() => {
    animateTo({ coordinates: center, zoom });
  }, [animateTo, center, zoom]);

  const isOffDefault =
    Math.abs(position.zoom - zoom) > 0.01 ||
    Math.abs(position.coordinates[0] - center[0]) > 0.05 ||
    Math.abs(position.coordinates[1] - center[1]) > 0.05;

  // Spread straight onto <ZoomableGroup>.
  const zoomableGroupProps = {
    center: position.coordinates,
    zoom: position.zoom,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    filterZoomEvent,
    onMoveEnd: setPosition,
  };

  return {
    position,
    setPosition,
    animateTo,
    zoomIn,
    zoomOut,
    reset,
    isOffDefault,
    zoomableGroupProps,
  };
}
