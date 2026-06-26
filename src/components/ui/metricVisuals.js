import { createElement } from "react";
import {
  // poverty vocabulary
  BanknotesIcon,
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
  ScaleIcon,
  BeakerIcon,
  WifiIcon,
  HomeModernIcon,
  // demographics vocabulary
  UsersIcon,
  UserIcon,
  MapIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";

// Shared visual vocabulary for metric statement cards — used by both the poverty
// and demographics views so the icon + semantic colour for a metric is defined
// once. A metric descriptor references an entry by string key (`icon`, `tone`).

const METRIC_ICONS = {
  // poverty
  banknotes: BanknotesIcon,
  squares: Squares2X2Icon,
  clipboard: ClipboardDocumentCheckIcon,
  scale: ScaleIcon,
  water: BeakerIcon,
  wifi: WifiIcon,
  home: HomeModernIcon,
  // demographics
  users: UsersIcon,
  person: UserIcon,
  map: MapIcon,
  globe: GlobeAmericasIcon,
};

// Semantic accent per tone. AA-tuned on white cards (light) and slate-800 cards
// (dark): 600/700 in light, 300/400 in dark.
//   bad/warn/good   carry valence (a problem vs a good thing) — poverty metrics.
//   info            neutral facts with no valence — most demographic figures.
//   male/female     conventional sex accents, echoing the sex donut's colours.
const TONE = {
  bad:  { border: "border-l-rose-500",  icon: "text-rose-600 dark:text-rose-400",  num: "text-rose-700 dark:text-rose-300",  badge: "bg-rose-100 dark:bg-rose-500/15" },
  warn: { border: "border-l-amber-500", icon: "text-amber-600 dark:text-amber-400", num: "text-amber-700 dark:text-amber-300", badge: "bg-amber-100 dark:bg-amber-500/15" },
  good: { border: "border-l-teal-600",  icon: "text-teal-700 dark:text-teal-400",  num: "text-teal-700 dark:text-teal-300",  badge: "bg-teal-100 dark:bg-teal-500/15" },
  info: { border: "border-l-blue-500",  icon: "text-blue-600 dark:text-blue-400",  num: "text-blue-700 dark:text-blue-300",  badge: "bg-blue-100 dark:bg-blue-500/15" },
  male: { border: "border-l-blue-500",  icon: "text-blue-600 dark:text-blue-400",  num: "text-blue-700 dark:text-blue-300",  badge: "bg-blue-100 dark:bg-blue-500/15" },
  female: { border: "border-l-rose-500", icon: "text-rose-600 dark:text-rose-400", num: "text-rose-700 dark:text-rose-300", badge: "bg-rose-100 dark:bg-rose-500/15" },
};

export const iconFor = (metric) => METRIC_ICONS[metric.icon] ?? UsersIcon;
export const toneFor = (metric) => TONE[metric.tone] ?? TONE.info;

// Returns the metric's icon as an element (via createElement, so callers don't
// assign a component to a capitalised local inside render — which the
// react-hooks/static-components rule flags).
export const renderMetricIcon = (metric, className) =>
  createElement(iconFor(metric), { className, "aria-hidden": "true" });
