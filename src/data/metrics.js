export const METRICS = [
  {
    id: "population",
    label: "Población",
    description: "Población total censada (CNPV 2018)",
    unit: "",
    format: (v) => (v != null ? v.toLocaleString("es-CO") : "N/D"),
    domain: [0, 8000000],
    colorRange: ["#dbeafe", "#1d4ed8"],
  },
  {
    id: "area_km2",
    label: "Área",
    description: "Superficie en km²",
    unit: "km²",
    format: (v) => (v != null ? `${v.toLocaleString("es-CO")} km²` : "N/D"),
    domain: [0, 110000],
    colorRange: ["#dcfce7", "#14532d"],
  },
];
