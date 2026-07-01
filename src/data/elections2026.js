// TEMPORARY DATA: 2026 presidential election results.
// Remove/retire this file and the section that reads it once the elected
// government (holder.since 2026-08-07) has settled into data/executive.js
// and the "latest election" callout is no longer news.
//
// Source: Registraduría Nacional (resultados.registraduria.gov.co) and
// "Elecciones presidenciales de Colombia de 2026" (Wikipedia), checked 2026-06-30.

export const ELECTION_META = {
  label: "Elecciones presidenciales 2026",
  firstRoundDate: "2026-05-31",
  runoffDate: "2026-06-21",
  confirmedDate: "2026-06-24",
  inaugurationDate: "2026-08-07",
  sourceUrl: "https://resultados.registraduria.gov.co/",
  wikipediaUrl: "https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Colombia_de_2026",
};

// Wikipedia URLs are filled in `wikipedia` below once verified.
export const CANDIDATES = {
  delaespriella: {
    id: "delaespriella",
    name: "Abelardo de la Espriella",
    party: "Defensores de la Patria",
    role: "Presidente electo",
    runningMate: "José Manuel Restrepo",
    wikipedia: "https://es.wikipedia.org/wiki/Abelardo_de_la_Espriella",
  },
  cepeda: {
    id: "cepeda",
    name: "Iván Cepeda",
    party: "Pacto Histórico",
    wikipedia: "https://es.wikipedia.org/wiki/Iv%C3%A1n_Cepeda",
  },
  valencia: {
    id: "valencia",
    name: "Paloma Valencia",
    party: "Centro Democrático",
    wikipedia: "https://es.wikipedia.org/wiki/Paloma_Valencia",
  },
  fajardo: {
    id: "fajardo",
    name: "Sergio Fajardo",
    party: "Dignidad y Compromiso",
    wikipedia: "https://es.wikipedia.org/wiki/Sergio_Fajardo",
  },
  restrepo: {
    id: "restrepo",
    name: "José Manuel Restrepo",
    party: "Defensores de la Patria",
    role: "Vicepresidente electo",
    wikipedia: "https://es.wikipedia.org/wiki/Jos%C3%A9_Manuel_Restrepo_Abondano",
  },
};

// Second round (segunda vuelta), 2026-06-21.
export const RUNOFF = {
  turnoutPct: 63.60,
  registeredVoters: 26345588,
  results: [
    { candidateId: "delaespriella", votes: 12959542, pct: 49.66, winner: true },
    { candidateId: "cepeda", votes: 12708712, pct: 48.70, winner: false },
  ],
};

// First round (primera vuelta), 2026-05-31. Only candidates clearing ~1% shown;
// the remainder is folded into an "otros" row.
export const FIRST_ROUND = {
  turnoutPct: 57.89,
  registeredVoters: 41421973,
  totalVotes: 23978304,
  results: [
    { candidateId: "delaespriella", votes: 10361499, pct: 43.74 },
    { candidateId: "cepeda", votes: 9688361, pct: 40.90 },
    { candidateId: "valencia", votes: 1639685, pct: 6.92 },
    { candidateId: "fajardo", votes: 1009073, pct: 4.26 },
  ],
  othersVotes: 579741,
  othersPct: 2.41,
};
