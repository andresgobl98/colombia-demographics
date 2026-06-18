// Congreso de la República de Colombia — período 2022–2026.
//
// CÁMARA: full real roster (186 representantes en ejercicio) importado de
// camara-members.json, extraído del directorio oficial de camara.gov.co
// (legislatura 2025–2026). Las curules se cuentan a partir de esa lista.
//
// SENADO: conteo de curules de la elección del 13-mar-2022; el listado de
// nombres es una selección verificada contra el directorio de senado.gov.co.
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
  pacto:        { name: "Pacto Histórico",     short: "Pacto Hist.", color: "#c62828" },
  liberal:      { name: "Partido Liberal",     short: "Liberal",     color: "#ef5350" },
  conservador:  { name: "Partido Conservador", short: "Conservador", color: "#1565c0" },
  cambio:       { name: "Cambio Radical",      short: "C. Radical",  color: "#ab47bc" },
  democratico:  { name: "Centro Democrático",  short: "C. Demócr.",  color: "#283593" },
  u:            { name: "Partido de la U",     short: "La U",        color: "#00897b" },
  verde:        { name: "Alianza Verde",       short: "Verde",       color: "#2e7d32" },
  mira:         { name: "MIRA",                short: "MIRA",        color: "#fb8c00" },
  comunes:      { name: "Comunes",             short: "Comunes",     color: "#6a1b9a" },
  mais:         { name: "MAIS",                short: "MAIS",        color: "#9ccc65" },
  aico:         { name: "AICO",                short: "AICO",        color: "#827717" },
  liga:         { name: "Liga de Gobernantes", short: "Liga",        color: "#fdd835" },
  // Special constituencies with no single party (coloured as their own group).
  // Indigenous and Colombians-abroad seats are coloured by their actual party
  // (MAIS, AICO, Pacto…) and only flagged via the `constituency` tag.
  citrep:       { name: "Curules de paz (CITREP)",     short: "CITREP",   color: "#ff7043" },
  afro:         { name: "Comunidades afro",            short: "Afro",     color: "#6d4c41" },
  otros:        { name: "Otros partidos",              short: "Otros",    color: "#9e9e9e" },
};

// Human-readable labels for the constituency tag attached to each member.
export const CONSTITUENCY_META = {
  nacional:      "Circunscripción nacional",
  territorial:   "Circunscripción territorial",
  indigena:      "Circunscripción especial indígena",
  afro:          "Circunscripción especial afrodescendiente",
  citrep:        "Circunscripción transitoria especial de paz (CITREP)",
  comunes:       "Curul de paz garantizada (Acuerdo de Paz)",
  internacional: "Circunscripción internacional",
  runnerup:      "Curul de oposición (fórmula presidencial)",
};

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
    // 100 circunscripción nacional + 2 indígena + 5 Comunes
    // + 1 fórmula presidencial = 108.
    seats: {
      pacto: 20, conservador: 15, liberal: 14, verde: 13, democratico: 13,
      cambio: 11, u: 10, mira: 4, comunes: 5, mais: 1, aico: 1, liga: 1,
    },
    members: [
      // Pacto Histórico
      { id: "s-pizarro",   name: "María José Pizarro",        partyId: "pacto",       constituency: "nacional" },
      { id: "s-cepeda",    name: "Iván Cepeda",               partyId: "pacto",       constituency: "nacional" },
      { id: "s-avella",    name: "Aída Avella",               partyId: "pacto",       constituency: "nacional" },
      { id: "s-lopezc",    name: "Clara López",               partyId: "pacto",       constituency: "nacional" },
      // Partido Conservador
      { id: "s-efrain",    name: "Efraín Cepeda",             partyId: "conservador", constituency: "nacional" },
      { id: "s-blel",      name: "Nadia Blel",                partyId: "conservador", constituency: "nacional" },
      { id: "s-trujillo",  name: "Carlos Andrés Trujillo",    partyId: "conservador", constituency: "nacional" },
      // Partido Liberal
      { id: "s-garcia",    name: "Lidio García",              partyId: "liberal",     constituency: "nacional" },
      { id: "s-amin",      name: "Fabio Amín",                partyId: "liberal",     constituency: "nacional" },
      // Alianza Verde
      { id: "s-lozano",    name: "Angélica Lozano",           partyId: "verde",       constituency: "nacional" },
      { id: "s-avila",     name: "Ariel Ávila",               partyId: "verde",       constituency: "nacional" },
      { id: "s-jotape",    name: "Jonathan Pulido (Jota Pe)", partyId: "verde",       constituency: "nacional" },
      // Centro Democrático
      { id: "s-cabal",     name: "María Fernanda Cabal",      partyId: "democratico", constituency: "nacional" },
      { id: "s-valencia",  name: "Paloma Valencia",           partyId: "democratico", constituency: "nacional" },
      { id: "s-holguin",   name: "Paola Holguín",             partyId: "democratico", constituency: "nacional" },
      // Cambio Radical
      { id: "s-castaneda", name: "Ana María Castañeda",       partyId: "cambio",      constituency: "nacional" },
      { id: "s-motoa",     name: "Carlos Fernando Motoa",     partyId: "cambio",      constituency: "nacional" },
      // Partido de la U
      { id: "s-name-jd",   name: "José David Name",           partyId: "u",           constituency: "nacional" },
      { id: "s-hurtado",   name: "Norma Hurtado",             partyId: "u",           constituency: "nacional" },
      // MIRA
      { id: "s-guevara",   name: "Carlos Eduardo Guevara",    partyId: "mira",        constituency: "nacional" },
      { id: "s-agudelo",   name: "Ana Paola Agudelo",         partyId: "mira",        constituency: "nacional" },
      // Comunes — curules de paz garantizadas
      { id: "s-ramirez",   name: "Sandra Ramírez",            partyId: "comunes",     constituency: "comunes" },
      { id: "s-gallo",     name: "Julián Gallo",              partyId: "comunes",     constituency: "comunes" },
      // Circunscripción especial indígena (2 curules)
      { id: "s-fuelantala", name: "Richard Fuelantala",       partyId: "aico",        constituency: "indigena" },
      { id: "s-quilcue",   name: "Aída Quilcué",              partyId: "mais",        constituency: "indigena" },
      // Curul por la fórmula presidencial de la oposición.
      // Rodolfo Hernández ocupó la curul tras las elecciones de 2022 y renunció
      // ese mismo año; se conserva como titular original de la curul de oposición.
      { id: "s-rodolfo",   name: "Rodolfo Hernández",         partyId: "liga",        constituency: "runnerup" },
    ],
  },
};

// Build a seats-descending party list for a chamber, joined with metadata.
export function partiesForChamber(chamber) {
  return Object.entries(chamber.seats)
    .map(([id, seats]) => ({ id, seats, ...PARTY_META[id] }))
    .filter((p) => p.seats > 0)
    .sort((a, b) => b.seats - a.seats);
}
