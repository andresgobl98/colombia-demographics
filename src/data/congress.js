// ⚠️ PLACEHOLDER / ILLUSTRATIVE DATA — not the real composition.
// Seat counts are mock values (Cámara 188, Senado 108) for the 2022–2026
// period. Real rosters/affiliations come later. Parties share metadata; seat
// counts differ per chamber.

export const PARTY_META = {
  pacto:       { name: "Pacto Histórico",            short: "Pacto Hist.", color: "#c62828" },
  comunes:     { name: "Comunes",                    short: "Comunes",     color: "#6a1b9a" },
  verde:       { name: "Alianza Verde",              short: "Verde",       color: "#2e7d32" },
  liberal:     { name: "Partido Liberal",            short: "Liberal",     color: "#ef5350" },
  u:           { name: "Partido de la U",            short: "La U",        color: "#00897b" },
  cambio:      { name: "Cambio Radical",             short: "C. Radical",  color: "#ab47bc" },
  conservador: { name: "Partido Conservador",        short: "Conservador", color: "#1565c0" },
  democratico: { name: "Centro Democrático",         short: "C. Demócr.",  color: "#283593" },
  otros:       { name: "Otros y curules especiales", short: "Otros",       color: "#9e9e9e" },
};

export const CHAMBERS = {
  camara: {
    id: "camara",
    name: "Cámara de Representantes",
    period: "2022–2026",
    totalSeats: 188,
    byDepartment: true, // elected by departmental constituency → map applies
    seats: {
      pacto: 28, liberal: 32, conservador: 25, democratico: 16,
      verde: 16, cambio: 16, u: 15, comunes: 3, otros: 37,
    },
    members: [
      { id: "c1", name: "Representante de ejemplo 1", partyId: "pacto",       departmentCode: "05" },
      { id: "c2", name: "Representante de ejemplo 2", partyId: "liberal",     departmentCode: "05" },
      { id: "c3", name: "Representante de ejemplo 3", partyId: "conservador", departmentCode: "11" },
      { id: "c4", name: "Representante de ejemplo 4", partyId: "verde",       departmentCode: "11" },
      { id: "c5", name: "Representante de ejemplo 5", partyId: "democratico", departmentCode: "76" },
      { id: "c6", name: "Representante de ejemplo 6", partyId: "cambio",      departmentCode: "08" },
      { id: "c7", name: "Representante de ejemplo 7", partyId: "u",           departmentCode: "68" },
      { id: "c8", name: "Representante de ejemplo 8", partyId: "pacto",       departmentCode: "52" },
    ],
  },
  senado: {
    id: "senado",
    name: "Senado de la República",
    period: "2022–2026",
    totalSeats: 108,
    byDepartment: false, // elected by national constituency → no department map
    seats: {
      pacto: 20, liberal: 15, conservador: 15, democratico: 13,
      verde: 13, cambio: 11, u: 10, comunes: 5, otros: 6,
    },
    members: [
      { id: "s1", name: "Senador de ejemplo 1", partyId: "pacto" },
      { id: "s2", name: "Senador de ejemplo 2", partyId: "liberal" },
      { id: "s3", name: "Senador de ejemplo 3", partyId: "conservador" },
      { id: "s4", name: "Senador de ejemplo 4", partyId: "democratico" },
      { id: "s5", name: "Senador de ejemplo 5", partyId: "verde" },
      { id: "s6", name: "Senador de ejemplo 6", partyId: "cambio" },
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
