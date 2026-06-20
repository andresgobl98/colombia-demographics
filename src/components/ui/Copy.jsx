/**
 * Copy — single source of truth for text styling.
 *
 * Render text through this component (instead of bare <p>/<span> with ad-hoc
 * classes) so that the type scale and tone can be tuned in one place. Each
 * variant encodes both a size and a default tone:
 *
 *   Size policy (do not break without updating CLAUDE.md):
 *     • 16px (text-base) is the STANDARD for real content.
 *     • 14px (text-sm) is reserved for ANNOTATIVE / secondary text.
 *     • 12px (text-xs) only for uppercase eyebrow labels.
 *
 * | variant     | size | role                                            |
 * |-------------|------|-------------------------------------------------|
 * | title       | 20px | section / card headings                         |
 * | body        | 16px | primary readable content (default)              |
 * | prose       | 16px | muted long-form copy (descriptions)             |
 * | strong      | 16px | emphasized content (names, key values)          |
 * | annotation  | 14px | muted secondary meta ("Desde …", role labels)   |
 * | detail      | 14px | readable secondary (field values, dense lists)  |
 * | eyebrow     | 12px | uppercase label above a field / section         |
 *
 * Tone/weight can still be nudged per-use via `className` (it's appended last,
 * so it wins), but SIZE should come from the variant to keep the scale honest.
 *
 * Colors are tuned to WCAG AA (≥4.5:1 normal, ≥3:1 large) against Tailwind v4's
 * oklch palette, measured on every surface each variant lands on — white & the
 * `slate-100` page bg in light mode; `slate-800` cards & the `slate-900` page bg
 * in dark. Two palette facts drive the choices: on `slate-100`, slate-500 only
 * hits 4.35 (fails) so muted text on the PAGE bg must be ≥ slate-600; on
 * `slate-800`, slate-500 only hits 3.07 (fails) so muted dark text must be
 * ≤ slate-400. `annotation` (slate-500) is the one variant that is only AA on
 * WHITE cards — keep it inside cards; for muted text directly on the page
 * background use `detail`/`eyebrow` (slate-600), which pass everywhere.
 *
 * @param {keyof typeof VARIANTS} [variant="body"]
 * @param {React.ElementType}      [as="p"]   element/tag to render
 * @param {string}                 [className]
 */
const VARIANTS = {
  title: "text-xl font-bold text-slate-800 dark:text-slate-100",
  body: "text-base text-slate-700 dark:text-slate-200",
  prose: "text-base text-slate-600 dark:text-slate-300 leading-relaxed",
  strong: "text-base font-semibold text-slate-900 dark:text-slate-50",
  annotation: "text-sm text-slate-500 dark:text-slate-400",
  detail: "text-sm text-slate-600 dark:text-slate-300",
  eyebrow: "text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400",
};

export default function Copy({ as: Tag = "p", variant = "body", className = "", children, ...rest }) {
  const base = VARIANTS[variant] ?? VARIANTS.body;
  return (
    <Tag className={[base, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}
