import Copy from "./Copy";

/**
 * Section — the vertical-scroll building block for data pages.
 *
 * A page is a stack of <Section>s; each renders an optional eyebrow + title +
 * description header and then its content. Pages compose these (see CLAUDE.md:
 * "pages compose, they don't define") rather than hand-rolling headers inline.
 *
 * @param {string}            [eyebrow]     small uppercase kicker
 * @param {string}            [title]       section heading
 * @param {string}            [description] muted one-liner under the title
 * @param {React.ReactNode}   [headerRight] optional control aligned to the header's right (e.g. a picker)
 * @param {React.ReactNode}   children
 * @param {string}            [className]
 */
export default function Section({
  eyebrow,
  title,
  description,
  headerRight,
  children,
  className = "",
}) {
  const hasHeader = eyebrow || title || description;
  return (
    <section className={`flex flex-col gap-4 ${className}`}>
      {hasHeader && (
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            {eyebrow && <Copy as="p" variant="eyebrow">{eyebrow}</Copy>}
            {title && <Copy as="h2" variant="title">{title}</Copy>}
            {description && (
              <Copy as="p" variant="detail" className="max-w-2xl leading-snug">
                {description}
              </Copy>
            )}
          </div>
          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
