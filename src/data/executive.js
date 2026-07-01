// NOTE: Titulares actualizados a jun. 2026. Verificar en presidencia.gov.co.
// El Ministerio de la Igualdad y la Equidad fue liquidado (Decreto 0626 del
// 19 jun. 2026, tras fallo C-161/2024 de la Corte Constitucional); sus
// funciones pasaron al Ministerio del Interior y a Prosperidad Social, por lo
// que ya no aparece en MINISTRIES.

export const PRESIDENTE = {
  id: "presidente",
  title: "Presidente de la República",
  tierLabel: "Jefe de Estado y Gobierno",
  tier: 1,
  constitutionalBasis: "Art. 188–199 C.P.",
  description:
    "Jefe de Estado, Jefe de Gobierno y Suprema Autoridad Administrativa. Dirige las relaciones internacionales, ejerce la potestad reglamentaria y nombra y separa libremente a los Ministros de Despacho.",
  holder: "Gustavo Petro Urrego",
  wikipedia: "https://es.wikipedia.org/wiki/Gustavo_Petro",
  party: "Pacto Histórico",
  since: "2022-08-07",
  term: "2022–2026",
};

export const VICEPRESIDENTE = {
  id: "vicepresidente",
  title: "Vicepresidenta de la República",
  tierLabel: "Vicepresidenta de la República",
  tier: 2,
  constitutionalBasis: "Art. 202–205 C.P.",
  description:
    "Reemplaza al Presidente en sus faltas absolutas o temporales. Ejerce las misiones especiales que le confíe el Presidente y puede ser designada Ministra de Despacho.",
  holder: "Francia Márquez Mina",
  wikipedia: "https://es.wikipedia.org/wiki/Francia_M%C3%A1rquez",
  party: "Pacto Histórico",
  since: "2022-08-07",
  term: "2022–2026",
};

