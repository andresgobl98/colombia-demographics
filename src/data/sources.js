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
        href: "https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/proyecciones-de-poblacion",
      },
      {
        label: "Autorreconocimiento étnico",
        detail: "DANE — Censo Nacional de Población y Vivienda (CNPV) 2018",
        href: "https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/censo-nacional-de-poblacion-y-vivenda-2018",
      },
      {
        label: "Geometría departamental",
        detail: "GeoJSON de John Guerra",
        href: "https://gist.github.com/john-guerra/43c7656821069d00dcbc",
      },
    ],
  },
  {
    prefix: "/datos/pobreza",
    label: "Datos — Pobreza",
    sources: [
      {
        label: "Pobreza monetaria y coeficiente de Gini",
        detail: "DANE — Pobreza Monetaria (GEIH)",
        href: "https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-monetaria",
      },
      {
        label: "Pobreza multidimensional (IPM)",
        detail: "DANE — Pobreza Multidimensional",
        href: "https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/pobreza-multidimensional",
      },
      {
        label: "Necesidades básicas insatisfechas (NBI)",
        detail: "DANE — NBI, Censo 2018",
        href: "https://www.dane.gov.co/index.php/estadisticas-por-tema/pobreza-y-condiciones-de-vida/necesidades-basicas-insatisfechas-nbi",
      },
      {
        label: "Déficit habitacional",
        detail: "DANE — Déficit Habitacional",
        href: "https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/deficit-habitacional",
      },
      {
        label: "Cobertura de acueducto y alcantarillado",
        detail: "Superintendencia de Servicios Públicos Domiciliarios (SSPD)",
        href: "https://www.superservicios.gov.co/",
      },
      {
        label: "Acceso a internet fijo",
        detail: "MinTIC",
        href: "https://www.mintic.gov.co/portal/inicio/",
      },
      {
        label: "Agregación y homogeneización departamental",
        detail: "DNP — TerriData",
        href: "https://terridata.dnp.gov.co",
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
  {
    prefix: "/gobierno/ejecutivo",
    label: "Gobierno — Ejecutivo",
    sources: [
      {
        label: "Presidencia, Vicepresidencia y gabinete",
        detail: "presidencia.gov.co",
        href: "https://www.presidencia.gov.co",
      },
    ],
  },
  {
    prefix: "/gobierno/judicial",
    label: "Gobierno — Judicial",
    sources: [
      {
        label: "Cortes, tribunales y organismos de la Rama Judicial",
        detail: "ramajudicial.gov.co",
        href: "https://www.ramajudicial.gov.co",
      },
    ],
  },
];

export function sourcesForPath(pathname) {
  return SOURCE_GROUPS.find((entry) => pathname.startsWith(entry.prefix))?.sources ?? null;
}
