"""
DANE PPED 2018–2050 — population projections by department
-----------------------------------------------------------
Reads the "PobDepartamentalxÁreaSexoEdad" sheet and rebuilds the columnar
timeseries.json with one population/male/female value per year (2018–2050).

Only the "Total" area row is used (Cabecera + Centros Poblados combined).
Age/sex-by-age breakdowns to the right are ignored for now.

National totals are summed from the department "Total" rows per year.

Usage:
    python scripts/parse_projections.py
"""

import json
from pathlib import Path
import pandas as pd

XLSX_FILE   = "data/PPED-AreaSexoEdadDep-2018-2050_VP.xlsx"
SHEET_INDEX = 2       # "PobDepartamentalxÁreaSexoEdad"
SKIP_ROWS   = 9       # title + 2 header rows
STATIC_FILE = "src/data/departments.json"
OUT_SERIES  = "src/data/timeseries.json"


def main():
    xlsx_path = Path(XLSX_FILE)
    if not xlsx_path.exists():
        raise FileNotFoundError(f"Could not find '{xlsx_path.resolve()}'")

    xl = pd.ExcelFile(xlsx_path)
    sheet = xl.sheet_names[SHEET_INDEX]
    print(f"Reading '{xlsx_path}', sheet '{sheet}', skipping {SKIP_ROWS} rows…")

    df = pd.read_excel(
        xl, sheet_name=sheet, skiprows=SKIP_ROWS, header=None, usecols="A:G",
    )
    df.columns = ["dp", "dpnom", "year", "area", "total", "male", "female"]

    # Keep only the all-areas "Total" rows
    df = df[df["area"].astype(str).str.strip() == "Total"].copy()

    # Normalise department code to a zero-padded 2-digit string
    df["dp"] = df["dp"].apply(
        lambda v: str(int(v)).zfill(2) if str(v).strip().isdigit() else str(v).strip().zfill(2)
    )
    df["year"] = df["year"].astype(int)

    years = sorted(df["year"].unique().tolist())
    print(f"Years: {years[0]}–{years[-1]} ({len(years)} years)")

    departments = {}
    for code, grp in df.groupby("dp"):
        grp = grp.sort_values("year")
        if grp["year"].tolist() != years:
            print(f"  !! {code} has irregular year coverage")
        departments[code] = {
            "population": [int(v) for v in grp["total"]],
            "male":       [int(v) for v in grp["male"]],
            "female":     [int(v) for v in grp["female"]],
        }

    print(f"Departments: {len(departments)}")

    # National = sum of departments per year
    national = {"population": [], "male": [], "female": []}
    for i in range(len(years)):
        national["population"].append(sum(d["population"][i] for d in departments.values()))
        national["male"].append(sum(d["male"][i] for d in departments.values()))
        national["female"].append(sum(d["female"][i] for d in departments.values()))

    # Sanity check: codes line up with the static master
    static = json.load(open(STATIC_FILE, encoding="utf-8"))
    missing = set(static["departments"]) - set(departments)
    extra   = set(departments) - set(static["departments"])
    if missing:
        print(f"  !! In static but not in projections: {sorted(missing)}")
    if extra:
        print(f"  !! In projections but not in static: {sorted(extra)}")

    series = {"years": years, "national": national, "departments": departments}
    with open(OUT_SERIES, "w", encoding="utf-8") as f:
        json.dump(series, f, ensure_ascii=False, indent=2)

    print(f"Wrote {OUT_SERIES}")
    print(f"  National 2018: {national['population'][0]:,}")
    print(f"  National 2050: {national['population'][-1]:,}")


if __name__ == "__main__":
    main()
