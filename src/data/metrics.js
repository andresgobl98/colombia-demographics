export const METRICS = [
  {
    id: "population",
    label: "Population",
    description: "Total population (CNPV 2018)",
    unit: "",
    format: (v) => (v != null ? v.toLocaleString("es-CO") : "N/A"),
    domain: [0, 8000000],
    colorRange: ["#dbeafe", "#1d4ed8"],
  },
  {
    id: "masculinityIndex",
    label: "Masculinity Index",
    description: "Men per 100 women",
    unit: "",
    format: (v) => (v != null ? v.toFixed(1) : "N/A"),
    domain: [88, 116],
    colorRange: ["#fce7f3", "#7c3aed"],
  },
  {
    id: "area_km2",
    label: "Area",
    description: "Area in km²",
    unit: "km²",
    format: (v) => (v != null ? `${v.toLocaleString("es-CO")} km²` : "N/A"),
    domain: [0, 110000],
    colorRange: ["#dcfce7", "#14532d"],
  },
];
