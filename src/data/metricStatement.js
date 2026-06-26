// Renders a metric's headline as plain-language sentence parts, shared across the
// poverty and demographics views: `${before} <number> ${after}`. The number is
// returned separately so the UI can emphasise/colour it. A metric may override
// the number formatting for the sentence via `sentenceNumber` (e.g. a rate vs a
// percentage). Falls back gracefully when there is no value.
export function metricSentence(metric, value) {
  const number = (metric.sentenceNumber ?? metric.format)(value);
  return { before: metric.sentence?.before ?? "", number, after: metric.sentence?.after ?? "" };
}
