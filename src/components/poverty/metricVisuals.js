import { createElement } from "react";
import {
  BanknotesIcon,
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
  ScaleIcon,
  BeakerIcon,
  WifiIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

// Shared visual vocabulary for poverty metrics — used by both NationalSummaryBand
// and PovertyPanel so the icon + semantic colour for a metric is defined once.

const METRIC_ICONS = {
  banknotes: BanknotesIcon,
  squares: Squares2X2Icon,
  clipboard: ClipboardDocumentCheckIcon,
  scale: ScaleIcon,
  water: BeakerIcon,
  wifi: WifiIcon,
  home: HomeModernIcon,
};

// Semantic accent per tone (a problem vs a good thing). AA-tuned on white cards
// (light) and slate-800 cards (dark): 600/700 in light, 300/400 in dark.
const TONE = {
  bad: { border: "border-l-rose-500", icon: "text-rose-600 dark:text-rose-400", num: "text-rose-700 dark:text-rose-300", badge: "bg-rose-100 dark:bg-rose-500/15" },
  warn: { border: "border-l-amber-500", icon: "text-amber-600 dark:text-amber-400", num: "text-amber-700 dark:text-amber-300", badge: "bg-amber-100 dark:bg-amber-500/15" },
  good: { border: "border-l-teal-600", icon: "text-teal-700 dark:text-teal-400", num: "text-teal-700 dark:text-teal-300", badge: "bg-teal-100 dark:bg-teal-500/15" },
};

export const iconFor = (metric) => METRIC_ICONS[metric.icon] ?? BanknotesIcon;
export const toneFor = (metric) => TONE[metric.tone] ?? TONE.bad;

// Returns the metric's icon as an element (via createElement, so callers don't
// assign a component to a capitalised local inside render — which the
// react-hooks/static-components rule flags).
export const renderMetricIcon = (metric, className) =>
  createElement(iconFor(metric), { className, "aria-hidden": "true" });
