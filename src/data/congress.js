// Congreso de la República de Colombia — período 2022–2026.
//
// CÁMARA: full real roster (186 representantes en ejercicio) importado de
// camara-members.json, extraído del directorio oficial de camara.gov.co
// (legislatura 2025–2026). Las curules se cuentan a partir de esa lista.
//
// SENADO: conteo de curules de la elección del 13-mar-2022; el listado de
// nombres es el directorio completo de senado.gov.co (período 2022–2026).
//
// Cada miembro lleva una etiqueta `constituency` (ver CONSTITUENCY_META) para
// hacer explícitas las circunscripciones especiales aun cuando las curules se
// colorean por partido.

import camaraMembers from "./camara-members.json";

// Tally seats per party id from a members list.
function tallySeats(members) {
  return members.reduce((acc, m) => {
    acc[m.partyId] = (acc[m.partyId] ?? 0) + 1;
    return acc;
  }, {});
}

export const PARTY_META = {
  // Traditional parties / movements (coloured by party in the hemicycle).
  pacto: { name: "Pacto Histórico", short: "Pacto Hist.", color: "#c62828" },
  liberal: { name: "Partido Liberal", short: "Liberal", color: "#ef5350" },
  conservador: { name: "Partido Conservador", short: "Conservador", color: "#1565c0" },
  cambio: { name: "Cambio Radical", short: "C. Radical", color: "#ab47bc" },
  democratico: { name: "Centro Democrático", short: "C. Demócr.", color: "#283593" },
  u: { name: "Partido de la U", short: "La U", color: "#00897b" },
  verde: { name: "Alianza Verde", short: "Verde", color: "#2e7d32" },
  mira: { name: "MIRA", short: "MIRA", color: "#fb8c00" },
  comunes: { name: "Comunes", short: "Comunes", color: "#6a1b9a" },
  mais: { name: "MAIS", short: "MAIS", color: "#9ccc65" },
  aico: { name: "AICO", short: "AICO", color: "#827717" },
  liga: { name: "Liga de Gobernantes", short: "Liga", color: "#fdd835" },
  // Special constituencies with no single party (coloured as their own group).
  // Indigenous and Colombians-abroad seats are coloured by their actual party
  // (MAIS, AICO, Pacto…) and only flagged via the `constituency` tag.
  citrep: { name: "Curules de paz (CITREP)", short: "CITREP", color: "#ff7043" },
  afro: { name: "Comunidades afro", short: "Afro", color: "#6d4c41" },
  otros: { name: "Otros partidos", short: "Otros", color: "#9e9e9e" },
};

// Human-readable labels for the constituency tag attached to each member.
export const CONSTITUENCY_META = {
  nacional: "Circunscripción nacional",
  territorial: "Circunscripción territorial",
  indigena: "Circunscripción especial indígena",
  afro: "Circunscripción especial afrodescendiente",
  citrep: "Circunscripción transitoria especial de paz (CITREP)",
  comunes: "Curul de paz garantizada (Acuerdo de Paz)",
  internacional: "Circunscripción internacional",
  runnerup: "Curul de oposición (fórmula presidencial)",
};

