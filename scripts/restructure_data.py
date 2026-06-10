"""
One-off restructure: demographics.json  ->  departments.json + timeseries.json
------------------------------------------------------------------------------
Splits the flat 2018 dataset into:

  departments.json   static master   (name, capital, area_km2, ethnicity2018)
  timeseries.json    columnar series (population / male / female per year)

Only 2018 exists today, so every series array has a single element. Appending
DANE projection years later means pushing one value per metric per year.

Usage:
    python scripts/restructure_data.py
"""

import json
from pathlib import Path

SRC = Path("src/data/demographics.json")
OUT_STATIC = Path("src/data/departments.json")
OUT_SERIES = Path("src/data/timeseries.json")

BASE_YEAR = 2018


def main():
    with open(SRC, encoding="utf-8") as f:
        data = json.load(f)

    static = {"national": {}, "departments": {}}
    series = {"years": [BASE_YEAR], "national": {}, "departments": {}}

    # ── National ──────────────────────────────────────────────────────────────
    nat = data["national"]
    static["national"] = {
        "name":          nat["name"],
        "departments":   nat["departments"],
        "area_km2":      nat["area_km2"],
        "ethnicity2018": nat["ethnicity"],
    }
    series["national"] = {
        "population": [nat["population"]],
        "male":       [nat["sex"]["male"]],
        "female":     [nat["sex"]["female"]],
    }

    # ── Departments ───────────────────────────────────────────────────────────
    for code, dept in data["departments"].items():
        static["departments"][code] = {
            "name":          dept["name"],
            "capital":       dept["capital"],
            "area_km2":      dept["area_km2"],
            "ethnicity2018": dept["ethnicity"],
        }
        series["departments"][code] = {
            "population": [dept["population"]],
            "male":       [dept["sex"]["male"]],
            "female":     [dept["sex"]["female"]],
        }

    with open(OUT_STATIC, "w", encoding="utf-8") as f:
        json.dump(static, f, ensure_ascii=False, indent=2)
    with open(OUT_SERIES, "w", encoding="utf-8") as f:
        json.dump(series, f, ensure_ascii=False, indent=2)

    print(f"Wrote {OUT_STATIC} ({len(static['departments'])} departments)")
    print(f"Wrote {OUT_SERIES} (years: {series['years']})")


if __name__ == "__main__":
    main()
