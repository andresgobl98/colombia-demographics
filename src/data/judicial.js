// Rama Judicial de Colombia — organismos, qué hacen y quién los dirige.
//
// Titulares verificados a jun. 2026 (presidencias de las altas cortes se
// renuevan anualmente, normalmente en enero/febrero). Verificar en
// ramajudicial.gov.co y en el sitio de cada corporación.

// Category metadata: drives the section dividers and their order in the view.
export const JUDICIAL_CATEGORIES = [
  {
    id: "cierre",
    label: "Órganos de cierre",
    blurb: "Las altas cortes: la última palabra en cada jurisdicción.",
  },
  {
    id: "especial",
    label: "Jurisdicción especial",
    blurb: "Justicia transicional derivada del Acuerdo de Paz.",
  },
  {
    id: "fiscalia",
    label: "Investigación y acusación",
    blurb: "Persigue el delito y acusa ante los jueces.",
  },
  {
    id: "gobierno",
    label: "Gobierno y administración",
    blurb: "Dirigen, administran y disciplinan la propia Rama Judicial.",
  },
];

// Each org:
//   leaders[].role     — gendered label, e.g. "Presidenta", "Fiscal General"
//   leaders[].chamber  — optional sala/sección the magistrate comes from
//   rotates            — true when the presidency is renewed every year
//   constitutionalBasis— articles of the Constitución Política (C.P.)
export const JUDICIAL_ORGS = [
  {
    id: "corte-constitucional",
    category: "cierre",
    name: "Corte Constitucional",
    shortName: "Constitucional",
    constitutionalBasis: "Art. 239–245 C.P.",
    description:
      "Guarda la integridad y la supremacía de la Constitución. Decide si las leyes y los decretos se ajustan a la Carta, revisa los fallos de tutela de todo el país y resuelve los conflictos sobre los límites del poder.",
    composition: "9 magistrados · período de 8 años · no reelegibles",
    selection:
      "Elegidos por el Senado de ternas que envían el Presidente, la Corte Suprema de Justicia y el Consejo de Estado.",
    rotates: true,
    website: "https://www.corteconstitucional.gov.co",
    leaders: [
      { role: "Presidenta", name: "Paola Andrea Meneses Mosquera", since: "2026-02-10" },
      { role: "Vicepresidenta", name: "Natalia Ángel Cabo", since: "2026-02-10" },
    ],
    benchGroups: [
      {
        members: [
          "Paola Andrea Meneses Mosquera",
          "Natalia Ángel Cabo",
          "Jorge Enrique Ibáñez Najar",
          "Juan Carlos Cortés González",
          "Vladimir Fernández Andrade",
          "Miguel Polo Rosero",
          "Lina Marcela Escobar Martínez",
          "Héctor Carvajal Londoño",
          "Carlos Ernesto Camargo Assis",
        ],
      },
    ],
  },
  {
    id: "corte-suprema",
    category: "cierre",
    name: "Corte Suprema de Justicia",
    shortName: "Suprema",
    constitutionalBasis: "Art. 234–235 C.P.",
    description:
      "Máximo tribunal de la jurisdicción ordinaria y tribunal de casación. Unifica la jurisprudencia civil, penal y laboral, y juzga a los aforados —congresistas y altos funcionarios— en única instancia.",
    composition: "23 magistrados · salas de casación Civil, Penal y Laboral · período de 8 años",
    selection:
      "La propia Corte elige a sus magistrados (cooptación) de listas que remite el Consejo Superior de la Judicatura.",
    rotates: true,
    website: "https://cortesuprema.gov.co",
    leaders: [
      { role: "Presidente", name: "Iván Mauricio Lenis Gómez", chamber: "Sala de Casación Laboral", since: "2026-01-22" },
      { role: "Vicepresidente", name: "Hugo Quintero Bernate", chamber: "Sala de Casación Penal", since: "2026-01-22" },
    ],
    benchGroups: [
      {
        label: "Sala de Casación Civil y Agraria",
        members: [
          "Aroldo Wilson Quiroz Monsalvo",
          "Martha Patricia Guzmán Álvarez",
          "Luis Alonso Rico Puerta",
          "Octavio Augusto Tejeiro Duque",
          "Francisco José Ternera Barrios",
          "Hilda González Neira",
          "Fernando Augusto Jiménez Valderrama",
        ],
      },
      {
        label: "Sala de Casación Penal",
        members: [
          "Carlos Roberto Solórzano Garavito",
          "Myriam Ávila Roldán",
          "Fernando León Bolaños Palacios",
          "Diego Eugenio Corredor Beltrán",
          "Gerson Chaverra Castro",
          "Luis Antonio Hernández Barbosa",
          "Hugo Quintero Bernate",
          "Jorge Hernán Díaz Soto",
        ],
      },
      {
        label: "Sala de Casación Laboral",
        members: [
          "Iván Mauricio Lenis Gómez",
          "Fernando Castillo Cadena",
          "Gerardo Botero Zuluaga",
          "Marjorie Zúñiga Romero",
          "Luis Benedicto Herrera Díaz",
          "Clara Inés López Dávila",
          "Omar Ángel Mejía Amador",
        ],
      },
    ],
  },
  {
    id: "consejo-estado",
    category: "cierre",
    name: "Consejo de Estado",
    shortName: "Consejo de Estado",
    constitutionalBasis: "Art. 236–238 C.P.",
    description:
      "Máximo tribunal de lo contencioso administrativo y cuerpo consultivo del Gobierno. Resuelve los litigios contra el Estado, controla la legalidad de los actos administrativos y decide la pérdida de investidura de los congresistas.",
    composition: "Hasta 32 magistrados · Sala de lo Contencioso Administrativo y Sala de Consulta y Servicio Civil",
    selection:
      "Sus magistrados se eligen por cooptación, de listas que remite el Consejo Superior de la Judicatura.",
    rotates: true,
    website: "https://www.consejodeestado.gov.co",
    leaders: [
      { role: "Presidente", name: "Alberto Montaña Plata", chamber: "Sección Tercera", since: "2026-01-27" },
    ],
    benchNote: "Magistrados de la Sala de lo Contencioso Administrativo. La Sala de Consulta y Servicio Civil se integra aparte.",
    benchGroups: [
      {
        label: "Sección Primera",
        members: [
          "Nubia Margoth Peña Garzón",
          "Oswaldo Giraldo López",
          "Roberto Augusto Serrato Valdés",
          "Hernando Sánchez Sánchez",
        ],
      },
      {
        label: "Sección Segunda",
        members: [
          "Gabriel Valbuena Hernández",
          "César Palomino Cortés",
          "Jorge Iván Duque Gutiérrez",
          "Carmelo Perdomo Cueter",
          "Sandra Lisset Ibarra Vélez",
          "Rafael Francisco Suárez Vargas",
        ],
      },
      {
        label: "Sección Tercera",
        members: [
          "Alberto Montaña Plata",
          "William Barrera Muñoz",
          "Fernando Alexei Pardo Flórez",
          "Nicolás Yepes Corrales",
          "José Roberto Sáchica Méndez",
          "Diego Franco Victoria",
          "María Adriana Marín",
          "Adriana Polidura Castillo",
          "Fredy Ibarra Martínez",
        ],
      },
      {
        label: "Sección Cuarta",
        members: [
          "Julio Roberto Piza Rodríguez",
          "Stella Jeannette Carvajal Basto",
          "Milton Chaves García",
          "Myriam Stella Gutiérrez Argüello",
        ],
      },
      {
        label: "Sección Quinta",
        members: [
          "Gloria María Gómez Montoya",
          "Luis Alberto Álvarez Parra",
          "Omar Joaquín Barreto Suárez",
          "Pedro Pablo Vanegas Gil",
        ],
      },
    ],
  },
  {
    id: "jep",
    category: "especial",
    name: "Jurisdicción Especial para la Paz",
    shortName: "JEP",
    constitutionalBasis: "Acto Leg. 01 de 2017",
    description:
      "Componente de justicia del Sistema Integral de Paz creado por el Acuerdo Final de 2016. Investiga y juzga los hechos más graves del conflicto armado cometidos antes del 1.º de diciembre de 2016, combinando verdad y reparación con sanciones propias.",
    composition: "Tribunal para la Paz + 3 Salas de Justicia · magistrados con período de hasta 20 años",
    selection:
      "Sus magistrados fueron escogidos por un Comité de Escogencia autónomo; la Sala Plena elige a sus dignatarios.",
    rotates: false,
    website: "https://www.jep.gov.co",
    leaders: [
      { role: "Presidente", name: "Alejandro Ramelli Arteaga", since: "2024-10-01", sinceApprox: true },
      { role: "Vicepresidente", name: "José Miller Hormiga Sánchez", since: "2024-10-01", sinceApprox: true },
    ],
  },
  {
    id: "fiscalia",
    category: "fiscalia",
    name: "Fiscalía General de la Nación",
    shortName: "Fiscalía",
    constitutionalBasis: "Art. 249–253 C.P.",
    description:
      "Investiga los delitos y acusa a los presuntos responsables ante los jueces. Hace parte de la Rama Judicial con autonomía administrativa y presupuestal; dirige la policía judicial y protege a víctimas y testigos.",
    composition: "Fiscal General + Vicefiscal · fiscalías delegadas y direcciones especializadas en todo el país",
    selection:
      "El Fiscal General es elegido por la Corte Suprema de Justicia, de terna que envía el Presidente, para un período de 4 años.",
    rotates: false,
    website: "https://www.fiscalia.gov.co",
    leaders: [
      { role: "Fiscal General", name: "Luz Adriana Camargo Garzón", since: "2024-03-22", term: "2024–2028" },
    ],
  },
  {
    id: "consejo-judicatura",
    category: "gobierno",
    name: "Consejo Superior de la Judicatura",
    shortName: "Judicatura",
    constitutionalBasis: "Art. 254–257 C.P.",
    description:
      "Gobierna y administra la Rama Judicial. Maneja la carrera judicial, elabora su presupuesto y las listas de candidatos a magistrado, crea y suprime despachos y dirime los conflictos de competencia entre jurisdicciones.",
    composition: "6 magistrados · Sala Administrativa · período de 8 años",
    selection:
      "Elegidos por la Corte Suprema de Justicia, el Consejo de Estado y la Corte Constitucional.",
    rotates: true,
    website: "https://www.ramajudicial.gov.co",
    leaders: [
      { role: "Presidenta", name: "Mary Lucero Novoa Moreno", since: "2026-01-28" },
      { role: "Vicepresidenta", name: "Claudia Expósito Vélez", since: "2026-01-28" },
    ],
  },
  {
    id: "comision-disciplina",
    category: "gobierno",
    name: "Comisión Nacional de Disciplina Judicial",
    shortName: "Disciplina Judicial",
    constitutionalBasis: "Art. 257A C.P.",
    description:
      "Ejerce la función disciplinaria sobre los funcionarios y empleados de la Rama Judicial y sobre los abogados en ejercicio. Reemplazó a la antigua Sala Jurisdiccional Disciplinaria del Consejo Superior de la Judicatura.",
    composition: "7 magistrados · período de 8 años",
    selection:
      "Elegidos por el Congreso de la República, de ternas que envían el Gobierno y el Consejo Superior de la Judicatura.",
    rotates: true,
    website: "https://cndj.gov.co",
    leaders: [
      { role: "Presidente", name: "Carlos Arturo Ramírez Vásquez", since: "2026-01-01", sinceApprox: true },
      { role: "Vicepresidente", name: "Juan Carlos Granados Becerra", since: "2026-01-01", sinceApprox: true },
    ],
  },
];

export function orgsForCategory(categoryId) {
  return JUDICIAL_ORGS.filter((o) => o.category === categoryId);
}