export const MINISTRIES = [
  {
    id: "interior",
    order: 1,
    title: "Ministerio del Interior",
    shortTitle: "Interior",
    description:
      "Coordina las relaciones entre la Nación y los territorios, garantiza el ejercicio de los derechos políticos y gestiona la convivencia ciudadana.",
    holder: "Armando Benedetti Villaneda",
    wikipedia: "https://es.wikipedia.org/wiki/Armando_Benedetti",
    since: "2025-03-03",
    sinceApprox: false,
  },
  {
    id: "relext",
    order: 2,
    title: "Ministerio de Relaciones Exteriores",
    shortTitle: "Relaciones Exteriores",
    description:
      "Formula y ejecuta la política exterior, dirige las relaciones diplomáticas y consulares de Colombia en el mundo.",
    holder: "Rosa Yolanda Villavicencio Mapy",
    wikipedia: "https://en.wikipedia.org/wiki/Rosa_Yolanda_Villavicencio",
    since: "2025-07-09",
    sinceApprox: true,
  },
  {
    id: "hacienda",
    order: 3,
    title: "Ministerio de Hacienda y Crédito Público",
    shortTitle: "Hacienda",
    description:
      "Formula y ejecuta la política económica, fiscal y financiera del Estado y administra el presupuesto general de la Nación.",
    holder: "Germán Ávila Plazas",
    wikipedia: "https://es.wikipedia.org/wiki/Germ%C3%A1n_%C3%81vila_Plazas",
    since: "2025-03-01",
    sinceApprox: true,
  },
  {
    id: "justicia",
    order: 4,
    title: "Ministerio de Justicia y del Derecho",
    shortTitle: "Justicia",
    description:
      "Formula la política criminal y penitenciaria, regula el sistema de administración de justicia y promueve el acceso a ella.",
    holder: "Jorge Iván Cuervo Restrepo",
    wikipedia: "https://es.wikipedia.org/wiki/Jorge_Iv%C3%A1n_Cuervo",
    since: "2026-02-11",
    sinceApprox: false,
  },
  {
    id: "defensa",
    order: 5,
    title: "Ministerio de Defensa Nacional",
    shortTitle: "Defensa",
    description:
      "Conduce la política de seguridad y defensa nacional. Ejerce la autoridad civil sobre las Fuerzas Militares y la Policía Nacional.",
    holder: "Pedro Arnulfo Sánchez Suárez",
    wikipedia: "https://en.wikipedia.org/wiki/Pedro_Arnulfo_S%C3%A1nchez",
    since: "2025-03-04",
    sinceApprox: true,
  },
  {
    id: "agricultura",
    order: 6,
    title: "Ministerio de Agricultura y Desarrollo Rural",
    shortTitle: "Agricultura",
    description:
      "Formula la política agropecuaria, forestal, pesquera y de desarrollo rural para garantizar la seguridad y soberanía alimentaria.",
    holder: "Martha Viviana Carvajalino Villegas",
    wikipedia: "https://en.wikipedia.org/wiki/Martha_Carvajalino",
    since: "2024-07-08",
    sinceApprox: false,
  },
  {
    id: "salud",
    order: 7,
    title: "Ministerio de Salud y Protección Social",
    shortTitle: "Salud",
    description:
      "Define la política de salud pública y regula el sistema de aseguramiento en salud y la protección social de los colombianos.",
    holder: "Guillermo Alfonso Jaramillo Martínez",
    wikipedia: "https://es.wikipedia.org/wiki/Guillermo_Alfonso_Jaramillo",
    since: "2022-08-07",
    sinceApprox: false,
  },
  {
    id: "trabajo",
    order: 8,
    title: "Ministerio de Trabajo",
    shortTitle: "Trabajo",
    description:
      "Formula las políticas de empleo, relaciones laborales, pensiones, economía del cuidado y protección de los derechos laborales.",
    holder: "Antonio Eresmid Sanguino Páez",
    wikipedia: "https://en.wikipedia.org/wiki/Antonio_Sanguino",
    since: "2025-02-19",
    sinceApprox: false,
  },
  {
    id: "minas",
    order: 9,
    title: "Ministerio de Minas y Energía",
    shortTitle: "Minas y Energía",
    description:
      "Regula el aprovechamiento de los recursos naturales no renovables y lidera la política de transición energética justa.",
    holder: "Edwin Palma Egea",
    wikipedia: "https://es.wikipedia.org/wiki/Edwin_Palma_Egea",
    since: "2025-02-27",
    sinceApprox: true,
  },
  {
    id: "comercio",
    order: 10,
    title: "Ministerio de Comercio, Industria y Turismo",
    shortTitle: "Comercio",
    description:
      "Promueve el desarrollo empresarial, la productividad, el comercio exterior y el turismo como motores del crecimiento económico.",
    holder: "Diana Marcela Morales Rojas",
    wikipedia: "https://es.wikipedia.org/wiki/Diana_Marcela_Morales",
    since: "2025-06-05",
    sinceApprox: false,
  },
  {
    id: "educacion",
    order: 11,
    title: "Ministerio de Educación Nacional",
    shortTitle: "Educación",
    description:
      "Formula la política educativa nacional y regula el sistema educativo desde el nivel preescolar hasta la educación superior.",
    holder: "José Daniel Rojas Medellín",
    wikipedia: "https://en.wikipedia.org/wiki/Daniel_Rojas_Medell%C3%ADn",
    since: "2024-07-23",
    sinceApprox: false,
  },
  {
    id: "ambiente",
    order: 12,
    title: "Ministerio de Ambiente y Desarrollo Sostenible",
    shortTitle: "Ambiente",
    description:
      "Define la política ambiental y de biodiversidad, regula los recursos naturales renovables y lidera la acción climática nacional.",
    holder: "Irene Vélez Torres (encargada)",
    wikipedia: "https://en.wikipedia.org/wiki/Irene_V%C3%A9lez_Torres",
    since: "2025-08-05",
    sinceApprox: true,
  },
  {
    id: "vivienda",
    order: 13,
    title: "Ministerio de Vivienda, Ciudad y Territorio",
    shortTitle: "Vivienda",
    description:
      "Formula la política de vivienda social, agua potable y saneamiento básico para garantizar el derecho a un hábitat digno.",
    holder: "Helga María Rivas Ardila",
    wikipedia: "https://en.wikipedia.org/wiki/Helga_Rivas",
    since: "2024-07-01",
    sinceApprox: true,
  },
  {
    id: "tic",
    order: 14,
    title: "Ministerio de Tecnologías de la Información y las Comunicaciones",
    shortTitle: "TIC",
    description:
      "Formula la política del sector TIC, fomenta la conectividad, la transformación digital y el desarrollo de la economía naranja.",
    holder: "Yeimi Carina Murcia Yela",
    wikipedia: "https://en.wikipedia.org/wiki/Carina_Murcia",
    since: "2025-09-21",
    sinceApprox: true,
  },
  {
    id: "transporte",
    order: 15,
    title: "Ministerio de Transporte",
    shortTitle: "Transporte",
    description:
      "Formula y ejecuta la política de infraestructura de transporte terrestre, fluvial, marítimo y aéreo del país.",
    holder: "María Constanza García Alicastro",
    wikipedia: "https://es.wikipedia.org/wiki/Mar%C3%ADa_Constanza_Garc%C3%ADa",
    since: "2024-07-08",
    sinceApprox: false,
  },
  {
    id: "culturas",
    order: 16,
    title: "Ministerio de las Culturas, las Artes y los Saberes",
    shortTitle: "Culturas",
    description:
      "Reconoce y protege la diversidad cultural de Colombia, el patrimonio inmaterial, las artes, las memorias y los saberes de los pueblos.",
    holder: "Yannai Kadamani Fonrodona",
    wikipedia: "https://en.wikipedia.org/wiki/Yannai_Kadamani",
    since: "2025-02-27",
    sinceApprox: true,
  },
  {
    id: "ciencia",
    order: 17,
    title: "Ministerio de Ciencia, Tecnología e Innovación",
    shortTitle: "Ciencia",
    description:
      "Fomenta la investigación científica, el desarrollo tecnológico y la innovación como ejes del modelo de desarrollo sostenible.",
    holder: "Yesenia Olaya Requene",
    wikipedia: "https://es.wikipedia.org/wiki/Yesenia_Olaya",
    since: "2023-05-01",
    sinceApprox: false,
  },
  {
    id: "deporte",
    order: 18,
    title: "Ministerio del Deporte",
    shortTitle: "Deporte",
    description:
      "Promueve la actividad física, el deporte de alto rendimiento y la recreación como derechos y herramientas de desarrollo social.",
    holder: "Patricia Duque Cruz",
    wikipedia: "https://es.wikipedia.org/wiki/Patricia_Duque_Cruz",
    since: "2025-02-25",
    sinceApprox: true,
  },
];
