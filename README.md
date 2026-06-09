# Colombia en Datos

Explorador interactivo de estadísticas demográficas departamentales de Colombia, basado en los resultados del Censo Nacional de Población y Vivienda 2018 (CNPV 2018) del DANE.

---

## ¿Qué es?

Colombia en Datos es una aplicación web que permite visualizar y explorar indicadores demográficos a nivel departamental mediante un mapa coroplético interactivo. Al seleccionar un departamento se despliega un panel lateral con estadísticas detalladas, gráficas de distribución por sexo y autorreconocimiento étnico.

El objetivo es hacer accesible, de forma visual e intuitiva, información censal que de otro modo solo está disponible en tablas de Excel.

---

## Fuente de datos

Toda la información proviene del **Censo Nacional de Población y Vivienda 2018 (CNPV 2018)**, publicado por el Departamento Administrativo Nacional de Estadística (**DANE**).

| Hoja | Contenido |
|------|-----------|
| 1PD  | Población total por departamento, sexo e índice de masculinidad |
| 12PD | Población por autorreconocimiento étnico y departamento |

Los datos geográficos (geometría de departamentos) provienen del GeoJSON publicado en GitHub por [**John Guerra**](https://gist.github.com/john-guerra/43c7656821069d00dcbc)

Los datos de superficie (km²) y capitales departamentales corresponden a cifras oficiales del DANE / IGAC.

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | [React 19](https://react.dev) |
| Bundler | [Vite](https://vite.dev) |
| Estilos | [Tailwind CSS](https://tailwindcss.com) |
| Mapa | [React Simple Maps](https://www.react-simple-maps.io) + [D3 Scale](https://d3js.org/d3-scale) |
| Gráficas | [Recharts](https://recharts.org) |
| Procesamiento de datos | Python 3 · pandas · openpyxl |

---

## Estructura del proyecto

```
colombia-demographics/
├── public/
│   └── colombia.geojson        # Geometría departamental (GeoJSON)
├── scripts/
│   ├── parse_cnpv.py           # Extrae población desde hoja 1PD
│   └── parse_ethnicity.py      # Extrae etnicidad desde hoja 12PD
├── src/
│   ├── components/
│   │   ├── ColombiaMap.jsx     # Mapa coroplético principal
│   │   ├── MetricSelector.jsx  # Selector de métrica para colorear el mapa
│   │   ├── RegionPanel.jsx     # Panel lateral con estadísticas del departamento
│   │   └── TopicRanking.jsx    # Ranking de departamentos por métrica
│   └── data/
│       ├── demographics.json   # Dataset principal (población, etnicidad, área, capital)
│       └── metrics.js          # Definición de métricas y escalas de color
```

---

## Métricas disponibles

- **Población** — Total de personas censadas por departamento
- **Área** — Superficie del departamento en km²

---

## Uso

```bash
npm install
npm run dev
```

Para regenerar los datos desde el archivo XLSX del DANE:

```bash
# Coloca el archivo en data/cnpv2018.xlsx, luego:
python scripts/parse_cnpv.py
python scripts/parse_ethnicity.py
```

---

## Licencia

Este proyecto no es de código abierto. El código fuente se comparte públicamente con fines de referencia y consulta, pero no se otorga permiso para su uso, copia, modificación o distribución sin autorización expresa del autor.

Los datos del CNPV 2018 son de libre acceso y están sujetos a las condiciones de uso del DANE (dane.gov.co).
