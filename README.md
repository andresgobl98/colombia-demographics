# CO Demográfica

Explorador interactivo de estadísticas demográficas y de representación política de Colombia.

---

## ¿Qué es?

CO Demográfica es una aplicación web que permite visualizar y explorar datos de Colombia en dos secciones:

**Demografía** — Mapa coroplético departamental con indicadores del CNPV 2018: población, área, índice de masculinidad, composición étnica y pirámides de edad por sexo (proyecciones 2018–2050).

**Gobierno → Legislativo** — Composición del Congreso 2022–2026 con hemiciclo interactivo, leyenda de partidos, mapa de representación por departamento y listado de congresistas. Alterna entre Senado y Cámara de Representantes.

El objetivo es hacer accesible, de forma visual e intuitiva, información pública que de otro modo solo está disponible en archivos Excel o sitios institucionales dispersos.

---

## Fuentes de datos

| Sección | Fuente | Contenido |
|---------|--------|-----------|
| Demografía | CNPV 2018 — DANE | Población por sexo e índice de masculinidad (hoja 1PD), autorreconocimiento étnico (hoja 12PD), proyecciones de edad 2018–2050 |
| Demografía | DANE / IGAC | Superficie (km²) y capitales departamentales |
| Mapa | [John Guerra](https://gist.github.com/john-guerra/43c7656821069d00dcbc) | GeoJSON con geometría de los 32 departamentos |
| Legislativo | camara.gov.co · congreso.gov.co | Roster 2022–2026: 186 representantes (Cámara) y composición del Senado |

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | [React 19](https://react.dev) |
| Routing | [React Router v7](https://reactrouter.com) |
| Bundler | [Vite](https://vite.dev) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com) |
| Mapa | [React Simple Maps](https://www.react-simple-maps.io) + [D3 Scale](https://d3js.org/d3-scale) |
| Gráficas | [Recharts](https://recharts.org) |
| Procesamiento de datos | Python 3 · pandas · openpyxl |

---

## Uso

```bash
npm install
npm run dev
```

Para regenerar los datos desde los archivos fuente del DANE:

```bash
python scripts/parse_cnpv.py          # población por departamento y sexo
python scripts/parse_ethnicity.py     # autorreconocimiento étnico
python scripts/parse_age.py           # pirámides de edad
python scripts/parse_projections.py   # proyecciones de población 2018–2050
```

---

## Licencia

Este proyecto no es de código abierto. El código fuente se comparte públicamente con fines de referencia y consulta, pero no se otorga permiso para su uso, copia, modificación o distribución sin autorización expresa del autor.

Los datos del CNPV 2018 son de libre acceso y están sujetos a las condiciones de uso del DANE (dane.gov.co).
