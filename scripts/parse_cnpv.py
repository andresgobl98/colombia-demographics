"""
DANE CNPV 2018 — Population by department extractor
-----------------------------------------------------
Reads the "Cuadro 1PD Departamental" sheet from the DANE xlsx file and
exports one JSON record per department, keyed by the two-digit DANE code.

Requirements:
    pip install pandas openpyxl

Usage:
    python scripts/parse_cnpv.py

Edit the CONFIG block below to match your file before running.
"""

import re
import json
from pathlib import Path
import pandas as pd

# ── CONFIG ────────────────────────────────────────────────────────────────────

# Path to the DANE xlsx file (absolute, or relative to the project root)
XLSX_FILE = "data/cnpv2018.xlsx"

# Exact name of the sheet tab (right-click the tab in Excel to confirm)
SHEET_NAME = "1PD"

# How many rows to skip before the data starts (title block).
# If the output looks wrong, open the file and count the rows above the first
# data row, then adjust this number.
SKIP_ROWS = 10

# Where to write the result
OUTPUT_FILE = "src/data/population.json"

# ── SCRIPT ────────────────────────────────────────────────────────────────────

def main():
    xlsx_path = Path(XLSX_FILE)
    if not xlsx_path.exists():
        raise FileNotFoundError(
            f"Could not find '{xlsx_path.resolve()}'.\n"
            "Place the DANE xlsx file there, or update XLSX_FILE in the CONFIG block."
        )

    print(f"Reading '{xlsx_path}', sheet '{SHEET_NAME}', skipping {SKIP_ROWS} rows…")

    df = pd.read_excel(
        xlsx_path,
        sheet_name=SHEET_NAME,
        skiprows=SKIP_ROWS,
        header=None,
        usecols="A:H",
    )

    df.columns = [
        "departamento", "area", "edad",
        "total", "hombres", "mujeres",
        "idx_masculinidad", "idx_feminidad",
    ]

    # Merged cells arrive as NaN after the first row — forward-fill them
    df["departamento"] = df["departamento"].ffill()
    df["area"] = df["area"].ffill()

    # Drop rows without a population figure
    df = df.dropna(subset=["total"])

    # Keep only the all-areas / all-ages summary row per department
    mask = (
        df["area"].astype(str).str.strip() == "Total"
    ) & (
        df["edad"].astype(str).str.strip() == "Total"
    )
    df_dept = df[mask].copy()

    print(f"Found {len(df_dept)} department rows.")

    result = {}

    for _, row in df_dept.iterrows():
        raw = str(row["departamento"]).strip()  # e.g. "5_Antioquia"

        match = re.match(r"^(\d+)_(.+)$", raw)
        if not match:
            print(f"  !! Skipping unexpected format: '{raw}'")
            continue

        code   = match.group(1).zfill(2)   # "5" → "05"
        nombre = match.group(2).strip()     # "Antioquia"

        result[code] = {
            "name":              nombre,
            "population":        int(row["total"]),
            "male":              int(row["hombres"]),
            "female":            int(row["mujeres"]),
            "masculinityIndex":  round(float(row["idx_masculinidad"]), 1),
        }

    output_path = Path(OUTPUT_FILE)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"Done — {len(result)} departments written to '{output_path}'.")
    print("\nSample output (first 2 entries):")
    for code, data in list(result.items())[:2]:
        print(f"  {code}: {data}")


if __name__ == "__main__":
    main()
