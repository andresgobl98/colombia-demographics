/**
 * Single source of truth for the app's data sources. Consumed by both the
 * per-page floating control (`DataSources`) and the About modal's canonical
 * full list, so the two can't drift.
 *
 * Grouped by section and keyed by a route prefix; `sourcesForPath` returns the
 * group whose prefix matches the current page (first match wins), or null for
 * routes that declare none (e.g. the "coming soon" branches).
 */
export const SOURCE_GROUPS = [
  {
    prefix: "/datos/poblacion",
    label: "Demografía",
    sources: [
      {
        label: "Población y proyecciones por sexo",
        detail: "DANE — Proyecciones de Población (PPED) 2018–2050",
      },
      {
        label: "Autorreconocimiento étnico",
        detail: "DANE — Censo Nacional de Población y Vivienda (CNPV) 2018",
      },
      {
        label: "Geometría departamental",
        detail: "GeoJSON de John Guerra",
        href: "https://gist.github.com/john-guerra/43c7656821069d00dcbc",
      },
    ],
  },
  {
    prefix: "/gobierno/legislativo",
    label: "Gobierno — Legislativo",
    sources: [
      {
        label: "Directorio de la Cámara de Representantes",
        detail: "camara.gov.co",
        href: "https://www.camara.gov.co/representantes",
      },
      {
        label: "Directorio del Senado",
        detail: "senado.gov.co",
        href: "https://www.senado.gov.co/index.php/el-senado/senadores",
      },
    ],
  },
];

export function sourcesForPath(pathname) {
  return SOURCE_GROUPS.find((entry) => pathname.startsWith(entry.prefix))?.sources ?? null;
}