const senadoMembers = [
      // Pacto Histórico (20)
      { id: "s-gustavo-bolivar-moreno", name: "Gustavo Bolívar Moreno", partyId: "pacto", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-maria-jose-pizarro", name: "Maria José Pizarro", partyId: "pacto", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-alexander-lopez-maya", name: "Alexander López Maya", partyId: "pacto", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-aida-yolanda-avella", name: "Aida Yolanda Avella Esquivel", partyId: "pacto", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-roy-leonardo-barreras", name: "Roy Leonardo Barreras Montealegre", partyId: "pacto", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-martha-peralta-epieyu", name: "Martha Peralta Epieyú", partyId: "pacto", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-ivan-cepeda-castro", name: "Iván Cepeda Castro", partyId: "pacto", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-piedad-esneda-cordoba", name: "Piedad Esneda Córdoba Ruíz", partyId: "pacto", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-pedro-florez-porras", name: "Pedro Flórez Porras", partyId: "pacto", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-isabel-cristina-zuleta", name: "Isabel Cristina Zuleta", partyId: "pacto", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-alex-florez-hernandez", name: "Alex Flórez Hernández", partyId: "pacto", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-clara-lopez", name: "Clara Lopez", partyId: "pacto", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-robert-daza", name: "Robert Daza", partyId: "pacto", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-esmeralda-hernandez-silva", name: "Esmeralda Hernández Silva", partyId: "pacto", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-wilson-neber-arias", name: "Wilson Neber Arias Castillo", partyId: "pacto", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-florez-schneider-gloria", name: "Gloria Inés Flórez Schneider", partyId: "pacto", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-cesar-pachon", name: "Cesar Pachón", partyId: "pacto", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-sandra-yaneth-jaimes", name: "Sandra Yaneth Jaimes", partyId: "pacto", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-paulino-riascos-riascos", name: "Paulino Riascos Riascos", partyId: "pacto", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-jahel-quiroga-carrillo", name: "Jahel Quiroga Carrillo", partyId: "pacto", constituency: "nacional", commission: "Comisión Segunda" },
      // Partido Conservador (15)
      { id: "s-nadya-georgette-blel", name: "Nadya Georgette Blel Scaff", partyId: "conservador", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-carlos-andres-trujillo", name: "Carlos Andrés Trujillo González", partyId: "conservador", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-marcos-daniel-pineda", name: "Marcos Daniel Pineda Garcia", partyId: "conservador", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-efrain-jose-cepeda", name: "Efraín José Cepeda Sarabia", partyId: "conservador", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-liliana-esther-bitar", name: "Liliana Esther Bitar Castilla", partyId: "conservador", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-oscar-barreto-quiroga", name: "Oscar Barreto Quiroga", partyId: "conservador", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-diela-liliana-benavides", name: "Diela Liliana Benavides Solarte", partyId: "conservador", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-oscar-mauricio-giraldo", name: "Oscar Mauricio Giraldo Hernandez", partyId: "conservador", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-nicolas-albeiro-echeverry", name: "Nicolas Albeiro Echeverry Alvaran", partyId: "conservador", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-juan-samy-merheg", name: "Juan Samy Merheg Marun", partyId: "conservador", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-german-alcides-blanco", name: "German Alcides Blanco Alvarez", partyId: "conservador", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-juan-carlos-garcia", name: "Juan Carlos García Gómez", partyId: "conservador", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-jose-alfredo-marin", name: "Jose Alfredo Marin Lozano", partyId: "conservador", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-miguel-angel-barreto", name: "Miguel Ángel Barreto Castillo", partyId: "conservador", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-soledad-tamayo-tamayo", name: "Soledad Tamayo Tamayo", partyId: "conservador", constituency: "nacional", commission: "Comisión Sexta" },
      // Partido Liberal (14)
      { id: "s-lidio-arturo-garcia", name: "Lidio Arturo García Turbay", partyId: "liberal", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-juan-pablo-gallo", name: "Juan Pablo Gallo", partyId: "liberal", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-karina-espinosa-oliver", name: "Karina Espinosa Oliver", partyId: "liberal", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-alejandro-carlos-chacon", name: "Alejandro Carlos Chacón Camargo", partyId: "liberal", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-fabio-raul-amin", name: "Fabio Raúl Amín Saleme", partyId: "liberal", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-miguel-angel-pinto", name: "Miguel Ángel Pinto Hernandez", partyId: "liberal", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-claudia-maria-perez", name: "Claudia Maria Perez Giraldo", partyId: "liberal", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-alejandro-alberto-vega", name: "Alejandro Alberto Vega Pérez", partyId: "liberal", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-juan-diego-echavarria", name: "Juan Diego Echavarria Sánchez", partyId: "liberal", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-jaime-enrique-duran", name: "Jaime Enrique Duran Barrera", partyId: "liberal", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-john-jairo-roldan", name: "John Jairo Roldan Avendaño", partyId: "liberal", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-mauricio-gomez-amin", name: "Mauricio Gómez Amín", partyId: "liberal", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-mario-alberto-castano", name: "Mario Alberto Castaño Pérez", partyId: "liberal", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-laura-ester-fortich", name: "Laura Ester Fortich Sánchez", partyId: "liberal", constituency: "nacional", commission: "Comisión Cuarta" },
      // Alianza Verde / Centro Esperanza (13)
      { id: "s-jonathan-ferney-pulido", name: "Jonathan Ferney Pulido Hernandez", partyId: "verde", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-ariel-fernando-avila", name: "Ariel Fernando Avila Martinez", partyId: "verde", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-angelica-lisbeth-lozano", name: "Angélica Lisbeth Lozano Correa", partyId: "verde", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-inti-raul-asprilla", name: "Inti Raúl Asprilla Reyes", partyId: "verde", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-jairo-alberto-castellanos", name: "Jairo Alberto Castellanos", partyId: "verde", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-ana-carolina-espitia", name: "Ana Carolina Espitia Jerez", partyId: "verde", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-guido-echeverri-piedrahita", name: "Guido Echeverri Piedrahita", partyId: "verde", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-andrea-padilla-villarraga", name: "Andrea Padilla Villarraga", partyId: "verde", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-fabian-diaz-plata", name: "Fabián Díaz Plata", partyId: "verde", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-gustavo-adolfo-moreno", name: "Gustavo Adolfo Moreno Hurtado", partyId: "verde", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-sor-berenice-bedoya", name: "Sor Berenice Bedoya Perez", partyId: "verde", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-ivan-leonidas-name", name: "Iván Leónidas Name Vásquez", partyId: "verde", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-humberto-de-la-calle", name: "Humberto de la Calle Lombana", partyId: "verde", constituency: "nacional", commission: "Comisión Primera" },
      // Centro Democrático (13)
      { id: "s-miguel-uribe-turbay", name: "Miguel Uribe Turbay", partyId: "democratico", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-maria-fernanda-cabal", name: "Maria Fernanda Cabal", partyId: "democratico", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-josue-alirio-barrera", name: "Josue Alirio Barrera Rodriguez", partyId: "democratico", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-andres-felipe-guerra", name: "Andres Felipe Guerra Hoyos", partyId: "democratico", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-esteban-quintero-cardona", name: "Esteban Quintero Cardona", partyId: "democratico", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-paola-andrea-holguin", name: "Paola Andrea Holguin Moreno", partyId: "democratico", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-paloma-valencia", name: "Paloma Valencia", partyId: "democratico", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-enrique-cabrales-baquero", name: "Enrique Cabrales Baquero", partyId: "democratico", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-carlos-manuel-meisel", name: "Carlos Manuel Meisel Vergara", partyId: "democratico", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-ciro-alejandro-ramirez", name: "Ciro Alejandro Ramírez Cortés", partyId: "democratico", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-jose-vicente-carreno", name: "José Vicente Carreño Castro", partyId: "democratico", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-honorio-miguel-henriquez", name: "Honorio Miguel Henriquez", partyId: "democratico", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-yenny-esperanza-rozo", name: "Yenny Esperanza Rozo Zambrano", partyId: "democratico", constituency: "nacional", commission: "Comisión Quinta" },
      // Cambio Radical (11)
      { id: "s-david-luna-sanchez", name: "David Luna Sánchez", partyId: "cambio", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-arturo-char-chaljub", name: "Arturo Char Chaljub", partyId: "cambio", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-antonio-luis-zabarin", name: "Antonio Luis Zabarin", partyId: "cambio", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-carlos-abraham-jimenez", name: "Carlos Abraham Jiménez López", partyId: "cambio", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-edgar-jesus-diaz", name: "Edgar Jesús Díaz Contreras", partyId: "cambio", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-carlos-mario-farelo", name: "Carlos Mario Farelo", partyId: "cambio", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-jorge-enrique-benedetti", name: "Jorge Enrique Benedetti Martelo", partyId: "cambio", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-ana-maria-castaneda", name: "Ana Maria Castañeda Gomez", partyId: "cambio", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-carlos-fernando-motoa", name: "Carlos Fernando Motoa Solarte", partyId: "cambio", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-jose-luis-perez", name: "Jose Luis Perez Oyuela", partyId: "cambio", constituency: "nacional", commission: "Comisión Segunda" },
      { id: "s-didier-lobo-chinchilla", name: "Didier Lobo Chinchilla", partyId: "cambio", constituency: "nacional", commission: "Comisión Quinta" },
      // Partido de la U (10)
      { id: "s-juan-carlos-garces", name: "Juan Carlos Garces Rojas", partyId: "u", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-johnny-besaile", name: "Johnny Besaile", partyId: "u", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-norma-hurtado-sanchez", name: "Norma Hurtado Sánchez", partyId: "u", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-jose-david-name", name: "Jose David Name Cardozo", partyId: "u", constituency: "nacional", commission: "Comisión Quinta" },
      { id: "s-juan-felipe-lemos", name: "Juan Felipe Lemos Uribe", partyId: "u", constituency: "nacional", commission: "Comisión Cuarta" },
      { id: "s-julio-elias-chagui", name: "Julio Elias Chagui Florez", partyId: "u", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-alfredo-rafael-deluque", name: "Alfredo Rafael Deluque Zuleta", partyId: "u", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-berner-leon-zambrano", name: "Berner León Zambrano Erazo", partyId: "u", constituency: "nacional", commission: "Comisión Primera" },
      { id: "s-jose-alfredo-gnecco", name: "José Alfredo Gnecco Zuleta", partyId: "u", constituency: "nacional", commission: "Comisión Tercera" },
      { id: "s-antonio-jose-correa", name: "Antonio Jose Correa Jimenez", partyId: "u", constituency: "nacional", commission: "Comisión Segunda" },
      // Coalición MIRA – COL Justa Libres (4)
      { id: "s-beatriz-lorena-rios", name: "Beatriz Lorena Rios", partyId: "mira", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-carlos-eduardo-guevara", name: "Carlos Eduardo Guevara Villabon", partyId: "mira", constituency: "nacional", commission: "Comisión Sexta" },
      { id: "s-ana-paola-agudelo", name: "Ana Paola Agudelo Garcia", partyId: "mira", constituency: "nacional", commission: "Comisión Séptima" },
      { id: "s-manuel-antonio-virguez", name: "Manuel Antonio Virguez Piraquive", partyId: "mira", constituency: "nacional", commission: "Comisión Segunda" },
      // Circunscripción especial indígena — MAIS (2 curules; AICO curul ocupada por MAIS en directorio actual)
      { id: "s-aida-marina-quilcue", name: "Aida Marina Quilcué Vivas", partyId: "mais", constituency: "indigena", commission: "Comisión Primera" },
      { id: "s-polivio-leandro-rosales", name: "Polivio Leandro Rosales Cadena", partyId: "mais", constituency: "indigena", commission: "Comisión Séptima" },
      // Comunes — curules de paz garantizadas (5)
      { id: "s-julian-gallo-cubillos", name: "Julián Gallo Cubillos", partyId: "comunes", constituency: "comunes", commission: "Comisión Primera" },
      { id: "s-sandra-ramirez-lobo", name: "Sandra Ramírez Lobo Silva", partyId: "comunes", constituency: "comunes", commission: "Comisión Sexta" },
      { id: "s-pablo-catatumbo", name: "Pablo Catatumbo", partyId: "comunes", constituency: "comunes", commission: "Comisión Quinta" },
      { id: "s-imelda-daza", name: "Imelda Daza", partyId: "comunes", constituency: "comunes", commission: "Comisión Tercera" },
      { id: "s-omar-de-jesus-restrepo", name: "Omar de Jesús Restrepo", partyId: "comunes", constituency: "comunes", commission: "Comisión Séptima" },
      // Liga de Gobernantes Anticorrupción — curul de oposición (fórmula presidencial)
      { id: "s-rodolfo-hernandez-suarez", name: "Rodolfo Hernández Suárez", partyId: "liga", constituency: "runnerup", commission: "Comisión Primera" },
];

export const CHAMBERS = {
  camara: {
    id: "camara",
    name: "Cámara de Representantes",
    period: "2022–2026",
    totalSeats: 188, // 186 curules en ejercicio (2 vacantes en el directorio oficial)
    byDepartment: true, // territorial constituency → department map applies
    // Distribución real: 162 territorial + 16 CITREP + 5 Comunes + 2 afro
    // + 1 indígena + 1 internacional + 1 fórmula vicepresidencial.
    seats: tallySeats(camaraMembers),
    members: camaraMembers,
  },
  senado: {
    id: "senado",
    name: "Senado de la República",
    period: "2022–2026",
    totalSeats: 108,
    byDepartment: false, // national constituency → no department map
    // 100 circunscripción nacional + 2 indígena + 5 Comunes + 1 fórmula presidencial = 108.
    seats: tallySeats(senadoMembers),
    members: senadoMembers,
  },
};

// Build a seats-descending party list for a chamber, joined with metadata.
export function partiesForChamber(chamber) {
  return Object.entries(chamber.seats)
    .map(([id, seats]) => ({ id, seats, ...PARTY_META[id] }))
    .filter((p) => p.seats > 0)
    .sort((a, b) => b.seats - a.seats);
}
