// ⚠️ PLACEHOLDER / ILLUSTRATIVE DATA — not the real composition.
// Seat counts are mock values that sum to 188 (Cámara de Representantes
// 2022–2026). Real data (official rosters, party affiliations, curules
// especiales) will be wired in later. Parties are ordered left → right so the
// hemicycle renders a sensible political-spectrum gradient.

export const CHAMBER = {
  id: "camara",
  name: "Cámara de Representantes",
  period: "2022–2026",
  totalSeats: 188,
};

export const PARTIES = [
  { id: "pacto",        name: "Pacto Histórico",          short: "Pacto Hist.", color: "#c62828", seats: 28 },
  { id: "comunes",      name: "Comunes",                  short: "Comunes",     color: "#6a1b9a", seats: 3  },
  { id: "verde",        name: "Alianza Verde",            short: "Verde",       color: "#2e7d32", seats: 16 },
  { id: "liberal",      name: "Partido Liberal",          short: "Liberal",     color: "#ef5350", seats: 32 },
  { id: "u",            name: "Partido de la U",          short: "La U",        color: "#00897b", seats: 15 },
  { id: "cambio",       name: "Cambio Radical",           short: "C. Radical",  color: "#ab47bc", seats: 16 },
  { id: "conservador",  name: "Partido Conservador",      short: "Conservador", color: "#1565c0", seats: 25 },
  { id: "democratico",  name: "Centro Democrático",       short: "C. Demócr.",  color: "#283593", seats: 16 },
  { id: "otros",        name: "Otros y curules especiales", short: "Otros",     color: "#9e9e9e", seats: 37 },
];

// A small mock roster keyed loosely to DANE department codes. Real roster later.
export const REPRESENTATIVES = [
  { id: "r1", name: "Representante de ejemplo 1", partyId: "pacto",       departmentCode: "05" },
  { id: "r2", name: "Representante de ejemplo 2", partyId: "liberal",     departmentCode: "05" },
  { id: "r3", name: "Representante de ejemplo 3", partyId: "conservador", departmentCode: "11" },
  { id: "r4", name: "Representante de ejemplo 4", partyId: "verde",       departmentCode: "11" },
  { id: "r5", name: "Representante de ejemplo 5", partyId: "democratico", departmentCode: "76" },
  { id: "r6", name: "Representante de ejemplo 6", partyId: "cambio",      departmentCode: "08" },
  { id: "r7", name: "Representante de ejemplo 7", partyId: "u",           departmentCode: "68" },
  { id: "r8", name: "Representante de ejemplo 8", partyId: "pacto",       departmentCode: "52" },
];

export const partyById = Object.fromEntries(PARTIES.map((p) => [p.id, p]));
