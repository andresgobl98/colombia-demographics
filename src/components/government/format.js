// Shared date formatting for the government views (executive cards, judicial
// leaders). Spanish month abbreviations; `approx` prefixes a tilde for dates we
// only know to the month.
const MONTHS_ES = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.",
                   "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];

export function formatSince(iso, approx = false) {
  const [y, m, d] = iso.split("-").map(Number);
  const mon = MONTHS_ES[m - 1];
  return approx ? `~${mon} ${y}` : `${d} ${mon} ${y}`;
}

const VOTES_FORMATTER = new Intl.NumberFormat("es-CO");

export function formatVotes(n) {
  return VOTES_FORMATTER.format(n);
}

export function formatPct(pct, digits = 2) {
  return `${pct.toFixed(digits).replace(".", ",")}%`;
}
