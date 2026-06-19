// NOTE: Titulares aproximados a ago. 2025. Verificar en presidencia.gov.co.

export const PRESIDENTE = {
  id: "presidente",
  title: "Presidente de la República",
  tierLabel: "Jefe de Estado y Gobierno",
  tier: 1,
  constitutionalBasis: "Art. 188–199 C.P.",
  description:
    "Jefe de Estado, Jefe de Gobierno y Suprema Autoridad Administrativa. Dirige las relaciones internacionales, ejerce la potestad reglamentaria y nombra y separa libremente a los Ministros de Despacho.",
  holder: "Gustavo Petro Urrego",
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
    holder: "Juan Fernando Cristo Bustos",
    since: "2024-06-01",
    sinceApprox: true,
  },
  {
    id: "relext",
    order: 2,
    title: "Ministerio de Relaciones Exteriores",
    shortTitle: "Relaciones Exteriores",
    description:
      "Formula y ejecuta la política exterior, dirige las relaciones diplomáticas y consulares de Colombia en el mundo.",
    holder: "Luis Gilberto Murillo",
    since: "2023-07-01",
    sinceApprox: true,
  },
  {
    id: "hacienda",
    order: 3,
    title: "Ministerio de Hacienda y Crédito Público",
    shortTitle: "Hacienda",
    description:
      "Formula y ejecuta la política económica, fiscal y financiera del Estado y administra el presupuesto general de la Nación.",
    holder: "Ricardo Bonilla González",
    since: "2022-12-01",
    sinceApprox: true,
  },
  {
    id: "justicia",
    order: 4,
    title: "Ministerio de Justicia y del Derecho",
    shortTitle: "Justicia",
    description:
      "Formula la política criminal y penitenciaria, regula el sistema de administración de justicia y promueve el acceso a ella.",
    holder: "Ángela María Buitrago",
    since: "2024-02-01",
    sinceApprox: true,
  },
  {
    id: "defensa",
    order: 5,
    title: "Ministerio de Defensa Nacional",
    shortTitle: "Defensa",
    description:
      "Conduce la política de seguridad y defensa nacional. Ejerce la autoridad civil sobre las Fuerzas Militares y la Policía Nacional.",
    holder: "Iván Velásquez Gómez",
    since: "2022-08-07",
    sinceApprox: false,
  },
  {
    id: "agricultura",
    order: 6,
    title: "Ministerio de Agricultura y Desarrollo Rural",
    shortTitle: "Agricultura",
    description:
      "Formula la política agropecuaria, forestal, pesquera y de desarrollo rural para garantizar la seguridad y soberanía alimentaria.",
    holder: "Jhenifer Mojica Flórez",
    since: "2023-02-01",
    sinceApprox: true,
  },
  {
    id: "salud",
    order: 7,
    title: "Ministerio de Salud y Protección Social",
    shortTitle: "Salud",
    description:
      "Define la política de salud pública y regula el sistema de aseguramiento en salud y la protección social de los colombianos.",
    holder: "Guillermo Alfonso Jaramillo Martínez",
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
    holder: "Gloria Inés Ramírez Ríos",
    since: "2022-08-07",
    sinceApprox: false,
  },
  {
    id: "minas",
    order: 9,
    title: "Ministerio de Minas y Energía",
    shortTitle: "Minas y Energía",
    description:
      "Regula el aprovechamiento de los recursos naturales no renovables y lidera la política de transición energética justa.",
    holder: "Ómar Andrés Camacho",
    since: "2023-09-01",
    sinceApprox: true,
  },
  {
    id: "comercio",
    order: 10,
    title: "Ministerio de Comercio, Industria y Turismo",
    shortTitle: "Comercio",
    description:
      "Promueve el desarrollo empresarial, la productividad, el comercio exterior y el turismo como motores del crecimiento económico.",
    holder: "Germán Umaña Mendoza",
    since: "2022-08-07",
    sinceApprox: false,
  },
  {
    id: "educacion",
    order: 11,
    title: "Ministerio de Educación Nacional",
    shortTitle: "Educación",
    description:
      "Formula la política educativa nacional y regula el sistema educativo desde el nivel preescolar hasta la educación superior.",
    holder: "Aurora Vergara Figueroa",
    since: "2022-08-07",
    sinceApprox: false,
  },
  {
    id: "ambiente",
    order: 12,
    title: "Ministerio de Ambiente y Desarrollo Sostenible",
    shortTitle: "Ambiente",
    description:
      "Define la política ambiental y de biodiversidad, regula los recursos naturales renovables y lidera la acción climática nacional.",
    holder: "Jhon Milton Ortega Porras",
    since: "2024-01-01",
    sinceApprox: true,
  },
  {
    id: "vivienda",
    order: 13,
    title: "Ministerio de Vivienda, Ciudad y Territorio",
    shortTitle: "Vivienda",
    description:
      "Formula la política de vivienda social, agua potable y saneamiento básico para garantizar el derecho a un hábitat digno.",
    holder: "Catalina Velasco Campuzano",
    since: "2022-08-07",
    sinceApprox: true,
  },
  {
    id: "tic",
    order: 14,
    title: "Ministerio de Tecnologías de la Información y las Comunicaciones",
    shortTitle: "TIC",
    description:
      "Formula la política del sector TIC, fomenta la conectividad, la transformación digital y el desarrollo de la economía naranja.",
    holder: "Mauricio Lizcano Arango",
    since: "2022-08-07",
    sinceApprox: false,
  },
  {
    id: "transporte",
    order: 15,
    title: "Ministerio de Transporte",
    shortTitle: "Transporte",
    description:
      "Formula y ejecuta la política de infraestructura de transporte terrestre, fluvial, marítimo y aéreo del país.",
    holder: "William Camargo Triana",
    since: "2022-08-07",
    sinceApprox: true,
  },
  {
    id: "culturas",
    order: 16,
    title: "Ministerio de las Culturas, las Artes y los Saberes",
    shortTitle: "Culturas",
    description:
      "Reconoce y protege la diversidad cultural de Colombia, el patrimonio inmaterial, las artes, las memorias y los saberes de los pueblos.",
    holder: "Juan David Correa Ulloa",
    since: "2022-08-07",
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
    since: "2022-08-07",
    sinceApprox: true,
  },
  {
    id: "igualdad",
    order: 18,
    title: "Ministerio de la Igualdad y la Equidad",
    shortTitle: "Igualdad",
    description:
      "Creado en 2023. Formula la política pública para cerrar las brechas de desigualdad de los grupos históricamente discriminados.",
    holder: "Cielo Rusinque Urrego",
    since: "2023-06-01",
    sinceApprox: true,
  },
  {
    id: "deporte",
    order: 19,
    title: "Ministerio del Deporte",
    shortTitle: "Deporte",
    description:
      "Promueve la actividad física, el deporte de alto rendimiento y la recreación como derechos y herramientas de desarrollo social.",
    holder: "Astrid Rodríguez Arce",
    since: "2022-08-07",
    sinceApprox: true,
  },
];
