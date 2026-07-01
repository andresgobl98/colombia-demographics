import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

/**
 * Inline link to an external site (e.g. a Wikipedia article). Always opens in
 * a new tab and pairs the text with an outbound-link icon plus a screen-reader
 * note, so leaving the app is signalled both visually and non-visually.
 *
 * @param {string}            href
 * @param {React.ReactNode}   children
 * @param {string}            [className]      extra classes for the <a> (color/hover, etc.)
 * @param {string}            [iconClassName]  size override for the icon (default w-3.5 h-3.5)
 */
export default function ExternalLink({ href, children, className = "", iconClassName = "w-3.5 h-3.5", ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center gap-1 underline decoration-slate-300 dark:decoration-slate-600 underline-offset-2 hover:decoration-current",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
      <ArrowTopRightOnSquareIcon className={`${iconClassName} shrink-0`} aria-hidden="true" />
      <span className="sr-only"> (abre en una pestaña nueva)</span>
    </a>
  );
}
